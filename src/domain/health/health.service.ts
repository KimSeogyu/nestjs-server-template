import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHello(): string {
    return 'Hello World!';
  }
}
