import { Inject, Injectable } from '@nestjs/common';
import {
  MYSQL_DATASOURCE_KEY,
  ORDER_REPOSITORY_KEY,
} from '../../common/constants.js';
import { DataSource, DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { Order } from './order.entity.js';
import { CreateOrderDto } from './order.zod.js';

@Injectable()
export class OrderRepository {
  constructor(
    @Inject(ORDER_REPOSITORY_KEY)
    private ordersRepository: Repository<Order>,
    @Inject(MYSQL_DATASOURCE_KEY) private mysqlProvider: DataSource,
  ) {}

  async save(dto: DeepPartial<Order>) {
    return await this.ordersRepository.save(dto);
  }

  async findAll(option: FindManyOptions<Order>) {
    return await this.ordersRepository.find(option);
  }
}
