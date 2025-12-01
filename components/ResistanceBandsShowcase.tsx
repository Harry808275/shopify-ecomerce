import React from 'react'
import { searchProductByTitle } from '@/lib/shopify'
import ResistanceBandsShowcaseClient from './ResistanceBandsShowcaseClient'

export default async function ResistanceBandsShowcase() {
  // Search for resistance bands product
  const products = await searchProductByTitle('resistance')
  const product = products.length > 0 
    ? products[0] 
    : (await searchProductByTitle('bands'))[0] 
    || (await searchProductByTitle('workout'))[0]

  if (!product) {
    return null // Don't show section if product not found
  }

  const images = product.images.edges.map((edge: any) => edge.node)
  const mainImage = images[0]
  const price = product.priceRange.minVariantPrice
  const variant = product.variants?.edges[0]?.node

  return (
    <ResistanceBandsShowcaseClient 
      product={{
        id: product.id,
        title: product.title,
        description: product.description || '',
        handle: product.handle,
        price: parseFloat(price.amount),
        currencyCode: price.currencyCode,
        image: mainImage?.url || '',
        variantId: variant?.id || '',
        availableForSale: variant?.availableForSale !== false,
      }}
    />
  )
}

