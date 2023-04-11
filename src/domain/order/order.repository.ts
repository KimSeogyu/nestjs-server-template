import { Inject, Injectable } from '@nestjs/common';
import {
  MYSQL_DATASOURCE_KEY,
  ORDER_REPOSITORY_KEY,
} from '../../common/constants.js';
import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  MoreThan,
  Repository,
} from 'typeorm';
import { Order } from './order.entity.js';
import { CreateOrderDto } from './order.zod.js';
import { GeneralQueryFilter } from '../../applications/api/api.zod.js';

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

  async findAll(
    query: GeneralQueryFilter<
      Pick<Order, 'user' | 'orderType' | 'orderStatus'>
    >,
  ) {
    const where: FindOptionsWhere<Order> = {};

    if (query.cursor) {
      where.id = MoreThan(query.cursor);
    }

    if (query.user) {
      where.user = {
        id: query.user.id,
        username: query.user.username,
      };
    }

    if (query.orderType) {
      where.orderType = {
        id: query.orderType.id,
        enName: query.orderType.enName,
      };
    }

    if (query.orderStatus) {
      where.orderStatus = {
        id: query.orderStatus.id,
        enName: query.orderStatus.enName,
      };
    }

    const option: FindManyOptions<Order> = {
      where,
      take: query.limit,
    };
    return await this.ordersRepository.find(option);
  }
}
