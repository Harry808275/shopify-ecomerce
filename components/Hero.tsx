'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden"
      style={{ marginTop: 'var(--header-height)' }}
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/pexels-cliff-booth-4056723.jpg')",
          scale,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-[1]"></div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.39, 0.575, 0.565, 1] }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-lv text-white mb-6 tracking-tight leading-tight">
            EVERTRUST
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-lv tracking-wide mb-10 max-w-2xl mx-auto">
            Trusted Quality, Exceptional Service
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.39, 0.575, 0.565, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/products"
            className="lv-button -primary text-white border-white bg-transparent hover:bg-white hover:text-lv-black"
          >
            Explore Collection
          </Link>
          <Link
            href="/collections"
            className="lv-button text-white border-white hover:bg-white hover:text-lv-black"
          >
            View Collections
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - LV Style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <span className="text-white text-xs font-lv uppercase tracking-wider mb-2">Scroll</span>
          <div className="w-px h-8 bg-white/50 relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-full h-4 bg-white"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
