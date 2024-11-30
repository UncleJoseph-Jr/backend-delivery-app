// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
//     });
//   }

//   async validate(payload: any) {
//     // คืนค่าผู้ใช้จากข้อมูล payload ที่อยู่ใน JWT
//     console.log('JWT Payload');
//     return { userId: payload.sub, email: payload.email, role: payload.role };
//   }
// }

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ดึง JWT จาก header
      ignoreExpiration: false, // ไม่อนุญาตให้ใช้ token ที่หมดอายุ
      secretOrKey: process.env.JWT_SECRET || 'your_secret_key', // กำหนด secret key
    });
  }

  async validate(payload: any) {
    // payload คือข้อมูลที่ถูก encode อยู่ใน token
    return { userId: payload.sub, username: payload.username }; // return user object
  }
}
