import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service.js';

import { BasicAuthStrategy } from './basic-auth.strategy.js';
import { JwtAuthStrategy } from './jwt-auth.strategy.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { GoogleStrategy } from './google.strategy.js';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow('JWT_EXPIRE_TIME'),
        },
      }),
    }),
  ],
  providers: [AuthService, BasicAuthStrategy, JwtAuthStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
