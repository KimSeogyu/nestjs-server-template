import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

export function requestIdHandler(_data: unknown, context: ExecutionContext) {
  const requestId = context.switchToHttp().getRequest().headers['x-request-id'];
  if (!requestId || !isUUID(requestId, '4')) {
    throw new UnauthorizedException('Invalid Uuid');
  }

  return requestId as string;
}

export const RequestId = createParamDecorator(requestIdHandler);