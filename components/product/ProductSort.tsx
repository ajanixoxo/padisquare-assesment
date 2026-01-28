"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { SortOption } from "@/lib/data/types";

export default function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSort = (searchParams.get("sort") as SortOption) || "recent";

  const handleSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "recent") {
        params.set("sort", value);
      } else {
        params.delete("sort");
      }
      params.set("page", "1"); // Reset to first page on sort change

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  return (
    <div className="relative">
      <select
        value={currentSort}
        onChange={(e) => handleSort(e.target.value)}
        disabled={isPending}
        className="w-full appearance-none rounded-lg border px-4 py-3 focus:outline-none focus:ring-1"
        style={{
          borderColor: 'var(--border-green)',
          backgroundColor: 'var(--input-bg)',
          color: 'var(--text-primary)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--primary-green)';
          e.currentTarget.style.boxShadow = '0 0 0 1px var(--primary-green)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-green)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <option value="recent">Most Recent</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg
          className="h-5 w-5"
          style={{ color: 'var(--text-secondary)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
