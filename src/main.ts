import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

import { ValidationPipe, Logger, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCustomLogger, initSwaggerDocs } from '@app/utils';
import { getNodeEnv } from './utils/node-env.util';

async function bootstrap() {
  const ENV_MODE = getNodeEnv();
  const app = await NestFactory.create(AppModule, {
    logger: createCustomLogger(ENV_MODE),
  });

  const configService = app.get<ConfigService>(ConfigService);
  const version = configService.getOrThrow('APP_VERSION');

  app.setGlobalPrefix(`api/v${version}`, {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
    ],
  });

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const logger = new Logger(bootstrap.name);

  initSwaggerDocs(app);

  await app.listen(configService.get('PORT', 8080));
  logger.debug(`Server starts with ${ENV_MODE} mode ...`);
}
bootstrap();
