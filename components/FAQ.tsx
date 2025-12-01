'use client'

import React, { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'When will my order arrive?',
    answer: 'Orders typically ship within 1-2 business days. Standard shipping takes 5-7 business days, while express shipping (2-3 business days) is available at checkout. You\'ll receive a tracking number via email once your order ships.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive an email with a tracking number. You can use this number on our shipping carrier\'s website or in your account dashboard to see real-time updates on your package\'s location.',
  },
  {
    question: 'What if it doesn\'t fit or I don\'t like it?',
    answer: 'No worries! We offer a 30-day money-back guarantee. If you\'re not completely satisfied, return the item in its original condition for a full refund. We\'ll even cover return shipping costs.',
  },
  {
    question: 'Is payment safe?',
    answer: 'Absolutely! We use SSL encryption and secure payment processors (Visa, MasterCard, PayPal) to protect your information. We never store your full credit card details on our servers.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship worldwide. International shipping times vary by location (typically 10-21 business days). Shipping costs and delivery times are calculated at checkout based on your location.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy. Items must be in original condition with tags attached. Returns are free, and refunds are processed within 5-7 business days after we receive your return.',
  },
  {
    question: 'How do I contact customer service?',
    answer: 'You can reach us via email at support@yourstore.com, or use our contact form. Our team typically responds within 24 hours during business days.',
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees! The price you see is the price you pay. Shipping costs are clearly displayed at checkout, and we\'ll show any applicable taxes before you complete your purchase.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-lv text-lv-black mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-px bg-lv-black mx-auto mb-4"></div>
          <p className="text-lv-gray max-w-2xl mx-auto font-lv text-sm md:text-base">
            Everything you need to know before making your purchase
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-lv-light-gray rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-lv-light-gray/30 transition-colors"
              >
                <span className="font-lv-demi text-lv-black pr-8">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-lv-black flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-lv-light-gray/10 border-t border-lv-light-gray">
                  <p className="text-lv-gray font-lv leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


