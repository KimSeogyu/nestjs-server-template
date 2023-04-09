import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { z } from 'zod';

export function userIdHandler(_data: unknown, context: ExecutionContext) {
  const userId = context.switchToHttp().getRequest().headers['x-user-id'];
  return z.number().parse(userId);
}

export const UserId = createParamDecorator(userIdHandler);

export function userHandler(_data: unknown, context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();
  console.log(
    '------------------------------------------------------------------------------',
  );
  console.log(request);
  console.log(
    '------------------------------------------------------------------------------',
  );
  const user = request.user;
  return user;
}
export const CurrentUser = createParamDecorator(userHandler);
