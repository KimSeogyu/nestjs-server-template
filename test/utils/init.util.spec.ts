<<<<<<< HEAD
import { createCustomLogger } from '@app/utils';
import { expect } from 'chai';
import { WinstonLogger } from 'nest-winston';
=======
import { createCustomLogger, initSwaggerDocs } from '@app/utils';
import { expect } from 'chai';
import { WinstonLogger } from 'nest-winston';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
>>>>>>> 2c2319e (feat: add cov)

describe('INIT UTILS', function () {
  it('should instanceof WinstonLogger', function () {
    const loggerService = createCustomLogger(
      process.env.NODE_ENV ?? 'test',
      '',
    );
    expect(loggerService).instanceOf(WinstonLogger);
  });
<<<<<<< HEAD
=======

  it('swagger init throws no error', async () => {
    const app = await NestFactory.create(AppModule);
    expect(initSwaggerDocs(app)).eq(true);
  });
>>>>>>> 2c2319e (feat: add cov)
});
