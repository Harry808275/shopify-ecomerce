import { getProductByHandle, getProducts, getRelatedProducts } from '@/lib/shopify'
import { notFound } from 'next/navigation'
import ProductPageClient from '@/components/ProductPageClient'

export async function generateStaticParams() {
  const products = await getProducts(50)
  return products.map((product: any) => ({
    handle: product.handle,
  }))
}

export default async function ProductPage({
  params,
}: {
  params: { handle: string }
}) {
  const product = await getProductByHandle(params.handle)

  if (!product) {
    notFound()
  }

  const images = product.images.edges.map((edge: any) => edge.node)
  const price = product.priceRange.minVariantPrice
  const maxPrice = product.priceRange.maxVariantPrice
  const hasPriceRange = parseFloat(maxPrice.amount) > parseFloat(price.amount)

  // Get related products from first collection or fallback to random products
  const firstCollection = product.collections?.edges?.[0]?.node?.handle
  const relatedProducts = await getRelatedProducts(product.id, firstCollection, 4)

  // Featured products for landing page section
  const featuredProducts = await getProducts(4)

  return (
    <ProductPageClient 
      product={product} 
      images={images} 
      price={price} 
      maxPrice={maxPrice} 
      hasPriceRange={hasPriceRange}
      relatedProducts={relatedProducts}
      featuredProducts={featuredProducts}
    />
  )
}
