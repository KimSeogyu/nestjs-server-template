import { registerAs } from '@nestjs/config';
import { AppMode, CACHE_CONFIG_KEY, EnvMode } from '../common/constants.js';
import { redisStore } from 'cache-manager-redis-store';
import { CacheConfigSchema, CacheConfigSchemaType } from './config.zod.js';

export const cacheConfig = registerAs(
  CACHE_CONFIG_KEY,
  async (): Promise<CacheConfigSchemaType> => {
    if (AppMode === EnvMode.Test) {
      return { ttl: Number(process.env.CACHE_TTL), store: 'memory' };
    }
    return CacheConfigSchema.parseAsync({
      host: process.env.CACHE_HOST,
      port: Number(process.env.CACHE_PORT),
      ttl: Number(process.env.CACHE_TTL),
      store: redisStore,
    });
  },
);
