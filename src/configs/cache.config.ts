import { ConfigModule, registerAs } from '@nestjs/config';
import { CACHE_CONFIG_KEY, APP_MODE } from '../common/constants.js';
import { redisStore } from 'cache-manager-redis-store';
import { CacheConfigSchema, CacheConfigSchemaType } from './config.zod.js';
import { z } from 'zod';

export const cacheConfig = registerAs(
  CACHE_CONFIG_KEY,
  async (): Promise<CacheConfigSchemaType> => {
    await ConfigModule.envVariablesLoaded;
    if (process.env.NODE_ENV !== APP_MODE.Test) {
      return CacheConfigSchema.parseAsync({
        ...process.env,
        store: redisStore,
      });
    } else {
      return {
        ttl: z.coerce.number().parse(process.env.CACHE_TTL || 5),
        store: 'memory',
      };
    }
  },
);
