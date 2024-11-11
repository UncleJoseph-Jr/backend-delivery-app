import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  // Function to register a new customer
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

  // Function to update the customer's profile information
  async updateCustomerProfile(id: string, data: any) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  // Function to fetch all restaurants and their menu items
  async getAllRestaurants() {
    const restaurants = await this.prisma.restaurant.findMany({
      include: {
        menuItems: true,
      },
    });
    console.log("Fetched restaurants:", restaurants);
    return restaurants;
  }

  // Function to place an order by a customer
  async placeOrder(createOrderDto: CreateOrderDto) {
    const { customerId, restaurantId, items, driverId } = createOrderDto;

    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
      const menuItem = await this.prisma.menuItem.findUnique({
        where: { id: item.menuItemId },
      });

      if (!menuItem) {
        throw new Error(`Menu item with ID ${item.menuItemId} not found`);
      }

      totalPrice += menuItem.price * item.quantity;

      orderItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: menuItem.price,
      });
    }

    const shippingFee = 20;
    totalPrice += shippingFee;

    const order = await this.prisma.order.create({
      data: {
        user: { connect: { id: customerId } },
        restaurantId: restaurantId,
        totalPrice: totalPrice,
        shippingFee: shippingFee,
        status: 'PENDING',
        driver: { connect: { id: driverId } },
        items: {
          create: orderItems,
        },
      },
    });

    return order;
  }
}
