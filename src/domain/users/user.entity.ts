import * as util from 'util';
import * as crypto from 'crypto';

import { ApiHideProperty } from '@nestjs/swagger';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/database.util.js';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const { password, salt } = (await createHashedPassword(
        this.password,
      )) as any;
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
