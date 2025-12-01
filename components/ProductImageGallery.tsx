'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductImageGalleryProps {
  images: Array<{
    url: string
    altText: string | null
  }>
  productTitle: string
  onImageChange?: (imageUrl: string) => void
  externalImageUrl?: string | null
}

export default function ProductImageGallery({ images, productTitle, onImageChange, externalImageUrl }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Sync with external image changes (from variant selection)
  useEffect(() => {
    if (externalImageUrl) {
      const index = images.findIndex(img => img.url === externalImageUrl)
      if (index !== -1) {
        setSelectedImageIndex(index)
      }
    }
  }, [externalImageUrl, images])

  // Remove auto-rotate for better UX

  const selectedImage = images[selectedImageIndex]

  return (
    <div className="space-y-2">
      {/* Main Image - Smaller, Fits One Screen */}
      <motion.div
        className="relative bg-white overflow-hidden rounded-lg cursor-zoom-in group shadow-xl w-full"
        style={{ aspectRatio: '4/3', minHeight: '260px', maxHeight: '340px' }}
        onClick={() => setIsZoomed(!isZoomed)}
        initial={false}
        animate={{ scale: isZoomed ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImageIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {selectedImage && (
              <Image
                src={selectedImage.url}
                alt={selectedImage.altText || productTitle}
                fill
                className="object-contain w-full h-full"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Zoom Indicator - More Elegant */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-lv-light-gray">
          <p className="text-[10px] font-lv-demi text-lv-black uppercase tracking-wider">
            {isZoomed ? 'Zoom Out' : 'Zoom'}
          </p>
        </div>

        {/* Image Counter - More Elegant */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-sm shadow-sm border border-lv-light-gray">
            <p className="text-[10px] font-lv-demi text-lv-black">
              {selectedImageIndex + 1} / {images.length}
            </p>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-md border border-lv-light-gray"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4 text-lv-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImageIndex((prev) => (prev + 1) % images.length)
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-md border border-lv-light-gray"
              aria-label="Next image"
            >
              <svg className="w-4 h-4 text-lv-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </motion.div>

      {/* Thumbnail Gallery - Properly Aligned, No Overlap */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setSelectedImageIndex(index)
                if (onImageChange) {
                  onImageChange(image.url)
                }
              }}
              className={`relative aspect-square overflow-hidden rounded-md transition-all duration-300 bg-white group isolate ${
                selectedImageIndex === index
                  ? 'shadow-xl ring-2 ring-lv-black/50 scale-105 z-10'
                  : 'shadow-md hover:shadow-lg z-0'
              }`}
              whileHover={selectedImageIndex !== index ? { scale: 1.02 } : {}}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow Effect for Selected */}
              {selectedImageIndex === index && (
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-br from-lv-black/15 via-lv-black/8 to-transparent rounded-md blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              <Image
                src={image.url}
                alt={image.altText || `${productTitle} ${index + 1}`}
                fill
                className={`object-contain p-1.5 transition-all duration-300 ${
                  selectedImageIndex === index ? 'scale-105 brightness-105' : 'group-hover:scale-102'
                }`}
                sizes="(max-width: 1024px) 25vw, 12.5vw"
              />
              
              {/* Shine Effect on Selected */}
              {selectedImageIndex === index && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3, 
                    ease: 'linear',
                    repeatDelay: 2
                  }}
                />
              )}
              
              {/* Active Indicator - Compact Badge */}
              {selectedImageIndex === index && (
                <motion.div
                  className="absolute top-0.5 right-0.5 w-4 h-4 bg-lv-black rounded-full flex items-center justify-center shadow-lg z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}


