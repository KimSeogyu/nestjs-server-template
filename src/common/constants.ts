export const USER_REPOSITORY_KEY = 'repository.user';
export const WALLET_REPOSITORY_KEY = 'repository.wallet';
export const SOCIAL_ACCOUNT_REPOSITORY_KEY = 'repository.social_account';
export const ORDER_REPOSITORY_KEY = 'repository.order';
export const MYSQL_DATASOURCE_KEY = 'datasource.mysql';
export const DB_CONFIG_KEY = 'config.database';
export const CACHE_CONFIG_KEY = 'config.cache';

export enum EnvMode {
  Local = 'local',
  Dev = 'dev',
  Prod = 'prod',
  Test = 'test',
}

let _AppMode = process.env.NODE_ENV?.toLowerCase();

if (_AppMode === 'local') {
  _AppMode = EnvMode.Local;
} else if (
  _AppMode === 'dev' ||
  _AppMode === 'develop' ||
  _AppMode === 'development'
) {
  _AppMode = EnvMode.Dev;
} else if (
  _AppMode === 'prd' ||
  _AppMode === 'prod' ||
  _AppMode === 'production'
) {
  _AppMode = EnvMode.Prod;
} else {
  _AppMode = EnvMode.Test;
}

export const AppMode = _AppMode as EnvMode;

export const DEFAULT_ISOLATION_LEVEL:
  | 'READ UNCOMMITTED'
  | 'READ COMMITTED'
  | 'REPEATABLE READ'
  | 'SERIALIZABLE' =
  AppMode == EnvMode.Local ? 'SERIALIZABLE' : 'REPEATABLE READ';
