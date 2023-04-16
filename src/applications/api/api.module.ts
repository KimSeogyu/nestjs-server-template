import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { commonConfig } from '../../config/index.js';

import { AuthModule } from '../../domain/auth/auth.module.js';
import { UsersModule } from '../../domain/users/users.module.js';

import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { AppCacheModule } from '../../infra/cache/cache.module.js';
import { OrderModule } from '../../domain/order/order.module.js';
import { dbConfig } from '../../config/db.config.js';
import { cacheConfig } from '../../config/cache.config.js';
import { HealthModule } from '../../domain/health/health.module.js';
import { LoggerMiddleware } from '../../common/middlewares/logger.middlewares.js';
import { ResponseTransformerInterceptor } from '../../common/interceptors/response-transformer.interceptor.js';
import { AllExceptionFilter } from '../../common/filters/all-exception.filter.js';
import { LifecycleService } from '../../common/lifecycle/lifecycle.service.js';
import { WalletModule } from '../../domain/wallets/wallet.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConfig, dbConfig, cacheConfig],
      envFilePath: [
        `${dirname(fileURLToPath(import.meta.url))}/../../config/env/.${
          process.env.NODE_ENV
        }.env`,
      ],
      isGlobal: true,
      cache: true,
    }),
    UsersModule,
    AuthModule,
    OrderModule,
    HealthModule,
    AppCacheModule.forRoot(),
    WalletModule,
  ],
  providers: [
    LifecycleService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformerInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
