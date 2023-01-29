import { registerAs } from '@nestjs/config';
import { GlobalConfigSchema } from './config.zod.js';

export const commonConfig = registerAs(
  '',
  (): Promise<GlobalConfigSchema> =>
    GlobalConfigSchema.parseAsync({
      AUTH_USERNAME: process.env.AUTH_USERNAME,
      AUTH_PASSWORD: process.env.AUTH_PASSWORD,
      APP_VERSION: process.env.APP_VERSION,
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
      SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    }),
);
