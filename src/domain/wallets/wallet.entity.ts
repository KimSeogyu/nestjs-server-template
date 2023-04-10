import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { CoreEntity } from '../../infra/database/database.util.js';
import { User } from '../users/user.entity.js';

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

  @Column()
  walletAddress: string;
}
