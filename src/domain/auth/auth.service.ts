import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { createHashedPassword } from '../users/entities/user.entity.js';
import { UsersService } from '../users/users.service.js';
import { SignUpDto } from './zod/auth.zod.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    const privateData = await this.usersService.findSaltAndPasswordByUsername(
      username,
    );

    if (!user || !privateData)
      throw new UnauthorizedException(`INVALID USERNAME, username=${username}`);
    const hashed = await createHashedPassword(password, privateData.salt);

    if (hashed.password !== privateData.password) {
      throw new UnauthorizedException(`PASSWORD DOES NOT MATCHED`);
    }
    return user;
  }

  async login(user: { username: string; id: number }) {
    const { username, id } = user;

    return {
      accessToken: this.jwtService.sign({ username, id }),
    };
  }

  async signup(userDto: SignUpDto) {
    const user = await this.usersService.findOneByUsername(userDto.username);
    if (user) throw new BadRequestException('USERNAME IS NOT UNIQUE');

    return this.usersService.create(userDto);
  }
}
