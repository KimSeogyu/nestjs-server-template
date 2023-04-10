import {
  ApiController,
  ApiJwtAuthGuard,
  CurrentJwtUser,
  CurrentJwtUserType,
} from '../../common/decorators/index.js';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service.js';
import { SaveWalletDto } from './wallets.zod.js';

@ApiController('wallets')
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
  saveWallet(
    @CurrentJwtUser() user: CurrentJwtUserType,
    @Body() dto: SaveWalletDto,
  ) {
    return this.walletService.save(user, dto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  destroyWallet(
    @CurrentJwtUser() user: CurrentJwtUserType,
    @Body() dto: SaveWalletDto,
  ) {
    return this.walletService.destroy(user, dto);
  }
}
