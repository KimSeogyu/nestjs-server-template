import { IServerResponse } from '@app/interfaces/response.interface';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { Response } from 'express';

import * as moment from 'moment';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException(exception.name, {
        cause: exception,
        description: exception.message,
      });
    }

    const errorResponse = (exception as HttpException).getResponse();
    const payload: IServerResponse = {
      input: request.body,
      output: {},
      error: errorResponse,
      meta: {
        isError: true,
        timestamp: moment().toDate(),
      },
    };

    this.logger.error(JSON.stringify(exception));
    response.status(400).json(payload);
  }
}
