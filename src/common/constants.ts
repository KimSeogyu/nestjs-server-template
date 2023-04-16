export const USER_REPOSITORY_KEY = 'repository.user';
export const WALLET_REPOSITORY_KEY = 'repository.wallet';
export const SOCIAL_ACCOUNT_REPOSITORY_KEY = 'repository.social_account';
export const ORDER_REPOSITORY_KEY = 'repository.orders';
export const MYSQL_DATASOURCE_KEY = 'datasource.mysql';
export const DB_CONFIG_KEY = 'configs.database';
export const CACHE_CONFIG_KEY = 'configs.cache';

export enum APP_MODE {
  LOCAL = 'local',
  DEV = 'dev',
  PROD = 'prod',
  Test = 'test',
}

export const DEFAULT_ISOLATION_LEVEL:
  | 'READ UNCOMMITTED'
  | 'READ COMMITTED'
  | 'REPEATABLE READ'
  | 'SERIALIZABLE' =
  process.env.NODE_ENV == APP_MODE.LOCAL ? 'SERIALIZABLE' : 'REPEATABLE READ';
