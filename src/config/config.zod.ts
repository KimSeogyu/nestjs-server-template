import { z } from 'zod';

export const GlobalConfigSchema = z
  .object({
    AUTH_USERNAME: z.string(),
    AUTH_PASSWORD: z.string(),
    APP_VERSION: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRE_TIME: z.string(),
    SLACK_WEBHOOK_URL: z.string(),
  })
  .required();

export type GlobalConfigSchemaType = z.infer<typeof GlobalConfigSchema>;

export const DbConfigSchema = z
  .object({
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.number(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_SCHEMA: z.string(),
  })
  .required();
export type DbConfigSchemaType = z.infer<typeof DbConfigSchema>;
export const CacheConfigSchema = z
  .object({
    host: z.string(),
    port: z.number(),
    ttl: z.number(),
    store: z.any(),
  })
  .required();
export type CacheConfigSchemaType = z.infer<typeof CacheConfigSchema>;
