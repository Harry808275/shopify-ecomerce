import { getProducts, searchProductByTitle } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  let products
  if (searchParams?.search) {
    // Search for products
    products = await searchProductByTitle(searchParams.search)
  } else {
    products = await getProducts(50)
  }

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-lv text-lv-black mb-4 tracking-tight">
            {searchParams?.search ? `Search Results for "${searchParams.search}"` : 'All Products'}
          </h1>
          <div className="w-24 h-px bg-lv-black mx-auto mb-4"></div>
          <p className="text-lv-gray max-w-2xl mx-auto font-lv text-sm md:text-base">
            {searchParams?.search 
              ? `Found ${products.length} product${products.length !== 1 ? 's' : ''} matching your search`
              : 'Explore our complete collection of premium products'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lv-gray font-lv">No products found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

