'use client'

import React from 'react'
import { motion } from 'framer-motion'

type ButtonProps = React.ComponentPropsWithoutRef<typeof motion.button> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  ariaLabel?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  ariaLabel,
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed tracking-wide'

  const variantStyles: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-gold-dark via-gold to-gold-light text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_8px_20px_-5px_rgba(197,165,114,0.4)]',
    secondary:
      'bg-navy text-white shadow-[0_4px_15px_rgba(26,31,46,0.2)] hover:bg-charcoal hover:shadow-[0_8px_25px_-5px_rgba(26,31,46,0.4)]',
    outline:
  'relative border-2 border-navy text-navy bg-transparent hover:text-navy hover:bg-navy transition-colors before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-transparent before:bg-gradient-to-r before:from-gold before:to-gold-light before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
    ghost:
      'text-navy bg-white/20 backdrop-blur-sm hover:bg-pearl/80 hover:text-gold hover:shadow-md',
  }

  const sizeStyles: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      whileHover={{ scale: variant === 'ghost' ? 1 : 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {/* ✨ Shine effect for luxury feel */}
      {(variant === 'primary' || variant === 'secondary') && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      )}

      {icon && iconPosition === 'left' && (
        <span className="relative z-10 flex items-center">{icon}</span>
      )}

      <span className="relative z-10">{children}</span>

      {icon && iconPosition === 'right' && (
        <span className="relative z-10 flex items-center group-hover:translate-x-1 transition-transform duration-300">
          {icon}
        </span>
      )}
    </motion.button>
  )
}
