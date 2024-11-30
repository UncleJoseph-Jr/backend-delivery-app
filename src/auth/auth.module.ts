// import { Module } from "@nestjs/common";
// import { JwtModule } from "@nestjs/jwt";
// import { AuthService } from "./auth.service";
// import { AuthController } from "./auth.controller";
// import { PrismaModule } from "src/prisma/prisma.module";
// import { JwtStrategy } from "./jwt.strategy";
// import { PassportModule } from "@nestjs/passport";
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

// @Module({
//   imports: [
//     PassportModule,
//     PrismaModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'your-secret-key',
//       signOptions: { expiresIn: '1d'},
//     }),
//   ],
//   providers: [AuthService],
//   controllers: [AuthController],
//   exports: [JwtModule, AuthService],
// })
// export class AuthModule {}

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key', // ใช้ secret เดียวกันกับ JwtStrategy
      signOptions: { expiresIn: '60m' }, // กำหนดเวลาให้ token หมดอายุ
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // ลงทะเบียน JwtStrategy
  exports: [AuthService], // หากต้องการใช้งาน AuthService ในโมดูลอื่น
})
export class AuthModule {}