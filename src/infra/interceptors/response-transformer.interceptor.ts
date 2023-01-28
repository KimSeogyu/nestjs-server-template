import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IServerResponse } from '../infra.zod.js';

@Injectable()
export class ResponseTransformerInterceptor<T>
  implements NestInterceptor<T, IServerResponse>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data): IServerResponse => {
        const req = context.switchToHttp().getRequest();
        const input = req.method === 'GET' ? req.query : req.body;
        return {
          input,
          output: data,
          meta: {
            isError: false,
            timestamp: new Date(),
          },
          error: {},
        };
      }),
    );
  }
}
