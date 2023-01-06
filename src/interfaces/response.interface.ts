import { z } from 'zod';

const ServerResponseSchema = z.object({
  meta: z
    .object({
      timestamp: z.string(),
      isError: z.boolean(),
    })
    .required(),
  input: z.any(),
  output: z.any(),
  error: z.string().or(z.object({})).optional(),
});

export type IServerResponse = z.infer<typeof ServerResponseSchema>;
