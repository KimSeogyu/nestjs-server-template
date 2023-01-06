import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';

export const UserRepositoryKey = 'USER_REPOSITORY';

export const MysqlDatasourceKey = 'MYSQL_PROVIDER';

export function getNodeEnv(): 'local' | 'dev' | 'prod' {
  switch (process.env.NODE_ENV?.toLowerCase()) {
    case 'local':
    case 'test':
      return 'local';
    case 'dev':
    case 'develop':
    case 'development':
      return 'dev';
    case 'prd':
    case 'prod':
    case 'production':
      return 'prod';
    default:
      return 'local';
  }
}

export const NODE_ENV: 'local' | 'dev' | 'prod' = getNodeEnv();

export const DEFAULT_ISOLATION_LEVEL: IsolationLevel =
  NODE_ENV == 'local' ? 'SERIALIZABLE' : 'REPEATABLE READ';
