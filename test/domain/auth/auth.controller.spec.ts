import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/domain/auth/auth.controller.js';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../../src/domain/users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../../../src/domain/auth/auth.service.js';
import { BasicAuthStrategy } from '../../../src/domain/auth/strategies/basic-auth.strategy.js';
import { JwtAuthStrategy } from '../../../src/domain/auth/strategies/jwt-auth.strategy.js';
import { expect } from 'chai';
import { commonConfig } from '../../../src/config/index.js';
import { dbConfig } from '../../../src/config/db.config.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { SocialAccountsModule } from '../../../src/domain/social-accounts/social-accounts.module.js';

describe('AuthController', function () {
  let controller: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        SocialAccountsModule,
        UsersModule,
        ConfigModule.forRoot({
          load: [commonConfig, dbConfig],
          envFilePath: [
            `${dirname(
              fileURLToPath(import.meta.url),
            )}/../../../src/config/env/.${process.env.NODE_ENV}.env`,
          ],
          isGlobal: true,
        }),
        JwtModule.registerAsync({
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
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', function () {
    expect(controller).instanceOf(AuthController);
  });
});
