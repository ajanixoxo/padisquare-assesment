import Link from "next/link";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <EmptyState
        title="Vendor not found"
        description="The vendor you're looking for doesn't exist or has been removed."
      />
      <div className="mt-8 flex justify-center">
        <Link href="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
