import { registerAs } from '@nestjs/config';
import { APP_MODE, DB_CONFIG_KEY } from '../common/constants.js';
import { DataSourceOptions } from 'typeorm';
import { DbConfigSchema } from './config.zod.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const dbConfig = registerAs(
  DB_CONFIG_KEY,
  async (): Promise<DataSourceOptions> => {
    if (process.env.NODE_ENV !== APP_MODE.Test) {
      const env = await DbConfigSchema.parseAsync(process.env);
      return {
        type: 'mysql',
        host: env['DATABASE_HOST'],
        port: env['DATABASE_PORT'],
        username: env['DATABASE_USERNAME'],
        password: env['DATABASE_PASSWORD'],
        database: env['DATABASE_SCHEMA'],
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        namingStrategy: new SnakeNamingStrategy(),
      };
    } else {
      return {
        type: 'sqlite',
        database: ':memory:',
        logging: true,
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: true,
        dropSchema: true,
        namingStrategy: new SnakeNamingStrategy(),
      };
    }
  },
);
