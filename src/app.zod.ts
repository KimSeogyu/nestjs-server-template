import { z } from 'zod';

export const MetadataSchema = z
  .object({
    isError: z.boolean(),
    timestamp: z.date(),
  })
  .required();

export const EmptyObjectSchema = z.object({}).required();
