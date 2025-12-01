import { getCollections } from '@/lib/shopify'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default async function CollectionsPage() {
  const collections = await getCollections(20)

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-lv text-lv-black mb-4 tracking-tight">
            Collections
          </h1>
          <div className="w-24 h-px bg-lv-black mx-auto mb-4"></div>
          <p className="text-lv-gray max-w-2xl mx-auto font-lv text-sm md:text-base">
            Discover our curated collections of premium products
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection: any) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {collection.image ? (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <span className="text-gray-400 text-lg">{collection.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-lv text-lv-black group-hover:text-lv-gray transition-colors transition-lv mb-2">
                  {collection.title}
                </h3>
                {collection.description && (
                  <p className="text-sm text-lv-gray line-clamp-2 font-lv">
                    {collection.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {collections.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lv-gray font-lv">No collections found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

