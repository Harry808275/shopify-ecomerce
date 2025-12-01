'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function TrustBadges() {
  const badges = [
    { icon: '🔒', text: 'Secure Checkout' },
    { icon: '🚚', text: 'Free Shipping' },
    { icon: '↩️', text: 'Easy Returns' },
    { icon: '⭐', text: 'Premium Quality' },
    { icon: '💳', text: 'Multiple Payment Options' },
    { icon: '🛡️', text: 'Buyer Protection' },
  ]

  return (
    <section className="py-12 lg:py-16 bg-white border-y border-lv-light-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-3xl lg:text-4xl mb-2">{badge.icon}</div>
              <p className="text-xs sm:text-sm font-lv text-lv-gray">{badge.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
