import { IServerResponse } from '../../interfaces/response.interface.js';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

@Injectable()
export class ResponseTransformerInterceptor<T>
  implements NestInterceptor<T, IServerResponse>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        (data): IServerResponse => ({
          input: context.switchToHttp().getRequest().body,
          output: data,
          meta: {
            isError: false,
            timestamp: moment().toDate(),
          },
        }),
      ),
    );
  }
}
