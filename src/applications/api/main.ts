import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module.js';
import helmet from 'helmet';

import { Logger, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createCustomLogger, initSwaggerDocs } from '../../utils/init.utils.js';
import { AppMode } from '../../constants/index.js';

export async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.useLogger(
    createCustomLogger(configService.getOrThrow('SLACK_WEBHOOK_URL')),
  );

  const version = configService.getOrThrow('APP_VERSION');

  app.setGlobalPrefix(`api/v${version}`, {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
    ],
  });

  app.use(helmet());

  initSwaggerDocs(app);

  await app.listen(configService.get('PORT', 8080));
  Logger.log(`Server starts with ${AppMode} mode ...`);
}
