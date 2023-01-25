import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository.js';
import { User } from './user.entity.js';
import { SignUpDto } from '../auth/auth.zod.js';
import { UpdatePasswordDto, UpdateUsernameDto } from './user.zod.js';
import { UseCache } from '../../decorators/index.js';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOneByUsername(username: string): Promise<User | null> {
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

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    return { success: await this.usersRepository.updatePasswordById(id, dto) };
  }

  async remove(id: number) {
    return { success: await this.usersRepository.deleteById(id) };
  }

  async updateUsername(id: number, dto: UpdateUsernameDto) {
    return { success: await this.usersRepository.updateUsernameById(id, dto) };
  }
}
