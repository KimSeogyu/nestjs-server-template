import { Injectable } from '@nestjs/common';
import { SocialAccountRepository } from './social-account.repository.js';
import { FindOptionsWhere } from 'typeorm';
import { SocialAccount } from './social-account.entity.js';

@Injectable()
export class SocialAccountService {
  constructor(
    private readonly socialAccountRepository: SocialAccountRepository,
  ) {}

  save(providerId: string, email: string, username: string, provider: string) {
    return this.socialAccountRepository.save({
      providerId: providerId,
      email: email,
      provider: provider,
      user: { username: username },
    });
  }

  findOne(socialAccount: FindOptionsWhere<SocialAccount>) {
    return this.socialAccountRepository.findOne(socialAccount);
  }
}
