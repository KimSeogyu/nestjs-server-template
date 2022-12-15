import { getNodeEnv } from '@app/utils';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import SlackHook = require('winston-slack-webhook-transport');

export const createCustomLogger = (ENV_MODE: string, WEBHOOK_URL: string) =>
  WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'silly',
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike('Server', {
            prettyPrint: ENV_MODE !== 'prod',
            colors: ENV_MODE !== 'prod',
          }),
        ),
      }),
      new SlackHook({
        level: 'error',
        webhookUrl: WEBHOOK_URL,
        formatter: (data: SlackHook.TransformableInfo) => {
          return {
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text:
                    '```' +
                    `[${getNodeEnv().toUpperCase()}][${data.level.toUpperCase()}] ${
                      data.message
                    }` +
                    '```',
                },
              },
            ],
          };
        },
      }),
    ],
  });

export const initSwaggerDocs = (app: INestApplication) => {
  const swaggerCfg = new DocumentBuilder()
    .setTitle('Backend OPEN-API Document')
    .setDescription('API Specification for functions provided by this server')
    .setVersion('0.0.1')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerCfg);
  SwaggerModule.setup('api', app, document);
};
