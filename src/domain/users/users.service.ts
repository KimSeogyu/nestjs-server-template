import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';

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

  async create(createUserDto: CreateUserDto) {
    const created = this.usersRepository.create(createUserDto);
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
