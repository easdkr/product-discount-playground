import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { appInitializor } from '../src/app.initializor';

describe('Product(v1) (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appInitializor(app);
    await app.init();
  });

  describe('/v1/product (POST)', () => {
    const path = '/v1/product';

    it('should create a product', () => {
      return request(app.getHttpServer())
        .post(path)
        .send({
          name: 'product1',
          discountPolicyId: 1,
          price: 10000,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({
            id: expect.any(Number),
          });
        });
    });
  });

  describe('/v1/product/:id (GET)', () => {
    const path = '/v1/product';

    it('should get a product', async () => {
      const createResponse = await request(app.getHttpServer())
        .post(path)
        .send({
          name: 'product2',
          discountPolicyId: 1,
          price: 10000,
        });

      return request(app.getHttpServer())
        .get(`${path}/${createResponse.body.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            id: createResponse.body.id,
            name: 'product2',
            price: 10000,
            discountPrice: 9000,
          });
        });
    });
  });
});
