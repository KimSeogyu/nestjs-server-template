import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { CoreEntity } from '../../infra/database/database.util.js';
import { User } from '../users/user.entity.js';

@Entity('networks')
export class Network extends CoreEntity {
  @Column()
  name: string;

  @OneToMany(() => Wallet, (wallet) => wallet.network)
  wallets: Relation<Wallet>[];
}

@Entity('wallets')
export class Wallet extends CoreEntity {
  @Column({
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.wallets, { nullable: false })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: Relation<User>;

  @Column()
  networkId: string;

  @ManyToOne(() => Network, (network) => network.wallets, { nullable: false })
  @JoinColumn({
    name: 'network_id',
    referencedColumnName: 'id',
  })
  network: Relation<Network>;

  @Column()
  walletAddress: string;
}
