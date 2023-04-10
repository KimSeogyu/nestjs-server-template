import { Inject, Injectable } from '@nestjs/common';
import {
  MYSQL_DATASOURCE_KEY,
  WALLET_REPOSITORY_KEY,
} from '../../common/constants.js';
import { DataSource, DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Wallet } from './wallet.entity.js';

@Injectable()
export class WalletRepository {
  constructor(
    @Inject(WALLET_REPOSITORY_KEY)
    private walletRepository: Repository<Wallet>,
    @Inject(MYSQL_DATASOURCE_KEY)
    private mysqlProvider: DataSource,
  ) {}

  findAll(wallet: FindOptionsWhere<Wallet>) {
    return this.walletRepository.find({
      where: wallet,
    });
  }

  save(wallet: DeepPartial<Wallet>) {
    return this.walletRepository.save(wallet);
  }

  destroy(wallet: Wallet) {
    return this.walletRepository.remove(wallet);
  }

  findOne(wallet: FindOptionsWhere<Wallet>) {
    return this.walletRepository.findOneBy(wallet);
  }
}
