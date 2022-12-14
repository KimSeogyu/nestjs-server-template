import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

export const RequestId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const requestId = context.switchToHttp().getRequest().headers[
      'x-request-id'
    ];
    if (!requestId) {
      throw new UnauthorizedException('Cannot find User ID');
    }

    if (!isUUID(requestId, '4')) {
      throw new UnauthorizedException('Invalid Uuid');
    }

    return requestId as string;
  },
);
