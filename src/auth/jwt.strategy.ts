import { Injectable } from '@nestjs/common';
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
      throw new Error('User not found');
    }

    return { 
      userId: user.id, 
      username: user.name,
      email: user.email,
      role: user.role
     }; // return user object
  }
}
