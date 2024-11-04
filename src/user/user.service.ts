import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // ฟังก์ชันการลงทะเบียน
  async registerUser(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role, // กำหนดบทบาท เช่น customer, store, driver, admin
      },
    });
  }

  // ฟังก์ชันการเข้าสู่ระบบ
  async loginUser(data: any) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user && (await bcrypt.compare(data.password, user.password))) {
      // สร้าง JWT Token ให้ผู้ใช้หลังเข้าสู่ระบบสำเร็จ
      const token = this.jwtService.sign({ userId: user.id, role: user.role });
      return { message: 'Login successful', token };
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
