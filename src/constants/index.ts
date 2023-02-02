export const USER_REPOSITORY_KEY = 'repository.user';
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

export const AppMode = (() => {
  switch (process.env.NODE_ENV?.toLowerCase()) {
    case EnvMode.Local:
      return EnvMode.Local;
    case EnvMode.Prod:
      return EnvMode.Prod;
    case EnvMode.Dev:
      return EnvMode.Dev;
    default:
      return EnvMode.Test;
  }
})();

export const DEFAULT_ISOLATION_LEVEL:
  | 'READ UNCOMMITTED'
  | 'READ COMMITTED'
  | 'REPEATABLE READ'
  | 'SERIALIZABLE' =
  AppMode == EnvMode.Local ? 'SERIALIZABLE' : 'REPEATABLE READ';
