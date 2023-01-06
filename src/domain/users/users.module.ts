import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { DatabaseModule } from '@app/database/database.module';
import { databaseProviders } from '@app/database/database.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    ...databaseProviders,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: ['MYSQL_PROVIDER'],
    },
  ],
  exports: [
    UsersService,
    UsersRepository,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: ['MYSQL_PROVIDER'],
    },
  ],
})
export class UsersModule {}
