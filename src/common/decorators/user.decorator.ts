import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { z } from 'zod';

export function userIdHandler(_data: unknown, context: ExecutionContext) {
  const userId = context.switchToHttp().getRequest().headers['x-user-id'];
  return z.number().parse(userId);
}

export const UserId = createParamDecorator(userIdHandler);

export function userHandler(_data: unknown, context: ExecutionContext) {
  const user = context.switchToHttp().getRequest().user;
  if (!user) {
    throw new UnauthorizedException(`Can't get user`);
  }
  return user;
}

export const CurrentJwtUser = createParamDecorator(userHandler);
export type CurrentJwtUserType = {
  username: string;
  id: number;
  iat: number;
  exp: number;
};

export const CurrentGoogleUser = createParamDecorator(userHandler);
export type CurrentGoogleUserType = {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
};
