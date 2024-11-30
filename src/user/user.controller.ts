import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.enum';
import { LoginDto } from 'src/auth/dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint สำหรับการลงทะเบียน
  @Post('register')
  async register(@Body() body) {
    return this.userService.registerUser(body);
  }

  // Endpoint สำหรับการเข้าสู่ระบบ
  // @Post('login')
  // async login(@Body() body) {
  //   return this.userService.loginUser(body);
  // }
  @Post('login')
  async login(@Body() LoginDto: { email: string; password: string }) {
    return this.userService.loginUser(LoginDto);
  }

  // Endpoint นี้เข้าถึงได้เฉพาะ Admin เท่านั้น
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
