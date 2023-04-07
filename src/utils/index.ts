import { InternalServerErrorException } from '@nestjs/common';

export * from './sleep.utils.js';
export function handleError<T>(...promiseResults: PromiseSettledResult<T>[]) {
  for (const result of promiseResults) {
    if (result.status === 'rejected') {
      throw new InternalServerErrorException(result.reason);
    }
  }

  return promiseResults;
}
