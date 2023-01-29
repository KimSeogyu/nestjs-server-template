import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module.js';
import { DataSource } from 'typeorm';
import { databaseProviders } from '../../database/database.provider.js';
import { Order } from './order.entity.js';
import {
  MYSQL_DATASOURCE_KEY,
  ORDER_REPOSITORY_KEY,
} from '../../constants/index.js';
import { OrderController } from './order.controller.js';
import { OrderService } from './order.service.js';
import { OrderRepository } from './order.repository.js';

@Module({
  imports: [DatabaseModule.register()],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    ...databaseProviders,
    {
      provide: ORDER_REPOSITORY_KEY,
      inject: [MYSQL_DATASOURCE_KEY],
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    },
  ],
})
export class OrderModule {}
