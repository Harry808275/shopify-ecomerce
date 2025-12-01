'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function BrandSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-lv-light-gray/20 via-white to-lv-light-gray/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Brand Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6"
          >
            <div className="inline-block">
              <span className="text-xs font-lv-demi text-lv-orange uppercase tracking-wider bg-lv-orange/10 px-4 py-2 rounded-sm">
                About Evertrust
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-lv-demi text-lv-black tracking-tight leading-tight">
              Trusted Quality,<br />Exceptional Service
            </h2>

            <div className="w-16 h-px bg-lv-black"></div>

            <p className="text-base sm:text-lg text-lv-gray font-lv leading-relaxed">
              At Evertrust, we are committed to providing you with premium products that combine exceptional quality with outstanding value. Our carefully curated selection represents the best in design, functionality, and reliability.
            </p>

            <p className="text-base sm:text-lg text-lv-gray font-lv leading-relaxed">
              We believe in building lasting relationships with our customers through transparency, integrity, and a dedication to excellence in every interaction.
            </p>

            {/* Key Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-lv-orange flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-lv-demi text-lv-black mb-1">Premium Quality</h3>
                  <p className="text-xs text-lv-gray font-lv">Carefully selected products</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-lv-orange flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-lv-demi text-lv-black mb-1">Fast Shipping</h3>
                  <p className="text-xs text-lv-gray font-lv">Quick and reliable delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-lv-orange flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-lv-demi text-lv-black mb-1">Secure Checkout</h3>
                  <p className="text-xs text-lv-gray font-lv">Your data is protected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-lv-orange flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-lv-demi text-lv-black mb-1">24/7 Support</h3>
                  <p className="text-xs text-lv-gray font-lv">We're here to help</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="lv-button-secondary inline-block"
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            {/* Trust Badges Grid */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-lg border border-lv-light-gray/50 text-center"
              >
                <div className="text-4xl font-lv-demi text-lv-black mb-2">10K+</div>
                <p className="text-sm text-lv-gray font-lv">Happy Customers</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-lg border border-lv-light-gray/50 text-center"
              >
                <div className="text-4xl font-lv-demi text-lv-black mb-2">4.9★</div>
                <p className="text-sm text-lv-gray font-lv">Average Rating</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-lg border border-lv-light-gray/50 text-center"
              >
                <div className="text-4xl font-lv-demi text-lv-black mb-2">100%</div>
                <p className="text-sm text-lv-gray font-lv">Satisfaction</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-lg border border-lv-light-gray/50 text-center"
              >
                <div className="text-4xl font-lv-demi text-lv-black mb-2">24/7</div>
                <p className="text-sm text-lv-gray font-lv">Support</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

