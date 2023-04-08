import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service.js';

@Controller('')
@ApiTags('HEALTH')
export class HealthController {
  constructor(private readonly appService: HealthService) {}

  @Get(['', 'health'])
  getHello(): string {
    return this.appService.getHello();
  }
}
