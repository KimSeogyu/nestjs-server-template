import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module.js';
import { DataSource } from 'typeorm';
import { databaseProviders } from '../../database/database.provider.js';
import { Order } from './order.entity.js';
import {
  MysqlDatasourceKey,
  OrderRepositoryKey,
} from '../../constants/index.js';
import { OrderController } from './order.controller.js';
import { OrderService } from './order.service.js';

@Module({
  imports: [DatabaseModule.register()],
  controllers: [OrderController],
  providers: [
    OrderService,
    ...databaseProviders,
    {
      provide: OrderRepositoryKey,
      inject: [MysqlDatasourceKey],
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    },
  ],
})
export class OrderModule {}
