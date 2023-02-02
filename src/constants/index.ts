export const USER_REPOSITORY_KEY = 'repository.user';
export const ORDER_REPOSITORY_KEY = 'repository.order';
export const MYSQL_DATASOURCE_KEY = 'datasource.mysql';
export const DB_CONFIG_KEY = 'config.database';
export const CACHE_CONFIG_KEY = 'config.cache';

export const NodeEnvMap = {
  Local: 'local',
  Dev: 'dev',
  Prod: 'prod',
  Test: 'test',
} as const;

export type NodeEnvMapType = typeof NodeEnvMap[keyof typeof NodeEnvMap];

export const NODE_ENV = (() => {
  switch (process.env.NODE_ENV?.toLowerCase()) {
    case NodeEnvMap.Local:
      return NodeEnvMap.Local;
    case NodeEnvMap.Prod:
      return NodeEnvMap.Prod;
    case NodeEnvMap.Dev:
      return NodeEnvMap.Dev;
    default:
      return NodeEnvMap.Test;
  }
})();

export const DEFAULT_ISOLATION_LEVEL:
  | 'READ UNCOMMITTED'
  | 'READ COMMITTED'
  | 'REPEATABLE READ'
  | 'SERIALIZABLE' =
  NODE_ENV == NodeEnvMap.Local ? 'SERIALIZABLE' : 'REPEATABLE READ';
