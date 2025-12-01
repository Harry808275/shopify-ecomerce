import React from 'react'
import Link from 'next/link'

export default function ShippingPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-lv text-lv-black mb-6 tracking-tight">
          Shipping Policy
        </h1>
        <div className="w-24 h-px bg-lv-black mb-8"></div>

        <div className="prose prose-lg max-w-none space-y-6 text-lv-gray font-lv">
          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Processing Time</h2>
            <p className="leading-relaxed">
              All orders are processed within 1-2 business days (excluding weekends and holidays).
              Once your order is processed, you'll receive a confirmation email with tracking
              information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Shipping Options</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-lv-demi text-lv-black mb-2">Standard Shipping</h3>
                <p className="leading-relaxed">
                  5-7 business days. Free on orders over $100. $9.99 for orders under $100.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-lv-demi text-lv-black mb-2">Express Shipping</h3>
                <p className="leading-relaxed">
                  2-3 business days. $19.99 flat rate.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-lv-demi text-lv-black mb-2">International Shipping</h3>
                <p className="leading-relaxed">
                  10-21 business days depending on location. Shipping costs calculated at checkout.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Order Tracking</h2>
            <p className="leading-relaxed">
              Once your order ships, you'll receive an email with a tracking number. You can use
              this number on the carrier's website to track your package in real-time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Shipping Address</h2>
            <p className="leading-relaxed">
              Please ensure your shipping address is correct at checkout. We are not responsible
              for orders shipped to incorrect addresses provided by the customer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Delivery Issues</h2>
            <p className="leading-relaxed">
              If you experience any issues with delivery, please contact us immediately. We'll work
              with the shipping carrier to resolve the issue as quickly as possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Contact Us</h2>
            <p className="leading-relaxed">
              For questions about shipping, contact us at{' '}
              <a href="mailto:support@yourstore.com" className="lv-link">
                support@yourstore.com
              </a>
              {' '}or use our{' '}
              <Link href="/contact" className="lv-link">
                contact form
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}


