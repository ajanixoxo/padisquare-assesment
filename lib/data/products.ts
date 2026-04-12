import { prisma } from "@/lib/prisma";
import { Product } from "./types";

export async function getProductsByVendorId(
  vendorId: string
): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { vendorId },
    orderBy: { createdAt: "desc" },
  });
  
  return products.map(p => ({
    ...p,
    tags: p.tags ? p.tags.split(",") : []
  })) as Product[];
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  return products.map(p => ({
    ...p,
    tags: p.tags ? p.tags.split(",") : []
  })) as Product[];
}
