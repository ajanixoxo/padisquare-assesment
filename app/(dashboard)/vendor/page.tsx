import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Users 
} from "lucide-react";
import Card from "@/components/ui/Card";

export default async function VendorDashboardPage() {
  const { userId } = await auth();
  
  // Fetch vendor stats
  const vendor = await prisma.vendor.findFirst({
    where: { clerkId: userId || undefined },
    include: {
      _count: {
        select: { products: true, orders: true }
      }
    }
  });

  const stats = [
    { 
      label: "Total Products", 
      value: vendor?._count.products || 0, 
      icon: Package, 
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    { 
      label: "Total Orders", 
      value: vendor?._count.orders || 0, 
      icon: ShoppingBag, 
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30"
    },
    { 
      label: "Customer Reach", 
      value: 0, 
      icon: Users, 
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-900/30"
    },
    { 
      label: "Revenue", 
      value: "$0.00", 
      icon: TrendingUp, 
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30"
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Welcome back
        </h2>
        <p className="text-neutral-500">
          Here is what is happening with your store today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-neutral-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-xl p-3 ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white md:mb-4">
            Recent Activity
          </h3>
          <div className="flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 dark:border-neutral-800">
            <p className="text-sm text-neutral-500">No recent activity to show.</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white md:mb-4">
            Top Products
          </h3>
          <div className="flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 dark:border-neutral-800">
            <p className="text-sm text-neutral-500">No products sold yet.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
