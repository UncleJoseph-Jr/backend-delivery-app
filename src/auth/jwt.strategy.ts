import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'YOUR_SECRET_KEY', // ตรวจสอบว่าใช้ secret ที่ถูกต้อง
    });
  }

  async validate(payload: any) {
    // ตรวจสอบ payload ที่ส่งกลับมา
    console.log('Payload:', payload);
    
    // ควรจะส่งข้อมูลผู้ใช้ที่มี role กลับไป
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}