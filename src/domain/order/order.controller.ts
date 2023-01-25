import { ApiController, JwtAuthGuard } from '../../decorators/index.js';
import { OrderService } from './order.service.js';
import { Body, HttpStatus, Post } from '@nestjs/common';
import { CreateOrderDto, CreateOrderResponseDto } from './order.zod.js';
import { ApiResponse } from '@nestjs/swagger';

@ApiController('orders')
@JwtAuthGuard()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiResponse({
    type: CreateOrderResponseDto,
    status: HttpStatus.CREATED,
  })
  createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }
}
