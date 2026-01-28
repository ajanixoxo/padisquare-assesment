# Padisquare Multi-Vendor Mini Sites

A production-quality Next.js (App Router v14+) application for Padisquare's Multi-Vendor Mini Sites. This application provides a multi-tenant platform where vendors can showcase their products with comprehensive search, filtering, sorting, and pagination capabilities.

## 🚀 Features

### Core Functionality
- **Multi-Tenant Routing**: Dynamic vendor pages at `/site/[vendorSlug]`
- **Product Search**: Real-time product search by name and description
- **Advanced Filtering**: 
  - Filter by size, category, color
  - Filter by availability (in stock/out of stock)
  - Price range filtering
  - Dynamic filter options based on product data
- **Sorting**: Sort products by:
  - Price (low → high)
  - Price (high → low)
  - Most recent
- **Pagination**: Efficient pagination with 12 items per page
- **Theme System**: Full light/dark mode support with theme toggle
- **Brand-Aligned Design**: Strict adherence to Padisquare brand design system
- **Server Components**: Optimized performance with Next.js Server Components by default
- **Client Components**: Strategic use of client components only for interactive features
- **Loading & Error States**: Comprehensive loading skeletons and error handling

### Vendor Features
- **Vendor List Page**: Home page displaying all available vendors
- **Vendor-Specific Pages**: Each vendor has their own dedicated page
- **Vendor Logos**: Theme-aware vendor logos (white logo in dark mode, black logo in light mode)
- **Vendor Icons**: Unique SVG icons for each vendor
- **Hero Images**: Vendor hero sections with customizable images
- **Category Tabs**: Dynamic category filtering based on vendor products

## 🛠 Tech Stack

- **Next.js 16+** (App Router)
- **TypeScript** - Full type safety
- **TailwindCSS v4** - Utility-first CSS framework
- **Server Components** (default) - Optimized server-side rendering
- **Client Components** (only where needed) - For interactive features like search, sorting, pagination, and theme toggle
- **No UI Libraries** - Custom components built from scratch

## 🎨 Design System

### Color Palette
- **Background**: `#050B07` (near-black, green-tinted, flat)
- **Primary Green**: `#159C47`
- **Text Colors**:
  - Primary: `#EAF6EE`
  - Secondary: `#A3C6B1`
  - Accent: `#D68C2C` (rare use)

### Theme Support
- **Dark Mode**: Default theme with dark background and light text
- **Light Mode**: Light background with dark text
- **Theme Toggle**: Available on both home and vendor pages
- **Theme Persistence**: Theme preference is saved and persists across sessions

### Design Elements
- **Grid Texture**: Decorative grid lines in top-left, low opacity, fading toward center
- **Borders**: `1px solid rgba(21, 156, 71, 0.35)` (semi-transparent green)
- **Gradients**: Limited to hero headings, primary CTA buttons, and primary card surfaces (green shades only)

## 📁 Project Structure

```
app/
  site/
    [vendorSlug]/
      page.tsx          # Vendor page with products
      loading.tsx       # Loading skeleton
      error.tsx         # Error boundary
      not-found.tsx     # 404 page
  page.tsx              # Home page (vendor list)
  layout.tsx            # Root layout with theme provider
  globals.css           # Brand design system & theme variables

components/
  vendor/
    VendorHeader.tsx    # Sticky header for vendor pages
    VendorHero.tsx      # Vendor hero section
    VendorHeroImage.tsx # Hero image component
    VendorList.tsx      # Vendor list for home page
    VendorIcon.tsx      # SVG icons for vendors
    FilterSidebar.tsx   # Product filtering sidebar
    CategoryTabs.tsx    # Category navigation tabs
    HomeHeader.tsx      # Header for home page
    HomePageLogo.tsx    # Logo component for home page

  product/
    ProductCard.tsx     # Individual product card
    ProductGrid.tsx     # Product grid container
    ProductSearch.tsx   # Search input (Client Component)
    ProductSort.tsx     # Sort dropdown (Client Component)
    ProductPagination.tsx # Pagination controls (Client Component)

  ui/
    Button.tsx          # Reusable button component
    Card.tsx            # Reusable card component
    EmptyState.tsx      # Empty state component
    ThemeAwareLogo.tsx  # Theme-aware company logo

  theme/
    ThemeProvider.tsx   # Theme context provider
    ThemeToggle.tsx    # Theme toggle button

lib/
  data/
    types.ts            # TypeScript interfaces
    vendors.ts          # Mock vendor data
    products.ts         # Mock product data

  utils/
    search.ts           # Product search utilities
    sort.ts             # Product sorting utilities
    paginate.ts         # Pagination utilities
    filters.ts          # Filter utilities

public/
  on black BG/          # Dark mode logos
  On white BG/          # Light mode logos
  vendor/               # Vendor-specific assets
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd padisqure-assesment
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Usage

### Home Page
- Visit `/` to see the list of all vendors
- Each vendor card links to their dedicated page
- Use the theme toggle to switch between light and dark modes

### Vendor Pages
- Visit `/site/[vendorSlug]` to view a vendor's products
- Use the search bar to find specific products
- Filter products by:
  - Size (if applicable)
  - Category
  - Color
  - Availability
- Sort products by price or date
- Navigate through pages using pagination

### Filtering
- Filters are dynamically generated based on available product data
- Multiple filters can be applied simultaneously
- Filter state is managed via URL parameters for shareable links
- Category tabs provide quick access to product categories

## 🔧 Development

### Key Patterns

#### Server Components (Default)
```typescript
// app/site/[vendorSlug]/page.tsx
export default async function VendorPage({ params, searchParams }) {
  const vendor = await getVendorBySlug(params.vendorSlug);
  const products = await getProductsByVendorId(vendor.id);
  // Server-side data fetching and rendering
}
```

#### Client Components (Interactive Features)
```typescript
// components/product/ProductSearch.tsx
'use client';
export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Client-side interactivity
}
```

### State Management
- **URL Search Params**: Used for search, sort, pagination, and filter state
- **Server Components**: Read from `searchParams`
- **Client Components**: Update URL via `useRouter` and `useSearchParams`

### Theme System
- Theme is managed via `data-theme` attribute on `<html>` element
- CSS variables are used for all theme-dependent colors
- Theme preference is stored and persisted

## 📝 Data Structure

### Vendor
```typescript
interface Vendor {
  id: string;
  slug: string;
  name: string;
  logo: string;
  heroImage?: string;
  description: string;
  createdAt: Date;
}
```

### Product
```typescript
interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  size?: string;
  color?: string;
  inStock?: boolean;
  tags?: string[];
  createdAt: Date;
}
```

## 🧪 Testing

The application includes:
- Loading states for async operations
- Error boundaries for error handling
- Empty states for no results
- 404 pages for invalid routes

## 🚢 Deployment

### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private assessment project. For questions or issues, please contact the project maintainer.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

Built with ❤️ for Padisquare
