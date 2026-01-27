import { notFound } from "next/navigation";
import { getVendorBySlug } from "@/lib/data/vendors";
import { getProductsByVendorId } from "@/lib/data/products";
import { searchProducts } from "@/lib/utils/search";
import { sortProducts } from "@/lib/utils/sort";
import { paginate } from "@/lib/utils/paginate";
import { SortOption } from "@/lib/data/types";
import VendorHero from "@/components/vendor/VendorHero";
import ProductSearch from "@/components/product/ProductSearch";
import ProductSort from "@/components/product/ProductSort";
import ProductGrid from "@/components/product/ProductGrid";
import ProductPagination from "@/components/product/ProductPagination";

interface VendorPageProps {
  params: Promise<{ vendorSlug: string }>;
  searchParams: Promise<{
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function VendorPage({
  params,
  searchParams,
}: VendorPageProps) {
  const { vendorSlug } = await params;
  const resolvedSearchParams = await searchParams;

  const vendor = await getVendorBySlug(vendorSlug);

  if (!vendor) {
    notFound();
  }

  // Get all products for this vendor
  let products = await getProductsByVendorId(vendor.id);

  // Apply search filter
  if (resolvedSearchParams.search) {
    products = searchProducts(products, resolvedSearchParams.search);
  }

  // Apply sorting
  const sortOption = (resolvedSearchParams.sort as SortOption) || "recent";
  products = sortProducts(products, sortOption);

  // Apply pagination
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const paginationResult = paginate(products, page, 12);

  return (
    <div className="container mx-auto px-4 py-8">
      <VendorHero vendor={vendor} />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <ProductSearch />
        </div>
        <div className="w-full sm:w-48">
          <ProductSort />
        </div>
      </div>

      <div className="mb-8">
        <ProductGrid products={paginationResult.items} />
      </div>

      <ProductPagination
        currentPage={paginationResult.currentPage}
        totalPages={paginationResult.totalPages}
        hasNextPage={paginationResult.hasNextPage}
        hasPreviousPage={paginationResult.hasPreviousPage}
      />
    </div>
  );
}
