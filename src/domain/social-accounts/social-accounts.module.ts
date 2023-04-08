import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infra/database/database.module.js';
import { SocialAccountRepository } from './social-account.repository.js';
import { databaseProviders } from '../../infra/database/database.provider.js';
import {
  MYSQL_DATASOURCE_KEY,
  SOCIAL_ACCOUNT_REPOSITORY_KEY,
} from '../../common/constants.js';
import { DataSource } from 'typeorm';
import { SocialAccount } from './social-account.entity.js';
import { SocialAccountService } from './social-account.service.js';

@Module({
  imports: [DatabaseModule.register()],
  providers: [
    SocialAccountService,
    SocialAccountRepository,
    ...databaseProviders,
    {
      inject: [MYSQL_DATASOURCE_KEY],
      provide: SOCIAL_ACCOUNT_REPOSITORY_KEY,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(SocialAccount),
    },
  ],
  exports: [SocialAccountService],
})
export class SocialAccountsModule {}
