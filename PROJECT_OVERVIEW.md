# Project Overview: Padisquare Assessment

This project is a modern marketplace application for discovering and browsing curated vendors.

## 🚀 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4 (with PostCSS)
- **Runtime/Package Manager:** Bun
- **Language:** TypeScript

## 📂 Project Structure & Functionality
- **`app/`**: Main routing and layouts.
    - `page.tsx`: Landing page featuring common headers and the vendor list.
    - `site/[vendorSlug]/`: Dynamic routes for individual vendor storefronts or detail pages.
- **`components/`**: Reusable UI components integrated with the design system.
    - `vendor/`: Features specific to vendor display (Header, Logo, Lists).
- **`lib/data/`**: Centralized data management using TypeScript mocks.
    - `vendors.ts`: Contains vendor profiles, slugs, and metadata.
    - `products.ts`: Manages product listings across vendors.
    - `types.ts`: Core data definitions for the application.

## 🛠 Core Features
- **Vendor Discovery**: High-level overview of available shops.
- **Dynamic Routing**: Automatic page generation for vendors based on their unique slugs.
- **Modern Styling**: Utilizes Tailwind CSS 4's high-performance engine and CSS variables for theming.
