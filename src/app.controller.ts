import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service.js';

@Controller('')
@ApiTags('APP')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(['', 'health'])
  getHello(): string {
    return this.appService.getHello();
  }
}
