import { getAllVendors } from "@/lib/data/vendors";
import VendorList from "@/components/vendor/VendorList";
import HomeHeader from "@/components/vendor/HomeHeader";
import HomePageLogo from "@/components/vendor/HomePageLogo";

export default async function Home() {
  const vendors = await getAllVendors();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <HomeHeader />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <HomePageLogo />
          </div>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            Discover products from our curated vendors
          </p>
        </div>
        <VendorList vendors={vendors} />
      </div>
    </div>
  );
}
