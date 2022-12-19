import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export class CreateUserDto extends createZodDto(UserSchema) {}

export class UpdateUsernameDto extends createZodDto(
  UserSchema.omit({
    username: true,
  }),
) {}

export class UpdatePasswordDto extends createZodDto(
  UserSchema.omit({
    password: true,
  }),
) {}

export const UserSwagger = extendApi(UserSchema, {
  title: '유저 생성',
  description: '유저 생성',
});
