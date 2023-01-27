import { z } from 'zod';
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // 적어도 하나의 소문자,대문자,숫자,특수문자 그리고 8글자 이상
export const IsWriteSuccessOutputZ = z
  .object({
    success: z.boolean(),
  })
  .required();

export const MetadataSchema = z
  .object({
    isError: z.boolean(),
    timestamp: z.date(),
  })
  .required();

export const EmptyObjectSchema = z.object({}).required();
