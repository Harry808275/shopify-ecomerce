'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ProductActions from './ProductActions'
import ProductImageGallery from './ProductImageGallery'
import ProductCard from '@/components/ProductCard'

interface ProductPageClientProps {
  product: any
  images: Array<{ url: string; altText: string | null }>
  price: { amount: string; currencyCode: string }
  maxPrice: { amount: string; currencyCode: string }
  hasPriceRange: boolean
  relatedProducts?: any[]
  featuredProducts?: any[]
}

interface FaqItem {
  question: string
  answer: string
}

function getFaqConfig(product: any): { title: string; subtitle: string; label: string; faqs: FaqItem[] } | null {
  const handle = product?.handle?.toLowerCase?.() || ''
  const title = product?.title?.toLowerCase?.() || ''

  if (handle.includes('posture') || title.includes('posture')) {
    return {
      title: 'Posture Corrector FAQs',
      subtitle: 'Answers before you improve your posture',
      label: 'Posture support',
      faqs: [
        {
          question: 'How to resistance band?',
          answer:
            'Use the band by stretching it slowly for strength or mobility workouts—keep tension throughout the movement.',
        },
        {
          question: 'How to use resistance bands?',
          answer: 'Anchor the band securely and perform controlled exercises for arms, legs, and core.',
        },
        {
          question: 'Do resistance bands build muscle?',
          answer: 'Yes, consistent workouts with progressive tension can help you build lean muscle.',
        },
      ],
    }
  }

  if (handle.includes('band') || title.includes('band')) {
    return {
      title: 'Resistance Bands FAQs',
      subtitle: 'Quick answers before you stretch',
      label: 'Expert guidance',
      faqs: [
        {
          question: 'How to use resistance bands for workouts?',
          answer: 'Anchor the band and perform controlled pulling or pushing movements.',
        },
        {
          question: 'How to use resistance bands for workouts?',
          answer: 'Secure the band and follow exercises like squats, rows, or presses with tension.',
        },
        {
          question: 'Can resistance bands build muscle?',
          answer: 'Yes, they build muscle by providing constant resistance.',
        },
        {
          question: 'Do resistance bands build muscle?',
          answer: 'Yes, with consistent use and increasing band tension.',
        },
        {
          question: 'How to resistance band?',
          answer: 'Choose a band, anchor it, and stretch it during exercises.',
        },
      ],
    }
  }

  return null
}

