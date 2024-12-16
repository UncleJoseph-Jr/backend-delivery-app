import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  // เพิ่มเมนูอาหาร/สินค้า
  async addMenu(createMenuDto: CreateMenuDto) {
    const { restaurantId, ...menuData } = createMenuDto;

    return this.prisma.menuItem.create({
      data: {
        ...menuData,
        restaurant: {
          connect: { id: parseInt(restaurantId) }, // เชื่อมต่อกับ Restaurant
        },
      },
    });
  }

  // ดึงข้อมูลคำสั่งซื้อของร้านค้า
  async getOrders(storeId: number) {
    return this.prisma.order.findMany({
      where: { storeId },
      include: {
        items: true, // รวมรายการสินค้าในคำสั่งซื้อ
      },
    });
  }

  // อัปเดตสถานะคำสั่งซื้อ
  async updateOrderStatus(orderId: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: updateOrderStatusDto.status },
    });
  }
}
