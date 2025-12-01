import React from 'react'
import Link from 'next/link'

export default function RefundPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-lv text-lv-black mb-6 tracking-tight">
          Refund Policy
        </h1>
        <div className="w-24 h-px bg-lv-black mb-8"></div>

        <div className="prose prose-lg max-w-none space-y-6 text-lv-gray font-lv">
          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">30-Day Money-Back Guarantee</h2>
            <p className="leading-relaxed">
              We stand behind the quality of our products. If you're not completely satisfied with
              your purchase, you can return it within 30 days of delivery for a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Return Conditions</h2>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Items must be in original condition with tags attached</li>
              <li>Items must be unused and in original packaging</li>
              <li>Proof of purchase is required</li>
              <li>Personalized or custom items may not be eligible for return</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">How to Return</h2>
            <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
              <li>Contact our customer service team to initiate a return</li>
              <li>We'll provide you with a return authorization and shipping label</li>
              <li>Package the item securely and ship it back to us</li>
              <li>Once we receive and inspect the item, we'll process your refund</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Refund Processing</h2>
            <p className="leading-relaxed">
              Refunds will be processed within 5-7 business days after we receive your return.
              The refund will be issued to the original payment method. Please note that it may take
              additional time for your bank or credit card company to process the refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Free Returns</h2>
            <p className="leading-relaxed">
              We cover return shipping costs for all eligible returns. Simply use the prepaid
              shipping label we provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about our refund policy, please contact us at{' '}
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


