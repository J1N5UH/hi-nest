import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, //  정의되지 않은 속성이 요청 데이터에 포함되는 경우 해당 속성을 무시
        forbidNonWhitelisted: true, //누군가 이상한 요청을 보내면 리퀘스트 자체를 막아버림
        transform: true, //유저들이 보단 요청을 우리가 원하는 타입으로 변환해줌
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test movie',
          genres: ['test'],
          year: 2000,
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test movie',
          genres: ['test'],
          year: 2000,
          other: 'thing',
        })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
  });
  it('PATCH 200', () => {
    return request(app.getHttpServer())
      .patch('/movies/1')
      .send({ title: 'Updated Test' })
      .expect(200);
  });
  it('DELETE', () => {
    return request(app.getHttpServer()).delete('/movies/1').expect(200);
  });
});
