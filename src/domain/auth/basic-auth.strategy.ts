import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { BasicStrategy } from 'passport-http';
import { AuthService } from './auth.service';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  public validate = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(
        `NOT FOUND USER, username=${username} password=${password}`,
      );
    }

    return true;
  };
}
