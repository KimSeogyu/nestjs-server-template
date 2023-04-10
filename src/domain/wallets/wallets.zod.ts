import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export class SaveWalletDto extends createZodDto(
  z.object({
    networkId: z.string(),
    walletAddress: z.string(),
  }),
) {}
