import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service.js';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: { id: number; username: string }) {
    const refreshToken = request.body?.refreshToken;
    console.log(payload);
    const user = await this.authService.refresh(refreshToken, payload.username);
    if (!user) {
      throw new UnauthorizedException(
        `NOT FOUND USER, username=${payload.username} id=${payload.id}`,
      );
    }
    user.refreshToken = refreshToken;
    return user;
  }
}
