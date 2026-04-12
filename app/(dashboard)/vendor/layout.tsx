import { UserButton } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Settings, 
  Store,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const sidebarLinks = [
  { href: "/vendor", label: "Overview", icon: LayoutDashboard },
  { href: "/vendor/products", label: "My Products", icon: Package },
  { href: "/vendor/orders", label: "Orders", icon: ShoppingBag },
  { href: "/", label: "View Marketplace", icon: Store },
  { href: "/vendor/settings", label: "Settings", icon: Settings },
];

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 md:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-neutral-200 px-6 dark:border-neutral-800">
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Vendor<span className="text-emerald-600">Portal</span>
            </span>
          </div>
          
          <nav className="flex-1 space-y-1 p-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
            <div className="flex items-center gap-3 px-3 py-2">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "h-8 w-8" } }} />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-neutral-900 dark:text-white">Vendor Account</span>
                <span className="text-[10px] text-neutral-500">Manage your store</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Header for Mobile/Global Actions */}
        <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900 md:px-8">
          <div className="flex items-center gap-4">
             <button className="md:hidden">
                <Menu className="h-6 w-6 text-neutral-600" />
             </button>
             <h1 className="text-lg font-semibold text-neutral-900 dark:text-white md:hidden">Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <UserButton className="md:hidden" />
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
