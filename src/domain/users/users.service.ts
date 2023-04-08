import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository.js';
import { createHashedPassword, User } from './user.entity.js';
import { UpdatePasswordDto, UpdateUsernameDto } from './user.zod.js';
import { UseCache } from '../../common/decorators/index.js';
import { GeneralQueryFilter } from '../../applications/api/api.zod.js';
import { DeepPartial, FindOptionsWhere } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findSaltAndPasswordByUsername(user: FindOptionsWhere<User>) {
    return await this.usersRepository.findSecretValues(user);
  }

  async save(dto: DeepPartial<User>) {
    return await this.usersRepository.save(dto);
  }

  @UseCache()
  async findAll(query: GeneralQueryFilter<User>) {
    return await this.usersRepository.findAllUsers(query);
  }

  async updatePassword(
    id: number,
    { password, confirmPassword, currentPassword }: UpdatePasswordDto,
  ) {
    const user = await this.usersRepository.findSecretValues({ id });
    if (!user) {
      throw new BadRequestException(`NOT FOUND USER, id=${id}`);
    }

    const [curHash, newHash] = await Promise.allSettled([
      createHashedPassword(currentPassword, user?.salt),
      createHashedPassword(password, user?.salt),
    ]);

    if (curHash.status === 'rejected' || newHash.status === 'rejected') {
      throw new InternalServerErrorException(
        `createHashedPassword rejected, current=${curHash.status} new=${newHash.status}`,
      );
    }

    this.validatePasswordUpdate({
      curHash,
      newHash,
      confirmPassword,
      password,
      user,
    });

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

  private validatePasswordUpdate({
    curHash,
    newHash,
    confirmPassword,
    password,
    user,
  }: {
    curHash: PromiseFulfilledResult<{ password: string; salt: string }>;
    newHash: PromiseFulfilledResult<{ password: string; salt: string }>;
    confirmPassword: string;
    password: string;
    user: { password: string; salt?: string };
  }): void {
    if (curHash.value.password !== user?.password) {
      throw new BadRequestException(`Current Password is wrong`);
    }

    if (newHash.value.password === user?.password) {
      throw new BadRequestException(`Password is same as current one`);
    }

    if (confirmPassword !== password) {
      throw new BadRequestException(`Passwords are not same`);
    }
  }

  findOne(user: FindOptionsWhere<User>) {
    return this.usersRepository.findOne(user);
  }
}
