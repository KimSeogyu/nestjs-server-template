import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../../src/database/database.module.js';
import { DataSource } from 'typeorm';
import { expect } from 'chai';
import { OrderController } from '../../../src/domain/order/order.controller.js';
import { OrderService } from '../../../src/domain/order/order.service.js';
import { OrderRepository } from '../../../src/domain/order/order.repository.js';
import {
  MysqlDatasourceKey,
  OrderRepositoryKey,
} from '../../../src/constants/index.js';
import {
  Order,
  OrderStatus,
  OrderType,
} from '../../../src/domain/order/order.entity.js';
import { AppModule } from '../../../src/app.module.js';
import { CreateOrderDto } from '../../../src/domain/order/order.zod.js';
import { User } from '../../../src/domain/users/user.entity.js';

describe('OrderController', () => {
  let controller: OrderController;
  let dataSource: DataSource;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule.register()],
      controllers: [OrderController],
      providers: [
        OrderService,
        OrderRepository,
        {
          provide: OrderRepositoryKey,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Order),
          inject: [MysqlDatasourceKey],
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    dataSource = module.get<DataSource>(MysqlDatasourceKey);
  });

  it('should be defined', () => {
    expect(controller).instanceOf(OrderController);
    expect(dataSource).instanceOf(DataSource);
  });

  it('주문 생성', async () => {
    const userEntity = dataSource.getRepository(User).create({
      username: 'asap',
      password: '1234',
      salt: '1234',
    });
    let user = await dataSource.getRepository(User).save(userEntity);
    const sellOrderType = await dataSource.getRepository(OrderStatus).save({
      enName: 'SELL',
      krName: '구매',
    });
    const sellOrderStatus = await dataSource.getRepository(OrderType).save({
      enName: 'CREATED',
      krName: '생성됨',
    });
    const dto = new CreateOrderDto();
    dto.orderTypeId = sellOrderType.id;
    dto.orderStatusId = sellOrderStatus.id;
    dto.amount = 100;
    dto.userId = user.id;

    const result = await controller.createOrder(dto);
    const result2 = await controller.createOrder(dto);
    expect(result.orderType.id).eq(dto.orderTypeId);
    expect(result.orderStatus.id).eq(dto.orderStatusId);
    expect(result.amount).eq(dto.amount);
    expect(result.user.id).eq(dto.userId);
    expect(result2.orderType.id).eq(dto.orderTypeId);
    expect(result2.orderStatus.id).eq(dto.orderStatusId);
    expect(result2.amount).eq(dto.amount);
    expect(result2.user.id).eq(dto.userId);
    user = await dataSource.getRepository(User).findOneOrFail({
      where: { id: user.id },
      relations: {
        orders: {
          orderType: true,
          orderStatus: true,
        },
      },
    });
    expect(
      user.orders.filter((order) => order.orderStatus.enName === 'SELL').length,
    ).eq(2);
    expect(
      user.orders.filter((order) => order.orderStatus.enName === 'BUY').length,
    ).eq(0);
  });
});
