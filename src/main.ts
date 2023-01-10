import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import helmet from 'helmet';

import { Logger, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCustomLogger, initSwaggerDocs } from './utils/index.js';
import { NODE_ENV } from './constants/index.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.useLogger(
    createCustomLogger(NODE_ENV, configService.getOrThrow('SLACK_WEBHOOK_URL')),
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
  Logger.debug(`Server starts with ${NODE_ENV} mode ...`);
}

bootstrap();
