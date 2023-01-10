import { z } from 'zod';
import { EmptyObjectSchema, MetadataSchema } from '../app.zod.js';
import {
  LoginInput,
  LoginOutput,
  SignUpInput,
  SignUpOutput,
} from '../domain/auth/auth.zod.js';

export const ServerResponseSchema = z
  .object({
    meta: MetadataSchema.required(),
    input: EmptyObjectSchema.or(SignUpInput).or(LoginInput),
    output: EmptyObjectSchema.or(SignUpOutput).or(LoginOutput),
    error: z.string().or(EmptyObjectSchema).optional(),
  })
  .required();

export type IServerResponse = z.infer<typeof ServerResponseSchema>;
