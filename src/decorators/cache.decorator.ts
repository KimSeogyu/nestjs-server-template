import { APP_CACHE_METADATA, AppCacheOption } from '../cache/cache.zod.js';
import { applyDecorators, SetMetadata } from '@nestjs/common';

export function UseCache(
  options: AppCacheOption = { ttl: 60 },
): MethodDecorator {
  return applyDecorators(SetMetadata(APP_CACHE_METADATA, options));
}
