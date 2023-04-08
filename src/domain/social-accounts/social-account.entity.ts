import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { CoreEntity } from '../../infra/database/database.util.js';
import { User } from '../users/user.entity.js';

@Entity('social_accounts')
export class SocialAccount extends CoreEntity {
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: Relation<User>;

  @Column()
  email!: string;

  @Column()
  provider: string;

  @Column()
  providerId: string;
}
