import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import {
  EmptyObjectSchema,
  MetadataSchema,
  PASSWORD_REGEX,
} from '../../applications/api/api.zod.js';

export const SignUpInputZ = z
  .object({
    username: z
      .string()
      .min(3, 'Username is too short')
      .max(12, 'Username is too long'),
    password: z
      .string()
      .regex(PASSWORD_REGEX, 'Invalid Password')
      .min(8)
      .max(16),
  })
  .required();
export const LoginInputZ = z
  .object({
    username: z
      .string()
      .min(3, 'Username is too short')
      .max(12, 'Username is too long'),
    password: z
      .string()
      .regex(PASSWORD_REGEX, 'Invalid Password')
      .min(8)
      .max(16),
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

export class GoogleLoginResponseDto extends createZodDto(
  z.object({
    input: z.object({
      query: z.object({
        code: z.string(), //'4/0AVHEtk5SjJzB-wx7zmaSoqthFxTg3mjtaJ2CrpqJK7KEeoAQz4vzT-7X7NC8NeB5Gnrqfg'
        scope: z.string(), //'email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile'
        authuser: z.coerce.number(), // '0'
        prompt: z.string(), // 'none'
      }),
    }),
    output: z.object({
      refreshToken: z.string(),
      accessToken: z.string(),
    }),
    meta: MetadataSchema,
  }),
) {}

const RefreshTokenZ = z.object({
  refreshToken: z.string(),
});

export class RefreshTokenDto extends createZodDto(RefreshTokenZ) {}

export class RefreshTokenResponseDto extends createZodDto(
  z.object({
    input: RefreshTokenZ,
    output: LoginOutputZ,
    meta: MetadataSchema,
  }),
) {}
