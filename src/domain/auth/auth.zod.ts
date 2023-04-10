import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { MetadataSchema } from '../../applications/api/api.zod.js';

export const LoginOutputZ = z.object({
  accessToken: z.string(),
});

export class LogoutResponseDto extends createZodDto(
  z.object({ success: z.boolean() }),
) {}

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
