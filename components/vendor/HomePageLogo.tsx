"use client";

import ThemeAwareLogo from "@/components/ui/ThemeAwareLogo";

export default function HomePageLogo() {
  return (
    <div className="relative h">
      <ThemeAwareLogo
        fill
        className="object-contain"
        priority
        alt="Padisquare logo"
      />
    </div>
  );
}