export default function ProductPageClient({ product, images, price, maxPrice, hasPriceRange, relatedProducts = [], featuredProducts = [] }: ProductPageClientProps) {
  const [selectedVariantImageUrl, setSelectedVariantImageUrl] = useState<string | null>(null)
  const [openFaqs, setOpenFaqs] = useState<number[]>([])

  const faqConfig = getFaqConfig(product)

  const handleVariantImageChange = (imageUrl: string) => {
    setSelectedVariantImageUrl(imageUrl)
  }

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]))
  }

  return (
    <div className="pt-16 sm:pt-20 pb-4 min-h-screen bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-3 text-xs text-lv-gray font-lv"
        >
          <Link href="/" className="lv-link text-lv-gray hover:text-lv-black transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="lv-link text-lv-gray hover:text-lv-black transition-colors">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-lv-black">{product.title}</span>
        </motion.nav>

        {/* Main Product Section - Ultra Compact Single Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4">
          {/* Images - Properly Sized */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:sticky lg:top-20 lg:self-start"
          >
            <ProductImageGallery 
              images={images} 
              productTitle={product.title}
              externalImageUrl={selectedVariantImageUrl}
            />
          </motion.div>

          {/* Product Info - Compact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Title - Ultra Compact */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl font-lv text-lv-black mb-1 tracking-tight line-clamp-2"
            >
              {product.title}
            </motion.h1>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="w-12 h-px bg-lv-black mb-2 origin-left"
            />

            {/* Price - Ultra Compact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4, type: 'spring' }}
              className="mb-2"
            >
              <div className="flex items-baseline gap-2">
                <p className="text-lg md:text-xl font-lv-demi text-lv-black">
                  {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                </p>
                {hasPriceRange && (
                  <p className="text-xs text-lv-gray font-lv line-through">
                    {maxPrice.currencyCode} {parseFloat(maxPrice.amount).toFixed(2)}
                  </p>
                )}
              </div>
              {hasPriceRange && (
                <p className="text-[10px] text-lv-orange font-lv-demi mt-0.5">
                  Save {((parseFloat(maxPrice.amount) - parseFloat(price.amount)) / parseFloat(maxPrice.amount) * 100).toFixed(0)}%
                </p>
              )}
            </motion.div>

            {/* Social Proof - Ultra Compact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="mb-2 flex items-center gap-2"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-lv-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-lv-gray font-lv">(4.9/5) · 1,234+ Reviews</span>
            </motion.div>

            {/* Description - Ultra Compact (Truncated) */}
            {product.description && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="text-lv-gray mb-2 leading-relaxed font-lv text-[11px] max-w-none"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                dangerouslySetInnerHTML={{ __html: product.description.substring(0, 120) + '...' }}
              />
            )}

            {/* Product Actions - Ultra Compact */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="mb-2"
            >
              <ProductActions product={product} onVariantImageChange={handleVariantImageChange} />
            </motion.div>

            {/* Trust Indicators - Compact Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="grid grid-cols-2 gap-2 pt-4 border-t border-lv-light-gray"
            >
              <div className="flex items-center gap-2 text-xs">
                <svg className="w-4 h-4 text-lv-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lv-gray font-lv"><strong className="text-lv-black font-lv-demi">Free Shipping</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <svg className="w-4 h-4 text-lv-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lv-gray font-lv"><strong className="text-lv-black font-lv-demi">30-Day Returns</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <svg className="w-4 h-4 text-lv-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lv-gray font-lv"><strong className="text-lv-black font-lv-demi">Secure Payment</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <svg className="w-4 h-4 text-lv-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lv-gray font-lv"><strong className="text-lv-black font-lv-demi">Fast Delivery</strong></span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {faqConfig && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="mt-4 mb-6 bg-white/90 backdrop-blur p-4 sm:p-6 lg:p-7 rounded-2xl shadow-2xl border border-lv-light-gray/40"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-lv-orange font-lv-demi">
                  {faqConfig.title}
                </p>
                <h2 className="text-lg sm:text-xl font-lv-demi text-lv-black mt-1">{faqConfig.subtitle}</h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lv-orange/10 text-xs font-lv text-lv-orange">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11v5m0-8h.01M12 5a7 7 0 100 14 7 7 0 000-14z" />
                </svg>
                {faqConfig.label}
              </div>
            </div>

            <div className="space-y-3">
              {faqConfig.faqs.map((faq, index) => {
                const isOpen = openFaqs.includes(index)
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="border border-lv-light-gray/40 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full px-3 sm:px-4 py-3 flex items-center justify-between gap-3 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-7 w-7 rounded-full bg-lv-black text-white flex items-center justify-center text-xs font-lv-demi">
                          {index + 1}
                        </span>
                        <p className="text-xs sm:text-sm md:text-[13px] font-lv-demi text-lv-black">
                          {faq.question}
                        </p>
                      </div>
                      <span className="text-lv-black text-lg leading-none">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-3 sm:px-4 pb-3 text-xs sm:text-sm text-lv-gray font-lv leading-relaxed border-t border-lv-light-gray/30">
                        {faq.answer}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.section>
        )}

        {/* Featured Products Section - Compact */}
        {featuredProducts.length > 0 && (
          <section className="mt-6 mb-8 border-t border-lv-light-gray/40 pt-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base sm:text-lg font-lv-demi text-lv-black tracking-tight">
                  Featured products
                </h2>
                <p className="text-[11px] text-lv-gray font-lv">
                  Handpicked Evertrust favorites you might also love.
                </p>
              </div>
              <Link href="/products" className="text-[11px] font-lv text-lv-black underline underline-offset-4">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {featuredProducts.map((fp: any, index: number) => (
                <ProductCard key={fp.id} product={fp} priority={index < 2} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
