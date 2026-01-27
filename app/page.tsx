import { getAllVendors } from "@/lib/data/vendors";
import VendorList from "@/components/vendor/VendorList";

export default async function Home() {
  const vendors = await getAllVendors();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 bg-gradient-to-r from-[#159C47] to-[#1fb85a] bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
          Padisquare
        </h1>
        <p className="text-xl text-[#A3C6B1]">
          Discover products from our curated vendors
        </p>
      </div>
      <VendorList vendors={vendors} />
    </div>
  );
}
