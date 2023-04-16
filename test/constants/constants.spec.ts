import { expect } from 'chai';

describe('CONSTANTS TEST', function () {
  it('NODE_ENV', function () {
    expect(process.env.NODE_ENV).oneOf(['local', 'dev', 'prod', 'test']);
  });
});
