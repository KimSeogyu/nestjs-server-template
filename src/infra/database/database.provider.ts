import { DataSource } from 'typeorm';
import { MYSQL_DATASOURCE_KEY } from '../../constants/index.js';
import { ConfigType } from '@nestjs/config';
import { dbConfig } from '../../config/db.config.js';

export const databaseProviders = [
  {
    provide: MYSQL_DATASOURCE_KEY,
    inject: [dbConfig.KEY],
    useFactory: (config: ConfigType<typeof dbConfig>) => {
      return new DataSource(config).initialize();
    },
  },
];
