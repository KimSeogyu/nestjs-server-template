import { DatabaseModule } from '../../../src/infra/database/database.module.js';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { UsersController } from '../../../src/domain/users/users.controller.js';
import { UsersRepository } from '../../../src/domain/users/users.repository.js';
import { UsersService } from '../../../src/domain/users/users.service.js';
import {
  MYSQL_DATASOURCE_KEY,
  SOCIAL_ACCOUNT_REPOSITORY_KEY,
  USER_REPOSITORY_KEY,
} from '../../../src/common/constants.js';
import { ConfigModule } from '@nestjs/config';
import { commonConfig } from '../../../src/config/index.js';
import { dbConfig } from '../../../src/config/db.config.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { databaseProviders } from '../../../src/infra/database/database.provider.js';
import { SocialAccountRepository } from '../../../src/domain/social-accounts/social-account.repository.js';
import { User } from '../../../src/domain/users/user.entity.js';
import { SocialAccount } from '../../../src/domain/social-accounts/social-account.entity.js';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule.register(),
        ConfigModule.forRoot({
          load: [commonConfig, dbConfig],
          envFilePath: [
            `${dirname(
              fileURLToPath(import.meta.url),
            )}/../../../src/config/env/.${process.env.NODE_ENV}.env`,
          ],
          isGlobal: true,
        }),
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersRepository,
        SocialAccountRepository,
        ...databaseProviders,
        {
          provide: USER_REPOSITORY_KEY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(User),
          inject: [MYSQL_DATASOURCE_KEY],
        },
        {
          inject: [MYSQL_DATASOURCE_KEY],
          provide: SOCIAL_ACCOUNT_REPOSITORY_KEY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(SocialAccount),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).instanceOf(UsersService);
  });
});
