import { Body, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  ApiController,
  ApiJwtAuthGuard,
} from '../../common/decorators/index.js';
import { OrderService } from './order.service.js';
import {
  CreateOrderDto,
  CreateOrderResponseDto,
  FindManyOrdersDto,
  FindManyOrdersResponseDto,
} from './order.zod.js';

@ApiController('orders')
@ApiJwtAuthGuard()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: CreateOrderResponseDto,
    status: HttpStatus.CREATED,
  })
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.orderService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: FindManyOrdersResponseDto,
    status: HttpStatus.OK,
  })
  async findManyOrders(@Query() dto: FindManyOrdersDto) {
    return await this.orderService.findAll({
      user: {
        id: dto.userId,
        username: dto.username,
      },
      orderStatus: {
        id: dto.orderStatusId,
        enName: dto.orderStatusEnName,
      },
      orderType: {
        id: dto.orderTypeId,
        enName: dto.orderTypeEnName,
      },
      limit: dto.limit,
      offset: dto.offset,
    });
  }
}
