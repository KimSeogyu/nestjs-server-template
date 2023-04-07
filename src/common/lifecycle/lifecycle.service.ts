import {
  BeforeApplicationShutdown,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class LifecycleService
  implements
    OnApplicationShutdown,
    OnApplicationBootstrap,
    OnModuleInit,
    OnModuleDestroy,
    BeforeApplicationShutdown
{
  private readonly logger = new Logger(LifecycleService.name);

  onModuleInit() {
    this.logger.debug(`${this.onModuleInit.name} called`);
    return;
  }

  onApplicationBootstrap() {
    this.logger.debug(`${this.onApplicationBootstrap.name} called`);
    if (process.send) {
      process.send(`ready`);
      this.logger.warn(`app send ready to pm2`);
    }
  }

  onModuleDestroy() {
    this.logger.debug(`${this.onModuleDestroy.name} called`);
    return;
  }

  beforeApplicationShutdown(signal?: string) {
    this.logger.debug(`${this.beforeApplicationShutdown.name} called`);
    return signal;
  }

  onApplicationShutdown(signal?: string) {
    this.logger.debug(`${this.onApplicationShutdown.name} called`);
    return signal;
  }
}
