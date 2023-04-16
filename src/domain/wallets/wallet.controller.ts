import {
  ApiController,
  ApiJwtAuthGuard,
  CurrentUser,
} from '../../common/decorators/index.js';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallet.service.js';
import { SaveWalletDto } from './wallets.zod.js';
import { User } from '../users/user.entity.js';
import { GoogleAuthGuard } from '../auth/guards/google-auth.guard.js';

@ApiController('wallets')
@UseGuards(GoogleAuthGuard)
@ApiJwtAuthGuard()
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  findAll(@Query('userId') userId: number) {
    return this.walletService.findAll({
      userId: userId,
    });
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  saveWallet(@CurrentUser() user: User, @Body() dto: SaveWalletDto) {
    return this.walletService.save(user, dto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  destroyWallet(@CurrentUser() user: User, @Body() dto: SaveWalletDto) {
    return this.walletService.destroy(user, dto);
  }
}
