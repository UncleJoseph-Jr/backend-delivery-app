import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUsers() {
  for (let i = 1; i <= 10; i++) {
    await prisma.user.create({
      data: {
        name: `user${i}`,
        password: `password${i}`,
        email: `user${i}@example.com`,
        role: 'USER', // สามารถปรับเป็น 'ADMIN' ได้
      },
    });
  }
  console.log('Users created!');
}


async function createRestaurants() {
    for (let i = 1; i <= 10; i++) {
      await prisma.restaurant.create({
        data: {
          name: `Restaurant ${i}`,
          location: `Location ${i}`,
        },
      });
    }
    console.log('Restaurants created!');
  }
  

  async function createMenuItems() {
    for (let i = 1; i <= 10; i++) {
        await prisma.menuItem.create({
            data: {
                name: `Dish ${i}`,
                price: Math.floor(Math.random() * 100) + 10,
                restaurantId: i,
            },
        });
    }
    console.log('Menu items created!');
  }

  async function createOrders() {
  for (let i = 1; i <= 10; i++) {
    const menuItems = await prisma.menuItem.findMany({
      where: {
        restaurantId: i,
      },
    });

    const items = menuItems.map(item => ({
      menuItemId: item.id,
      quantity: Math.floor(Math.random() * 3) + 1, // random quantity between 1 and 3
    }));

    await prisma.order.create({
      data: {
        userId: i, // assuming userId matches
        restaurantId: i,
        totalPrice: items.reduce((total, item) => total + item.quantity * menuItems.find(menu => menu.id === item.menuItemId)?.price!, 0),
        status: 'PENDING',
        items: {
          create: items,
        },
      },
    });
  }
  console.log('Orders created!');
}

async function main() {
    await createUsers();
    await createRestaurants();
    await createMenuItems();
    await createOrders();

    console.log('All data created!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });