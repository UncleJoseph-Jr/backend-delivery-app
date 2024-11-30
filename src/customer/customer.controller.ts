import { Controller, Post, Body, Put, Param, Get, Req, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleMiddlewareFatory } from 'src/middleware/role.factory';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Endpoint for retrieving customer profile (requires customer role)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    if (req.user.role !== 'customer') {
      throw new Error('Access denied: Only customers can access this endpoint');
    }
    console.log('Request User:', req.user);
    return {
      message: 'Profile retrieved successfully',
      user: req.user,
    };
  }

  // Endpoint for registering a new customer
  @Post('register')
  async registerCustomer(@Body() data: any) {
    return this.customerService.registerCustomer(data);
  }

  // Endpoint for placing a new order (requires customer role)
  @UseGuards(JwtAuthGuard)
  @Post('order')
  async placeOrder(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
    if (req.user.role !== 'customer') {
      throw new Error('Access denied: Only customers can place orders');
    }
    return this.customerService.placeOrder(createOrderDto);
  }

  // Endpoint for updating customer profile (requires customer role)
  @UseGuards(JwtAuthGuard)
  @Put('profile/:id')
  async updateCustomerProfile(
    @Req() req: any,
    @Param('id') id: string,
    @Body() data: any,
  ) {
    if (req.user.role !== 'customer') {
      throw new Error('Access denied: Only customers can update profiles');
    }
    return this.customerService.updateCustomerProfile(id, data);
  }

  // Endpoint for retrieving all restaurants and their menu items
  @Get('restaurants')
  async getAllRestaurants() {
    return this.customerService.getAllRestaurants();
  }

  // Endpoint for retrieving order history of a customer (requires customer role)
  @UseGuards(JwtAuthGuard)
  @Get(':customerId/orders')
  async getOrderHistory(
    @Req() req: any,
    @Param('customerId') customerId: string,
  ) {
    if (req.user.role !== 'customer') {
      throw new Error('Access denied: Only customers can access order history');
    }
    return this.customerService.getOrderHistory(parseInt(customerId));
  }
}