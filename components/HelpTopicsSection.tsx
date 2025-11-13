'use client'

import { motion } from 'framer-motion'
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

const colorClasses = {
  gold: {
    gradient: 'from-[#f3e5c9]/30 to-[#e7cfa6]/40',
    hover: 'from-[#e7cfa6]/40 to-[#cbb07e]/50',
    text: 'text-[#cbb07e]',
    accent: 'bg-gradient-to-r from-[#e7cfa6] to-[#d4a5a5]',
    border: 'border-[#e7cfa6]/30',
    glow: 'shadow-[0_0_30px_rgba(231,207,166,0.3)]'
  },
  teal: {
    gradient: 'from-[#c7d3cb]/30 to-[#a7b9ad]/40',
    hover: 'from-[#a7b9ad]/40 to-[#8fa599]/50',
    text: 'text-[#a7b9ad]',
    accent: 'bg-gradient-to-r from-[#a7b9ad] to-[#c7d3cb]',
    border: 'border-[#a7b9ad]/30',
    glow: 'shadow-[0_0_30px_rgba(167,185,173,0.3)]'
  },
  navy: {
    gradient: 'from-[#3d4352]/20 to-[#2a3140]/30',
    hover: 'from-[#2a3140]/30 to-[#181c26]/40',
    text: 'text-[#2a3140]',
    accent: 'bg-gradient-to-r from-[#3d4352] to-[#2a3140]',
    border: 'border-[#3d4352]/30',
    glow: 'shadow-[0_0_30px_rgba(42,49,64,0.2)]'
  },
  rose: {
    gradient: 'from-[#e8c4c4]/30 to-[#d4a5a5]/40',
    hover: 'from-[#d4a5a5]/40 to-[#b88888]/50',
    text: 'text-[#d4a5a5]',
    accent: 'bg-gradient-to-r from-[#d4a5a5] to-[#e8c4c4]',
    border: 'border-[#d4a5a5]/30',
    glow: 'shadow-[0_0_30px_rgba(212,165,165,0.3)]'
  },
  pearl: {
    gradient: 'from-[#f5f3ef]/40 to-[#ece7df]/50',
    hover: 'from-[#ece7df]/50 to-[#e0d9cf]/60',
    text: 'text-[#3d4352]',
    accent: 'bg-gradient-to-r from-[#f5f3ef] to-[#ece7df]',
    border: 'border-[#ece7df]/40',
    glow: 'shadow-[0_0_30px_rgba(245,243,239,0.4)]'
  },
  purple: {
    gradient: 'from-[#9d8b93]/20 to-[#6b5f73]/30',
    hover: 'from-[#6b5f73]/30 to-[#4a4456]/40',
    text: 'text-[#6b5f73]',
    accent: 'bg-gradient-to-r from-[#9d8b93] to-[#6b5f73]',
    border: 'border-[#9d8b93]/30',
    glow: 'shadow-[0_0_30px_rgba(107,95,115,0.3)]'
  },
  slate: {
    gradient: 'from-[#b0b6c2]/20 to-[#9299a8]/30',
    hover: 'from-[#9299a8]/30 to-[#7a8190]/40',
    text: 'text-[#b0b6c2]',
    accent: 'bg-gradient-to-r from-[#b0b6c2] to-[#9299a8]',
    border: 'border-[#b0b6c2]/30',
    glow: 'shadow-[0_0_30px_rgba(176,182,194,0.3)]'
  },
  ivory: {
    gradient: 'from-white/50 to-[#FFFEFB]/60',
    hover: 'from-[#FFFEFB]/60 to-[#faf7f5]/70',
    text: 'text-[#4a4456]',
    accent: 'bg-gradient-to-r from-white to-[#FFFEFB]',
    border: 'border-white/40',
    glow: 'shadow-[0_0_30px_rgba(255,254,251,0.5)]'
  }
}

