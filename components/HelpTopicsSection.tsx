'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'

interface HelpTopic {
  icon: string
  title: string
  description: string
  accentColor: string
  symptoms?: string[]
}

interface HelpTopicsSectionProps {
  badge?: string
  title?: string
  description?: string
  topics?: HelpTopic[]
  bottomText?: string
}

// Sophisticated, readable color palette
const colorSchemes = {
  slate: {
    front: 'from-slate-50 to-slate-100/80',
    back: 'from-white to-slate-50/90',
    accent: 'slate-600',
    border: 'slate-200/60',
    glow: 'rgba(100, 116, 139, 0.15)',
    text: 'slate-900',
    textBack: 'slate-800'
  },
  stone: {
    front: 'from-stone-50 to-stone-100/80',
    back: 'from-white to-stone-50/90',
    accent: 'stone-600',
    border: 'stone-200/60',
    glow: 'rgba(120, 113, 108, 0.15)',
    text: 'stone-900',
    textBack: 'stone-800'
  },
  zinc: {
    front: 'from-zinc-50 to-zinc-100/80',
    back: 'from-white to-zinc-50/90',
    accent: 'zinc-600',
    border: 'zinc-200/60',
    glow: 'rgba(113, 113, 122, 0.15)',
    text: 'zinc-900',
    textBack: 'zinc-800'
  },
  neutral: {
    front: 'from-neutral-50 to-neutral-100/80',
    back: 'from-white to-neutral-50/90',
    accent: 'neutral-600',
    border: 'neutral-200/60',
    glow: 'rgba(115, 115, 115, 0.15)',
    text: 'neutral-900',
    textBack: 'neutral-800'
  },
  emerald: {
    front: 'from-emerald-50 to-emerald-100/80',
    back: 'from-white to-emerald-50/90',
    accent: 'emerald-600',
    border: 'emerald-200/60',
    glow: 'rgba(16, 185, 129, 0.15)',
    text: 'emerald-900',
    textBack: 'emerald-800'
  },
  blue: {
    front: 'from-blue-50 to-blue-100/80',
    back: 'from-white to-blue-50/90',
    accent: 'blue-600',
    border: 'blue-200/60',
    glow: 'rgba(37, 99, 235, 0.15)',
    text: 'blue-900',
    textBack: 'blue-800'
  },
  violet: {
    front: 'from-violet-50 to-violet-100/80',
    back: 'from-white to-violet-50/90',
    accent: 'violet-600',
    border: 'violet-200/60',
    glow: 'rgba(124, 58, 237, 0.15)',
    text: 'violet-900',
    textBack: 'violet-800'
  },
  rose: {
    front: 'from-rose-50 to-rose-100/80',
    back: 'from-white to-rose-50/90',
    accent: 'rose-600',
    border: 'rose-200/60',
    glow: 'rgba(225, 29, 72, 0.15)',
    text: 'rose-900',
    textBack: 'rose-800'
  }
}

