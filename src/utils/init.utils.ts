import { AppMode } from '../common/constants.js';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import {
  SlackTransport,
  TransformableInfo,
} from 'winston-slack-webhook-transport-ts';

export const createCustomLogger = (WEBHOOK_URL: string) => {
  const transports: any[] = [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('Server', {
          prettyPrint: AppMode !== 'prod',
          colors: AppMode !== 'prod',
        }),
      ),
    }),
  ];
  if (AppMode === 'prod') {
    transports.push(
      new SlackTransport({
        level: 'error',
        webhookUrl: WEBHOOK_URL,
        formatter: (data: TransformableInfo) => {
          return {
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text:
                    '```' +
                    `[${AppMode.toUpperCase()}][${data.level.toUpperCase()}] ${
                      data.message
                    }` +
                    '```',
                },
              },
            ],
          };
        },
      }),
    );
  }
  return WinstonModule.createLogger({
    transports: transports,
  });
};

export const initSwaggerDocs = (app: INestApplication) => {
  patchNestjsSwagger();

  const swaggerCfg = new DocumentBuilder()
    .setTitle('Backend OPEN-API Document')
    .setDescription('API Specification for functions provided by this server')
    .setVersion('0.0.1')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerCfg);
  SwaggerModule.setup('api', app, document);

  return true;
};
