import { z } from 'zod';

export const GlobalConfigSchema = z
  .object({
    AUTH_USERNAME: z.string(),
    AUTH_PASSWORD: z.string(),
    APP_VERSION: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRE_TIME: z.coerce.string(),
    SLACK_WEBHOOK_URL: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_REDIRECT_URIS: z.string(),
  })
  .required();

export type GlobalConfigSchemaType = z.infer<typeof GlobalConfigSchema>;

export const DbConfigSchema = z
  .object({
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.coerce.number(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_SCHEMA: z.string(),
  })
  .required();
export type DbConfigSchemaType = z.infer<typeof DbConfigSchema>;
export const CacheConfigSchema = z
  .object({
    host: z.string().optional(),
    port: z.coerce.number().optional(),
    ttl: z.coerce.number().optional(),
    store: z.any(),
  })
  .required({ store: true });
export type CacheConfigSchemaType = z.infer<typeof CacheConfigSchema>;
