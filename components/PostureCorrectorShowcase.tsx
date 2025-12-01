import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { searchProductByTitle } from '@/lib/shopify'
import PostureCorrectorShowcaseClient from './PostureCorrectorShowcaseClient'

export default async function PostureCorrectorShowcase() {
  // Search for posture corrector product
  const products = await searchProductByTitle('posture')
  const product = products.length > 0 
    ? products[0] 
    : (await searchProductByTitle('corrector'))[0] 
    || (await searchProductByTitle('brace'))[0]

  if (!product) {
    return null // Don't show section if product not found
  }

  const images = product.images.edges.map((edge: any) => edge.node)
  const mainImage = images[0]
  const price = product.priceRange.minVariantPrice
  const variant = product.variants?.edges[0]?.node

  return (
    <PostureCorrectorShowcaseClient 
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

