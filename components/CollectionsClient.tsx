'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Collection {
  id: string
  title: string
  description?: string
  handle: string
  image?: {
    url: string
    altText?: string
  }
}

interface CollectionsClientProps {
  collections: Collection[]
}

export default function CollectionsClient({ collections }: CollectionsClientProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {collections.map((collection: any, index: number) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={`/collections/${collection.handle}`}
              className="group block h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
                {collection.image ? (
                  <>
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-lg font-lv">{collection.title}</span>
                  </div>
                )}
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl md:text-3xl font-lv-demi text-white mb-2 drop-shadow-lg">
                      {collection.title}
                    </h3>
                    {collection.description && (
                      <p className="text-sm text-white/90 line-clamp-2 font-lv drop-shadow-md">
                        {collection.description}
                      </p>
                    )}
                    <div className="mt-4 inline-flex items-center text-white font-lv-demi text-sm group-hover:gap-2 transition-all duration-300">
                      <span>Explore Collection</span>
                      <svg 
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

