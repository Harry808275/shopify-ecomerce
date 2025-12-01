'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartSidebar() {
  const { isOpen, setIsOpen, items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-luxury-dark/10">
              <h2 className="text-2xl font-bold text-luxury text-luxury-dark">
                Shopping Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-luxury-dark hover:text-luxury-gold transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-luxury-dark/70 mb-4">Your cart is empty</p>
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="inline-block border-2 border-luxury-dark text-luxury-dark px-6 py-2 text-sm font-semibold tracking-wider hover:bg-luxury-dark hover:text-white transition-all duration-300"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item: any) => (
                    <div key={item.variantId} className="flex gap-4 pb-4 border-b border-luxury-dark/10">
                      <Link
                        href={`/products/${item.handle}`}
                        onClick={() => setIsOpen(false)}
                        className="relative w-20 h-20 flex-shrink-0 bg-gray-100"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.handle}`}
                          onClick={() => setIsOpen(false)}
                          className="block"
                        >
                          <h3 className="text-sm font-medium text-luxury-dark hover:text-luxury-gold transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                        </Link>
                        {item.variantTitle && (
                          <p className="text-xs text-luxury-dark/60 mt-1">{item.variantTitle}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center border border-luxury-dark/20 hover:border-luxury-gold transition-colors"
                            >
                              <span className="text-xs">−</span>
                            </button>
                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center border border-luxury-dark/20 hover:border-luxury-gold transition-colors"
                            >
                              <span className="text-xs">+</span>
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-luxury-dark">
                              {item.currencyCode} {(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-xs text-luxury-dark/60 hover:text-luxury-gold transition-colors mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-luxury-dark/10 p-6 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-luxury-dark">Total:</span>
                  <span className="text-luxury-dark">
                    {items[0]?.currencyCode || 'USD'} {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-luxury-dark text-white px-6 py-3 text-center text-sm font-semibold tracking-wider hover:bg-luxury-dark/90 transition-colors uppercase"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full border-2 border-luxury-dark text-luxury-dark px-6 py-3 text-center text-sm font-semibold tracking-wider hover:bg-luxury-dark hover:text-white transition-all duration-300 uppercase"
                >
                  Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="block w-full text-sm text-luxury-dark/60 hover:text-luxury-gold transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}




