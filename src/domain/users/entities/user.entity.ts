import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BaseEntity } from '@app/utils';

import * as crypto from 'crypto';
import { ApiHideProperty } from '@nestjs/swagger';
@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  username!: string;

  @Column({
    select: false,
  })
  password!: string;

  @Column({
    select: false,
  })
  @ApiHideProperty()
  salt!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    console.log(this);
    if (this.password) {
      const { password, salt } = (await createHashedPassword(
        this.password,
      )) as any;
      this.password = password;
      this.salt = salt;
    }
  }
}

const createHashedPassword = (plainPassword: string) =>
  new Promise(async (res, rej) => {
    const salt = await createSalt();
    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) rej(err);
      res({ password: key.toString('base64'), salt });
    });
  });

const createSalt = async () => crypto.randomBytes(64).toString('base64');
