import { prisma } from "@/lib/prisma";
import { Vendor } from "./types";

export async function getAllVendors(): Promise<Vendor[]> {
  const vendors = await prisma.vendor.findMany({
    orderBy: { createdAt: "desc" },
  });
  return vendors as Vendor[];
}

export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  const vendor = await prisma.vendor.findUnique({
    where: { slug },
  });
  return vendor as Vendor | null;
}
