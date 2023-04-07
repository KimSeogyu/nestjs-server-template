import { z } from 'zod';
import { MetadataSchema } from '../applications/api/api.zod.js';

export const ServerResponseSchema = z
  .object({
    meta: MetadataSchema.required(),
    input: z
      .object({
        query: z.record(z.string(), z.any()),
        body: z.record(z.string(), z.any()),
        param: z.record(z.string(), z.any()),
      })
      .deepPartial(),
    output: z.record(z.string(), z.any()),
    error: z.record(z.string(), z.any()).optional().or(z.string().optional()),
  })
  .required();

export type IServerResponse = z.infer<typeof ServerResponseSchema>;
