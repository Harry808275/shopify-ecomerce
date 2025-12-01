'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: {
    id: string
    title: string
    handle: string
    priceRange: {
      minVariantPrice: {
        amount: string
        currencyCode: string
      }
    }
    images: {
      edges: Array<{
        node: {
          url: string
          altText: string | null
        }
      }>
    }
    variants?: {
      edges: Array<{
        node: {
          id: string
          availableForSale: boolean
        }
      }>
    }
  }
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem, openCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  
  const images = product.images.edges.map((edge: any) => edge.node)
  const mainImage = images[0]
  const secondImage = images[1]
  const price = product.priceRange.minVariantPrice
  const hasMultipleImages = images.length > 1
  const isOnSale = false // You can add sale logic here
  const isNew = false // You can add new product logic here
  const isAvailable = product.variants?.edges[0]?.node.availableForSale !== false

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAvailable || !product.variants?.edges[0]) return
    
    setIsAdding(true)
    
    const variant = product.variants.edges[0].node
    
    addItem({
      id: product.id,
      variantId: variant.id,
      title: product.title,
      handle: product.handle,
      variantTitle: 'Default',
      price: parseFloat(price.amount),
      currencyCode: price.currencyCode,
      image: mainImage?.url || '',
      quantity: 1,
    })
    
    setTimeout(() => {
      setIsAdding(false)
      openCart()
    }, 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.handle}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-white aspect-square rounded-sm product-image-container shadow-sm group-hover:shadow-lg transition-shadow duration-300">
          {mainImage ? (
            <>
              <Image
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                fill
                priority={priority}
                className={`object-contain p-2 transition-all duration-700 ${
                  isHovered && hasMultipleImages ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {hasMultipleImages && secondImage && (
                <Image
                  src={secondImage.url}
                  alt={secondImage.altText || `${product.title} - View 2`}
                  fill
                  className={`object-contain p-2 transition-all duration-700 absolute inset-0 ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-lv-light-gray flex items-center justify-center">
              <span className="text-lv-gray font-lv">No Image</span>
            </div>
          )}

          {/* Overlay Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {isNew && (
              <span className="bg-lv-black text-white px-3 py-1 text-xs font-lv-demi tracking-wider uppercase">
                New
              </span>
            )}
            {isOnSale && (
              <span className="bg-lv-orange text-white px-3 py-1 text-xs font-lv-demi tracking-wider uppercase">
                Sale
              </span>
            )}
          </div>

          {/* Quick Actions - Show on Hover */}
          <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 z-20 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {isAvailable ? (
              <motion.button
                onClick={handleQuickAdd}
                disabled={isAdding}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-lv-black text-white px-6 py-3 text-sm font-lv-demi tracking-wider uppercase hover:bg-lv-gray transition-colors disabled:opacity-50"
              >
                {isAdding ? 'Adding...' : 'Quick Add'}
              </motion.button>
            ) : (
              <span className="bg-white/90 text-lv-black px-6 py-3 text-sm font-lv-demi tracking-wider uppercase">
                Out of Stock
              </span>
            )}
          </div>

          {/* Wishlist Icon */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // Add wishlist functionality here
            }}
            className={`absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 z-20 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            } hover:bg-white hover:scale-110`}
            aria-label="Add to wishlist"
          >
            <svg className="w-5 h-5 text-lv-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Stock Indicator */}
          {isAvailable && (
            <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
              isHovered ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}>
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                <p className="text-xs font-lv-demi text-lv-black uppercase tracking-wider">
                  In Stock
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <h3 className="text-base font-lv text-lv-black group-hover:text-lv-gray transition-colors transition-lv line-clamp-2 min-h-[2.5rem]">
            {product.title}
          </h3>
          
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-lv-demi text-lv-black">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </p>
            {isOnSale && (
              <p className="text-sm text-lv-gray font-lv line-through">
                {price.currencyCode} {(parseFloat(price.amount) * 1.3).toFixed(2)}
              </p>
            )}
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-2 pt-1">
            <svg className="w-4 h-4 text-lv-orange" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-lv-gray font-lv">Free Shipping</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
