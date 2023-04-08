import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { UsersRepository } from './users.repository.js';
import { DataSource } from 'typeorm';
import { SocialAccount, User } from './user.entity.js';
import { DatabaseModule } from '../../infra/database/database.module.js';
import { databaseProviders } from '../../infra/database/database.provider.js';
import {
  MYSQL_DATASOURCE_KEY,
  SOCIAL_ACCOUNT_REPOSITORY_KEY,
  USER_REPOSITORY_KEY,
} from '../../common/constants.js';
import { SocialAccountRepository } from './social-account.repository.js';

@Module({
  imports: [DatabaseModule.register()],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    SocialAccountRepository,
    ...databaseProviders,
    {
      inject: [MYSQL_DATASOURCE_KEY],
      provide: USER_REPOSITORY_KEY,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    },
    {
      inject: [MYSQL_DATASOURCE_KEY],
      provide: SOCIAL_ACCOUNT_REPOSITORY_KEY,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(SocialAccount),
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
