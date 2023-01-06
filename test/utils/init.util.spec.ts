import { createCustomLogger, initSwaggerDocs } from '@app/utils';
import { expect } from 'chai';
import { WinstonLogger } from 'nest-winston';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';

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
