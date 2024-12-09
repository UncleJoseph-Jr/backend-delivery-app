import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';


export const ROLES_KEY = 'roles';

// Roles decorator: รองรับทั้ง Role (จาก enum) และ string
export const Roles = (...roles: (Role | string)[]) => SetMetadata(ROLES_KEY, roles);
