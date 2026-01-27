"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <EmptyState
        title="Something went wrong!"
        description="We encountered an error while loading this page. Please try again."
      />
      <div className="mt-8 flex justify-center">
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
      </div>
    </div>
  );
}
