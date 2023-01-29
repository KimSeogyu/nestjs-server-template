import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { AppModule } from '../../../src/app.module.js';
import {
  MYSQL_DATASOURCE_KEY,
  ORDER_REPOSITORY_KEY,
} from '../../../src/constants/index.js';
import { DatabaseModule } from '../../../src/database/database.module.js';
import { OrderController } from '../../../src/domain/order/order.controller.js';
import {
  Order,
  OrderStatus,
  OrderType,
} from '../../../src/domain/order/order.entity.js';
import { OrderRepository } from '../../../src/domain/order/order.repository.js';
import { OrderService } from '../../../src/domain/order/order.service.js';
import { CreateOrderDto } from '../../../src/domain/order/order.zod.js';
import { User } from '../../../src/domain/users/user.entity.js';

describe('OrderController', () => {
  let controller: OrderController;
  let dataSource: DataSource;
  let module: TestingModule;
  let user: any;
  let sellOrderType: any;
  let sellOrderStatus: any;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule.register()],
      controllers: [OrderController],
      providers: [
        OrderService,
        OrderRepository,
        {
          inject: [MYSQL_DATASOURCE_KEY],
          provide: ORDER_REPOSITORY_KEY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Order),
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    dataSource = module.get<DataSource>(MYSQL_DATASOURCE_KEY);
    const userEntity = dataSource.getRepository(User).create({
      username: 'asap',
      password: '1234',
      salt: '1234',
    });
    user = await dataSource.getRepository(User).save(userEntity);
    sellOrderType = await dataSource.getRepository(OrderStatus).save({
      enName: 'SELL',
      krName: '구매',
    });
    sellOrderStatus = await dataSource.getRepository(OrderType).save({
      enName: 'CREATED',
      krName: '생성됨',
    });
  });

  it('should be defined', () => {
    expect(controller).instanceOf(OrderController);
    expect(dataSource).instanceOf(DataSource);
  });

  const createOrder = async () => {
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
  };
  it('[주문 생성] 성공', createOrder);

  it('[주문 조회] 성공', async () => {
    await createOrder();
    let result = await controller.findManyOrders({ limit: 10, offset: 0 });
    expect(result.length).eq(2);
    await createOrder();
    await createOrder();
    await createOrder();
    await createOrder();
    await createOrder();
    result = await controller.findManyOrders({ limit: 10, offset: 0 });
    expect(result.length).eq(10);
  });
});
