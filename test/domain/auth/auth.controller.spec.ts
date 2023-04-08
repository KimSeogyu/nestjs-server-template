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
import { AppMode } from '../../../src/common/constants.js';
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
            )}/../../../src/config/env/.${AppMode}.env`,
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

  it('[로그인] 성공', async () => {
    const req = {
      user: { username: 'hello1', id: 1 },
    };
    const res = await controller.login(req);
    expect(res).haveOwnProperty('accessToken');
    expect(res.accessToken.length).greaterThan(0);
  });

  it('[회원가입] 성공', async () => {
    const dto = {
      username: 'user',
      password: '1234',
    };
    const user = await controller.signUp(dto);
    expect(user.username).eq(dto.username);
    expect(user).not.haveOwnProperty('password');
  });
});
