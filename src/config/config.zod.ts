import { z } from 'zod';

export const ConfigSchema = z
  .object({
    AUTH_USERNAME: z.string(),
    AUTH_PASSWORD: z.string(),
    APP_VERSION: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.number(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_SCHEMA: z.string(),
    CACHE_HOST: z.string(),
    CACHE_PORT: z.string(),
    CACHE_TTL: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRE_TIME: z.string(),
    SLACK_WEBHOOK_URL: z.string(),
  })
  .strict();

export type IConfig = z.infer<typeof ConfigSchema>;
