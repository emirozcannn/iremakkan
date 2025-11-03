'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import RoundWhatsAppButton from './RoundWhatsAppButton'

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
      className="fixed bottom-6 right-6 z-50"
    >
      <RoundWhatsAppButton
        size="lg"
        className="shadow-2xl shadow-green-400/40 hover:shadow-green-400/60"
        message="Merhaba, psikolojik danışmanlık hizmetiniz hakkında bilgi almak istiyorum."
      />
    </motion.div>
  )
}
