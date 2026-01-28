"use client";

import Link from "next/link";
import VendorIcon from "@/components/vendor/VendorIcon";
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
              <VendorIcon vendor={vendor} size={64} />
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {vendor.name}
              </h2>
            </div>
            <p className="text-sm line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
              {vendor.description}
            </p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
