import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import {
  EmptyObjectSchema,
  IsWriteSuccessOutputZ,
  MetadataSchema,
  PASSWORD_REGEX,
} from '../../app.zod.js';

export const CreateUserInputZ = z
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
    confirmPassword: z
      .string()
      .regex(PASSWORD_REGEX, 'Invalid Password')
      .min(8)
      .max(16),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Passwords don't match`,
    path: ['confirmPassword'],
  })
  .innerType();

export const UpdateUserPasswordInputZ = z
  .object({
    currentPassword: z
      .string()
      .regex(PASSWORD_REGEX, 'Invalid Password')
      .min(8)
      .max(16),
    password: z
      .string()
      .regex(PASSWORD_REGEX, 'Invalid Password')
      .min(8)
      .max(16),
    confirmPassword: z
      .string()
      .regex(PASSWORD_REGEX, 'Invalid Password')
      .min(8)
      .max(16),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Passwords don't match`,
    path: ['confirmPassword'],
  });
export const CreateUserResponseZ = z.object({
  input: CreateUserInputZ,
  output: IsWriteSuccessOutputZ,
  meta: MetadataSchema,
});
export class CreateUserDto extends createZodDto(CreateUserInputZ) {}
export class CreateUserResponseDto extends createZodDto(CreateUserResponseZ) {}
export class UpdatePasswordDto extends createZodDto(UpdateUserPasswordInputZ) {}
export const UpdatePasswordResponseZ = z
  .object({
    input: UpdateUserPasswordInputZ,
    output: IsWriteSuccessOutputZ,
    meta: MetadataSchema,
  })
  .required();

export class UpdatePasswordResponseDto extends createZodDto(
  UpdatePasswordResponseZ,
) {}

export const UpdateUsernameInputZ = z.object({
  username: z
    .string()
    .min(3, 'Username is too short')
    .max(12, 'Username is too long'),
});

export class UpdateUsernameDto extends createZodDto(UpdateUsernameInputZ) {}
export const UpdateUsernameResponseZ = z
  .object({
    input: UpdateUsernameInputZ,
    output: IsWriteSuccessOutputZ,
    meta: MetadataSchema,
  })
  .required();

export class UpdateUsernameResponseDto extends createZodDto(
  UpdateUsernameResponseZ,
) {}

const DeleteUserResponseZ = z.object({
  input: EmptyObjectSchema,
  output: IsWriteSuccessOutputZ,
  meta: MetadataSchema,
});

export class DeleteUserResponseDto extends createZodDto(DeleteUserResponseZ) {}
