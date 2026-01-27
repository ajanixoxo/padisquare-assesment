export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Vendor Hero Skeleton */}
      <div className="mb-12">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="h-24 w-24 animate-pulse rounded-lg bg-[rgba(21,156,71,0.2)] md:h-32 md:w-32"></div>
          <div className="flex-1">
            <div className="mb-2 h-10 w-64 animate-pulse rounded bg-[rgba(21,156,71,0.2)]"></div>
            <div className="h-6 w-96 animate-pulse rounded bg-[rgba(21,156,71,0.1)]"></div>
          </div>
        </div>
      </div>

      {/* Search and Sort Skeleton */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="h-12 flex-1 animate-pulse rounded-lg bg-[rgba(21,156,71,0.1)]"></div>
        <div className="h-12 w-full animate-pulse rounded-lg bg-[rgba(21,156,71,0.1)] sm:w-48"></div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-[rgba(21,156,71,0.35)]"
          >
            <div className="aspect-square w-full animate-pulse bg-[rgba(21,156,71,0.1)]"></div>
            <div className="p-4">
              <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-[rgba(21,156,71,0.1)]"></div>
              <div className="mb-3 h-4 w-full animate-pulse rounded bg-[rgba(21,156,71,0.1)]"></div>
              <div className="h-6 w-1/4 animate-pulse rounded bg-[rgba(21,156,71,0.2)]"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
