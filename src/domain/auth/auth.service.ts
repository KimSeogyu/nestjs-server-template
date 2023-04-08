import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { createHashedPassword } from '../users/user.entity.js';
import { UsersService } from '../users/users.service.js';
import { SignUpDto } from './auth.zod.js';
import { SocialAccountService } from '../social-accounts/social-account.service.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private socialAccountService: SocialAccountService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne({ username });
    const privateData = await this.usersService.findSaltAndPasswordByUsername({
      username,
    });

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
    const user = await this.usersService.findOne({
      username: userDto.username,
    });
    if (user)
      throw new BadRequestException(
        `USERNAME IS NOT UNIQUE, found ${JSON.stringify(user)}`,
      );

    return this.usersService.create(userDto);
  }

  async googleLogin(req: {
    user: { id: string; email: string; lastName: string; firstName: string };
  }) {
    if (!req.user) {
      throw new UnauthorizedException(`Can't get google user`);
    }

    const findOneResult = await this.socialAccountService.findOne({
      provider: 'google',
      providerId: req.user.id,
    });
    if (findOneResult?.user) {
      return this.login({
        username: findOneResult.user.username,
        id: findOneResult.user.id,
      });
    }

    const socialAccount = await this.socialAccountService.save(
      req.user.id,
      req.user.email,
      `${req.user.lastName} ${req.user.firstName}`,
      'google',
    );
    return this.login({
      username: socialAccount.user.username,
      id: socialAccount.user.id,
    });
  }

  async refresh(refreshToken: string, userId: number) {
    const user = await this.usersService.findOne({ id: userId });
    if (!user) {
      throw new BadRequestException(`NOT FOUND USER, id=${userId}`);
    }

    return (await bcrypt.compare(refreshToken, user.refreshToken))
      ? user
      : null;
  }
}
