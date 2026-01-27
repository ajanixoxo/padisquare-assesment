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
    <Card className="overflow-hidden p-0">
      <div className="relative aspect-square w-full bg-[rgba(21,156,71,0.1)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-[#EAF6EE] line-clamp-2">
          {product.name}
        </h3>
        <p className="mb-3 text-sm text-[#A3C6B1] line-clamp-2">
          {product.description}
        </p>
        <p className="text-xl font-bold text-[#159C47]">{formattedPrice}</p>
      </div>
    </Card>
  );
}
