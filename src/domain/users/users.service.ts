import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';
import { SignUpDto } from '../auth/zod/auth.zod';
import { UpdateUsernameDto } from '@app/domain/users/zod/user.zod';

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
