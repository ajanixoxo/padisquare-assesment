import { notFound } from "next/navigation";
import Link from "next/link";
import { getVendorBySlug } from "@/lib/data/vendors";
import { getProductsByVendorId } from "@/lib/data/products";
import { searchProducts } from "@/lib/utils/search";
import { sortProducts } from "@/lib/utils/sort";
import { filterProducts } from "@/lib/utils/filters";
import { paginate } from "@/lib/utils/paginate";
import { SortOption } from "@/lib/data/types";
import VendorHeader from "@/components/vendor/VendorHeader";
import VendorHeroImage from "@/components/vendor/VendorHeroImage";
import FilterSidebar from "@/components/vendor/FilterSidebar";
import CategoryTabs from "@/components/vendor/CategoryTabs";
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
    sizes?: string;
    categories?: string;
    colors?: string;
    inStock?: string;
    outOfStock?: string;
    category?: string;
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

  // Get all products for this vendor (used for filters and display)
  const allProducts = await getProductsByVendorId(vendor.id);
  let products = [...allProducts];

  // Apply category filter (from CategoryTabs)
  if (resolvedSearchParams.category) {
    if (resolvedSearchParams.category === "NEW") {
      // Show products created in last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      products = products.filter(
        (p) => p.createdAt.getTime() > thirtyDaysAgo.getTime()
      );
    } else if (resolvedSearchParams.category === "BEST SELLERS") {
      // For now, show products with price > 100 as "best sellers"
      products = products.filter((p) => p.price > 100);
    } else {
      products = products.filter(
        (p) => p.category === resolvedSearchParams.category
      );
    }
  }

  // Apply filter sidebar filters
  const filterParams = {
    sizes: resolvedSearchParams.sizes
      ? resolvedSearchParams.sizes.split(",")
      : undefined,
    categories: resolvedSearchParams.categories
      ? resolvedSearchParams.categories.split(",")
      : undefined,
    colors: resolvedSearchParams.colors
      ? resolvedSearchParams.colors.split(",")
      : undefined,
    inStock: resolvedSearchParams.inStock === "true",
    outOfStock: resolvedSearchParams.outOfStock === "true",
  };
  products = filterProducts(products, filterParams);

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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <VendorHeader vendor={vendor} />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm">
          <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              Home
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>
              Products
            </span>
          </div>
        </nav>

        {/* Page Title */}
        <h1 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--text-primary)' }}>
          PRODUCTS
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <ProductSearch />
        </div>

        {/* Category Tabs */}
        <CategoryTabs products={allProducts} />

        {/* Hero Image */}
        <VendorHeroImage vendor={vendor} />

        {/* Main Content: Sidebar + Product Grid */}
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="hidden md:block">
            <FilterSidebar products={allProducts} />
          </aside>

          {/* Right: Product Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Showing {paginationResult.items.length} of{" "}
                {paginationResult.totalItems} products
              </p>
              <div className="w-48">
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
        </div>
      </div>
    </div>
  );
}
