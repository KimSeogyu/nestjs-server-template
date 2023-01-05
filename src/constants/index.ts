import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { APP_NODE_ENV } from '@app/utils';

export const DEFAULT_ISOLATION_LEVEL: IsolationLevel =
  APP_NODE_ENV == 'local' ? 'SERIALIZABLE' : 'REPEATABLE READ';
