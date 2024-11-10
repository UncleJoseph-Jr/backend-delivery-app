import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  // ฟังก์ชันการลงทะเบียนลูกค้าใหม่
  async registerCustomer(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'customer',
      },
    });
  }

  // ฟังก์ชันการอัปเดตโปรไฟล์ของลูกค้า
  async updateCustomerProfile(id: string, data: any) {

    const existingUser = await this.prisma.user.findUnique({
        where: { id: parseInt(id) },
    });

    if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return this.prisma.user.update({
      where: { id: parseInt(id, 10) }, // แปลง id เป็น Int ด้วย parseInt
      data: {
        name: data.name,
        email: data.email,
        // สามารถเพิ่มฟิลด์ที่ต้องการอัปเดตอื่นๆ ได้ที่นี่
      },
    });
  }

  // async getAllRestaurants() {
  //   return this.prisma.restaurant.findMany({
  //     include: {
  //       menuItems: true,
  //     }
  //   });
  // }

  async getAllRestaurants() {
  const restaurants = await this.prisma.restaurant.findMany({
    include: {
      menuItems: true,
    },
  });
  console.log("Fetched restaurants:", restaurants); // เพิ่มการ log ข้อมูล
  return restaurants;
}


  
}
