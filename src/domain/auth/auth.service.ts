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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
    private socialAccountService: SocialAccountService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne({ username });
    const privateData = await this.usersService.findSecretValues({
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

    const res = {
      accessToken: this.generateAccessToken(username, id),
      refreshToken: this.generateRefreshToken(username, id),
    };

    await this.usersService.save({
      id,
      username,
      refreshToken: await bcrypt.hash(res.refreshToken, 10),
    });

    return res;
  }

  private generateRefreshToken(username: string, id: number) {
    return this.jwtService.sign(
      { username, id },
      {
        secret: this.configService.getOrThrow('REFRESH_JWT_SECRET'),
        expiresIn: this.configService.getOrThrow('REFRESH_JWT_EXPIRATION'),
      },
    );
  }

  private generateAccessToken(username: string, id: number) {
    return this.jwtService.sign(
      { username, id },
      {
        secret: this.configService.getOrThrow('JWT_SECRET'),
        expiresIn: this.configService.getOrThrow('JWT_EXPIRE_TIME'),
      },
    );
  }

  async signup(userDto: SignUpDto) {
    const user = await this.usersService.findOne({
      username: userDto.username,
    });
    if (user)
      throw new BadRequestException(
        `USERNAME IS NOT UNIQUE, found ${JSON.stringify(user)}`,
      );

    return this.usersService.save(userDto);
  }

  async googleLogin(user: {
    id: string;
    email: string;
    lastName: string;
    firstName: string;
  }) {
    if (!user) {
      throw new UnauthorizedException(`Can't get google user`);
    }

    const findOneResult = await this.socialAccountService.findOne({
      provider: 'google',
      providerId: user.id,
    });
    if (findOneResult) {
      return this.login({
        username: findOneResult.user.username,
        id: findOneResult.user.id,
      });
    } else {
      const socialAccount = await this.saveNewSocialUser(user);
      return this.login({
        username: socialAccount!.user.username,
        id: socialAccount!.user.id,
      });
    }
  }

  private async saveNewSocialUser(user: {
    id: string;
    email: string;
    lastName: string;
    firstName: string;
  }) {
    const createdUser = await this.usersService.save({
      username: user.email,
    });
    const createdSocialAccount = await this.socialAccountService.save({
      providerId: user.id,
      email: user.email,
      provider: 'google',
      userId: createdUser.id,
    });
    const socialAccount = await this.socialAccountService.findOne({
      id: createdSocialAccount.id,
    });
    return socialAccount;
  }

  async refresh(refreshToken: string, username: string) {
    const user = await this.usersService.findOne({ username });
    if (!user) {
      throw new BadRequestException(`NOT FOUND USER, username=${username}`);
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      return null;
    }

    return {
      accessToken: this.generateAccessToken(username, user.id),
      refreshToken,
    };
  }
}
