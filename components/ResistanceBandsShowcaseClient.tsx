'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

interface ProductData {
  id: string
  title: string
  description: string
  handle: string
  price: number
  currencyCode: string
  image: string
  variantId: string
  availableForSale: boolean
}

interface ResistanceBandsShowcaseClientProps {
  product: ProductData
}

export default function ResistanceBandsShowcaseClient({ product }: ResistanceBandsShowcaseClientProps) {
  const { addItem, setIsOpen } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (!product.availableForSale || !product.variantId) return
    
    setIsAdding(true)
    
    addItem({
      id: product.id,
      variantId: product.variantId,
      title: product.title,
      handle: product.handle,
      variantTitle: 'Default',
      price: product.price.toString(),
      currencyCode: product.currencyCode,
      image: product.image,
    })
    
    setTimeout(() => {
      setIsAdding(false)
      setIsOpen(true)
    }, 300)
  }

  // Truncate description
  const shortDescription = product.description
    ? product.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
    : 'Premium quality product designed for your fitness and wellness.';

  return (
    <section className="py-8 lg:py-10 bg-gradient-to-br from-lv-light-gray/30 via-white to-lv-light-gray/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch bg-white rounded-lg shadow-2xl overflow-hidden relative"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-lv-orange/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-lv-black/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

          {/* Left Side - Content (Opposite of Posture Corrector) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-3 sm:space-y-4 relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1"
          >
            {/* Badge */}
            <div className="inline-block">
              <span className="text-[10px] font-lv-demi text-lv-orange uppercase tracking-wider bg-lv-orange/10 px-2.5 py-1 rounded-sm">
                Premium Quality
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-lv-demi text-lv-black tracking-tight leading-tight line-clamp-2">
              {product.title}
            </h2>

            {/* Divider */}
            <div className="w-12 h-px bg-lv-black" />

            {/* Description */}
            <p className="text-sm md:text-base text-lv-gray font-lv leading-relaxed line-clamp-3">
              {shortDescription}
            </p>

            {/* Key Features - Ultra Compact Grid */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-lv-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[11px] font-lv text-lv-gray">Premium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-lv-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[11px] font-lv text-lv-gray">Free Ship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-lv-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[11px] font-lv text-lv-gray">30-Day Return</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-lv-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[11px] font-lv text-lv-gray">4.9/5 Rating</span>
              </div>
            </div>

            {/* Price & Buttons Row */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-lv-light-gray/30">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-lv-demi text-lv-black">
                  {product.currencyCode === 'USD' ? '$' : ''}
                  {product.price.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3 flex-1 justify-end">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!product.availableForSale || isAdding}
                  className="lv-button text-sm py-3 px-6 text-center disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  whileHover={{ scale: product.availableForSale && !isAdding ? 1.02 : 1 }}
                  whileTap={{ scale: product.availableForSale && !isAdding ? 0.98 : 1 }}
                >
                  {isAdding ? 'Adding...' : product.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                </motion.button>
                <Link href={`/products/${product.handle}`} className="lv-button-secondary text-sm py-3 px-6 text-center whitespace-nowrap">
                  Details
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Image (Opposite of Posture Corrector) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] bg-gradient-to-br from-lv-light-gray/30 via-white to-lv-light-gray/20 overflow-hidden order-1 lg:order-2"
          >
            <Image
              src="/324421752889.jpg"
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="absolute top-4 left-4 bg-lv-orange text-white px-3 py-1.5 rounded-md shadow-lg z-20"
            >
              <p className="text-[10px] font-lv-demi uppercase tracking-wider">Featured</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

