import { Product } from "../data/types";

export interface FilterOptions {
  sizes: string[];
  categories: string[];
  colors: string[];
  priceRange: { min: number; max: number };
  inStockCount: number;
  outOfStockCount: number;
}

export function extractFilterOptions(products: Product[]): FilterOptions {
  const sizes = new Set<string>();
  const categories = new Set<string>();
  const colors = new Set<string>();
  let inStockCount = 0;
  let outOfStockCount = 0;
  const prices: number[] = [];

  products.forEach((product) => {
    if (product.size) sizes.add(product.size);
    if (product.category) categories.add(product.category);
    if (product.color) colors.add(product.color);
    if (product.inStock !== false) {
      inStockCount++;
    } else {
      outOfStockCount++;
    }
    prices.push(product.price);
  });

  return {
    sizes: Array.from(sizes).sort(),
    categories: Array.from(categories).sort(),
    colors: Array.from(colors).sort(),
    priceRange: {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
    },
    inStockCount,
    outOfStockCount,
  };
}

export function filterProducts(
  products: Product[],
  filters: {
    sizes?: string[];
    categories?: string[];
    colors?: string[];
    priceMin?: number;
    priceMax?: number;
    inStock?: boolean;
    outOfStock?: boolean;
  }
): Product[] {
  return products.filter((product) => {
    // Size filter
    if (filters.sizes && filters.sizes.length > 0) {
      if (!product.size || !filters.sizes.includes(product.size)) {
        return false;
      }
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      if (!product.category || !filters.categories.includes(product.category)) {
        return false;
      }
    }

    // Color filter
    if (filters.colors && filters.colors.length > 0) {
      if (!product.color || !filters.colors.includes(product.color)) {
        return false;
      }
    }

    // Price range filter
    if (filters.priceMin !== undefined && product.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && product.price > filters.priceMax) {
      return false;
    }

    // Availability filter
    if (filters.inStock && product.inStock === false) {
      return false;
    }
    if (filters.outOfStock && product.inStock !== false) {
      return false;
    }

    return true;
  });
}
