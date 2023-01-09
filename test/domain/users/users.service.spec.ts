import { DatabaseModule } from '@app/database/database.module';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { UserEntity } from '@app/domain/users/entities/user.entity';
import { UsersController } from '@app/domain/users/users.controller';
import { UsersRepository } from '@app/domain/users/users.repository';
import { UsersService } from '@app/domain/users/users.service';
import { MysqlDatasourceKey, UserRepositoryKey } from '@app/constants';
import { sleep } from '@app/utils';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
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