// Premium Flip Card Component
function PremiumFlipCard({ topic, index }: { topic: HelpTopic; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const colors = colorClasses[topic.accentColor as keyof typeof colorClasses] || colorClasses.gold

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="relative h-40 sm:h-44 md:h-48 perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Card Container */}
      <div
        className={`
          relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
      >
        {/* Front Face */}
        <div
          className={`
            absolute inset-0 w-full h-full backface-hidden
            bg-white/90 backdrop-blur-sm rounded-2xl border ${colors.border}
            shadow-[0_8px_32px_rgba(31,38,135,0.08)]
            hover:shadow-[0_12px_40px_rgba(31,38,135,0.12)]
            transition-all duration-500
            flex flex-col items-center justify-center text-center p-5
            bg-gradient-to-br ${colors.gradient}
            group
          `}
        >
          {/* Icon Container */}
          <motion.div 
            className="relative mb-3"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-4xl sm:text-5xl md:text-6xl filter drop-shadow-md">
              {topic.icon}
            </div>
            {/* Subtle glow effect */}
            <div className={`absolute inset-0 blur-2xl ${colors.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
          </motion.div>

          {/* Title */}
          <h3 className={`
            text-sm sm:text-base font-bold ${colors.text} 
            leading-tight text-center px-2 mb-3
            font-serif
          `}>
            {topic.title}
          </h3>

          {/* Decorative line */}
          <div className="relative w-12 h-1 rounded-full overflow-hidden">
            <div className={`w-full h-full ${colors.accent} opacity-60`} />
          </div>

          {/* Hover indicator */}
          <motion.div 
            className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 5 }}
            animate={{ y: [5, 0, 5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>

        {/* Back Face */}
        <div
          className={`
            absolute inset-0 w-full h-full backface-hidden rotate-y-180
            bg-white/95 backdrop-blur-md rounded-2xl border ${colors.border}
            shadow-[0_12px_40px_rgba(31,38,135,0.15)]
            p-4 sm:p-5 flex flex-col justify-between
            bg-gradient-to-br ${colors.hover}
          `}
        >
          <div className="space-y-3">
            {/* Description */}
            <p className="text-xs sm:text-sm text-[#4a4456]/90 leading-relaxed line-clamp-3 font-sans">
              {topic.description}
            </p>
            
            {/* Symptoms */}
            {topic.symptoms && topic.symptoms.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-[#2a3140] mb-2 font-serif">
                  Örnek Durumlar:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {topic.symptoms.slice(0, 2).map((symptom, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs bg-white/90 text-[#4a4456] rounded-full 
                               border border-[#e7cfa6]/20 shadow-sm font-sans"
                    >
                      {symptom}
                    </span>
                  ))}
                  {topic.symptoms.length > 2 && (
                    <span className="px-2.5 py-1 text-xs bg-white/70 text-[#4a4456]/70 rounded-full 
                                   border border-[#e7cfa6]/20">
                      +{topic.symptoms.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Back decoration */}
          <div className="mt-auto pt-2">
            <div className={`w-full h-0.5 ${colors.accent} opacity-30 rounded-full`} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HelpTopicsSection({
  badge = "Uzmanlık Alanlarım",
  title = "Hangi Konularda **Yardımcı Oluyorum**",
  description = "Yaşadığınız zorluklarla başa çıkmanızda size rehberlik etmek için buradayım.",
  topics = [],
  bottomText
}: HelpTopicsSectionProps) {
  // Title'daki ** işaretlerini vurgulu span'e çevir
  const formatTitle = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<span class="text-gradient-gold">$1</span>')
  }

  return (
    <section className="py-20 bg-premium relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e7cfa6]/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#a7b9ad]/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-5 py-2.5 
                       bg-gradient-to-r from-[#e7cfa6]/20 via-white/40 to-[#a7b9ad]/20 
                       backdrop-blur-sm rounded-full 
                       text-sm font-semibold text-[#2a3140] mb-6
                       border border-[#e7cfa6]/30
                       shadow-[0_4px_20px_rgba(231,207,166,0.15)]"
          >
            <span className="w-2 h-2 bg-gradient-to-r from-[#e7cfa6] to-[#a7b9ad] rounded-full mr-2 animate-pulse"></span>
            {badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#2a3140] mb-6 
                       font-serif leading-tight"
            dangerouslySetInnerHTML={{ __html: formatTitle(title) }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#4a4456]/80 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            {description}
          </motion.p>
        </div>

        {/* Premium Grid - 8 kart için 4x2 düzeni */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-5 mb-12">
          {topics.slice(0, 8).map((topic, index) => (
            <PremiumFlipCard key={index} topic={topic} index={index} />
          ))}
        </div>

        {/* Premium CTA */}
        {bottomText && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="glass-card bg-gradient-to-br from-white/80 to-[#faf7f5]/60 backdrop-blur-xl p-8 md:p-10 border border-[#e7cfa6]/20 shadow-[0_8px_32px_rgba(31,38,135,0.08)] max-w-3xl mx-auto">
              <p className="text-base md:text-lg text-[#4a4456]/90 leading-relaxed mb-6 font-sans">
                {bottomText}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#d4a5a5] via-[#e7cfa6] to-[#a7b9ad] text-[#2a3140] font-bold rounded-xl text-base hover:shadow-[0_12px_40px_rgba(231,207,166,0.4)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#e7cfa6]/30 border border-white/50 font-sans relative overflow-hidden"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <span className="relative">Hemen Destek Alın</span>
                
                <motion.svg 
                  className="ml-2 w-5 h-5 relative" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Custom Styles for 3D Flip Effect */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .text-gradient-gold {
          background: linear-gradient(135deg, #d4a5a5 0%, #e7cfa6 50%, #e8c4c4 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 700;
        }
      `}</style>
    </section>
  )
}