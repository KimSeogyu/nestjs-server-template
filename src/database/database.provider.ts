import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { NODE_ENV } from '@app/utils';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

export const databaseProviders = [
  {
    provide: 'MYSQL_PROVIDER',
    useFactory: async (configService: ConfigService) => {
      let dbConfig: DataSourceOptions;

      if (NODE_ENV === 'local') {
        dbConfig = {
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          logging: true,
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
