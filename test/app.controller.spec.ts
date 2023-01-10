import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { AppController } from '../src/app.controller.js';
import { AppService } from '../src/app.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).to.equal('Hello World!');
    });
  });
});
