import React from 'react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-lv text-lv-black mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <div className="w-24 h-px bg-lv-black mb-8"></div>

        <div className="prose prose-lg max-w-none space-y-6 text-lv-gray font-lv">
          <section>
            <p className="leading-relaxed">
              <strong className="text-lv-black font-lv-demi">Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Name, email address, shipping address, and phone number</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Order history and preferences</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and customer experience</li>
              <li>Detect and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Information Sharing</h2>
            <p className="leading-relaxed">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed mt-4">
              <li>Service providers who help us operate our business (shipping, payment processing)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Data Security</h2>
            <p className="leading-relaxed">
              We use SSL encryption and secure payment processors to protect your information.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Your Rights</h2>
            <p className="leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Contact Us</h2>
            <p className="leading-relaxed">
              For privacy-related questions, contact us at{' '}
              <a href="mailto:privacy@yourstore.com" className="lv-link">
                privacy@yourstore.com
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


