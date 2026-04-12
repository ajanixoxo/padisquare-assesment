import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, description, price, category, image, inStock, tags } = body;

    if (!name || !price || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // 1. Find or create the vendor for this user
    let vendor = await prisma.vendor.findFirst({
      where: { clerkId: userId },
    });

    if (!vendor) {
      // Auto-generate store name and slug for fresh vendors
      const storeName = `${userId.slice(-6)}'s Store`;
      vendor = await prisma.vendor.create({
        data: {
          clerkId: userId,
          name: storeName,
          slug: slugify(storeName, { lower: true, strict: true }) + "-" + Math.random().toString(36).substring(2, 5),
          description: "A new store on Padisquare",
          logo: "/next.svg", // Default
        },
      });
    }

    // 2. Create the product
    const product = await prisma.product.create({
      data: {
        vendorId: vendor.id,
        name,
        description,
        price: parseFloat(price),
        category,
        image,
        inStock,
        tags,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
