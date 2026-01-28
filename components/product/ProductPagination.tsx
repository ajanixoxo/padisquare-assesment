"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import Button from "@/components/ui/Button";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}: ProductPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="secondary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPreviousPage || isPending}
      >
        Previous
      </Button>
      <span style={{ color: 'var(--text-secondary)' }}>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="secondary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage || isPending}
      >
        Next
      </Button>
    </div>
  );
}
