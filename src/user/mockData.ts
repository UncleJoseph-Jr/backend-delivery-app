// src/user/mockData.ts
export const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'hashedPassword123', // Mock hashed password
    role: 'USER',
    isActive: true,
    verificationToken: 'sampleToken123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  export const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedPassword123',
      role: 'USER',
      isActive: true,
      verificationToken: 'sampleToken123',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'hashedPassword456',
      role: 'ADMIN',
      isActive: true,
      verificationToken: 'sampleToken456',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  
  export const mockLoginResponse = {
    message: 'Login successful',
    token: 'sample.jwt.token',
    user: {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'USER',
    },
  };
  