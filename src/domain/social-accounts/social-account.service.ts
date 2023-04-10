import { Injectable } from '@nestjs/common';
import { SocialAccountRepository } from './social-account.repository.js';
import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { SocialAccount } from './social-account.entity.js';

@Injectable()
export class SocialAccountService {
  constructor(
    private readonly socialAccountRepository: SocialAccountRepository,
  ) {}

  save(socialAccount: DeepPartial<SocialAccount>) {
    return this.socialAccountRepository.save(socialAccount);
  }

  findOne(socialAccount: FindOptionsWhere<SocialAccount>) {
    return this.socialAccountRepository.findOne(socialAccount);
  }
}
