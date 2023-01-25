import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { MetadataSchema } from '../../app.zod.js';

export const OrderStatusZ = z.enum([
  'CREATED',
  'ON_PROCESS',
  'FAILED',
  'SUCCESS',
  'CANCELLED',
  'REFUNDED',
]);
export const OrderTypeZ = z.enum(['SELL', 'BUY', 'CANCEL']);
export const CreateOrderInputZ = z
  .object({
    orderTypeId: z.number().min(1),
    orderStatusId: z.number().min(1),
    userId: z.number().min(1),
    amount: z.number().gt(0),
  })
  .required();

export type CreateOrder = z.infer<typeof CreateOrderInputZ>;

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
