'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

interface RelatedProductsProps {
  products: any[]
  title?: string
}

export default function RelatedProducts({ products, title = 'You May Also Like' }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="bg-lv-light-gray/30 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-lv-demi text-lv-black mb-2 tracking-tight">
              {title}
            </h2>
            <div className="w-16 h-px bg-lv-black mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

