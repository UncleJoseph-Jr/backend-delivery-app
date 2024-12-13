import { Controller, Get, Post, Body, UseGuards, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '@prisma/client';
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
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.userService.loginUser(loginDto);
  }

  // Endpoint สำหรับดึงข้อมูลผู้ใช้ทั้งหมด (เฉพาะ Admin เท่านั้น)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  // Endpoint สำหรับเปลี่ยน Role ของผู้ใช้ (เฉพาะ Admin เท่านั้น)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/role')
  async changeUserRole(
    @Param('id') userId: string,
    @Body('role') newRole: string,
  ) {
    console.log('Request to change role for user ID:', userId);
    console.log('New role requested:', newRole);

    // แปลง newRole เป็น Role Enum
    const role: Role = Role[newRole.toUpperCase() as keyof typeof Role];

    // ตรวจสอบว่า role ที่แปลงมาเป็นค่าที่ถูกต้องหรือไม่
    if (!role) {
      throw new Error('Invalid role');
    }

    // เรียกใช้ฟังก์ชัน updateUserRole ด้วย role ที่แปลงแล้ว
    const updateUser = await this.userService.updateUserRole(userId, role);

    console.log('Updated user:', updateUser);

    return updateUser;
  }
}
