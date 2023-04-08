import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service.js';

import { BasicAuthStrategy } from './strategies/basic-auth.strategy.js';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { GoogleStrategy } from './strategies/google.strategy.js';
import { SessionSerializer } from './session.serializer.js';
import { SocialAccountsModule } from '../social-accounts/social-accounts.module.js';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    UsersModule,
    SocialAccountsModule,
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
  providers: [
    AuthService,
    JwtService,
    BasicAuthStrategy,
    JwtAuthStrategy,
    GoogleStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
