import React from 'react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-lv text-lv-black mb-6 tracking-tight">
          Terms of Service
        </h1>
        <div className="w-24 h-px bg-lv-black mb-8"></div>

        <div className="prose prose-lg max-w-none space-y-6 text-lv-gray font-lv">
          <section>
            <p className="leading-relaxed">
              <strong className="text-lv-black font-lv-demi">Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Agreement to Terms</h2>
            <p className="leading-relaxed">
              By accessing and using this website, you agree to be bound by these Terms of Service.
              If you do not agree, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Use of Website</h2>
            <p className="leading-relaxed mb-4">You agree to use our website only for lawful purposes and in a way that:</p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Does not infringe on the rights of others</li>
              <li>Does not interfere with the website's operation</li>
              <li>Complies with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Product Information</h2>
            <p className="leading-relaxed">
              We strive to provide accurate product information, but we do not warrant that product
              descriptions, images, or prices are error-free. We reserve the right to correct any
              errors and to change or update information at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Pricing and Payment</h2>
            <p className="leading-relaxed">
              All prices are in USD unless otherwise stated. We reserve the right to change prices
              at any time. Payment must be made at the time of purchase through our secure payment
              processors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on this website, including text, graphics, logos, and images, is the
              property of our company and is protected by copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Limitation of Liability</h2>
            <p className="leading-relaxed">
              We are not liable for any indirect, incidental, or consequential damages arising from
              your use of our website or products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the website
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Contact Us</h2>
            <p className="leading-relaxed">
              For questions about these terms, contact us at{' '}
              <a href="mailto:legal@yourstore.com" className="lv-link">
                legal@yourstore.com
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


