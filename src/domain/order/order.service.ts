import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './order.zod.js';
import { OrderRepository } from './order.repository.js';
import { FindManyOptions } from 'typeorm';
import { Order } from './order.entity.js';
import { GeneralQueryFilter } from 'src/applications/api/api.zod.js';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async create(dto: CreateOrderDto) {
    return await this.orderRepository.createOrder(dto);
  }

  async findAll(
    query: GeneralQueryFilter<
      Pick<Order, 'user' | 'orderType' | 'orderStatus'>
    >,
  ) {
    const option: FindManyOptions<Order> = {
      where: {
        user: {
          id: query.user?.id,
          username: query.user?.username,
        },
        orderType: {
          id: query.orderType?.id,
          enName: query.orderType?.enName,
        },
        orderStatus: {
          id: query.orderStatus?.id,
          enName: query.orderStatus?.enName,
        },
      },
      skip: query.offset,
      take: query.limit,
    };

    return await this.orderRepository.findAll(option);
  }
}
