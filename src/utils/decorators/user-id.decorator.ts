import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { IsNumber } from 'class-validator';

export function userIdHandler(_data: unknown, context: ExecutionContext) {
  const userId = context.switchToHttp().getRequest().headers['x-user-id'];
  if (!userId) {
    throw new UnauthorizedException('Cannot find User ID');
  }

  if (!IsNumber(userId)) {
    throw new UnauthorizedException('Invalid User ID');
  }

  return +userId;
}

export const UserId = createParamDecorator(userIdHandler);
