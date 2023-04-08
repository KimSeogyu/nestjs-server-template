import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('REFRESH_JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: { id: number; username: string }) {
    const refreshToken = request.headers?.authorization?.split(' ')[1];
    if (!refreshToken) {
      throw new BadRequestException(`refresh token required`);
    }

    const refreshed = await this.authService.refresh(
      refreshToken,
      payload.username,
    );
    if (!refreshed) {
      throw new UnauthorizedException(
        `NOT FOUND USER, username=${payload.username} id=${payload.id}`,
      );
    }
    return refreshed;
  }
}
