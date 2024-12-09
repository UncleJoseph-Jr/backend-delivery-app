import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const routePath = request.path;

    // Allow all requests under /api/auth/* (e.g., login, registration)
    if (routePath.startsWith('/api/auth')) {
      return true;
    }

    // Get the required roles from the route handler metadata
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // If no roles are required, allow access
    }

    // Retrieve the user's role from the request object
    const user = request.user;

    // If the user object does not exist or the role is not allowed, throw an exception
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied: You do not have the required role to access this endpoint.');
    }

    return true; // If the role matches, allow access
  }
}
