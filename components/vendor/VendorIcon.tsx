"use client";

import { Vendor } from "@/lib/data/types";

interface VendorIconProps {
  vendor: Vendor;
  className?: string;
  size?: number;
}

export default function VendorIcon({
  vendor,
  className = "",
  size = 64,
}: VendorIconProps) {
  // Generate unique SVG icons based on vendor name/type
  const getVendorIcon = (vendorName: string) => {
    const name = vendorName.toLowerCase();
    
    if (name.includes("tech")) {
      // Tech Store - Laptop/Device icon
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="8" fill="currentColor" opacity="0.1"/>
          <rect x="12" y="20" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="16" y="24" width="32" height="20" fill="currentColor" opacity="0.2"/>
          <path d="M8 48H56" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <rect x="28" y="52" width="8" height="2" rx="1" fill="currentColor"/>
        </svg>
      );
    }
    
    if (name.includes("fashion") || name.includes("boutique")) {
      // Fashion Boutique - Hanger/Clothing icon
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="8" fill="currentColor" opacity="0.1"/>
          <path d="M32 16L24 24H40L32 16Z" fill="currentColor"/>
          <path d="M20 28H44V44C44 48 40 48 40 48H24C24 48 20 48 20 44V28Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="28" cy="36" r="2" fill="currentColor"/>
          <circle cx="36" cy="36" r="2" fill="currentColor"/>
        </svg>
      );
    }
    
    if (name.includes("home") || name.includes("decor")) {
      // Home Decor - House icon
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="8" fill="currentColor" opacity="0.1"/>
          <path d="M32 12L16 24V48H24V36H40V48H48V24L32 12Z" fill="currentColor"/>
          <rect x="28" y="28" width="8" height="12" fill="currentColor" opacity="0.3"/>
          <circle cx="32" cy="20" r="2" fill="currentColor" opacity="0.5"/>
        </svg>
      );
    }
    
    if (name.includes("sport")) {
      // Sports Gear - Target/Athletic icon
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="8" fill="currentColor" opacity="0.1"/>
          <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="32" cy="32" r="4" fill="currentColor"/>
          <path d="M32 12V20M32 44V52M12 32H20M44 32H52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    
    if (name.includes("book")) {
      // Bookstore - Book icon
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="8" fill="currentColor" opacity="0.1"/>
          <path d="M20 16H44V48H20V16Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M20 16V48" stroke="currentColor" strokeWidth="2"/>
          <path d="M20 24H44M20 32H36M20 40H40" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="30" cy="28" r="1.5" fill="currentColor"/>
        </svg>
      );
    }
    
    // Default icon - Store/Shop
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="8" fill="currentColor" opacity="0.1"/>
        <rect x="16" y="20" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M20 24H44M20 32H44M20 40H36" stroke="currentColor" strokeWidth="2"/>
        <circle cx="28" cy="36" r="2" fill="currentColor"/>
      </svg>
    );
  };

  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size,
        color: 'var(--primary-green)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {getVendorIcon(vendor.name)}
    </div>
  );
}
