import { ExecutionContext } from '@nestjs/common';
import { expect } from 'chai';
import { requestIdHandler, userIdHandler } from '../src/decorators/index.js';
import { randomUUID } from 'crypto';

describe('ALL DECORATORS', function () {
  it('UserId', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => {
          return {
            headers: {
              'x-user-id': 1,
            },
          };
        },
      }),
    };

    const userId = userIdHandler({}, context as ExecutionContext);
    expect(userId).eq(1);
  });

  it('RequestId', () => {
    const randUuid = randomUUID();
    const context = {
      switchToHttp: () => {
        return {
          getRequest: () => {
            return {
              headers: {
                'x-request-id': randUuid,
              },
            };
          },
        };
      },
    };

    const requestId = requestIdHandler({}, context as ExecutionContext);
    expect(requestId).eq(randUuid);
  });
});
