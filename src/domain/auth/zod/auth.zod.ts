import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const MetadataSchema = z.object({
  isError: z.boolean(),
  timestamp: z.date(),
});

const SignUpInput = z
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

const LoginInput = z
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

const SignupOutput = z.object({
  username: z
    .string()
    .min(3, 'Username is too short')
    .max(12, 'Username is too long'),
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class SignUpDto extends createZodDto(SignUpInput) {}

export const SignupZod = extendApi(SignUpInput, {
  title: '회원가입',
  description: '회원가입',
});

const SignupResponseZod = z.object({
  input: SignUpInput,
  output: SignupOutput,
  meta: MetadataSchema,
});
export class SignupDto extends createZodDto(
  SignupZod.omit({ password: true }),
) {}
export const LoginOutput = z.object({
  accessToken: z.string(),
});

const LoginResponseZod = z.object({
  input: LoginInput,
  output: LoginOutput,
  meta: MetadataSchema,
});

export class SignupResponse extends createZodDto(SignupResponseZod) {}

export class LoginResponse extends createZodDto(LoginResponseZod) {}
