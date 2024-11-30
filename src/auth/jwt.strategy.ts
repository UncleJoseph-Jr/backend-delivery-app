import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ดึง JWT จาก header
      ignoreExpiration: false, // ไม่อนุญาตให้ใช้ token ที่หมดอายุ
      secretOrKey: process.env.JWT_SECRET || 'your_secret_key', // กำหนด secret key
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // ส่งคืนข้อมูลผู้ใช้งาน (สามารถเพิ่มฟิลด์ที่จำเป็นได้)
    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role, // เพิ่มฟิลด์ role สำหรับ middleware
    };
  }
}
