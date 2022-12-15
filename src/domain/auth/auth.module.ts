import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { BasicAuthStrategy } from './basic-auth.strategy';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

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
  providers: [AuthService, BasicAuthStrategy, JwtAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
