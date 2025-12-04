import { getCollections } from '@/lib/shopify'
import Link from 'next/link'
import CollectionsClient from '@/components/CollectionsClient'
import TrustBadges from '@/components/TrustBadges'

export default async function CollectionsPage() {
  const allCollections = await getCollections(20)
  
  // Filter out "Home page" collection and any collections with handle "home-page" or similar
  const collections = allCollections.filter((collection: any) => {
    const handle = collection.handle?.toLowerCase() || ''
    const title = collection.title?.toLowerCase() || ''
    return !handle.includes('home') && !title.includes('home page') && !title.includes('homepage')
  })

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-white via-lv-light-gray/10 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <span className="text-xs font-lv-demi text-lv-orange uppercase tracking-wider bg-lv-orange/10 px-4 py-2 rounded-sm">
              Shop by Category
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-lv-demi text-lv-black mb-6 tracking-tight leading-tight">
            Explore Our Premium Collections
          </h1>
          
          <div className="w-24 h-px bg-lv-black mx-auto mb-6"></div>
          
          <p className="text-base md:text-lg text-lv-gray max-w-3xl mx-auto font-lv leading-relaxed">
            Discover carefully curated collections designed to elevate your lifestyle. Each category features handpicked products that combine exceptional quality with outstanding value.
          </p>
        </div>

        {/* Trust Badges */}
        <TrustBadges />
      </section>

      {/* Collections Grid */}
      <CollectionsClient collections={collections} />

      {/* CTA Section */}
      {collections.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-lv-black to-lv-gray text-white rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-lv-demi mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-white/90 mb-8 font-lv max-w-2xl mx-auto">
              Browse our complete product catalog or contact our team for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-lv-black px-8 py-3 rounded-md font-lv-demi hover:bg-lv-light-gray transition-colors duration-300 inline-block"
              >
                View All Products
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-lv-demi hover:bg-white/10 transition-colors duration-300 inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      )}

      {collections.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lv-gray font-lv text-lg">No collections found.</p>
          <Link href="/products" className="lv-button mt-6 inline-block">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  )
}

