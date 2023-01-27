import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity.js';
import { SignUpDto } from '../auth/auth.zod.js';
import { UpdatePasswordDto, UpdateUsernameDto } from './user.zod.js';
import {
  MysqlDatasourceKey,
  UserRepositoryKey,
} from '../../constants/index.js';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(UserRepositoryKey)
    private usersRepository: Repository<User>,
    @Inject(MysqlDatasourceKey)
    private mysqlProvider: DataSource,
  ) {}

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOneBy({
      username,
    });
  }

  async findSecretValuesByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username,
      },
      select: {
        salt: true,
        password: true,
      },
    });
  }

  async saveUser(dto: SignUpDto) {
    const created = this.usersRepository.create(dto);
    const { salt, password, ...result } = await this.usersRepository.save(
      created,
    );
    return result;
  }

  async findAllUsers() {
    return this.usersRepository.find();
  }

  async updatePasswordById(id: number, password: string) {
    const updated = await this.usersRepository.update(id, {
      password,
    });
    return !!updated.affected;
  }

  async deleteById(id: number) {
    const deleted = await this.usersRepository.delete(id);
    return !!deleted.affected;
  }

  async updateUsernameById(id: number, updateUserDto: UpdateUsernameDto) {
    const updated = await this.usersRepository.update(id, updateUserDto);
    return !!updated.affected;
  }
  async findOneUserById(id: number) {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
      select: {
        salt: true,
        password: true,
      },
    });
  }
}
