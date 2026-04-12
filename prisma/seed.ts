import { prisma } from "../lib/prisma";
import { vendors } from "../lib/data/vendors";
import { products } from "../lib/data/products";

async function main() {
  console.log("Seeding started...");

  // Seed Vendors
  for (const vendor of vendors) {
    await prisma.vendor.upsert({
      where: { id: vendor.id },
      update: {},
      create: {
        id: vendor.id,
        slug: vendor.slug,
        name: vendor.name,
        logo: vendor.logo,
        heroImage: vendor.heroImage,
        description: vendor.description,
        createdAt: vendor.createdAt,
      },
    });
  }

  // Seed Products
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        vendorId: product.vendorId,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        size: product.size,
        color: product.color,
        inStock: product.inStock,
        tags: product.tags?.join(","),
        createdAt: product.createdAt,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
