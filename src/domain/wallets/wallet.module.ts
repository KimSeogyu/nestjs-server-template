import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../../infra/database/database.module.js';
import { databaseProviders } from '../../infra/database/database.provider.js';
import {
  MYSQL_DATASOURCE_KEY,
  WALLET_REPOSITORY_KEY,
} from '../../common/constants.js';
import { WalletController } from './wallet.controller.js';
import { WalletService } from './wallet.service.js';
import { WalletRepository } from './wallet.repository.js';
import { Wallet } from './wallet.entity.js';

@Module({
  imports: [DatabaseModule.register()],
  controllers: [WalletController],
  providers: [
    WalletService,
    WalletRepository,
    ...databaseProviders,
    {
      inject: [MYSQL_DATASOURCE_KEY],
      provide: WALLET_REPOSITORY_KEY,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Wallet),
    },
  ],
  exports: [WalletService],
})
export class WalletModule {}
