import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username is too short')
    .max(12, 'Username is too long'),
  password: z.string().regex(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // 숫자, 특수문자 제한, 알파벳 대소문자, 여덟 글자 이상
    'Invalid Password',
  ),
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
