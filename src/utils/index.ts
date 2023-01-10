export * from './init.util.js';
export * from './base.entity.js';

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
