"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import { Product } from "@/lib/data/types";
import { extractFilterOptions } from "@/lib/utils/filters";

interface FilterSidebarProps {
  products: Product[];
}

export default function FilterSidebar({ products }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const filterOptions = useMemo(() => extractFilterOptions(products), [products]);

  // Get current filter values from URL
  const selectedSizes = useMemo(() => {
    const sizes = searchParams.get("sizes");
    return sizes ? sizes.split(",") : [];
  }, [searchParams]);

  const selectedCategories = useMemo(() => {
    const cats = searchParams.get("categories");
    return cats ? cats.split(",") : [];
  }, [searchParams]);

  const selectedColors = useMemo(() => {
    const colors = searchParams.get("colors");
    return colors ? colors.split(",") : [];
  }, [searchParams]);

  const inStock = searchParams.get("inStock") === "true";
  const outOfStock = searchParams.get("outOfStock") === "true";

  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      params.set("page", "1"); // Reset to first page on filter change

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const toggleSize = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    updateFilters({ sizes: newSizes.length > 0 ? newSizes.join(",") : null });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleFilterCategory = (category: string, value: string) => {
    if (category === "categories") {
      const newCats = selectedCategories.includes(value)
        ? selectedCategories.filter((c) => c !== value)
        : [...selectedCategories, value];
      updateFilters({
        categories: newCats.length > 0 ? newCats.join(",") : null,
      });
    } else if (category === "colors") {
      const newColors = selectedColors.includes(value)
        ? selectedColors.filter((c) => c !== value)
        : [...selectedColors, value];
      updateFilters({
        colors: newColors.length > 0 ? newColors.join(",") : null,
      });
    }
  };

  const toggleAvailability = (type: "inStock" | "outOfStock") => {
    if (type === "inStock") {
      updateFilters({ inStock: inStock ? null : "true" });
    } else {
      updateFilters({ outOfStock: outOfStock ? null : "true" });
    }
  };

  return (
    <aside
      className="w-full border-r pr-6 md:w-64"
      style={{ borderColor: "var(--border-green)" }}
    >
      <h2
        className="mb-6 text-lg font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        Filters
      </h2>

      {/* Size Filter */}
      {filterOptions.sizes.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Size
          </h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                disabled={isPending}
                className="rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
                style={
                  selectedSizes.includes(size)
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
                  if (!selectedSizes.includes(size)) {
                    e.currentTarget.style.backgroundColor = "var(--button-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedSizes.includes(size)) {
                    e.currentTarget.style.backgroundColor = "var(--button-bg)";
                  }
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Availability Filter */}
      <div className="mb-6">
        <h3
          className="mb-3 text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          Availability
        </h3>
        <div className="space-y-2">
          <label
            className="flex items-center gap-2 text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            <input
              type="checkbox"
              checked={inStock}
              onChange={() => toggleAvailability("inStock")}
              disabled={isPending}
              className="h-4 w-4 rounded"
              style={{
                borderColor: "var(--border-green)",
                accentColor: "var(--primary-green)",
              }}
            />
            <span>Availability ({filterOptions.inStockCount})</span>
          </label>
          <label
            className="flex items-center gap-2 text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            <input
              type="checkbox"
              checked={outOfStock}
              onChange={() => toggleAvailability("outOfStock")}
              disabled={isPending}
              className="h-4 w-4 rounded"
              style={{
                borderColor: "var(--border-green)",
                accentColor: "var(--primary-green)",
              }}
            />
            <span>Out Of Stock ({filterOptions.outOfStockCount})</span>
          </label>
        </div>
      </div>

      {/* Category Filter */}
      {filterOptions.categories.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => toggleCategory("Category")}
            className="flex w-full items-center justify-between text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            <span>Category</span>
            <svg
              className={`h-4 w-4 transition-transform ${
                expandedCategories.includes("Category") ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {expandedCategories.includes("Category") && (
            <div className="mt-2 space-y-2 pl-4">
              {filterOptions.categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleFilterCategory("categories", category)}
                    disabled={isPending}
                    className="h-4 w-4 rounded"
                    style={{
                      borderColor: "var(--border-green)",
                      accentColor: "var(--primary-green)",
                    }}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Colors Filter */}
      {filterOptions.colors.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => toggleCategory("Colors")}
            className="flex w-full items-center justify-between text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            <span>Colors</span>
            <svg
              className={`h-4 w-4 transition-transform ${
                expandedCategories.includes("Colors") ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {expandedCategories.includes("Colors") && (
            <div className="mt-2 space-y-2 pl-4">
              {filterOptions.colors.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleFilterCategory("colors", color)}
                    disabled={isPending}
                    className="h-4 w-4 rounded"
                    style={{
                      borderColor: "var(--border-green)",
                      accentColor: "var(--primary-green)",
                    }}
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Range Filter */}
      <div className="mb-4">
        <button
          onClick={() => toggleCategory("Price Range")}
          className="flex w-full items-center justify-between text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>Price Range</span>
          <svg
            className={`h-4 w-4 transition-transform ${
              expandedCategories.includes("Price Range") ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        {expandedCategories.includes("Price Range") && (
          <div className="mt-2 space-y-2 pl-4">
            <p
              className="text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              ${filterOptions.priceRange.min.toFixed(2)} - $
              {filterOptions.priceRange.max.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* Collections, Tags, Ratings - Placeholder */}
      {["Collections", "Tags", "Ratings"].map((category) => (
        <div key={category} className="mb-4">
          <button
            onClick={() => toggleCategory(category)}
            className="flex w-full items-center justify-between text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            <span>{category}</span>
            <svg
              className={`h-4 w-4 transition-transform ${
                expandedCategories.includes(category) ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {expandedCategories.includes(category) && (
            <div className="mt-2 space-y-2 pl-4">
              <p
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Filter options coming soon
              </p>
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
