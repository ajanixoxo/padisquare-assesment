import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { ShoppingBag, Search, Eye } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default async function VendorOrdersPage() {
  const { userId } = await auth();
  
  const vendor = await prisma.vendor.findFirst({
    where: { clerkId: userId || undefined },
  });

  const orders = vendor 
    ? await prisma.order.findMany({
        where: { vendorId: vendor.id },
        include: {
          items: {
            include: { product: true }
          }
        },
        orderBy: { createdAt: "desc" }
      })
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Orders Management
        </h2>
        <p className="text-neutral-500">
          Track and manage your customer orders.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center gap-4 border-b border-neutral-200 p-4 dark:border-neutral-800">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by Order # or Customer..." 
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900/50">
              <tr>
                <th className="px-6 py-3 font-medium">Order #</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30">
                  <td className="px-6 py-4 font-mono font-medium text-emerald-600 dark:text-emerald-400">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-neutral-900 dark:text-white">{order.customerName}</span>
                      <span className="text-xs text-neutral-500">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      order.status === "PAID" 
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                        : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-neutral-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500 text-sm">
                    No orders found. Once customers purchase from your shop, they will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
