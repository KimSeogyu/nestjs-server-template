import { DatabaseModule } from '../../../src/database/database.module.js';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../../src/domain/users/entities/user.entity.js';
import { UsersController } from '../../../src/domain/users/users.controller.js';
import { UsersRepository } from '../../../src/domain/users/users.repository.js';
import { UsersService } from '../../../src/domain/users/users.service.js';
import {
  MysqlDatasourceKey,
  UserRepositoryKey,
} from '../../../src/constants/index.js';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule.register()],
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: UserRepositoryKey,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(UserEntity),
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
