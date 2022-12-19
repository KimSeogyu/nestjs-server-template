import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './zod/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';
import { SignUpDto } from '../auth/zod/auth.zod';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findSaltAndPasswordByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        username,
      },
      select: {
        salt: true,
        password: true,
      },
    });
  }

  async create(dto: SignUpDto) {
    const created = this.usersRepository.create(dto);
    const { salt, password, ...result } = await this.usersRepository.save(
      created,
    );
    return result;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updated = await this.usersRepository.update(id, updateUserDto);
    return !!updated.affected;
  }

  async remove(id: number) {
    const deleted = await this.usersRepository.delete(id);
    return !!deleted.affected;
  }
}
