import { expect } from 'chai';
import { WinstonLogger } from 'nest-winston';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from '../src/applications/api/api.module.js';
import {
  createCustomLogger,
  initSwaggerDocs,
} from '../src/utils/init.utils.js';

describe('INIT UTILS', function () {
  // it('should instanceof WinstonLogger', function () {
  //   const loggerService = createCustomLogger('');
  //   expect(loggerService).instanceOf(WinstonLogger);
  // });
  //
  // it('swagger init throws no error', async () => {
  //   const app = await NestFactory.create(ApiModule);
  //   expect(initSwaggerDocs(app)).eq(true);
  // });
});
