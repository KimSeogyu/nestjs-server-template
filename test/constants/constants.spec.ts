import { AppMode } from '../../src/common/constants.js';
import { expect } from 'chai';

describe('CONSTANTS TEST', function () {
  it('NODE_ENV', function () {
    expect(AppMode).oneOf(['local', 'dev', 'prod', 'test']);
  });
});
