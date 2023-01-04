import { DatabaseModule } from '@app/database/database.module';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { UserEntity } from '@app/domain/users/entities/user.entity';
import { UsersController } from '@app/domain/users/users.controller';
import { UsersRepository } from '@app/domain/users/users.repository';
import { UsersService } from '@app/domain/users/users.service';
import { CreateUserDto } from '@app/domain/users/zod/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: 'USER_REPOSITORY',
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(UserEntity),
          inject: ['DATA_SOURCE'],
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
      expect(userEntity).instanceOf(UserEntity);
    }
  });

  it('유저 수정', async () => {
    const { id } = await createUser();

    const result = await controller.update(id, { password: '5678' });
    expect(result).eq(true);
  });
});
