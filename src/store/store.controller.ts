import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  // เพิ่มเมนูอาหาร/สินค้า
  @Post('menu')
  async addMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.storeService.addMenu(createMenuDto);
  }

  // ดึงข้อมูลคำสั่งซื้อของร้านค้า
  @Get('orders/:storeId')
  async getOrders(@Param('storeId') storeId: string) {
    return this.storeService.getOrders(+storeId);
  }

  // อัปเดตสถานะคำสั่งซื้อ
  @Patch('orders/:orderId')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.storeService.updateOrderStatus(+orderId, updateOrderStatusDto);
  }
}