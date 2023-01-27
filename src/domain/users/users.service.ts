import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository.js';
import { User } from './user.entity.js';
import { SignUpDto } from '../auth/auth.zod.js';
import { UpdatePasswordDto, UpdateUsernameDto } from './user.zod.js';
import { UseCache } from '../../decorators/index.js';
import { createHashedPassword } from './user.entity.js';

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
    const { password, confirmPassword, currentPassword } = dto;
    const user = await this.usersRepository.findOneUserById(id);

    const [curHash, newHash] = await Promise.allSettled([
      createHashedPassword(currentPassword, user?.salt),
      createHashedPassword(password, user?.salt),
    ]);

    if (curHash.status === 'rejected' || newHash.status === 'rejected') {
      throw new InternalServerErrorException(
        `createHashedPassword rejected, current=${curHash.status} new=${newHash.status}`,
      );
    }

    if (curHash.value.password !== user?.password) {
      throw new BadRequestException(`Current Password is wrong`);
    }

    if (newHash.value.password === user?.password) {
      throw new BadRequestException(`Password is same as current one`);
    }

    if (confirmPassword !== password) {
      throw new BadRequestException(`Passwords are not same`);
    }

    return {
      success: await this.usersRepository.updatePasswordById(id, password),
    };
  }

  async remove(id: number) {
    return { success: await this.usersRepository.deleteById(id) };
  }

  async updateUsername(id: number, dto: UpdateUsernameDto) {
    return { success: await this.usersRepository.updateUsernameById(id, dto) };
  }
}
