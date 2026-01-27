import { Product } from "../data/types";

export function searchProducts(
  products: Product[],
  query: string
): Product[] {
  if (!query || query.trim() === "") {
    return products;
  }

  const searchTerm = query.toLowerCase().trim();

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );
}
