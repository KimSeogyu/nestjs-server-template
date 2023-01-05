import { UsersController } from '@app/domain/users/users.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@app/database/database.module';
import { UsersService } from '@app/domain/users/users.service';
import { UsersRepository } from '@app/domain/users/users.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from '@app/domain/users/entities/user.entity';
import { AuthController } from '@app/domain/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@app/domain/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '@app/domain/auth/auth.service';
import { BasicAuthStrategy } from '@app/domain/auth/basic-auth.strategy';
import { JwtAuthStrategy } from '@app/domain/auth/jwt-auth.strategy';
import { expect } from 'chai';
import DefaultConfig from '@app/config';
import { APP_NODE_ENV } from '@app/utils';

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
            `${__dirname}/../../../src/config/env/.${APP_NODE_ENV}.env`,
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
