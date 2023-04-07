import {
  CACHE_MANAGER,
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
import { Cache, caching } from 'cache-manager';
import { ConfigType } from '@nestjs/config';
import { APP_CACHE_METADATA, AppCacheOption } from './cache.zod.js';
import { cacheConfig } from '../../config/cache.config.js';

@Module({
  imports: [DiscoveryModule],
  providers: [
    {
      provide: CACHE_MANAGER,
      inject: [cacheConfig.KEY],
      useFactory: ({ store, ...config }: ConfigType<typeof cacheConfig>) =>
        caching(store, config),
    },
  ],
})
export class AppCacheModule implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER)
    private readonly cacheManger: Cache,
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
        let cacheKey: string = cacheKeyPrefix;
        if (metadata.key) {
          cacheKey += metadata.key;
        }
        if (metadata.fields?.length) {
          cacheKey += '.' + metadata.fields.join('.');
        }
        if (args.length > 0) {
          const cacheKeySuffix = args
            .map((arg) => {
              if (this.isStringifyArg(arg)) {
                return arg?.toString();
              } else if (this.isNotNullObject(arg)) {
                return Object.keys(arg as object).join('.');
              } else return '';
            })
            .join('.');
          cacheKey += '.' + cacheKeySuffix;
        }

        const cachedData = await this.cacheManger.get(cacheKey);
        if (cachedData) {
          return cachedData;
        }
        const data = await originalMethod(...args);
        this.cacheManger.set(cacheKey, data, +metadata.ttl).then();

        return data;
      };
    };
  }

  private isNotNullObject(arg: unknown) {
    return typeof arg === 'object' && arg !== null;
  }

  private isStringifyArg(arg: unknown) {
    return (
      typeof arg === 'string' ||
      typeof arg === 'number' ||
      typeof arg === 'bigint'
    );
  }
}
