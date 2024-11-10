import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // เพิ่มข้อมูลร้านอาหารตัวอย่าง
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Sample Restaurant',
      address: '123 Sample St',
      location: 'City Center',
      menuItems: {
        create: [
          { name: 'Sample Dish 1', price: 10.0 },
          { name: 'Sample Dish 2', price: 15.0 },
          { name: 'Sample Dish 3', price: 20.0 },
          { name: 'Sample Dish 4', price: 25.0 },
          { name: 'Sample Dish 5', price: 30.0 },
          { name: 'Sample Dish 6', price: 35.0 },
          { name: 'Sample Dish 7', price: 40.0 },
        ],
      },
    },
  });

  console.log('Sample data added:', restaurant);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
