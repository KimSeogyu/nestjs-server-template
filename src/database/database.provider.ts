import { ConfigService } from '@nestjs/config';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { MysqlDatasourceKey, NODE_ENV } from '../constants/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const databaseProviders = [
  {
    provide: MysqlDatasourceKey,
    useFactory: async (configService: ConfigService) => {
      let dbConfig: DataSourceOptions;

      if (NODE_ENV === 'local') {
        dbConfig = {
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          logging: false,
          entities: [__dirname + '/../**/*.entity.{ts,js}'],
          synchronize: true,
        };
      } else {
        dbConfig = {
          type: 'mysql',
          host: configService.getOrThrow('DATABASE_HOST'),
          port: +configService.getOrThrow('DATABASE_PORT'),
          username: configService.getOrThrow('DATABASE_USERNAME'),
          password: configService.getOrThrow('DATABASE_PASSWORD'),
          database: configService.getOrThrow('DATABASE_SCHEMA'),
          entities: [__dirname + '/../**/*.entity.{ts,js}'],
          synchronize: false,
        };
      }

      const dataSource = new DataSource(dbConfig);

      return dataSource.initialize();
    },
  },
];
