import { createCustomLogger } from '@app/utils';
import { expect } from 'chai';
import { WinstonLogger } from 'nest-winston';

describe('INIT UTILS', function () {
  it('should instanceof WinstonLogger', function () {
    const loggerService = createCustomLogger(
      process.env.NODE_ENV ?? 'test',
      '',
    );
    expect(loggerService).instanceOf(WinstonLogger);
  });
});
