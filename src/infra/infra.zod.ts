import { z } from 'zod';
import {
  LoginInputZ,
  LoginOutputZ,
  SignUpInputZ,
  SignUpOutputZ,
} from 'src/domain/auth/auth.zod.js';
import {
  CreateOrderInputZ,
  CreateOrderOutputZ,
} from 'src/domain/order/order.zod.js';
import {
  CreateUserInputZ,
  UpdateUsernameInputZ,
  UpdateUserPasswordInputZ,
} from 'src/domain/users/user.zod.js';
import {
  EmptyObjectSchema,
  IsWriteSuccessOutputZ,
  MetadataSchema,
} from '../app.zod.js';

export const ServerResponseSchema = z
  .object({
    meta: MetadataSchema.required(),
    input: EmptyObjectSchema.or(SignUpInputZ)
      .or(LoginInputZ)
      .or(CreateOrderInputZ)
      .or(CreateUserInputZ)
      .or(UpdateUsernameInputZ)
      .or(UpdateUserPasswordInputZ),
    output: EmptyObjectSchema.or(SignUpOutputZ)
      .or(LoginOutputZ)
      .or(CreateOrderOutputZ)
      .or(IsWriteSuccessOutputZ),
    error: z.string().or(EmptyObjectSchema).optional(),
  })
  .required();

export type IServerResponse = z.infer<typeof ServerResponseSchema>;
