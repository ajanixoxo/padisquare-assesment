"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  category: z.string().min(1, "Please select a category"),
  image: z.string().url("Please enter a valid image URL"),
  inStock: z.boolean().default(true),
  tags: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      inStock: true,
      category: "",
    },
  });

  async function onSubmit(data: ProductFormValues) {
    setIsSubmitting(true);
    try {
      // In a real app, this would be a Server Action or API call
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/vendor/products");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to create product", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/vendor/products">
          <Button variant="ghost" size="sm" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Add New Product
          </h2>
          <p className="text-sm text-neutral-500">
            Fill in the details to list a new product in your shop.
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-neutral-900 dark:text-white">General Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Product Name
                  </label>
                  <input
                    {...form.register("name")}
                    placeholder="e.g. Wireless Headphones"
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-xs text-red-500">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Description
                  </label>
                  <textarea
                    {...form.register("description")}
                    placeholder="Describe your product..."
                    rows={4}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
                  />
                  {form.formState.errors.description && (
                    <p className="mt-1 text-xs text-red-500">{form.formState.errors.description.message}</p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-neutral-900 dark:text-white">Inventory & Tags</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">In Stock</p>
                    <p className="text-xs text-neutral-500">Product is available for purchase</p>
                  </div>
                  <input 
                    type="checkbox" 
                    {...form.register("inStock")}
                    className="h-5 w-5 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Tags (Optional)
                  </label>
                  <input
                    {...form.register("tags")}
                    placeholder="wireless, audio, headphones"
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Media & Pricing */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-neutral-900 dark:text-white">Pricing & Categorization</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Price ($)
                  </label>
                  <input
                    {...form.register("price")}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
                  />
                  {form.formState.errors.price && (
                    <p className="mt-1 text-xs text-red-500">{form.formState.errors.price.message}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Category
                  </label>
                  <select
                    {...form.register("category")}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
                  >
                    <option value="">Select category</option>
                    <option value="AUDIO">Audio</option>
                    <option value="WEARABLES">Wearables</option>
                    <option value="ACCESSORIES">Accessories</option>
                    <option value="ELECTRONICS">Electronics</option>
                  </select>
                  {form.formState.errors.category && (
                    <p className="mt-1 text-xs text-red-500">{form.formState.errors.category.message}</p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-neutral-900 dark:text-white">Media</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Image URL
                  </label>
                  <input
                    {...form.register("image")}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
                  />
                  {form.formState.errors.image && (
                    <p className="mt-1 text-xs text-red-500">{form.formState.errors.image.message}</p>
                  )}
                </div>
                {form.watch("image") && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <img 
                      src={form.watch("image")} 
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Link href="/vendor/products">
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Product
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
