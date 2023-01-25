import { ApiController } from '../../decorators/index.js';
import { OrderService } from './order.service.js';
import { Body, Post } from '@nestjs/common';
import { CreateOrderDto } from './order.zod.js';

@ApiController('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }
}
