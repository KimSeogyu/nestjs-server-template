import { AppCacheOption } from './cache.zod.js';
import { applyDecorators, SetMetadata } from '@nestjs/common';

export const APP_CACHE_METADATA = 'APP_CACHE_METADATA';

export function UseCache(options: AppCacheOption = {}): MethodDecorator {
  return applyDecorators(SetMetadata(APP_CACHE_METADATA, options));
}
