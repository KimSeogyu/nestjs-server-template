import { z, ZodTypeAny } from 'zod';

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

export const numericString = (schema: ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === 'string') {
      return parseInt(a, 10);
    } else if (typeof a === 'number') {
      return a;
    } else {
      return undefined;
    }
  }, schema) as z.ZodEffects<z.ZodTypeAny, number, number>;

export const EmptyObjectSchema = z.object({}).required();
export const GeneralQueryFilterDto = z
  .object({
    offset: numericString(z.number().default(0)),
    limit: numericString(z.number().default(20)),
    startDt: z.coerce
      .date()
      .min(new Date('2000-01-01'), { message: 'Too old' }),
    endDt: z.coerce.date().max(new Date(), { message: 'Too young!' }),
  })
  .deepPartial();

export declare type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
      ? Map<DeepPartial<K>, DeepPartial<V>>
      : T extends Set<infer M>
      ? Set<DeepPartial<M>>
      : T extends object
      ? {
          [K in keyof T]?: DeepPartial<T[K]>;
        }
      : T);

export type GeneralQueryFilter<T = void> = DeepPartial<
  T & z.infer<typeof GeneralQueryFilterDto>
>;
