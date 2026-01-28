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
      <svg
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
        style={{ color: 'var(--text-secondary)' }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search"
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-lg border pl-10 pr-4 py-3 focus:outline-none focus:ring-1"
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
        disabled={isPending}
      />
      <style jsx>{`
        input::placeholder {
          color: var(--text-secondary);
        }
      `}</style>
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: 'var(--primary-green)' }}></div>
        </div>
      )}
    </div>
  );
}
