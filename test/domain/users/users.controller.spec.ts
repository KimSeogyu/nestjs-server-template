import { DatabaseModule } from '../../../src/database/database.module.js';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { User } from '../../../src/domain/users/user.entity.js';
import { UsersController } from '../../../src/domain/users/users.controller.js';
import { UsersRepository } from '../../../src/domain/users/users.repository.js';
import { UsersService } from '../../../src/domain/users/users.service.js';
import { CreateUserDto } from '../../../src/domain/users/user.zod.js';
import { ConfigModule } from '@nestjs/config';
import { commonConfig } from '../../../src/config/index.js';
import { dbConfig } from '../../../src/config/db.config.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { BadRequestException } from '@nestjs/common';
import {
  MYSQL_DATASOURCE_KEY,
  AppMode,
  USER_REPOSITORY_KEY,
} from '../../../src/constants/index.js';

describe('UsersController', () => {
  let controller: UsersController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        DatabaseModule.register(),
        ConfigModule.forRoot({
          load: [commonConfig, dbConfig],
          envFilePath: [
            `${dirname(
              fileURLToPath(import.meta.url),
            )}/../../../src/config/env/.${AppMode}.env`,
          ],
          isGlobal: true,
        }),
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: USER_REPOSITORY_KEY,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(User),
          inject: [MYSQL_DATASOURCE_KEY],
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
    dto.password = '12345aA@';
    const result = await controller.create(dto);
    expect(result.username).eq(dto.username);
    expect(result).not.haveOwnProperty('password');
    return result;
  };

  it('[유저 생성] 성공', createUser);

  it('[유저 목록 조회] 1명 생성 후 1명 조회되는지 확인', async () => {
    await createUser();
    const userEntities = await controller.findAll({});
    for (const userEntity of userEntities) {
      expect(userEntity).instanceOf(User);
    }
  });

  // it('유저 목록 조회 캐싱 테스트', async () => {
  //   await createUser();
  //   await controller.findAll();
  //   await sleep({ seconds: 1 });
  //   await controller.findAll();
  // });

  it('[비밀번호 수정] 성공', async () => {
    const { id } = await createUser();

    const result = await controller.updatePassword(
      { id },
      {
        password: '22345aA@',
        confirmPassword: '22345aA@',
        currentPassword: '12345aA@',
      },
    );
    expect(result.success).eq(true);
  });

  it('[비밀번호 수정 실패] 새로운 비밀번호 불일치', async () => {
    const { id } = await createUser();

    await controller
      .updatePassword(
        { id },
        {
          password: '22345aA@',
          confirmPassword: '22345aA',
          currentPassword: '12345aA@',
        },
      )
      .catch((e) => {
        expect(e).instanceOf(BadRequestException);
        expect(e.message).eq('Passwords are not same');
      });
  });

  it('[비밀번호 수정 실패] 기존 비밀번호와 일치', async () => {
    const { id } = await createUser();

    await controller
      .updatePassword(
        { id },
        {
          password: '12345aA@',
          confirmPassword: '12345aA@',
          currentPassword: '12345aA@',
        },
      )
      .catch((e) => {
        expect(e).instanceOf(BadRequestException);
        expect(e.message).eq('Password is same as current one');
      });
  });

  it('[비밀번호 수정 실패] 기존 비밀번호 불일치', async () => {
    const { id } = await createUser();

    await controller
      .updatePassword(
        { id },
        {
          password: '12345aA@',
          confirmPassword: '12345aA@',
          currentPassword: '22345aA@',
        },
      )
      .catch((e) => {
        expect(e).instanceOf(BadRequestException);
        expect(e.message).eq('Current Password is wrong');
      });
  });
});
