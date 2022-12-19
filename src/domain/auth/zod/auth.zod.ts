import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const SignUpSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export class SignUpDto extends createZodDto(SignUpSchema) {}

export const SignupZ = extendApi(SignUpSchema, {
  title: '회원가입',
  description: '회원가입',
});

// export const LoginZ = extendApi()

// export class LoginDto extends createZodDto();
