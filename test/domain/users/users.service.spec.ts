import { DatabaseModule } from '../../../src/database/database.module.js';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { User } from '../../../src/domain/users/user.entity.js';
import { UsersController } from '../../../src/domain/users/users.controller.js';
import { UsersRepository } from '../../../src/domain/users/users.repository.js';
import { UsersService } from '../../../src/domain/users/users.service.js';
import {
  MysqlDatasourceKey,
  NODE_ENV,
  UserRepositoryKey,
} from '../../../src/constants/index.js';
import { ConfigModule } from '@nestjs/config';
import DefaultConfig from '../../../src/config/index.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule.register(),
        ConfigModule.forRoot({
          load: [DefaultConfig],
          envFilePath: [
            `${dirname(
              fileURLToPath(import.meta.url),
            )}/../../../src/config/env/.${NODE_ENV}.env`,
          ],
          isGlobal: true,
        }),
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: UserRepositoryKey,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(User),
          inject: [MysqlDatasourceKey],
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).instanceOf(UsersService);
  });
});
