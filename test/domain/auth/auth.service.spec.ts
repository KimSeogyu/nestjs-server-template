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
import { commonConfig } from '../../../src/configs/index.js';
import { dbConfig } from '../../../src/configs/db.config.js';
import { UsersService } from '../../../src/domain/users/users.service.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { SocialAccountsModule } from '../../../src/domain/social-accounts/social-accounts.module.js';
import { databaseProviders } from '../../../src/infra/database/database.provider.js';
import { DatabaseModule } from '../../../src/infra/database/database.module.js';
import { DataSource } from 'typeorm';
import { User } from '../../../src/domain/users/user.entity.js';
import { MYSQL_DATASOURCE_KEY } from '../../../src/common/constants.js';

describe('AuthService', function () {
  let service: AuthService;
  let usersService: UsersService;
  let dataSource: DataSource;

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
            )}/../../../src/configs/env/.${process.env.NODE_ENV}.env`,
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
        DatabaseModule.register(),
      ],
      providers: [
        AuthService,
        BasicAuthStrategy,
        JwtAuthStrategy,
        ...databaseProviders,
      ],
      controllers: [AuthController],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    dataSource = module.get<DataSource>(MYSQL_DATASOURCE_KEY);
  });

  afterEach(async () => {
    await dataSource.getRepository(User).clear();
  });

  it('유저 검사 (BasicAuth) 유저이름이 다른 경우', async () => {
    await service
      .validateUser({ username: 'hello', password: '1234' })
      .catch((e) => {
        expect(e.message).eq(`INVALID USERNAME, username=hello`);
      });
  });

  it('유저검사 (BasicAuth) 통과 케이스', async () => {
    const dto = { username: 'hello' };
    await usersService.save(dto);
    const userEntity = await service.validateUser({
      username: dto.username,
    });
    expect(userEntity.username).eq(dto.username);
  });
});
