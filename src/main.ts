import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCustomLogger, initSwaggerDocs } from '@app/utils';
import { APP_NODE_ENV } from './utils/node-env.util';

async function bootstrap() {
  const ENV_MODE = APP_NODE_ENV;
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.useLogger(
    createCustomLogger(ENV_MODE, configService.getOrThrow('SLACK_WEBHOOK_URL')),
  );

  const version = configService.getOrThrow('APP_VERSION');

  app.setGlobalPrefix(`api/v${version}`, {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
    ],
  });

  app.use(helmet());
  // app.useGlobalPipes(new ValidationPipe());

  initSwaggerDocs(app);

  await app.listen(configService.get('PORT', 8080));
  Logger.debug(`Server starts with ${ENV_MODE} mode ...`);
}
bootstrap();
