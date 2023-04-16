import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { BasicStrategy } from 'passport-http';
import { AuthService } from '../auth.service.js';
import { createHashedPassword, User } from '../../users/user.entity.js';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  public validate = async (
    username: string,
    password: string,
  ): Promise<User> => {
    const user = await this.authService.validateUser({
      username,
    });

    if (user === null) {
      throw new UnauthorizedException(
        `NOT FOUND USER, username=${username} password=${password}`,
      );
    }

    const privateData = await this.authService.findSecretValues({
      username,
    });

    if (user === null || privateData === null)
      throw new UnauthorizedException(`INVALID USERNAME, username=${username}`);
    const hashed = await createHashedPassword(password, privateData.salt);

    if (hashed.password !== privateData.password) {
      throw new UnauthorizedException(`PASSWORD DOES NOT MATCHED`);
    }

    return user;
  };
}
