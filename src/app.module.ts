import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { ZodValidationPipe } from '@anatine/zod-nestjs';

import DefaultConfig from './config/index.js';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { AuthModule } from './domain/auth/auth.module.js';
import { UsersModule } from './domain/users/users.module.js';

import {
  AllExceptionFilter,
  LifecycleService,
  LoggerMiddleware,
  ResponseTransformerInterceptor,
} from './infra/index.js';
import { NODE_ENV } from './constants/index.js';
import { AppCacheModule } from './cache/cache.module.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DefaultConfig],
      envFilePath: [
        `${dirname(
          fileURLToPath(import.meta.url),
        )}/config/env/.${NODE_ENV}.env`,
      ],
      isGlobal: true,
      cache: true,
    }),
    UsersModule,
    AuthModule,
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
