import { z } from 'zod';
import { EmptyObjectSchema, MetadataSchema } from '../app.zod.js';
import {
  LoginInputZ,
  LoginOutputZ,
  SignUpInputZ,
  SignUpOutputZ,
} from '../domain/auth/auth.zod.js';

export const ServerResponseSchema = z
  .object({
    meta: MetadataSchema.required(),
    input: EmptyObjectSchema.or(SignUpInputZ).or(LoginInputZ),
    output: EmptyObjectSchema.or(SignUpOutputZ).or(LoginOutputZ),
    error: z.string().or(EmptyObjectSchema).optional(),
  })
  .required();

export type IServerResponse = z.infer<typeof ServerResponseSchema>;
