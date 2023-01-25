import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { MetadataSchema } from '../../app.zod.js';

export const SignUpInputZ = z
  .object({
    username: z
      .string()
      .min(3, 'Username is too short')
      .max(12, 'Username is too long'),
    password: z.string().regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // 숫자, 특수문자 제한, 알파벳 대소문자, 여덟 글자 이상
      'Invalid Password',
    ),
  })
  .required();
export const LoginInputZ = z
  .object({
    username: z
      .string()
      .min(3, 'Username is too short')
      .max(12, 'Username is too long'),
    password: z.string().regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // 숫자, 특수문자 제한, 알파벳 대소문자, 여덟 글자 이상
      'Invalid Password',
    ),
  })
  .required();

export const SignUpOutputZ = z.object({
  username: z
    .string()
    .min(3, 'Username is too short')
    .max(12, 'Username is too long'),
  id: z.number().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class SignUpDto extends createZodDto(SignUpInputZ) {}

export const SignupResponseZ = z.object({
  input: SignUpInputZ,
  output: SignUpOutputZ,
  meta: MetadataSchema,
});

export const LoginOutputZ = z.object({
  accessToken: z.string(),
});
export const LoginResponseZ = z.object({
  input: LoginInputZ,
  output: LoginOutputZ,
  meta: MetadataSchema,
});
export class SignupResponseDto extends createZodDto(SignupResponseZ) {}

export class LoginResponseDto extends createZodDto(LoginResponseZ) {}
