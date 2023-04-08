import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  MYSQL_DATASOURCE_KEY,
  SOCIAL_ACCOUNT_REPOSITORY_KEY,
} from '../../common/constants.js';
import { SocialAccount } from './social-account.entity.js';

@Injectable()
export class SocialAccountRepository {
  constructor(
    @Inject(SOCIAL_ACCOUNT_REPOSITORY_KEY)
    private socialAccountRepository: Repository<SocialAccount>,
    @Inject(MYSQL_DATASOURCE_KEY)
    private mysqlProvider: DataSource,
  ) {}

  saveSocialAccount(
    providerId: string,
    email: string,
    username: string,
    provider: string,
  ) {
    return this.socialAccountRepository.save({
      providerId: providerId,
      email: email,
      provider: provider,
      user: {
        username: username,
      },
    });
  }
}
