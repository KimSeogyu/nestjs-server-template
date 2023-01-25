import { type IsolationLevel } from 'typeorm/driver/types/IsolationLevel.js';

export const UserRepositoryKey = 'USER_REPOSITORY';
export const OrderRepositoryKey = 'ORDER_REPOSITORY';
export const MysqlDatasourceKey = 'MYSQL_PROVIDER';

export function getNodeEnv(): 'local' | 'dev' | 'prod' | 'test' {
  switch (process.env.NODE_ENV?.toLowerCase()) {
    case 'local':
      return 'local';
    case 'test':
      return 'test';
    case 'dev':
    case 'develop':
    case 'development':
      return 'dev';
    case 'prd':
    case 'prod':
    case 'production':
      return 'prod';
    default:
      return 'test';
  }
}

export const NODE_ENV: 'local' | 'dev' | 'prod' | 'test' = getNodeEnv();

export const DEFAULT_ISOLATION_LEVEL: IsolationLevel =
  NODE_ENV == 'local' ? 'SERIALIZABLE' : 'REPEATABLE READ';
