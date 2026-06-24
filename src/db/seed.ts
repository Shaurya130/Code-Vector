import { prisma } from "../lib/prisma.js";

const TOTAL_PRODUCTS = 200_000;
const BATCH_SIZE = 5000;

const categories: string[] = [
  "Electronics",
  "Books",
  "Clothing",
  "Sports",
  "Home",
  "Beauty",
  "Toys",
  "Food",
];

function randomCategory(): string {
  return categories[
    Math.floor(Math.random() * categories.length)
  ]!;
}

function randomPrice() {
  return Number(
    (Math.random() * 5000 + 100).toFixed(2)
  );
}

async function seed() {
  console.time("seed");

  await prisma.product.deleteMany();

  const startDate = new Date("2025-01-01");

  for (
    let batchStart = 0;
    batchStart < TOTAL_PRODUCTS;
    batchStart += BATCH_SIZE
  ) {
    const products = [];

    for (
      let i = 0;
      i < BATCH_SIZE &&
      batchStart + i < TOTAL_PRODUCTS;
      i++
    ) {
      const productNumber = batchStart + i + 1;

      const createdAt = new Date(
        startDate.getTime() +
          productNumber * 60 * 1000
      );

      const updatedAt = new Date(
        createdAt.getTime() +
          Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      );

      products.push({
        name: `Product ${productNumber}`,
        category: randomCategory(),
        price: randomPrice(),
        createdAt,
        updatedAt,
      });
    }

    await prisma.product.createMany({
      data: products,
    });

    console.log(
      `Inserted ${Math.min(
        batchStart + BATCH_SIZE,
        TOTAL_PRODUCTS
      )}/${TOTAL_PRODUCTS}`
    );
  }

  console.timeEnd("seed");
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });