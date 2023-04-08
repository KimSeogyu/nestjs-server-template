import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import { CoreEntity } from '../../infra/database/database.util.js';
import { User } from '../users/user.entity.js';

@Entity('social_accounts')
@Index(
  'idx_social_account_email_provider_provider_id',
  ['email', 'provider', 'providerId'],
  { unique: true },
)
export class SocialAccount extends CoreEntity {
  @Column({
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.socialAccounts, { nullable: false })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: Relation<User>;

  @Column({
    nullable: false,
  })
  email!: string;

  @Column({
    nullable: false,
  })
  provider: string;

  @Column({
    nullable: false,
  })
  providerId: string;
}
