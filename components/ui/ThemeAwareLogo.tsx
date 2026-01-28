"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { useLayoutEffect, useState } from "react";

interface ThemeAwareLogoProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  alt?: string;
}

export default function ThemeAwareLogo({
  className = "",
  width,
  height,
  fill = false,
  priority = false,
  alt = "Logo",
}: ThemeAwareLogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Dark mode: use "On white BG" (white picture)
  // Light mode: use "on black BG" (black picture)
  const logoSrc = theme === "dark" 
    ? "/on black BG/Dark.svg" 
    : "/On white BG/Dark.svg";

  if (!mounted) {
    // Return a placeholder while mounting
    if (fill) {
      return <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }} />;
    }
    return <div style={{ width: width || 40, height: height || 40 }} />;
  }

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt={alt}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
        />
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={logoSrc}
      alt={alt}
      width={width || 40}
      height={height || 40}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
