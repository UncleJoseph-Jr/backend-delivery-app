import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('StoreController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/store/addMenu (POST)', () => {
    return request(app.getHttpServer())
      .post('/store/addMenu')
      .send({
        name: 'Spaghetti Carbonara',
        description: 'Delicious pasta with creamy sauce.',
        price: 250,
        storeId: 1,
        restaurantId: '1',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Spaghetti Carbonara');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
