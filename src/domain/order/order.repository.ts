import { Inject, Injectable } from '@nestjs/common';
import {
  MysqlDatasourceKey,
  OrderRepositoryKey,
} from '../../constants/index.js';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { Order } from './order.entity.js';
import { CreateOrderDto } from './order.zod.js';

@Injectable()
export class OrderRepository {
  constructor(
    @Inject(OrderRepositoryKey)
    private ordersRepository: Repository<Order>,
    @Inject(MysqlDatasourceKey) private mysqlProvider: DataSource,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    return await this.ordersRepository.save({
      orderType: {
        id: dto.orderTypeId,
      },
      orderStatus: {
        id: dto.orderStatusId,
      },
      amount: dto.amount,
      user: {
        id: dto.userId,
      },
    });
  }

  async findAll(option: FindManyOptions<Order>) {
    return await this.ordersRepository.find(option);
  }
}
