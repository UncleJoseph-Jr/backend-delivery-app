import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// กำหนดประเภทของ `user` ที่อยู่ใน Request
interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    username: string;
    email: string;
    role: string;
  };
}

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(private readonly allowedRoles: string[]) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const user = req.user; // req.user ตอนนี้สามารถเข้าถึงได้อย่างถูกต้อง

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // ตรวจสอบว่าผู้ใช้มีบทบาทที่อนุญาต
    if (!this.allowedRoles.includes(user.role)) {
      throw new ForbiddenException('User does not have the required role');
    }

    next();
  }
}
