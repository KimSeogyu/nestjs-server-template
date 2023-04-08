import { Injectable } from '@nestjs/common';
import { SocialAccountRepository } from './social-account.repository.js';

@Injectable()
export class SocialAccountService {
  constructor(
    private readonly socialAccountRepository: SocialAccountRepository,
  ) {}

  async saveSocialAccount(
    id: string,
    email: string,
    username: string,
    provider: string,
  ) {
    return this.socialAccountRepository.saveSocialAccount(
      id,
      email,
      username,
      provider,
    );
  }
}
