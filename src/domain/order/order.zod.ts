import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

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
    amount: z.number().min(0),
  })
  .required();

export type CreateOrder = z.infer<typeof CreateOrderInputZ>;

export class CreateOrderDto extends createZodDto(CreateOrderInputZ) {}
