import { getCollectionProducts } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import { notFound } from 'next/navigation'

export default async function CollectionPage({
  params,
}: {
  params: { handle: string }
}) {
  const collection = await getCollectionProducts(params.handle, 50)

  if (!collection) {
    notFound()
  }

  const products = collection.products.edges.map((edge: any) => edge.node)

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-lv text-lv-black mb-4 tracking-tight">
            {collection.title}
          </h1>
          <div className="w-24 h-px bg-lv-black mx-auto mb-4"></div>
          {collection.description && (
            <p className="text-lv-gray max-w-2xl mx-auto font-lv text-sm md:text-base">
              {collection.description}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lv-gray font-lv">No products in this collection.</p>
          </div>
        )}
      </div>
    </div>
  )
}

