import * as util from 'util';
import * as crypto from 'crypto';

import { ApiHideProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { CoreEntity } from '../../infra/database/database.util.js';
import { Order } from '../order/order.entity.js';

@Entity('user')
export class User extends CoreEntity {
  @Column()
  @Index('ux_user_username', { unique: true })
  username!: string;

  @Column({
    select: false,
  })
  @ApiHideProperty()
  password!: string;

  @Column({
    select: false,
  })
  @ApiHideProperty()
  salt!: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Relation<Order>[];

  @OneToMany(() => SocialAccount, (socialAccount) => socialAccount.user)
  socialAccounts: Relation<SocialAccount>[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const { password, salt } = await createHashedPassword(this.password);
      this.password = password;
      this.salt = salt;
    }
  }
}

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

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

export const createHashedPassword = async (
  plainPassword: string,
  givenSalt?: string,
): Promise<{
  password: string;
  salt: string;
}> => {
  const salt = givenSalt ?? (await randomBytesPromise(64)).toString('base64');
  const hashedPassword = await pbkdf2Promise(
    plainPassword,
    salt,
    100000,
    64,
    'sha512',
  );

  return { salt, password: hashedPassword.toString('base64') };
};
