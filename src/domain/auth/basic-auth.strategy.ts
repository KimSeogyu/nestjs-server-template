import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { BasicStrategy } from 'passport-http';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
  private readonly logger = new Logger(BasicAuthStrategy.name);
  private USERNAME: string;
  private PASSWORD: string;
  constructor(private readonly configService: ConfigService) {
    super();

    this.USERNAME = configService.getOrThrow('AUTH_USERNAME').toString();
    this.PASSWORD = configService.getOrThrow('AUTH_PASSWORD').toString();
  }

  public validate = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    if (this.USERNAME !== username || this.PASSWORD !== password) {
      this.logger.error(
        `Auth failed, username:${username} password:${password}`,
      );
      throw new UnauthorizedException('Invalid auth user');
    }
    return true;
  };
}
