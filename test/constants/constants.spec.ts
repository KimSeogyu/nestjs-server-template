import { getNodeEnv, NODE_ENV } from '@app/constants';
import { expect } from 'chai';

describe('CONSTANTS TEST', function () {
  it('NODE_ENV', function () {
    expect(getNodeEnv()).oneOf(['local', 'dev', 'prod']);
    expect(NODE_ENV).oneOf(['local', 'dev', 'prod']);
  });
});
