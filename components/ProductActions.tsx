'use client'

import React, { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import TrustBadges from './TrustBadges'

interface ProductActionsProps {
  product: {
    id: string
    title: string
    handle: string
    images: {
      edges: Array<{
        node: {
          url: string
          altText: string | null
        }
      }>
    }
    variants: {
      edges: Array<{
        node: {
          id: string
          title: string
          price: {
            amount: string
            currencyCode: string
          }
          availableForSale: boolean
          image?: {
            url: string
            altText: string | null
          } | null
        }
      }>
    }
  }
  onVariantImageChange?: (imageUrl: string) => void
}

export default function ProductActions({ product, onVariantImageChange }: ProductActionsProps) {
  const { addItem } = useCart()
  const router = useRouter()
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants.edges[0]?.node.id || ''
  )
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const selectedVariant = product.variants.edges.find(
    (v) => v.node.id === selectedVariantId
  )?.node

  // When variant changes, update main image if variant has its own image
  useEffect(() => {
    if (selectedVariant?.image?.url && onVariantImageChange) {
      onVariantImageChange(selectedVariant.image.url)
    }
  }, [selectedVariantId, selectedVariant, onVariantImageChange])

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) {
      alert('This variant is not available for sale')
      return
    }

    setIsAdding(true)
    const image = selectedVariant.image || product.images.edges[0]?.node

    // Add item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        price: selectedVariant.price.amount,
        currencyCode: selectedVariant.price.currencyCode,
        image: image?.url || '',
        handle: product.handle,
        variantTitle: selectedVariant.title,
      })
    }

    // Reset quantity after adding
    setQuantity(1)
    
    // Animation delay
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    setTimeout(() => {
      router.push('/checkout')
    }, 500)
  }

  // Get all variants - prioritize those with images, but include all
  const allVariants = product.variants.edges
  const variantsWithImages = allVariants.filter(v => v.node.image)
  const variantsWithoutImages = allVariants.filter(v => !v.node.image)
  
  // Use product images for variants without their own images
  const productImages = product.images.edges.map(e => e.node)
  
  return (
    <div className="space-y-3">
      {/* Beautiful Variant Selection - Image-Based */}
      {allVariants.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <label className="block text-xs font-lv-demi text-lv-black tracking-wider uppercase">
              Choose Your Style
            </label>
            {selectedVariant && (
              <span className="text-xs font-lv text-lv-gray">
                {selectedVariant.price.currencyCode} {parseFloat(selectedVariant.price.amount).toFixed(2)}
              </span>
            )}
          </div>

          {/* Professional Variant Selector - Button-Based (Like Professional Sites) */}
          <div className="space-y-2">
            {allVariants.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {allVariants.map((variant: any) => {
                  const isSelected = variant.node.id === selectedVariantId
                  
                  // Extract variant parts
                  const variantParts = variant.node.title.split(' / ')
                  const variantColor = variantParts[0] || variant.node.title
                  const variantSize = variantParts[1] || null
                  const displayText = variantSize ? variantSize : variantColor

                  return (
                    <motion.button
                      key={variant.node.id}
                      onClick={() => {
                        setSelectedVariantId(variant.node.id)
                        // Update main image if variant has its own image
                        if (variant.node.image?.url && onVariantImageChange) {
                          onVariantImageChange(variant.node.image.url)
                        }
                      }}
                      disabled={!variant.node.availableForSale}
                      className={`relative px-4 py-2.5 text-xs font-lv-demi uppercase tracking-wider transition-all duration-300 ${
                        isSelected
                          ? 'bg-lv-black text-white shadow-lg scale-105'
                          : 'bg-white text-lv-black border border-lv-light-gray hover:border-lv-black hover:shadow-md'
                      } ${!variant.node.availableForSale ? 'opacity-50 cursor-not-allowed line-through' : 'cursor-pointer'}`}
                      whileHover={variant.node.availableForSale && !isSelected ? { scale: 1.02, y: -1 } : {}}
                      whileTap={variant.node.availableForSale ? { scale: 0.98 } : {}}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {displayText}
                      {isSelected && (
                        <motion.span
                          className="absolute -top-1 -right-1 w-4 h-4 bg-lv-orange rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.span>
                      )}
                      {!variant.node.availableForSale && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[8px] text-lv-gray uppercase">Sold Out</span>
                        </span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Selected Variant Details - Compact Card */}
          {selectedVariant && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-lv-light-gray/15 via-white/40 to-lv-light-gray/8 p-3 rounded-md shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs font-lv-demi text-lv-black truncate">{selectedVariant.title}</h4>
                    {selectedVariant.availableForSale && (
                      <motion.div
                        className="flex items-center gap-1 bg-lv-orange/15 px-2 py-0.5 rounded-full"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                      >
                        <svg className="w-3 h-3 text-lv-orange" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[9px] font-lv-demi text-lv-orange uppercase">In Stock</span>
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm font-lv-demi text-lv-black">
                    {selectedVariant.price.currencyCode} {parseFloat(selectedVariant.price.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-xs font-lv text-lv-black mb-2 tracking-wider uppercase">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-lv-light-gray">
            <motion.button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-lv-black/5 transition-colors transition-lv font-lv"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-lg">−</span>
            </motion.button>
            <motion.span
              key={quantity}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="w-12 text-center font-lv-demi text-lv-black"
            >
              {quantity}
            </motion.span>
            <motion.button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-lv-black/5 transition-colors transition-lv font-lv"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-lg">+</span>
            </motion.button>
          </div>
          {quantity > 1 && (
            <p className="text-sm text-lv-gray font-lv">
              Total: {selectedVariant?.price.currencyCode} {(parseFloat(selectedVariant?.price.amount || '0') * quantity).toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Scarcity Indicator - More Beautiful */}
      {selectedVariant?.availableForSale && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-lv-orange/15 via-lv-orange/10 to-lv-orange/5 border border-lv-orange/30 px-3 py-2 rounded-sm shadow-sm"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              <span className="text-base">⚡</span>
            </motion.div>
            <p className="text-xs font-lv-demi text-lv-black">
              Limited Stock - Only {Math.floor(Math.random() * 10) + 3} left!
            </p>
          </div>
        </motion.div>
      )}

      {/* Buttons - Compact */}
      <div className="space-y-2 pt-1">
        <motion.button
          onClick={handleAddToCart}
          disabled={!selectedVariant?.availableForSale || isAdding}
          className="w-full lv-button disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          whileHover={!isAdding && selectedVariant?.availableForSale ? { scale: 1.02 } : {}}
          whileTap={!isAdding && selectedVariant?.availableForSale ? { scale: 0.98 } : {}}
        >
          <AnimatePresence mode="wait">
            {isAdding ? (
              <motion.span
                key="adding"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                />
                Adding...
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Add to Cart - Secure Checkout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          onClick={handleBuyNow}
          disabled={!selectedVariant?.availableForSale || isAdding}
          className="w-full lv-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isAdding && selectedVariant?.availableForSale ? { scale: 1.02 } : {}}
          whileTap={!isAdding && selectedVariant?.availableForSale ? { scale: 0.98 } : {}}
        >
          Buy Now - Get Yours Today
        </motion.button>
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      {!selectedVariant?.availableForSale && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-600 font-lv text-center py-2"
        >
          This product is currently out of stock
        </motion.p>
      )}
    </div>
  )
}
