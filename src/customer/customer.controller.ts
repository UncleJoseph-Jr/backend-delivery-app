import { Body, Controller, Post, Put, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Endpoint สำหรับลงทะเบียนลูกค้าใหม่
  @Post('register')
  async registerCustomer(@Body() data: any) {
    return this.customerService.registerCustomer(data);
  }

  // Endpoint สำหรับอัปเดตโปรไฟล์ของลูกค้า
  @Put('profile/:id')
  async updateCustomerProfile(
    @Param('id') id: string,
    @Body() updateData: any,
  ) {
    return this.customerService.updateCustomerProfile(id, updateData);
  }
}
