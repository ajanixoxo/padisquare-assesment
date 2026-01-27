import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { Vendor } from "@/lib/data/types";

interface VendorListProps {
  vendors: Vendor[];
}

export default function VendorList({ vendors }: VendorListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {vendors.map((vendor) => (
        <Link key={vendor.id} href={`/site/${vendor.slug}`}>
          <Card className="p-6 hover:border-[rgba(21,156,71,0.5)] transition-all">
            <div className="mb-4 flex items-center gap-4">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={vendor.logo}
                  alt={`${vendor.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-xl font-semibold text-[#EAF6EE]">
                {vendor.name}
              </h2>
            </div>
            <p className="text-[#A3C6B1] text-sm line-clamp-2">
              {vendor.description}
            </p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
