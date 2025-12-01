'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CartIcon from './CartIcon'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 3)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`lv-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 transition-lv ${
        isScrolled
          ? 'bg-white shadow-sm'
          : 'bg-transparent'
      }`}
      style={{ height: 'var(--header-height)' }}
    >
      <nav className="lv-header__container h-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo - LV Style */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 lv-link"
            style={{ textDecoration: 'none' }}
          >
            <div className="text-xl sm:text-2xl font-lv text-lv-black tracking-tight">
              EVERTRUST
            </div>
          </Link>

          {/* Desktop Navigation - LV Style */}
          <div className="hidden md:flex items-center h-full space-x-8">
            <Link
              href="/"
              className="text-xs font-lv text-lv-black hover:text-lv-gray transition-colors transition-lv uppercase tracking-wider h-full flex items-center"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-xs font-lv text-lv-black hover:text-lv-gray transition-colors transition-lv uppercase tracking-wider h-full flex items-center"
            >
              Products
            </Link>
            <Link
              href="/collections"
              className="text-xs font-lv text-lv-black hover:text-lv-gray transition-colors transition-lv uppercase tracking-wider h-full flex items-center"
            >
              Collections
            </Link>
            <Link
              href="/contact"
              className="text-xs font-lv text-lv-black hover:text-lv-gray transition-colors transition-lv uppercase tracking-wider h-full flex items-center"
            >
              Contact
            </Link>
            <div className="h-6 w-px bg-lv-light-gray"></div>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-lv-black hover:text-lv-gray transition-colors transition-lv p-2"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <CartIcon />
          </div>

          {/* Mobile Burger Menu - LV Style */}
          <button
            className="md:hidden lv-header-icon-burger text-lv-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <div className="lv-header-icon-burger__bars">
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu - LV Style */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.39, 0.575, 0.565, 1] }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-lv-light-gray overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <Link
                  href="/"
                  className="block text-sm font-lv text-lv-black hover:text-lv-gray transition-colors transition-lv uppercase tracking-wider"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="block text-sm font-lv text-lv-black hover:text-lv-gray transition-colors transition-lv uppercase tracking-wider"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/collections"
                  className="block text-sm font-lv text-lv-black hover:text-lv-gray transition-colors transition-lv uppercase tracking-wider"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Collections
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm font-lv text-lv-black hover:text-lv-gray transition-colors transition-lv uppercase tracking-wider"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="pt-4 border-t border-lv-light-gray">
                  <CartIcon />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-32"
              onClick={() => setIsSearchOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-2xl mx-4 shadow-2xl"
              >
                <div className="p-6 border-b border-lv-light-gray">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-lv-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          setIsSearchOpen(false)
                          router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
                        }
                      }}
                      placeholder="Search products..."
                      className="flex-1 text-base font-lv text-lv-black outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="text-lv-gray hover:text-lv-black transition-colors"
                      aria-label="Close search"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                {searchQuery && (
                  <div className="p-6">
                    <button
                      onClick={() => {
                        setIsSearchOpen(false)
                        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
                      }}
                      className="w-full lv-button text-center"
                    >
                      Search for "{searchQuery}"
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
