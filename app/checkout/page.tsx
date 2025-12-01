'use client'

import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US',
    phone: '',
  })

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Create checkout with Shopify
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item: any) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
          email: formData.email,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address1: formData.address,
            city: formData.city,
            zip: formData.zipCode,
            country: formData.country,
            phone: formData.phone,
          },
        }),
      })

      const data = await response.json()

      if (data.checkoutUrl) {
        // Redirect to Shopify checkout
        window.location.href = data.checkoutUrl
      } else {
        throw new Error('Failed to create checkout')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('There was an error processing your checkout. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-luxury text-luxury-dark mb-4">
          Checkout
        </h1>
        <div className="w-24 h-px bg-luxury-gold mb-8"></div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-luxury-dark mb-4">Contact Information</h2>
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-luxury-dark/20 px-4 py-3 text-luxury-dark focus:outline-none focus:border-luxury-gold transition-colors mb-4"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-luxury-dark/20 px-4 py-3 text-luxury-dark focus:outline-none focus:border-luxury-gold transition-colors"
              />
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-semibold text-luxury-dark mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border border-luxury-dark/20 px-4 py-3 text-luxury-dark focus:outline-none focus:border-luxury-gold transition-colors"
                />
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border border-luxury-dark/20 px-4 py-3 text-luxury-dark focus:outline-none focus:border-luxury-gold transition-colors"
                />
              </div>
              <input
                type="text"
                name="address"
                required
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-luxury-dark/20 px-4 py-3 text-luxury-dark focus:outline-none focus:border-luxury-gold transition-colors mb-4"
              />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border border-luxury-dark/20 px-4 py-3 text-luxury-dark focus:outline-none focus:border-luxury-gold transition-colors"
                />
                <input
                  type="text"
                  name="zipCode"
                  required
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="border border-luxury-dark/20 px-4 py-3 text-luxury-dark focus:outline-none focus:border-luxury-gold transition-colors"
                />
              </div>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full border border-luxury-dark/20 px-4 py-3 text-luxury-dark focus:outline-none focus:border-luxury-gold transition-colors"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-luxury-dark text-white px-8 py-4 text-sm font-semibold tracking-wider hover:bg-luxury-dark/90 transition-all duration-300 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Complete Order'}
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 sticky top-32">
              <h2 className="text-xl font-bold text-luxury-dark mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {items.map((item: any) => (
                  <div key={item.variantId} className="flex justify-between text-sm">
                    <span className="text-luxury-dark/70">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="text-luxury-dark">
                      {item.currencyCode} {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-luxury-dark/10 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-dark/70">Subtotal</span>
                  <span className="text-luxury-dark">
                    {items[0]?.currencyCode || 'USD'} {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-dark/70">Shipping</span>
                  <span className="text-luxury-dark">
                    {getTotalPrice() >= 100 ? 'Free' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-luxury-dark/10">
                  <span className="text-luxury-dark">Total</span>
                  <span className="text-luxury-dark">
                    {items[0]?.currencyCode || 'USD'} {getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}




