"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/store/useCart";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful placement
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center">
          <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-900/30">
            <CheckCircle className="h-12 w-12 text-emerald-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Payment Successful!</h1>
          <p className="text-neutral-500">
            Your order has been placed successfully. The vendor will process it shortly.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Link href="/orders" className="block w-full">
            <Button className="w-full flex items-center justify-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              View My Orders
            </Button>
          </Link>
          <Link href="/" className="block w-full">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
