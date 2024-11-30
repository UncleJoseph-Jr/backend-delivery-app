import { RoleMiddleware } from "./role.middleware";

export function RoleMiddlewareFatory(allowedRoles: string[]) {
    return new RoleMiddleware(allowedRoles);
}