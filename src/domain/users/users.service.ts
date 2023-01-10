import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository.js';
import { UserEntity } from './entities/user.entity.js';
import { SignUpDto } from '../auth/auth.zod.js';
import { UpdateUsernameDto } from './zod/user.zod.js';
import { UseCache } from '../../utils/decorators/index.js';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneByUsername(username);
  }

  async findSaltAndPasswordByUsername(username: string) {
    return this.usersRepository.findSecretValuesByUsername(username);
  }

  async create(dto: SignUpDto) {
    return this.usersRepository.saveUser(dto);
  }

  @UseCache()
  findAll() {
    return this.usersRepository.findAllUsers();
  }

  async updateUsername(id: number, dto: UpdateUsernameDto) {
    return this.usersRepository.updateUsernameById(id, dto);
  }

  async remove(id: number) {
    return this.usersRepository.deleteById(id);
  }
}
