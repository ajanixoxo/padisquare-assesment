import { Product, SortOption } from "../data/types";

export function sortProducts(
  products: Product[],
  sortOption: SortOption = "recent"
): Product[] {
  const sorted = [...products];

  switch (sortOption) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "recent":
      return sorted.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    default:
      return sorted;
  }
}