// Professional Flip Card Component
function ProfessionalFlipCard({ topic, index }: { topic: HelpTopic; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const colors = colorSchemes[topic.accentColor as keyof typeof colorSchemes] || colorSchemes.slate

  // Subtle 3D perspective
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 200,
    damping: 30
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 200,
    damping: 30
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)
    
    mouseX.set(percentX)
    mouseY.set(percentY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="perspective-1000"
      style={{
        perspective: "1000px"
      }}
    >
      <motion.div
        style={{
          rotateX: isHovered && !isFlipped ? rotateX : 0,
          rotateY: isHovered && !isFlipped ? rotateY : 0,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative w-full h-80 cursor-pointer"
      >
        {/* Front Card */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className={`absolute inset-0 w-full h-full bg-gradient-to-br ${colors.front} backdrop-blur-xl border border-${colors.border} rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-shadow duration-500`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Border glow on hover */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-2xl"
            style={{
              boxShadow: isHovered ? `inset 0 0 20px ${colors.glow}, 0 0 20px ${colors.glow}` : 'none'
            }}
          />

          <div className="relative h-full p-8 flex flex-col justify-between">
            {/* Icon - Abstract minimal */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  y: isHovered ? -4 : 0
                }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative"
              >
                {/* Icon container with subtle backdrop */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/60 flex items-center justify-center text-4xl shadow-[0_8px_30px_rgb(0,0,0,0.06)]`}>
                  {topic.icon}
                </div>
                
                {/* Subtle ring decoration */}
                <motion.div
                  animate={{
                    scale: isHovered ? [1, 1.15, 1] : 1,
                    opacity: isHovered ? [0.3, 0.6, 0.3] : 0
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute inset-0 rounded-2xl border-2 border-${colors.accent}/30`}
                />
              </motion.div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3 text-center">
              <h3 className={`text-xl font-semibold text-${colors.text} tracking-tight`}>
                {topic.title}
              </h3>
              
              {/* Subtle indicator line */}
              <div className="flex items-center justify-center gap-2">
                <div className={`h-px w-8 bg-gradient-to-r from-transparent via-${colors.accent} to-transparent`} />
                <motion.div
                  animate={{
                    rotate: isHovered ? 180 : 0
                  }}
                  transition={{ duration: 0.4 }}
                  className={`w-1.5 h-1.5 rounded-full bg-${colors.accent}`}
                />
                <div className={`h-px w-8 bg-gradient-to-r from-transparent via-${colors.accent} to-transparent`} />
              </div>
              
              {/* Hover hint */}
              <motion.p
                animate={{
                  opacity: isHovered ? 1 : 0.5,
                  y: isHovered ? 0 : 2
                }}
                transition={{ duration: 0.3 }}
                className={`text-sm text-${colors.text}/60 font-light tracking-wide`}
              >
                Detayları Görüntüle
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Back Card */}
        <motion.div
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className={`absolute inset-0 w-full h-full bg-gradient-to-br ${colors.back} backdrop-blur-xl border border-${colors.border} rounded-2xl overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)]`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {/* Ambient light effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          
          <div className="relative h-full p-8 flex flex-col justify-between">
            {/* Header with close hint */}
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl bg-${colors.accent}/10 backdrop-blur-sm flex items-center justify-center text-2xl`}>
                {topic.icon}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className={`w-8 h-8 rounded-full bg-${colors.accent}/10 backdrop-blur-sm flex items-center justify-center hover:bg-${colors.accent}/20 transition-colors`}
              >
                <svg className={`w-4 h-4 text-${colors.textBack}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div>
                <h3 className={`text-2xl font-semibold text-${colors.textBack} mb-3 tracking-tight`}>
                  {topic.title}
                </h3>
                <p className={`text-sm text-${colors.textBack}/80 leading-relaxed font-light`}>
                  {topic.description}
                </p>
              </div>


            </div>

            {/* Footer indicator */}
            <div className={`flex items-center justify-center gap-2 pt-4 border-t border-${colors.accent}/20`}>
              <div className={`h-px w-12 bg-gradient-to-r from-transparent via-${colors.accent}/40 to-transparent`} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function HelpTopicsSection({
  badge = "Uzmanlık Alanları",
  title = "Profesyonel **Psikolojik Destek**",
  description = "Danışmanlık ve Keşif sürecinizde yanınızda oluyorum.",
  topics = [],
  bottomText
}: HelpTopicsSectionProps) {
  const formatTitle = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<span class="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent font-bold">$1</span>')
  }

  return (
    <section className="relative py-32 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 overflow-hidden">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(0 0 0 / 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(0 0 0 / 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
        
        {/* Subtle static gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-400/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-300/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Refined Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-neutral-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.04)] mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span className="text-sm font-medium text-neutral-700 tracking-wide">
              {badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 tracking-tight leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: formatTitle(title) }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-light max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        {/* Professional Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {topics.slice(0, 8).map((topic, index) => (
            <ProfessionalFlipCard key={index} topic={topic} index={index} />
          ))}
        </div>

        {/* Refined CTA */}
        {bottomText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="relative bg-gradient-to-br from-white/80 to-neutral-50/80 backdrop-blur-xl p-12 rounded-3xl border border-neutral-200/60 shadow-[0_20px_60px_rgb(0,0,0,0.06)] overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-neutral-200/30 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <p className="text-lg text-neutral-700 leading-relaxed mb-8 font-light">
                  {bottomText}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-xl font-medium text-base shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.18)] transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">İletişime Geçin</span>
                  
                  <svg 
                    className="w-5 h-5 relative z-10" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-neutral-800"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Optimize text rendering */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* Touch device optimizations */
        @media (hover: none) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </section>
  )
}