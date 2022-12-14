import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import DefaultConfig from '@app/config';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

import { AuthModule } from '@app/domain/auth/auth.module';
import { UsersModule } from '@app/domain/users/users.module';

import {
  AllExceptionFilter,
  LifecycleService,
  LoggerMiddleware,
  ResponseTransformerInterceptor,
} from '@app/infra';
import { getNodeEnv } from '@app/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DefaultConfig],
      envFilePath: [`${__dirname}/config/env/.${getNodeEnv()}.env`],
      isGlobal: true,
      cache: true,
    }),
    UsersModule,
    AuthModule,
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
