import Image from "next/image";
import { Vendor } from "@/lib/data/types";

interface VendorHeroImageProps {
  vendor: Vendor;
}

export default function VendorHeroImage({ vendor }: VendorHeroImageProps) {
  // Use heroImage if available, otherwise use a placeholder or vendor logo
  const heroImageSrc = vendor.heroImage || vendor.logo;

  return (
    <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
      <Image
        src={heroImageSrc}
        alt={`${vendor.name} hero`}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">
          {vendor.name}
        </h1>
        <p className="text-lg text-white/90">{vendor.description}</p>
      </div>
    </div>
  );
}
