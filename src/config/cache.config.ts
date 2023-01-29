import { registerAs } from '@nestjs/config';
import { CACHE_CONFIG_KEY } from '../constants/index.js';
import { redisStore } from 'cache-manager-redis-store';
import { CacheConfigSchema } from './config.zod.js';

export const cacheConfig = registerAs(CACHE_CONFIG_KEY, async () =>
  CacheConfigSchema.parseAsync({
    host: process.env.CACHE_HOST,
    port: Number(process.env.CACHE_PORT),
    ttl: Number(process.env.CACHE_TTL),
    store: redisStore,
  }),
);
