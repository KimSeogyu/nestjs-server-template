import { DynamicModule, Module } from '@nestjs/common';
import { databaseProviders } from './database.provider.js';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {
  static register(): DynamicModule {
    return {
      module: DatabaseModule,
    };
  }
}
