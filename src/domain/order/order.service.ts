import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './order.zod.js';
import { OrderRepository } from './order.repository.js';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async create(dto: CreateOrderDto) {
    return this.orderRepository.createOrder(dto);
  }
}
