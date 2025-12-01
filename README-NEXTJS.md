# Luxury Store - Next.js Frontend

A premium, luxury-brand inspired e-commerce frontend built with Next.js 14, TypeScript, and Tailwind CSS, powered by Shopify Storefront API.

## 🎨 Features

- **Luxury Design**: LV-inspired elegant layout with premium aesthetics
- **Next.js 14**: Latest App Router with Server Components
- **TypeScript**: Full type safety
- **Tailwind CSS**: Custom luxury theme with gold accents
- **Framer Motion**: Smooth animations and transitions
- **Shopify Integration**: Direct connection to your Shopify store
- **Responsive Design**: Beautiful on all devices
- **Product Pages**: Full product detail pages with image galleries
- **Collections**: Browse products by collection
- **SEO Optimized**: Server-side rendering for better SEO

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── products/             # Products pages
│   └── collections/           # Collections pages
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Footer component
│   ├── Hero.tsx              # Homepage hero section
│   └── ProductCard.tsx       # Product card component
└── lib/
    └── shopify.ts            # Shopify API integration
```

## 🛍️ Pages

- **Home** (`/`) - Hero section with featured products
- **Products** (`/products`) - All products grid
- **Product Detail** (`/products/[handle]`) - Individual product page
- **Collections** (`/collections`) - All collections
- **Collection** (`/collections/[handle]`) - Products in a collection

## 🎨 Design Features

- **Luxury Color Palette**: Gold (#D4AF37), Dark (#1a1a1a), Cream accents
- **Elegant Typography**: Georgia serif for headings, Helvetica for body
- **Smooth Animations**: Framer Motion for premium feel
- **Hover Effects**: Subtle scale and color transitions
- **Premium Spacing**: Generous whitespace for luxury feel

## 🔧 Configuration

Shopify credentials are configured in `lib/shopify.ts`:
- Store Domain: `gando2.myshopify.com`
- Storefront API Token: Already configured
- API Version: 2024-01

## 📦 Dependencies

- **next**: Next.js framework
- **react**: React library
- **framer-motion**: Animations
- **tailwindcss**: Styling
- **typescript**: Type safety

## 🎯 Next Steps

1. Customize the design colors and branding
2. Add shopping cart functionality
3. Implement search functionality
4. Add user authentication
5. Integrate checkout process
6. Add product filtering and sorting
7. Implement wishlist feature

## 📝 Notes

- All product data is fetched from Shopify Storefront API
- Images are optimized using Next.js Image component
- The design is fully responsive
- All pages are server-rendered for better SEO




