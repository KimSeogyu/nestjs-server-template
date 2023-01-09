import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';
import { UsersService } from '@app/domain/users/users.service';
import { CreateUserDto } from '@app/domain/users/zod/user.zod';
import { AuthService } from '@app/domain/auth/auth.service';
import moment from 'moment';
import { expect } from 'chai';
import { sleep } from '@app/utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let authService: AuthService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    usersService = app.get(UsersService);
    authService = app.get<AuthService>(AuthService);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  it('/auth/login (POST)', async () => {
    const dto = new CreateUserDto();
    dto.username = 'test';
    dto.password = '1234';
    await usersService.create(dto);
    return request(app.getHttpServer())
      .post('/auth/login')
      .auth(dto.username, dto.password)
      .expect(200);
  });

  it('/users (GET)', async () => {
    const dto = new CreateUserDto();
    dto.username = 'test';
    dto.password = '1234';
    const user = await usersService.create(dto);
    const { accessToken } = await authService.login({
      username: user.username,
      id: +user.id,
    });
    return request(app.getHttpServer())
      .get('/users')
      .auth(accessToken, { type: 'bearer' })
      .expect(200);
  });
});
