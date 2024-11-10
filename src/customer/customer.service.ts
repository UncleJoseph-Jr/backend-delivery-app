import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateOrderDto } from './dto/create-order.dto';
import { connect } from 'http2';
import { create } from 'domain';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  // Function to register a new customer
  async registerCustomer(data: any) {
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create and save a new user in the database
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'customer', // Setting role as 'customer'
      },
    });
  }

  // Function to update the customer's profile information
  async updateCustomerProfile(id: string, data: any) {
    // Check if the user exists in the database
    const existingUser = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    // If the user does not exist, throw a NotFoundException
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update the user's profile with the provided data
    return this.prisma.user.update({
      where: { id: parseInt(id, 10) }, // Ensure the id is parsed as integer
      data: {
        name: data.name,
        email: data.email,
        // You can add other fields to update here
      },
    });
  }

  // Function to fetch all restaurants and their menu items
  async getAllRestaurants() {
    // Retrieve all restaurants including their menu items
    const restaurants = await this.prisma.restaurant.findMany({
      include: {
        menuItems: true, // Include menu items for each restaurant
      },
    });
    console.log("Fetched restaurants:", restaurants); // Log the fetched data for debugging
    return restaurants;
  }

  // Function to place an order by a customer
  async placeOrder(createOrderDto: CreateOrderDto) {
    const { customerId, restaurantId, items } = createOrderDto;

    // Check if the restaurant exists
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    // Initialize an array to hold the order items and the total price
    const orderItems = [];
    let totalPrice = 0;

    // Iterate through the items to verify and calculate the total price
    for (const item of items) {
      // Check if the menu item exists
      const menuItem = await this.prisma.menuItem.findUnique({
        where: { id: item.menuItemId },
      });

      // If the menu item is not found, throw an error
      if (!menuItem) {
        throw new Error(`Menu item with ID ${item.menuItemId} not found`);
      }

      // Calculate the price for the item
      totalPrice += menuItem.price * item.quantity;

      // Add the order item to the list
      orderItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: menuItem.price,
      });
    }

    // Save the new order to the database
    // const order = await this.prisma.order.create({
    //   data: {
    //     userId: customerId,
    //     restaurantId,
    //     totalPrice, // Total price for the order
    //     status: 'processing', // Initial status of the order
    //     items: {
    //       create: orderItems, // Create the items in the order
    //     },
    //   },
    // });
  //   const order = await this.prisma.order.create({
  //     userId: customerId,            // ตรวจสอบให้แน่ใจว่าใช้ฟิลด์ที่ตรงกัน
  //       data: {
  //     restaurantId,
  //     totalPrice,
  //     status: 'processing',
  //     items: {
  //        create: orderItems,
  //      },
  //   },
  // });

    const order = await this.prisma.order.create({
      data: {
        user: {
          connect: { id: customerId }
        },
        restaurantId,
        totalPrice,
        status: 'PENDING',
        items: {
          create: items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            // price: item.price,
          })),
        },
      },
    });

    // Return the created order
    return order;
  }
}
