import { ConfigSchema, IConfig } from './zod/index.js';
import { registerAs } from '@nestjs/config';

const parsedConfig = ConfigSchema.parse({
  AUTH_USERNAME: process.env.AUTH_USERNAME?.toString() || 'example',
  AUTH_PASSWORD: process.env.AUTH_PASSWORD?.toString() || 'example',
  APP_VERSION: process.env.APP_VERSION?.toString() || '1',
  DATABASE_HOST: process.env.DATABASE_HOST?.toString() || 'example',
  DATABASE_PORT: Number(process.env.DATABASE_PORT) || 3306,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME?.toString() || 'example',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD?.toString() || 'example',
  DATABASE_SCHEMA: process.env.DATABASE_SCHEMA?.toString() || 'example',
  JWT_SECRET: process.env.JWT_SECRET?.toString() || 'example',
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME || '1h',
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL?.toString() || 'example',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_TTL: Number(process.env.TTL || 600),
});

export default registerAs('', async (): Promise<IConfig> => parsedConfig);

export * from './zod/index.js';
