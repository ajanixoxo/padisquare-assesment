import { Vendor } from "./types";

export const vendors: Vendor[] = [
  {
    id: "1",
    slug: "tech-store",
    name: "Tech Store",
    logo: "/On white BG/Dark.svg",
    description: "Your one-stop shop for the latest technology and gadgets",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    slug: "fashion-boutique",
    name: "Fashion Boutique",
    logo: "/On white BG/Dark.svg",
    description: "Trendy fashion pieces for the modern wardrobe",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    slug: "home-decor",
    name: "Home Decor",
    logo: "/On white BG/Dark.svg",
    description: "Beautiful home decor items to transform your space",
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    slug: "sports-gear",
    name: "Sports Gear",
    logo: "/On white BG/Dark.svg",
    description: "Premium sports equipment and athletic wear",
    createdAt: new Date("2024-04-05"),
  },
  {
    id: "5",
    slug: "bookstore",
    name: "Bookstore",
    logo: "/On white BG/Dark.svg",
    description: "Curated collection of books for every reader",
    createdAt: new Date("2024-05-12"),
  },
];

export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  return vendors.find((v) => v.slug === slug) || null;
}

export async function getAllVendors(): Promise<Vendor[]> {
  return vendors;
}
