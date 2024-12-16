// import { Test, TestingModule } from '@nestjs/testing';
// import { StoreService } from './store.service';

// describe('StoreService', () => {
//   let service: StoreService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [StoreService],
//     }).compile();

//     service = module.get<StoreService>(StoreService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });


import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from './store.service';
import { PrismaService } from '../prisma/prisma.service';

describe('StoreService', () => {
  let service: StoreService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreService, PrismaService],
    }).compile();

    service = module.get<StoreService>(StoreService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should add menu with restaurant', async () => {
    const createMenuDto = {
      name: 'Spaghetti Carbonara',
      description: 'Delicious pasta with creamy sauce.',
      price: 250,
      storeId: 1,
      restaurantId: '1',
    };

    prisma.menuItem.create = jest.fn().mockResolvedValue({
      ...createMenuDto,
      id: 1,
    });

    const result = await service.addMenu(createMenuDto);
    expect(result).toEqual(expect.objectContaining(createMenuDto));
    expect(prisma.menuItem.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          name: 'Spaghetti Carbonara',
          restaurant: { connect: { id: 1 } },
        }),
      }),
    );
  });
});
