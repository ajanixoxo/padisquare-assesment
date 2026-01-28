export interface Vendor {
  id: string;
  slug: string;
  name: string;
  logo: string;
  heroImage?: string;
  description: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  category?: string;
  size?: string;
  color?: string;
  inStock?: boolean;
  tags?: string[];
}

export type SortOption = "price-low" | "price-high" | "recent";

export interface ProductFilters {
  search?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
}
