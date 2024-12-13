import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new UnauthorizedException('Email alreade registered');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: hashedPassword,
          role: registerDto.role ? registerDto.role as Role : Role.CUSTOMER, // default role 'customer'
        },
      });
      return { message: 'User registered successfully', user };
    } catch (error) {
      throw new UnauthorizedException('Registration failed');
    }
  }

  async login(loginDto: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('password not fond');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is incorrect. Please try again.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    const token = this.jwtService.sign(payload);

    console.log('Generating token:', token); // Log the generated token

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };
  }
}
