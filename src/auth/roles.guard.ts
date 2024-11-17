import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const routePath = request.path;

    // ข้ามตรวจสอบสำหรับ /api/auth/*
    if (routePath.startsWith('/api/auth')) {
      return true;
    }

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // ถ้าไม่มีบทบาทที่กำหนดไว้ ให้ผ่าน
    }

    const user = request.user;
    return requiredRoles.includes(user?.role);
  }
}
