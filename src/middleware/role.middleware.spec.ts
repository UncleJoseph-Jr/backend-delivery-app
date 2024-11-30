import { RoleMiddleware } from "./role.middleware";
import { ForbiddenException } from "@nestjs/common";

describe('RoleMiddleware', () => {
    const allowedRoles = ['admin', 'customer'];
    let middleware: RoleMiddleware;

    beforeEach(() => {
        middleware = new RoleMiddleware(allowedRoles);
    });

    it('should allow access if user has the correct role', () => {
        const req: any = {
            user: {
                role: 'admin',
            },
        };
        const res: any = {};
        const next = jest.fn();

        middleware.use(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if user does not have the correct role', () => {
        const req: any = {
            user: {
                role: 'driver',
            },
        };
        const res: any = {};
        const next = jest.fn();

        expect(() => middleware.use(req, res, next)).toThrow(
            ForbiddenException,
        );
    });

    it('should throw ForbiddenException if user is not authenticated', () => {
        const req: any = {};
        const res: any = {};
        const next = jest.fn();

        expect(() => middleware.use(req, res, next)).toThrow(
            ForbiddenException,
        );
    });
});