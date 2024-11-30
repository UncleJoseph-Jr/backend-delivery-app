import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CustomerController } from './customer.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleMiddleware } from '../middleware/role.middleware';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.user = { role: 'customer' }; // Mock user data
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();

    // Apply RoleMiddleware manually
    app.use(
      '/customer/profile',
      new RoleMiddleware(['customer']).use.bind(
        new RoleMiddleware(['customer']),
      ),
    );

    await app.init();
  });

  it('/customer/profile (GET) should allow access for customer role', () => {
    return request(app.getHttpServer())
      .get('/customer/profile')
      .expect(200)
      .expect({
        message: 'Profile retrieved successfully',
        user: { role: 'customer' },
      });
  });

  it('/customer/profile (GET) should deny access for non-customer role', () => {
    app.use(
      '/customer/profile',
      new RoleMiddleware(['admin']).use.bind(
        new RoleMiddleware(['admin']),
      ),
    );

    return request(app.getHttpServer())
      .get('/customer/profile')
      .expect(403)
      .expect({
        statusCode: 403,
        message: 'User does not have the required role',
        error: 'Forbidden',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
