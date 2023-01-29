import { z } from 'zod';

const CacheOptionsSchema = z.object({
  key: z.string().optional(),
  ttl: z.number().optional().default(5),
  fields: z.array(z.string()).optional(),
});

export type AppCacheOption = z.infer<typeof CacheOptionsSchema>;

export const APP_CACHE_METADATA = 'APP_CACHE_METADATA';
