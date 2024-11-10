import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesGuard } from './auth/roles.guard';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, CustomerModule],
  controllers: [AppController],  // นำ AppController กลับมา
  providers: [
    AppService,  // นำ AppService กลับมา
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
