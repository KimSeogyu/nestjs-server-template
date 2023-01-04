import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';
import { UsersService } from '@app/domain/users/users.service';
import { CreateUserDto } from '@app/domain/users/zod/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    usersService = app.get(UsersService);
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
      .auth('test', '1234')
      .expect(200);
  });
});
