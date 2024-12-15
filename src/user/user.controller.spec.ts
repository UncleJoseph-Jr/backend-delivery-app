// src/user/user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { mockUser, mockUsers, mockLoginResponse } from './mockData';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            registerUser: jest.fn(),
            loginUser: jest.fn(),
            getAllUsers: jest.fn(),
            updateUserRole: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should register a new user', async () => {
    jest.spyOn(userService, 'registerUser').mockResolvedValue(mockUser);
    const result = await userController.register({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });
    expect(result).toEqual(mockUser);
  });

  it('should login a user', async () => {
    jest.spyOn(userService, 'loginUser').mockResolvedValue(mockLoginResponse);
    const result = await userController.login({
      email: 'johndoe@example.com',
      password: 'password123',
    });
    expect(result).toEqual(mockLoginResponse);
  });

  it('should fetch all users', async () => {
    jest.spyOn(userService, 'getAllUsers').mockResolvedValue(mockUsers);
    const result = await userController.getAllUsers();
    expect(result).toEqual(mockUsers);
  });

  it('should update user role', async () => {
    const userId = '1';
    const newRole = 'ADMIN';
    jest.spyOn(userService, 'updateUserRole').mockResolvedValue(mockUser);
    const result = await userController.changeUserRole(userId, { role: newRole });
    expect(result).toEqual(mockUser);
  });
});
