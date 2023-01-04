import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import {
  createHashedPassword,
  UserEntity,
} from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './zod/auth.zod';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    const userPrivData = await this.usersService.findSaltAndPasswordByUsername(
      username,
    );

    if (!user || !userPrivData) throw new UnauthorizedException();
    const hashed = await createHashedPassword(password, userPrivData.salt);

    if (hashed.password !== userPrivData.password) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async signUp(user: SignUpDto) {
    return this.usersService.create(user);
  }

  async login(user: Partial<UserEntity>) {
    const { username, id } = user;

    return {
      accessToken: this.jwtService.sign({ username, id }),
    };
  }
}
