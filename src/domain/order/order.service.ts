import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository.js';
import { DeepPartial } from 'typeorm';
import { Order } from './order.entity.js';
import { GeneralQueryFilter } from 'src/applications/api/api.zod.js';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async save(dto: DeepPartial<Order>) {
    return await this.orderRepository.save(dto);
  }

  async findAll(
    query: GeneralQueryFilter<
      Pick<Order, 'user' | 'orderType' | 'orderStatus'>
    >,
  ) {
    return await this.orderRepository.findAll(query);
  }
}
