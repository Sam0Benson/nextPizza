import { Prisma } from '@prisma/client';
import { categories, _ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: true, // Здесь теперь булевое значение
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: true, // Булевое значение
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Складной нож Honor Ajax',
      imageUrl:
        'https://img.nozhikov.ru/images/products/1/2925/789998445/DSC05498-Edit-Edit.jpg',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 7),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Нож Dagger',
      imageUrl:
        'https://img.nozhikov.ru/images/products/1/4611/629502467/203678.2048x2048.jpg',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 7),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Складной нож Five Knives 15',
      imageUrl:
        'https://img.nozhikov.ru/images/products/1/608/855433824/DSC09909-Edit.jpg',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 7),
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: 'Складной нож Five Knives 15',
      imageUrl:
        'https://img.nozhikov.ru/images/products/1/608/855433824/DSC09909-Edit.jpg',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 7),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Пицца "Сырная"
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://static.insales-cdn.com/r/Igx7a8HKYP0/rs:fit:1000:0:1/q:100/plain/images/products/1/6970/904469306/DSC08191.jpg@webp',
      },
      {
        previewImageUrl:
          'https://static.insales-cdn.com/images/products/1/7133/880278493/DSC08293__2_.jpg',
      },
      {
        previewImageUrl:
          'https://static.insales-cdn.com/images/products/1/7431/835755271/3__9_.jpg',
      },
      {
        previewImageUrl:
          'https://static.insales-cdn.com/r/AThmZSL1O1I/rs:fit:1000:0:1/q:100/plain/images/products/1/3196/915991676/DSC09476.jpg@webp',
      },
      {
        previewImageUrl:
          'https://static.insales-cdn.com/r/qh75IE5DBks/rs:fit:1000:0:1/q:100/plain/images/products/1/6158/618502158/DSC03422.jpg@webp',
      },
      {
        previewImageUrl:
          'https://static.insales-cdn.com/r/qK4L2mJ0YZI/rs:fit:1000:0:1/q:100/plain/images/products/1/4808/736613064/DSC09448__2_.jpg@webp',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          'https://static.insales-cdn.com/r/Igx7a8HKYP0/rs:fit:1000:0:1/q:100/plain/images/products/1/6970/904469306/DSC08191.jpg@webp',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://static.insales-cdn.com/images/products/1/7133/880278493/DSC08293__2_.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://static.insales-cdn.com/images/products/1/7431/835755271/3__9_.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://static.insales-cdn.com/r/AThmZSL1O1I/rs:fit:1000:0:1/q:100/plain/images/products/1/3196/915991676/DSC09476.jpg@webp',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://static.insales-cdn.com/r/qh75IE5DBks/rs:fit:1000:0:1/q:100/plain/images/products/1/6158/618502158/DSC03422.jpg@webp',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://static.insales-cdn.com/r/qK4L2mJ0YZI/rs:fit:1000:0:1/q:100/plain/images/products/1/4808/736613064/DSC09448__2_.jpg@webp',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
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
