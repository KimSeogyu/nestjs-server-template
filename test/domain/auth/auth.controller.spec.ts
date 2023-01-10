import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/domain/auth/auth.controller.js';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../../src/domain/users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../../../src/domain/auth/auth.service.js';
import { BasicAuthStrategy } from '../../../src/domain/auth/basic-auth.strategy.js';
import { JwtAuthStrategy } from '../../../src/domain/auth/jwt-auth.strategy.js';
import { expect } from 'chai';
import DefaultConfig from '../../../src/config/index.js';
import { NODE_ENV } from '../../../src/constants/index.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

describe('AuthController', function () {
  let controller: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        UsersModule,
        ConfigModule.forRoot({
          load: [DefaultConfig],
          envFilePath: [
            `${dirname(
              fileURLToPath(import.meta.url),
            )}/../../../src/config/env/.${NODE_ENV}.env`,
          ],
          isGlobal: true,
          cache: true,
        }),
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
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', function () {
    expect(controller).instanceOf(AuthController);
  });

  it('로그인', async () => {
    const req = {
      user: { username: 'hello', id: 1 },
    };
    const res = await controller.login(req);
    expect(res).haveOwnProperty('accessToken');
    expect(res.accessToken.length).greaterThan(0);
  });

  it('회원가입', async () => {
    const dto = {
      username: 'user',
      password: '1234',
    };
    const user = await controller.signUp(dto);
    expect(user.username).eq(dto.username);
    expect(user).not.haveOwnProperty('password');
  });
});
