import { Inject, Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, DeepPartial, Repository } from 'typeorm';
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

  save(socialAccount: DeepPartial<SocialAccount>) {
    return this.socialAccountRepository.save(socialAccount);
  }

  findOne(socialAccount: FindOptionsWhere<SocialAccount>) {
    return this.socialAccountRepository.findOne({
      where: socialAccount,
      relations: { user: true },
    });
  }
}
