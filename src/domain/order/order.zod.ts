import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import {
  GeneralQueryFilterDto,
  MetadataSchema,
} from '../../applications/api/api.zod.js';

export const OrderStatusZ = z.object({
  id: z.number(),
  enName: z.string(),
  krName: z.string(),
  // orders: z.array(OrderZ).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const OrderTypeZ = z.object({
  id: z.number(),
  enName: z.string(),
  krName: z.string(),
  // orders: z.array(OrderZ).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const OrderZ = z.object({
  id: z.number(),
  orderStatus: z.array(OrderStatusZ).optional(),
  orderType: z.array(OrderTypeZ).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateOrderInputZ = z
  .object({
    orderTypeId: z.number().min(1),
    orderStatusId: z.number().min(1),
    userId: z.number().min(1),
    amount: z.number().gt(0),
  })
  .required();

export type CreateOrderInput = z.infer<typeof CreateOrderInputZ>;

export class CreateOrderDto extends createZodDto(CreateOrderInputZ) {}
export const CreateOrderOutputZ = z.object({});
export type CreateOrderOutput = z.infer<typeof CreateOrderOutputZ>;
export const CreateOrderResponseZ = z.object({
  input: CreateOrderInputZ,
  output: CreateOrderOutputZ,
  meta: MetadataSchema,
});

export class CreateOrderResponseDto extends createZodDto(
  CreateOrderResponseZ,
) {}

export const FindManyOrdersInputZ = z
  .object({
    userId: z.number().optional(),
    username: z.string().optional(),
    orderTypeId: z.number().optional(),
    orderTypeEnName: z.string().optional(),
    orderStatusId: z.number().optional(),
    orderStatusEnName: z.string().optional(),
  })
  .extend(GeneralQueryFilterDto.shape);

export class FindManyOrdersDto extends createZodDto(FindManyOrdersInputZ) {}
export class FindManyOrdersResponseDto extends createZodDto(z.array(OrderZ)) {}
