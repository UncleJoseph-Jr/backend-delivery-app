import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // ฟังก์ชันการลงทะเบียน
  async registerUser(data: any) {
  // ตรวจสอบข้อมูลที่ได้รับ
  console.log("Received data:", data);
  
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // ตรวจสอบว่าข้อมูล name และ email ถูกต้อง
  if (!data.email || !data.name) {
    throw new Error("Email or name is missing");
  }

  return this.prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });
}

  // ฟังก์ชันการเข้าสู่ระบบ
  async loginUser(data: any) {
  // ตรวจสอบว่ามีค่า email ถูกต้อง
  if (!data.email) {
    throw new Error("Email is required for login");
  }

  const user = await this.prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // สร้าง token หรือทำขั้นตอนอื่น ๆ ที่ต้องการ
  return { message: "Login successful" };
}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

}
