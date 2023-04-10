import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { ApiModule } from '../../../src/applications/api/api.module.js';
import {
  MYSQL_DATASOURCE_KEY,
  ORDER_REPOSITORY_KEY,
} from '../../../src/common/constants.js';
import { DatabaseModule } from '../../../src/infra/database/database.module.js';
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

  before(async () => {
    module = await Test.createTestingModule({
      imports: [ApiModule, DatabaseModule.register()],
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
});
