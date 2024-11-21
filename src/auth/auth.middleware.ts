import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  
  use(req: any, res: any, next: (error?: Error | any) => void) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Authorization token is missing or invalid.');
      }

      const token = authHeader.split(' ')[1];

      try {
        const decoded = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET || 'your-secrete-key'
        });

        req.user = decoded;
        next()
      } catch (err) {
        console.log('Token verifycation error:', err);
        throw new UnauthorizedException('Invalid token.');
      }
    } catch (error) {
      next(error);
    }
  }
}
