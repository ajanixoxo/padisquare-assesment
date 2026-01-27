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
        className="w-full appearance-none rounded-lg border border-[rgba(21,156,71,0.35)] bg-[rgba(5,11,7,0.8)] px-4 py-3 text-[#EAF6EE] focus:border-[rgba(21,156,71,0.6)] focus:outline-none focus:ring-1 focus:ring-[rgba(21,156,71,0.3)] [&>option]:bg-[#050B07]"
      >
        <option value="recent">Most Recent</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg
          className="h-5 w-5 text-[#A3C6B1]"
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
