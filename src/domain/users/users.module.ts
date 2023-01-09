import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { DatabaseModule } from '@app/database/database.module';
import { databaseProviders } from '@app/database/database.provider';
import { MysqlDatasourceKey, UserRepositoryKey } from '@app/constants';

@Module({
  imports: [DatabaseModule.register()],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    ...databaseProviders,
    {
      provide: UserRepositoryKey,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: [MysqlDatasourceKey],
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
