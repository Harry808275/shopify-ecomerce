import React from 'react'
import Link from 'next/link'
import WhyChooseUs from '@/components/WhyChooseUs'

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-lv text-lv-black mb-6 tracking-tight">
            About Us
          </h1>
          <div className="w-24 h-px bg-lv-black mx-auto mb-6"></div>
          <p className="text-xl text-lv-gray font-lv max-w-2xl mx-auto">
            Crafting excellence since our founding. Discover our world of luxury.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20 space-y-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-lv-demi text-lv-black mb-6">Our Story</h2>
            <p className="text-lv-gray font-lv leading-relaxed mb-4">
              We began with a simple mission: to bring premium quality products to customers who
              appreciate excellence. Every item in our collection is carefully curated, ensuring that
              only the finest products make it to your doorstep.
            </p>
            <p className="text-lv-gray font-lv leading-relaxed mb-4">
              Our commitment to quality, customer service, and innovation has made us a trusted name
              in luxury retail. We believe that everyone deserves access to products that combine
              exceptional craftsmanship with timeless design.
            </p>
            <p className="text-lv-gray font-lv leading-relaxed">
              Today, we continue to grow while staying true to our founding principles: quality,
              integrity, and an unwavering dedication to customer satisfaction.
            </p>
          </div>

          {/* Mission */}
          <div className="pt-8 border-t border-lv-light-gray">
            <h2 className="text-3xl font-lv-demi text-lv-black mb-6">Our Mission</h2>
            <p className="text-lv-gray font-lv leading-relaxed">
              To provide our customers with premium products that enhance their lives, backed by
              exceptional service and a commitment to excellence in every interaction.
            </p>
          </div>

          {/* Values */}
          <div className="pt-8 border-t border-lv-light-gray">
            <h2 className="text-3xl font-lv-demi text-lv-black mb-6">Our Values</h2>
            <ul className="space-y-4 text-lv-gray font-lv">
              <li className="flex items-start gap-3">
                <span className="text-lv-black font-lv-demi">Quality First:</span>
                <span>We never compromise on the quality of our products.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lv-black font-lv-demi">Customer Focus:</span>
                <span>Your satisfaction is our top priority.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lv-black font-lv-demi">Transparency:</span>
                <span>We believe in honest communication and clear policies.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lv-black font-lv-demi">Innovation:</span>
                <span>We continuously seek to improve and innovate.</span>
              </li>
            </ul>
          </div>

          {/* Founder Message */}
          <div className="pt-8 border-t border-lv-light-gray bg-lv-light-gray/20 p-8 rounded-lg">
            <h2 className="text-2xl font-lv-demi text-lv-black mb-4">A Message from Our Founder</h2>
            <p className="text-lv-gray font-lv leading-relaxed italic">
              "When we started this journey, we had one goal: to create a shopping experience that
              puts quality and customer satisfaction above all else. Every product we offer has been
              personally selected and tested. We stand behind everything we sell, and we're here
              to ensure you have the best possible experience with us."
            </p>
            <p className="text-lv-black font-lv-demi mt-4">— The Team</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-12 border-t border-lv-light-gray">
          <h2 className="text-2xl font-lv-demi text-lv-black mb-4">Ready to Experience Excellence?</h2>
          <p className="text-lv-gray font-lv mb-6">
            Explore our curated collection of premium products
          </p>
          <Link href="/products" className="lv-button inline-block">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-20">
        <WhyChooseUs />
      </div>
    </div>
  )
}


