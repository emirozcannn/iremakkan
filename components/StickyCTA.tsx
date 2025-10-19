'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        href="/iletisim"
        className="group flex items-center gap-3 bg-gradient-gold text-white px-6 py-4 rounded-full shadow-2xl shadow-gold/40 hover:shadow-gold/60 hover:scale-105 transition-all duration-300"
      >
        <svg 
          className="w-5 h-5 animate-pulse" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
        <span className="font-bold text-base hidden sm:inline">
          Randevu Al
        </span>
      </Link>
    </motion.div>
  )
}
