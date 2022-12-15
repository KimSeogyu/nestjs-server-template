import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { DatabaseModule } from '@app/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: ['DATA_SOURCE'],
    },
  ],
  exports: [
    UsersService,
    UsersRepository,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: ['DATA_SOURCE'],
    },
  ],
})
export class UsersModule {}
