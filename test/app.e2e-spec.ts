import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ApiModule } from '../src/applications/api/api.module.js';
import { UsersService } from '../src/domain/users/users.service.js';
import { CreateUserDto } from '../src/domain/users/user.zod.js';
import { AuthService } from '../src/domain/auth/auth.service.js';

describe('HealthController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let authService: AuthService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
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
    await usersService.save(dto);
    return request(app.getHttpServer())
      .post('/auth/login')
      .auth(dto.username, dto.password)
      .expect(200);
  });

  it('/users (GET)', async () => {
    const dto = new CreateUserDto();
    dto.username = 'test';
    dto.password = '1234';
    const user = await usersService.save(dto);
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
