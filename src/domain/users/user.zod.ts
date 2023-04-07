import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

import {
  GeneralQueryFilterDto,
  IsWriteSuccessOutputZ,
  MetadataSchema,
  numericString,
  PASSWORD_REGEX,
} from '../../applications/api/api.zod.js';

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

export const FindOneUserZ = z.object({
  username: z.string(),
  id: numericString(z.number()),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const UserIdParamZ = FindOneUserZ.pick({ id: true }).required();
export class CreateUserDto extends createZodDto(CreateUserInputZ) {}

export class UpdatePasswordDto extends createZodDto(UpdateUserPasswordInputZ) {}

export class CreateUserResponseDto extends createZodDto(
  z.object({
    input: z.object({
      body: CreateUserInputZ,
    }),
    output: FindOneUserZ,
    meta: MetadataSchema,
  }),
) {}

export class FindOneUserByUsernameDto extends createZodDto(
  FindOneUserZ.pick({ username: true }).required(),
) {}
export class FindOneyUsernameResponseDto extends createZodDto(
  z.object({
    input: z.object({
      param: FindOneUserZ.pick({ username: true }).required(),
    }),
    output: FindOneUserZ,
    meta: MetadataSchema,
  }),
) {}
export class FindManyUsersDto extends createZodDto(GeneralQueryFilterDto) {}
export class FindManyUserResponseDto extends createZodDto(
  z.object({
    input: z.object({
      query: GeneralQueryFilterDto,
    }),
    output: z.array(FindOneUserZ),
    meta: MetadataSchema,
  }),
) {}

export class UpdatePasswordResponseDto extends createZodDto(
  z
    .object({
      input: z.object({
        param: UserIdParamZ,
        body: UpdateUserPasswordInputZ,
      }),
      output: IsWriteSuccessOutputZ,
      meta: MetadataSchema,
    })
    .required(),
) {}

export const UpdateUsernameInputZ = z.object({
  username: z
    .string()
    .min(3, 'Username is too short')
    .max(12, 'Username is too long'),
});

export class UpdateUsernameDto extends createZodDto(UpdateUsernameInputZ) {}
export class UpdateUsernameResponseDto extends createZodDto(
  z
    .object({
      input: z.object({
        param: UserIdParamZ,
        body: UpdateUsernameInputZ,
      }),
      output: IsWriteSuccessOutputZ,
      meta: MetadataSchema,
    })
    .required(),
) {}
export class QueryByUserIdDto extends createZodDto(UserIdParamZ) {}
export class DeleteUserResponseDto extends createZodDto(
  z
    .object({
      input: z.object({
        param: UserIdParamZ,
      }),
      output: IsWriteSuccessOutputZ,
      meta: MetadataSchema,
    })
    .required(),
) {}
