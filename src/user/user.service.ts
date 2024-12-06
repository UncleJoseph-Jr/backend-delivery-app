import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,  // Service for database operations
    private jwtService: JwtService, // Service for handling JWT tokens
  ) {}

  // Function to register a new user
  async registerUser(data: { email: string; password: string; name: string }) {
    console.log('Received data:', data);  // Log the received data for debugging

    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Hash the user's password for secure storage
    if (!data.email || !data.name) {
      throw new Error('Email or name is missing');
    }

    // Check if the email already exists in the database
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    // Create a new user in the database
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'user', // Default role for new users
      },
    });
  }

  // Function to log in a user
  async loginUser(data: { email: string; password: string }) {
    // Ensure the email field is provided
    if (!data.email) {
      throw new Error('Email is required for login');
    }

    // Find the user by email in the database
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    // Throw an exception if the user is not found or password is invalid
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      // throw new Error('Invalid password');
      throw new UnauthorizedException('Invalid email or password');
    }

    // Create a JWT token for the user
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    // Return the login response with the token and user details
    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    };
  }

  // Function to retrieve all users from the database
  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
