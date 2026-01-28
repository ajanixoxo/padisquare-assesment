import Image from "next/image";
import Card from "@/components/ui/Card";
import { Product } from "@/lib/data/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <Card className="group overflow-hidden p-0 transition-shadow hover:shadow-lg [&[data-theme=light]]:hover:shadow-gray-200">
      <div className="relative aspect-square w-full overflow-hidden" style={{ backgroundColor: 'var(--hover-bg)' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Color variants indicator */}
        <div className="absolute bottom-2 right-2 flex gap-1">
          <div className="h-4 w-4 rounded-full border border-white bg-gray-800"></div>
          <span className="flex h-4 items-center rounded-full border border-white bg-white/80 px-1.5 text-[10px] font-medium text-gray-900">
            +5
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="mb-1 text-xs font-medium uppercase" style={{ color: 'var(--text-secondary)' }}>
          {product.name.split(" ")[0]} {product.name.split(" ")[1] || ""}
        </p>
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {product.name}
        </h3>
        <p className="text-lg font-bold" style={{ color: 'var(--primary-green)' }}>
          {formattedPrice}
        </p>
      </div>
    </Card>
  );
}
