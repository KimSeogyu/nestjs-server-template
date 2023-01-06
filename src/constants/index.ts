import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { NODE_ENV } from '@app/utils';

export const DEFAULT_ISOLATION_LEVEL: IsolationLevel =
  NODE_ENV == 'local' ? 'SERIALIZABLE' : 'REPEATABLE READ';

export const UserRepositoryKey = 'USER_REPOSITORY';

export const MysqlDatasourceKey = 'MYSQL_PROVIDER';
