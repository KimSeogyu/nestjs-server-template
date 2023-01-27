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
export const QueryOptionZ = z.object({
  offset: numericString(z.number().optional().default(0)),
  limit: numericString(z.number().optional().default(20)),
});

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
export type QueryOption<T> = DeepPartial<T & z.infer<typeof QueryOptionZ>>;
