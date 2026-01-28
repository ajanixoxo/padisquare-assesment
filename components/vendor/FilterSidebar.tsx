"use client";

import { useState } from "react";

interface FilterSidebarProps {
  onFilterChange?: (filters: Record<string, any>) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const sizes = ["XS", "S", "M", "L", "XL", "2X"];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <aside className="w-full border-r pr-6 md:w-64" style={{ borderColor: 'var(--border-green)' }}>
      <h2 className="mb-6 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
        Filters
      </h2>

      {/* Size Filter */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className="rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
              style={
                selectedSizes.includes(size)
                  ? {
                      borderColor: 'var(--primary-green)',
                      backgroundColor: 'var(--primary-green)',
                      color: 'white',
                    }
                  : {
                      borderColor: 'var(--border-green)',
                      backgroundColor: 'var(--button-bg)',
                      color: 'var(--text-primary)',
                    }
              }
              onMouseEnter={(e) => {
                if (!selectedSizes.includes(size)) {
                  e.currentTarget.style.backgroundColor = 'var(--button-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedSizes.includes(size)) {
                  e.currentTarget.style.backgroundColor = 'var(--button-bg)';
                }
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          Availability
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
            <input
              type="checkbox"
              className="h-4 w-4 rounded"
              style={{ borderColor: 'var(--border-green)', accentColor: 'var(--primary-green)' }}
            />
            <span>Availability (450)</span>
          </label>
          <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
            <input
              type="checkbox"
              className="h-4 w-4 rounded"
              style={{ borderColor: 'var(--border-green)', accentColor: 'var(--primary-green)' }}
            />
            <span>Out Of Stock (18)</span>
          </label>
        </div>
      </div>

      {/* Collapsible Categories */}
      {["Category", "Colors", "Price Range", "Collections", "Tags", "Ratings"].map(
        (category) => (
          <div key={category} className="mb-4">
            <button
              onClick={() => toggleCategory(category)}
              className="flex w-full items-center justify-between text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span>{category}</span>
              <svg
                className={`h-4 w-4 transition-transform ${
                  expandedCategories.includes(category) ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            {expandedCategories.includes(category) && (
              <div className="mt-2 space-y-2 pl-4">
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Filter options coming soon
                </p>
              </div>
            )}
          </div>
        )
      )}
    </aside>
  );
}
