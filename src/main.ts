import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import helmet from 'helmet';

import { Logger, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppMode } from './constants/index.js';
import { createCustomLogger, initSwaggerDocs } from './app.logger.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.useLogger(
    createCustomLogger(AppMode, configService.getOrThrow('SLACK_WEBHOOK_URL')),
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
  Logger.debug(`Server starts with ${AppMode} mode ...`);
}

bootstrap();
