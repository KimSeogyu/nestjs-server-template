import { z } from 'zod';

const CacheOptionsSchema = z.object({
  key: z.string().optional(),
  ttl: z.number().optional(),
  fields: z.array(z.string()).optional(),
});

export type AppCacheOption = z.infer<typeof CacheOptionsSchema>;
