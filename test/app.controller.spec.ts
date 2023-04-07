import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { HealthController } from '../src/domain/health/health.controller.js';
import { HealthService } from '../src/domain/health/health.service.js';

describe('AppController', () => {
  let appController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    appController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).to.equal('Hello World!');
    });
  });
});
