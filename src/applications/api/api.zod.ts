import { DeepPartial } from 'typeorm';
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

export const GeneralQueryFilterDto = z
  .object({
    cursor: z.coerce.number().default(0),
    limit: z.coerce.number().default(20),
    startDt: z.coerce
      .date()
      .min(new Date('2000-01-01'), { message: '너무 먼 과거입니다.' }),
    endDt: z.coerce.date().max(new Date(), { message: `미래시간입니다.` }),
  })
  .deepPartial();

export type GeneralQueryFilter<T = void> = DeepPartial<
  T & z.infer<typeof GeneralQueryFilterDto>
>;
