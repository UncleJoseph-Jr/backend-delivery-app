// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { PrismaModule } from '../prisma/prisma.module';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { UserService } from '../user/user.service';
// import { JwtStrategy } from './jwt.strategy';

// @Module({
//   imports: [
//     PrismaModule, // Import PrismaModule
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'your-secret-key',
//       signOptions: { expiresIn: '7d' },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, UserService, JwtStrategy],
//   exports: [AuthService],
// })
// export class AuthModule {}


import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d'},
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
