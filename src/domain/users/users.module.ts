import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { UsersRepository } from './users.repository.js';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity.js';
import { DatabaseModule } from '../../database/database.module.js';
import { databaseProviders } from '../../database/database.provider.js';
import {
  MysqlDatasourceKey,
  UserRepositoryKey,
} from '../../constants/index.js';

@Module({
  imports: [DatabaseModule.register()],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    ...databaseProviders,
    {
      provide: UserRepositoryKey,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: [MysqlDatasourceKey],
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
