'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface StatItemProps {
  end: number
  label: string
  suffix?: string
  duration?: number
  className?: string
}

export default function StatsCounter({ end, label, suffix = '', duration = 2, className = '' }: StatItemProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * (end - startValue) + startValue)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return (
    <div ref={ref} className="text-center">
      <div className={className || "text-5xl md:text-6xl font-bold text-navy mb-2"}>
        {count.toLocaleString('tr-TR')}{suffix}
      </div>
      {label && (
        <div className="text-gray-600 text-sm md:text-base font-medium uppercase tracking-wider">
          {label}
        </div>
      )}
    </div>
  )
}
