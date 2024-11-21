import { Controller, Post, Body, Put, Param, Get, Req, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('api/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Endpoint for retrieving customer profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    console.log('Request User:', req.user);
    return {
      message: 'Profile retrieved successfully',
      user: req.user
    };
  }

  // Endpoint for registering a new customer
  @Post('register')
  async registerCustomer(@Body() data: any) {
    return this.customerService.registerCustomer(data);
  }

  // Endpoint for placing a new order
  @Post('order')
  async placeOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.customerService.placeOrder(createOrderDto);
  }

  // Endpoint for updating customer profile
  @Put('profile/:id')
  async updateCustomerProfile(@Param('id') id: string, @Body() data: any) {
    return this.customerService.updateCustomerProfile(id, data);
  }

  // Endpoint for retrieving all restaurants and their menu items
  @Get('restaurants')
  async getAllRestaurants() {
    return this.customerService.getAllRestaurants();
  }

  // Endpoint for retrieving order history of a customer
  @Get(':customerId/orders')
  async getOrderHistory(@Param('customerId') customerId: string) {
    return this.customerService.getOrderHistory(parseInt(customerId));
  }
}
