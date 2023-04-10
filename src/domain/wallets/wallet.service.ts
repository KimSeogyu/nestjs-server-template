import { BadRequestException, Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository.js';
import { Wallet } from './wallet.entity.js';
import { FindOptionsWhere } from 'typeorm';
import { SaveWalletDto } from './wallets.zod.js';
import { User } from '../users/user.entity.js';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  findAll(wallet: FindOptionsWhere<Wallet>) {
    return this.walletRepository.findAll(wallet);
  }

  save(user: Pick<User, 'id' | 'username'>, dto: SaveWalletDto) {
    return this.walletRepository.save({
      ...dto,
      userId: user.id,
    });
  }

  async destroy(user: Pick<User, 'id' | 'username'>, dto: SaveWalletDto) {
    const wallet = await this.walletRepository.findOne({
      ...dto,
      userId: user.id,
    });
    if (!wallet) {
      throw new BadRequestException(`Wallet Not found`);
    }
    return this.walletRepository.destroy(wallet);
  }
}
