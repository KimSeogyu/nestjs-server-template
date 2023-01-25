import { DatabaseModule } from '../../../src/database/database.module.js';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { User } from '../../../src/domain/users/user.entity.js';
import { UsersController } from '../../../src/domain/users/users.controller.js';
import { UsersRepository } from '../../../src/domain/users/users.repository.js';
import { UsersService } from '../../../src/domain/users/users.service.js';
import { CreateUserDto } from '../../../src/domain/users/user.zod.js';
import { sleep } from '../../../src/utils/index.js';
import { ConfigModule } from '@nestjs/config';
import DefaultConfig from '../../../src/config/index.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  MysqlDatasourceKey,
  NODE_ENV,
  UserRepositoryKey,
} from '../../../src/constants/index.js';

describe('UsersController', () => {
  let controller: UsersController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
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

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).instanceOf(UsersController);
  });

  const createUser = async () => {
    const dto = new CreateUserDto();
    dto.username = 'test';
    dto.password = '1234';
    const result = await controller.create(dto);
    expect(result.username).eq(dto.username);
    expect(result).not.haveOwnProperty('password');
    return result;
  };

  it('유저 생성', createUser);

  it('유저 목록 조회', async () => {
    await createUser();
    const userEntities = await controller.findAll();
    for (const userEntity of userEntities) {
      expect(userEntity).instanceOf(User);
    }
  });

  it('유저 목록 조회 캐싱 테스트', async () => {
    await createUser();
    await controller.findAll();
    await sleep({ seconds: 1 });
    await controller.findAll();
  });

  it('유저 수정', async () => {
    const { id } = await createUser();

    const result = await controller.updatePassword(id, { password: '5678' });
    expect(result.success).eq(true);
  });
});
