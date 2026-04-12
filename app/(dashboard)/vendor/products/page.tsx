import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button"; // I might need to create this

export default async function VendorProductsPage() {
  const { userId } = await auth();
  
  // Find the vendor associated with this user
  const vendor = await prisma.vendor.findFirst({
    where: { clerkId: userId || undefined },
  });

  const products = vendor 
    ? await prisma.product.findMany({
        where: { vendorId: vendor.id },
        orderBy: { createdAt: "desc" }
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            My Products
          </h2>
          <p className="text-neutral-500">
            Manage your inventory and listing details.
          </p>
        </div>
        <Link href="/vendor/products/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center gap-4 border-b border-neutral-200 p-4 dark:border-neutral-800">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900/50">
              <tr>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-neutral-900 dark:text-white">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                    {product.category || "Uncategorized"}
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      product.inStock 
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/vendor/products/${product.id}`}
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-500">
                    No products found. Start by adding your first product!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
