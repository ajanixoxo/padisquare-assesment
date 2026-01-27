import Image from "next/image";
import { Vendor } from "@/lib/data/types";

interface VendorHeroProps {
  vendor: Vendor;
}

export default function VendorHero({ vendor }: VendorHeroProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <div className="relative h-24 w-24 flex-shrink-0 md:h-32 md:w-32">
          <Image
            src={vendor.logo}
            alt={`${vendor.name} logo`}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex-1">
          <h1 className="mb-2 bg-gradient-to-r from-[#159C47] to-[#1fb85a] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            {vendor.name}
          </h1>
          <p className="text-[#A3C6B1] text-lg">{vendor.description}</p>
        </div>
      </div>
    </div>
  );
}
