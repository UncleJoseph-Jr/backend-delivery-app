// Data Transfer Object
export class CreateOrderDto {
  customerId: number; // ID ของลูกค้า
  restaurantId: number; // ID ของร้านอาหาร
  items: {
    menuItemId: number; // ID ของเมนู
    quantity: number; // จำนวนเมนูที่สั่ง
  }[];
}
