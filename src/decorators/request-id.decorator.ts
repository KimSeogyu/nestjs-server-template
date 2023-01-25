import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { z } from 'zod';

export function requestIdHandler(_data: unknown, context: ExecutionContext) {
  const requestId = context.switchToHttp().getRequest().headers['x-request-id'];
  return z.string().uuid().parse(requestId);
}

export const RequestId = createParamDecorator(requestIdHandler);
