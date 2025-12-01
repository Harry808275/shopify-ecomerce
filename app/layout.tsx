import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import CartSidebar from '@/components/CartSidebar'
import LVPageLoader from '@/components/LVPageLoader'

export const metadata: Metadata = {
  title: 'Evertrust | Premium Products | Trusted Quality, Exceptional Service',
  description: 'Discover our exclusive collection of premium products from Evertrust. Trusted quality, exceptional service, and fast shipping. Shop now for the best deals.',
  keywords: 'evertrust, premium products, quality products, online shopping, ecommerce',
  authors: [{ name: 'Evertrust' }],
  openGraph: {
    title: 'Evertrust | Premium Products',
    description: 'Trusted Quality, Exceptional Service - Discover our exclusive collection of premium products',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col lv-default-layout">
        <LVPageLoader />
        <CartProvider>
          <Header />
          <main className="flex-grow lv-default-layout__content" style={{ paddingTop: 'var(--header-height)' }}>
            {children}
          </main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}

