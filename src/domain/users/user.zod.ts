import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import {
  EmptyObjectSchema,
  IsWriteSuccessOutputZ,
  MetadataSchema,
} from '../../app.zod.js';

export const UserSchema = z
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

export class CreateUserDto extends createZodDto(UserSchema) {}
export const UpdatePasswordInputZ = UserSchema.pick({
  password: true,
}).required();
export class UpdatePasswordDto extends createZodDto(UpdatePasswordInputZ) {}
export const UpdatePasswordResponseZ = z
  .object({
    input: UpdatePasswordInputZ,
    output: IsWriteSuccessOutputZ,
    meta: MetadataSchema,
  })
  .required();

export class UpdatePasswordResponseDto extends createZodDto(
  UpdatePasswordResponseZ,
) {}
export const UpdateUsernameInputZ = UserSchema.pick({
  username: true,
}).required();
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
