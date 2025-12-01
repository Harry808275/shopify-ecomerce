import { getProducts } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import Hero from '@/components/Hero'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import PostureCorrectorShowcase from '@/components/PostureCorrectorShowcase'
import ResistanceBandsShowcase from '@/components/ResistanceBandsShowcase'
import BrandSection from '@/components/BrandSection'
import TrustBadges from '@/components/TrustBadges'
import Newsletter from '@/components/Newsletter'

export default async function Home() {
  const products = await getProducts(8)

  return (
    <div>
      <Hero />
      
      {/* Featured Products */}
      <ScrollAnimations>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16" data-animate>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-lv text-lv-black mb-4 tracking-tight">
            Featured Collection
          </h2>
          <div className="w-24 h-px bg-lv-black mx-auto mb-4"></div>
          <p className="text-lv-gray max-w-2xl mx-auto font-lv text-sm md:text-base">
            Discover our curated selection of premium products, crafted with excellence and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" data-animate>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 4} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="lv-button"
          >
            View All Products
          </Link>
        </div>
      </section>
      </ScrollAnimations>

      {/* Posture Corrector Showcase - Middle Section */}
      <PostureCorrectorShowcase />

      {/* Resistance Bands Showcase - Below Posture Corrector */}
      <ResistanceBandsShowcase />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Evertrust Brand Section */}
      <BrandSection />

      {/* Best Seller Products - Above Footer */}
      <ScrollAnimations>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center mb-20" data-animate>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-lv text-lv-black mb-6 tracking-tight">
              Best Seller
            </h2>
            <div className="w-32 h-px bg-lv-black mx-auto mb-6"></div>
            <p className="text-lv-gray max-w-2xl mx-auto font-lv text-base md:text-lg">
              Our most loved products, handpicked for their exceptional quality and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" data-animate>
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/products"
              className="lv-button"
            >
              View All Products
            </Link>
          </div>
        </section>
      </ScrollAnimations>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}

