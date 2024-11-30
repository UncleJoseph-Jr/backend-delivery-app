// import { Injectable } from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}

import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard เป็นคลาสที่ใช้เพื่อป้องกัน API ด้วยการตรวจสอบ JWT
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Override ฟังก์ชัน canActivate เพื่อปรับพฤติกรรมเพิ่มเติมหากจำเป็น
   */
  canActivate(context: ExecutionContext) {
    // สามารถเพิ่ม logic เพิ่มเติมได้ก่อนที่จะเรียก AuthGuard
    return super.canActivate(context);
  }

  /**
   * Handle error เมื่อการตรวจสอบ JWT ล้มเหลว
   */
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new Error('Unauthorized');
    }
    return user;
  }
}
