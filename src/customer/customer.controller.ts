import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  // Endpoint for registering a new customer
  // Receives data from the request body and calls the registerCustomer service function
  @Post('register')
  async registerCustomer(@Body() data: any) {
    return this.customerService.registerCustomer(data);
  }

  // Endpoint for updating the profile of a customer
  // Takes the customer ID from the route parameter and updated data from the request body
  // Calls the updateCustomerProfile service function to modify the profile
  @Put('profile/:id')
  async updateCustomerProfile(@Param('id') id: string, @Body() data: any) {
    return this.customerService.updateCustomerProfile(id, data);
  }

  // Endpoint for retrieving all available restaurants
  // This allows the customer to browse available restaurants and their menu items
  @Get('restaurants')
  async getAllRestaurants() {
    return this.customerService.getAllRestaurants();
  }
}
