import * as util from 'util';
import * as crypto from 'crypto';

import { ApiHideProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
  Relation,
} from 'typeorm';
import { CoreEntity } from '../../infra/database/database.util.js';
import { Order } from '../orders/order.entity.js';
import { SocialAccount } from '../social-accounts/social-account.entity.js';
import { Wallet } from '../wallets/wallet.entity.js';

@Entity('users')
export class User extends CoreEntity {
  @Column({
    unique: true,
    nullable: false,
  })
  @Index('ux_user_username', { unique: true })
  username!: string;

  @Column({
    select: false,
    nullable: true,
  })
  @ApiHideProperty()
  password!: string;

  @Column({
    select: false,
    nullable: true,
  })
  @ApiHideProperty()
  salt!: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Relation<Order>[];

  @OneToMany(() => SocialAccount, (socialAccount) => socialAccount.user)
  socialAccounts: Relation<SocialAccount>[];

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Relation<Wallet>[];

  @Column({
    nullable: true,
  })
  @ApiHideProperty()
  refreshToken: string;

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
