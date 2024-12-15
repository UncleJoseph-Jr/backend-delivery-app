import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesGuard } from './auth/roles.guard';
import { CustomerModule } from './customer/customer.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtAuthGuard } from './auth/auth.guard';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    PrismaModule, 
    CustomerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d'},
    }),
    StoreModule,
    ],
  controllers: [AppController],
  providers: [
    JwtAuthGuard,
    JwtService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes({ path: 'customer/*', method: RequestMethod.ALL });
  }
}
