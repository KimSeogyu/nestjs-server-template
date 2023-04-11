import { Inject, Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './user.entity.js';
import { UpdateUsernameDto } from './user.zod.js';
import {
  MYSQL_DATASOURCE_KEY,
  USER_REPOSITORY_KEY,
} from '../../common/constants.js';
import { GeneralQueryFilter } from '../../applications/api/api.zod.js';
import { SocialAccount } from '../social-accounts/social-account.entity.js';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(USER_REPOSITORY_KEY)
    private usersRepository: Repository<User>,
    @Inject(MYSQL_DATASOURCE_KEY)
    private mysqlProvider: DataSource,
  ) {}

  async findOne(user: FindOptionsWhere<User>) {
    return await this.usersRepository.findOneBy(user);
  }

  async findSecretValues(user: FindOptionsWhere<User>) {
    return await this.usersRepository.findOne({
      where: user,
      select: {
        salt: true,
        password: true,
      },
    });
  }

  async save(dto: DeepPartial<User>) {
    const created = this.usersRepository.create(dto);
    const { salt, password, ...result } = await this.usersRepository.save(
      created,
    );
    return result;
  }

  async findAll(q: GeneralQueryFilter<User>) {
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.createdAt', 'user.updatedAt', 'user.username'])
      .leftJoinAndSelect(
        'user.socialAccounts',
        'socialAccount',
        'socialAccount.userId = user.id',
      )
      .where('user.id > :cursor', { cursor: q.cursor ?? 0 });

    if (q.endDt) {
      queryBuilder.andWhere('user.createdAt <= :endDt', { endDt: q.endDt });
    }

    if (q.startDt) {
      queryBuilder.andWhere('user.createdAt >= :startDt', {
        startDt: q.startDt,
      });
    }

    return queryBuilder.getMany();
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
}
