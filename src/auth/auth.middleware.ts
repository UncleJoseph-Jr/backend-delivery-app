import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: any, res: any, next: () => void) {
    // ข้ามการตรวจสอบ JWT Token สำหรับเส้นทาง /api/auth
    if (req.path.startsWith('/api/auth')) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
    next();
  }
}
