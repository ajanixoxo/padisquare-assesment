"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { Product } from "@/lib/data/types";

interface CategoryTabsProps {
  products: Product[];
}

export default function CategoryTabs({ products }: CategoryTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((product) => {
      if (product.category) {
        cats.add(product.category);
      }
    });
    return Array.from(cats).sort();
  }, [products]);

  const activeCategory = searchParams.get("category");

  const handleCategoryClick = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (activeCategory === category) {
        params.delete("category");
      } else {
        params.set("category", category);
      }
      params.set("page", "1"); // Reset to first page

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams, activeCategory]
  );

  // Add "NEW" and "BEST SELLERS" as special categories
  const allCategories = ["NEW", "BEST SELLERS", ...categories];

  return (
    <div className="mb-6 flex flex-wrap gap-2 overflow-x-auto">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          disabled={isPending}
          className="whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
          style={
            activeCategory === category
              ? {
                  borderColor: "var(--primary-green)",
                  backgroundColor: "var(--primary-green)",
                  color: "white",
                }
              : {
                  borderColor: "var(--border-green)",
                  backgroundColor: "var(--button-bg)",
                  color: "var(--text-primary)",
                }
          }
          onMouseEnter={(e) => {
            if (activeCategory !== category) {
              e.currentTarget.style.backgroundColor = "var(--button-hover)";
            }
          }}
          onMouseLeave={(e) => {
            if (activeCategory !== category) {
              e.currentTarget.style.backgroundColor = "var(--button-bg)";
            }
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
