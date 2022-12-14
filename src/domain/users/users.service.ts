import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async findOneOrNull(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const created = this.userRepository.create(createUserDto);
    const { salt, password, ...result } = await this.userRepository.save(
      created,
    );
    return result;
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
