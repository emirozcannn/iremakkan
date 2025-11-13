'use client'

import { motion } from 'framer-motion'

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
  blue: {
    gradient: 'from-blue-500/10 to-blue-600/10',
    border: 'border-blue-200/30',
    icon: 'text-blue-600',
    accent: 'bg-blue-500'
  },
  green: {
    gradient: 'from-green-500/10 to-green-600/10',
    border: 'border-green-200/30',
    icon: 'text-green-600',
    accent: 'bg-green-500'
  },
  purple: {
    gradient: 'from-purple-500/10 to-purple-600/10',
    border: 'border-purple-200/30',
    icon: 'text-purple-600',
    accent: 'bg-purple-500'
  },
  pink: {
    gradient: 'from-pink-500/10 to-pink-600/10',
    border: 'border-pink-200/30',
    icon: 'text-pink-600',
    accent: 'bg-pink-500'
  },
  orange: {
    gradient: 'from-orange-500/10 to-orange-600/10',
    border: 'border-orange-200/30',
    icon: 'text-orange-600',
    accent: 'bg-orange-500'
  },
  red: {
    gradient: 'from-red-500/10 to-red-600/10',
    border: 'border-red-200/30',
    icon: 'text-red-600',
    accent: 'bg-red-500'
  },
  yellow: {
    gradient: 'from-yellow-500/10 to-yellow-600/10',
    border: 'border-yellow-200/30',
    icon: 'text-yellow-600',
    accent: 'bg-yellow-500'
  },
  indigo: {
    gradient: 'from-indigo-500/10 to-indigo-600/10',
    border: 'border-indigo-200/30',
    icon: 'text-indigo-600',
    accent: 'bg-indigo-500'
  }
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
    return text.replace(/\*\*(.*?)\*\*/g, '<span class="text-[#8B4513]">$1</span>')
  }

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full text-sm font-medium text-[#8B4513] mb-6"
          >
            <span className="w-2 h-2 bg-[#8B4513] rounded-full mr-2"></span>
            {badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            dangerouslySetInnerHTML={{ __html: formatTitle(title) }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {topics.map((topic, index) => {
            const colors = colorClasses[topic.accentColor as keyof typeof colorClasses] || colorClasses.blue
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  group relative bg-white rounded-2xl p-8 
                  border ${colors.border} shadow-lg hover:shadow-2xl 
                  transition-all duration-500 cursor-pointer
                  hover:-translate-y-2
                `}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Accent Line */}
                <div className={`absolute top-0 left-0 w-full h-1 ${colors.accent} rounded-t-2xl`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`
                      inline-flex items-center justify-center 
                      w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient}
                      text-3xl group-hover:scale-110 transition-transform duration-300
                    `}>
                      {topic.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800">
                    {topic.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700">
                    {topic.description}
                  </p>

                  {/* Symptoms/Sub-topics */}
                  {topic.symptoms && topic.symptoms.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Örnek Durumlar:</h4>
                      <div className="flex flex-wrap gap-2">
                        {topic.symptoms.slice(0, 3).map((symptom, idx) => (
                          <span
                            key={idx}
                            className={`
                              px-3 py-1 text-xs rounded-full 
                              bg-gray-100 text-gray-700
                              group-hover:bg-white group-hover:text-gray-800
                              transition-colors duration-300
                            `}
                          >
                            {symptom}
                          </span>
                        ))}
                        {topic.symptoms.length > 3 && (
                          <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-500">
                            +{topic.symptoms.length - 3} daha
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Glow Effect */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 
                  bg-gradient-to-r ${colors.gradient} 
                  transition-opacity duration-500 pointer-events-none
                  blur-xl scale-110
                `} />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Text */}
        {bottomText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl p-8 border border-amber-200/30">
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                {bottomText}
              </p>
              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    inline-flex items-center px-8 py-4 
                    bg-gradient-to-r from-[#8B4513] to-[#A0522D] 
                    text-white font-semibold rounded-xl
                    hover:shadow-lg transition-all duration-300
                    focus:outline-none focus:ring-4 focus:ring-[#8B4513]/20
                  "
                >
                  <span>Hemen Destek Alın</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}