'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface CardProps {
  title: string
  description: string
  image?: string
  imageAlt?: string
  href: string
  badge?: string
}

export default function Card({
  title,
  description,
  image,
  imageAlt,
  href,
  badge,
}: CardProps) {
  return (
    <Link href={href} className="group block h-full">
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="h-full bg-white rounded-2xl shadow-lg hover:shadow-[0_15px_40px_-10px_rgba(197,165,114,0.35)] border border-stone hover:border-gold/60 transition-all duration-500 overflow-hidden"
      >
        {image && (
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-pearl to-ivory">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={imageAlt || title}
                fill
                className="object-cover"
              />
            </motion.div>

            {badge && (
              <span className="absolute top-4 left-4 bg-navy/80 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full border border-white/20 shadow-md">
                {badge}
              </span>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        )}

        <div className="p-6 flex flex-col justify-between h-[calc(100%-14rem)]">
          <div>
            <h3 className="heading-4 text-navy mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
              {title}
            </h3>
            <p className="body-regular text-slate line-clamp-3 mb-6 transition-colors duration-300 group-hover:text-charcoal/90">
              {description}
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-gold font-semibold text-sm relative">
            <span className="group-hover:underline underline-offset-4 decoration-gold/70 transition-all">
              Devamını Oku
            </span>
            <motion.svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ opacity: 0.8, x: 0 }}
              whileHover={{ x: 4, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
