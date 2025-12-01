'use client'

import React from 'react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-lv text-lv-black mb-4 tracking-tight">
            Shopping Cart
          </h1>
          <div className="w-24 h-px bg-lv-black mb-8"></div>
          
          <div className="text-center py-20">
            <p className="text-xl text-lv-gray mb-6 font-lv">Your cart is empty</p>
            <Link
              href="/products"
              className="lv-button"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-lv text-lv-black mb-4 tracking-tight">
          Shopping Cart
        </h1>
        <div className="w-24 h-px bg-lv-black mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item: any) => (
              <div
                key={item.variantId}
                className="flex gap-6 pb-6 border-b border-lv-light-gray"
              >
                <Link
                  href={`/products/${item.handle}`}
                  className="relative w-32 h-32 flex-shrink-0 bg-gray-100"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.handle}`}
                    className="block mb-2"
                  >
                    <h3 className="text-lg font-lv text-lv-black hover:text-lv-gray transition-colors transition-lv">
                      {item.title}
                    </h3>
                  </Link>
                  {item.variantTitle && (
                    <p className="text-sm text-lv-gray mb-4 font-lv">{item.variantTitle}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-lv-light-gray">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-lv-black/5 transition-colors transition-lv font-lv"
                        >
                          <span className="text-sm">−</span>
                        </button>
                        <span className="w-10 text-center text-sm font-lv">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-lv-black/5 transition-colors transition-lv font-lv"
                        >
                          <span className="text-sm">+</span>
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-sm text-lv-gray hover:text-lv-black transition-colors transition-lv font-lv"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-lv-demi text-lv-black">
                        {item.currencyCode} {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-lv-gray font-lv">
                          {item.currencyCode} {parseFloat(item.price).toFixed(2)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Link
                href="/products"
                className="text-sm text-lv-gray hover:text-lv-black transition-colors transition-lv font-lv lv-link"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-lv-gray hover:text-lv-black transition-colors transition-lv font-lv"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 sticky top-32">
              <h2 className="text-xl font-lv-demi text-lv-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm font-lv">
                  <span className="text-lv-gray">Subtotal</span>
                  <span className="text-lv-black">
                    {items[0]?.currencyCode || 'USD'} {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-lv">
                  <span className="text-lv-gray">Shipping</span>
                  <span className="text-lv-black">
                    {getTotalPrice() >= 100 ? 'Free' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="border-t border-lv-light-gray pt-4 flex justify-between text-lg font-lv-demi">
                  <span className="text-lv-black">Total</span>
                  <span className="text-lv-black">
                    {items[0]?.currencyCode || 'USD'} {getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full lv-button mb-3 text-center"
              >
                Proceed to Checkout
              </Link>

              {getTotalPrice() < 100 && (
                <p className="text-xs text-center text-lv-gray font-lv">
                  Add {((100 - getTotalPrice()).toFixed(2))} more for free shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

