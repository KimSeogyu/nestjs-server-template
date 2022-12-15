import { DatabaseModule } from '@app/database/database.module';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

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
});
