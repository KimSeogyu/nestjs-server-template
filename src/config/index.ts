import { ConfigSchema, IConfig } from './config.zod.js';
import { registerAs } from '@nestjs/config';

export default registerAs(
  '',
  async (): Promise<IConfig> =>
    ConfigSchema.parse({
      AUTH_USERNAME: process.env.AUTH_USERNAME,
      AUTH_PASSWORD: process.env.AUTH_PASSWORD,
      APP_VERSION: process.env.APP_VERSION,
      DATABASE_HOST: process.env.DATABASE_HOST,
      DATABASE_PORT: Number(process.env.DATABASE_PORT),
      DATABASE_USERNAME: process.env.DATABASE_USERNAME,
      DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      DATABASE_SCHEMA: process.env.DATABASE_SCHEMA,
      CACHE_HOST: process.env.CACHE_HOST,
      CACHE_PORT: process.env.CACHE_PORT,
      CACHE_TTL: process.env.CACHE_TTL,
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
      SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    }),
);

export * from './config.zod.js';
