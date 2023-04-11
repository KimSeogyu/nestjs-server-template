import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module.js';
import helmet from 'helmet';

import { Logger, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createCustomLogger, initSwaggerDocs } from '../../utils/init.utils.js';
import { AppMode } from '../../common/constants.js';
import passport from 'passport';
import session from 'express-session';
import compression from 'compression';

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

  // const RedisStore = createRedisStore(session);
  // const redisHost: string = configService.get('REDIS_HOST');
  // const redisPort: number = configService.get('REDIS_PORT');
  // const redisClient = createClient({
  //   host: redisHost,
  //   port: redisPort,
  // });
  //
  // redisClient.on('error', (err) =>
  //   Logger.error('Could not establish a connection with redis. ' + err),
  // );
  // redisClient.on('connect', () =>
  //   Logger.verbose('Connected to redis successfully'),
  // );

  app.use(helmet());
  app.use(
    session({
      secret: configService.getOrThrow('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
      // store: new RedisStore({client: redisClient as any}),
    }),
  );
  app.use(passport.session());
  app.use(compression());

  initSwaggerDocs(app);

  await app.listen(configService.get('PORT', 8080));
  Logger.log(`Server starts with ${AppMode} mode ...`);
}
