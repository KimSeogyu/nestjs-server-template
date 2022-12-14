import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { BasicAuthStrategy } from './basic-auth.strategy';

@Module({
  imports: [PassportModule],
  providers: [BasicAuthStrategy],
})
export class AuthModule {}
