import { createCustomLogger, initSwaggerDocs } from '../../src/utils/index.js';
import { expect } from 'chai';
import { WinstonLogger } from 'nest-winston';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module.js';

describe('INIT UTILS', function () {
  it('should instanceof WinstonLogger', function () {
    const loggerService = createCustomLogger('prod', '');
    expect(loggerService).instanceOf(WinstonLogger);
  });

  it('swagger init throws no error', async () => {
    const app = await NestFactory.create(AppModule);
    expect(initSwaggerDocs(app)).eq(true);
  });
});
