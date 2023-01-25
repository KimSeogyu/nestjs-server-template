import { z } from 'zod';

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
