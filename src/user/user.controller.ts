import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint สำหรับการลงทะเบียน
  @Post('register')
  async register(@Body() body) {
    return this.userService.registerUser(body);
  }

  // Endpoint สำหรับการเข้าสู่ระบบ
  @Post('login')
  async login(@Body() body) {
    return this.userService.loginUser(body);
  }
}
