import {
  CACHE_MANAGER,
  CacheModule,
  DynamicModule,
  Inject,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import {
  DiscoveryModule,
  DiscoveryService,
  MetadataScanner,
  Reflector,
} from '@nestjs/core';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { APP_CACHE_METADATA, AppCacheOption } from './cache.zod.js';
import { redisStore } from 'cache-manager-ioredis-yet';

@Module({
  imports: [
    DiscoveryModule,
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        host: configService.getOrThrow('CACHE_HOST'),
        port: +configService.getOrThrow('CACHE_PORT'),
        ttl: +configService.getOrThrow('CACHE_TTL'),
        store: await redisStore(),
      }),
    }),
  ],
})
export class AppCacheModule implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private readonly cacheManger: Cache,
  ) {}

  static forRoot(): DynamicModule {
    return {
      module: AppCacheModule,
      global: true,
    };
  }

  onModuleInit() {
    this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .forEach(({ instance }) => {
        this.metadataScanner.scanFromPrototype(
          instance,
          Object.getPrototypeOf(instance),
          this.registerCache(instance),
        );
      });
  }

  registerCache(instance: any) {
    return (methodName: string) => {
      const methodRef = instance[methodName];
      const metadata: AppCacheOption = this.reflector.get(
        APP_CACHE_METADATA,
        methodRef,
      );
      if (!metadata) return;
      const cacheKeyPrefix = `${instance.constructor.name}.${methodName}`;
      const originalMethod = (...args: unknown[]) =>
        methodRef.call(instance, ...args);

      instance[methodName] = async (...args: unknown[]) => {
        let cacheKey: string;
        if (metadata.key) {
          cacheKey = cacheKeyPrefix + metadata.key;
        } else if (metadata.fields?.length) {
          cacheKey = cacheKeyPrefix + '.' + metadata.fields.join('.');
        } else {
          const cacheKeySuffix = args.length ? args.join('.') : '';
          cacheKey = cacheKeyPrefix + cacheKeySuffix;
        }
        const cachedData = await this.cacheManger.get(cacheKey);
        if (!!cachedData) {
          return cachedData;
        }

        const data = await originalMethod(...args);
        await this.cacheManger.set(cacheKey, data, metadata.ttl);

        return data;
      };
    };
  }
}
