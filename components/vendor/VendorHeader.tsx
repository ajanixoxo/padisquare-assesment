"use client";

import Link from "next/link";
import ThemeToggle from "@/components/theme/ThemeToggle";
import VendorIcon from "@/components/vendor/VendorIcon";
import { Vendor } from "@/lib/data/types";

interface VendorHeaderProps {
  vendor: Vendor;
}

export default function VendorHeader({ vendor }: VendorHeaderProps) {

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-sm" style={{ borderColor: 'var(--border-green)', backgroundColor: 'var(--header-bg)' }}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Hamburger & Navigation */}
          <div className="flex items-center gap-6">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors md:hidden"
              style={{ borderColor: 'var(--border-green)', backgroundColor: 'var(--button-bg)', color: 'var(--text-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--button-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--button-bg)'}
              aria-label="Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/"
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Home
              </Link>
              <Link
                href="/"
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Collections
              </Link>
              <Link
                href="/"
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                New
              </Link>
            </nav>
          </div>

          {/* Center: Vendor Logo & Name */}
          <div className="flex items-center gap-3">
            <VendorIcon vendor={vendor} size={40} />
            <span className="hidden text-lg font-semibold sm:block" style={{ color: 'var(--text-primary)' }}>
              {vendor.name}
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: 'var(--border-green)', backgroundColor: 'var(--button-bg)', color: 'var(--text-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--button-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--button-bg)'}
              aria-label="Wishlist"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: 'var(--border-green)', backgroundColor: 'var(--button-bg)', color: 'var(--text-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--button-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--button-bg)'}
              aria-label="Cart"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#159C47] text-xs font-bold text-white">
                0
              </span>
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: 'var(--border-green)', backgroundColor: 'var(--button-bg)', color: 'var(--text-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--button-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--button-bg)'}
              aria-label="Account"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
