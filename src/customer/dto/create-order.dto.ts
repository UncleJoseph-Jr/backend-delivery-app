// Data Transfer Object
import { IsInt, IsArray, IsOptional } from 'class-validator';
// import { Isint}
export class CreateOrderDto {
  @IsInt()
  customerId: number; // ID ของลูกค้า
  
  @IsInt()
  restaurantId: number; // ID ของร้านอาหาร

  @IsArray()
  items: {
    menuItemId: number; // ID ของเมนู
    quantity: number; // จำนวนเมนูที่สั่ง
  }[];

  @IsOptional()
  @IsInt()
  driverId: number; // ตัวเลือกในการระบุไรเดอร์
}
