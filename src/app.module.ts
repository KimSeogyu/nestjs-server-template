import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { commonConfig } from './config/index.js';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { AuthModule } from './domain/auth/auth.module.js';
import { UsersModule } from './domain/users/users.module.js';

import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { AppCacheModule } from './cache/cache.module.js';
import { AppMode } from './constants/index.js';
import { OrderModule } from './domain/order/order.module.js';
import {
  AllExceptionFilter,
  LifecycleService,
  LoggerMiddleware,
  ResponseTransformerInterceptor,
} from './infra/index.js';
import { dbConfig } from './config/db.config.js';
import { cacheConfig } from './config/cache.config.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConfig, dbConfig, cacheConfig],
      envFilePath: [
        `${dirname(fileURLToPath(import.meta.url))}/config/env/.${AppMode}.env`,
      ],
      isGlobal: true,
      cache: true,
    }),
    UsersModule,
    AuthModule,
    OrderModule,
    AppCacheModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
