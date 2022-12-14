import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as moment from 'moment';

moment().format('MMMM-Do-YYYY, h:mm:ss a');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const input = req?.body || {};

    this.logger.log(`start ${req.path} ${JSON.stringify(input)}`);
    const originalSend = res.send;

    res.send = (content) => {
      res.send = originalSend;
      this.logger.log(`end ${req.path} ${JSON.stringify(content)}`);
      return res.send(content);
    };

    next();
  }
}
