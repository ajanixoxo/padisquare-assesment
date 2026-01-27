"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
        params.set("page", "1"); // Reset to first page on new search
      } else {
        params.delete("search");
        params.set("page", "1");
      }

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-lg border border-[rgba(21,156,71,0.35)] bg-[rgba(5,11,7,0.8)] px-4 py-3 text-[#EAF6EE] placeholder:text-[#A3C6B1] focus:border-[rgba(21,156,71,0.6)] focus:outline-none focus:ring-1 focus:ring-[rgba(21,156,71,0.3)]"
        disabled={isPending}
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#159C47] border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}
