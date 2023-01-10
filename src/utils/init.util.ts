import { NODE_ENV } from '../constants/index.js';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import SlackHook from 'winston-slack-webhook-transport';

export const createCustomLogger = (ENV_MODE: string, WEBHOOK_URL: string) => {
  const transports: any[] = [
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
  ];
  if (ENV_MODE === 'prod') {
    transports.push(
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
                    `[${NODE_ENV.toUpperCase()}][${data.level.toUpperCase()}] ${
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
