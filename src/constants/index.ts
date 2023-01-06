import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';

export const UserRepositoryKey = 'USER_REPOSITORY';

export const MysqlDatasourceKey = 'MYSQL_PROVIDER';

let _NODE_ENV: 'local' | 'dev' | 'prod';

switch (process.env.NODE_ENV?.toLowerCase()) {
  case 'local':
  case 'test':
    _NODE_ENV = 'local';
    break;
  case 'dev':
  case 'develop':
  case 'development':
    _NODE_ENV = 'dev';
    break;
  case 'prd':
  case 'prod':
  case 'production':
    _NODE_ENV = 'prod';
    break;
  default:
    _NODE_ENV = 'local';
}

export const NODE_ENV: 'local' | 'dev' | 'prod' = _NODE_ENV;

export const DEFAULT_ISOLATION_LEVEL: IsolationLevel =
  NODE_ENV == 'local' ? 'SERIALIZABLE' : 'REPEATABLE READ';
