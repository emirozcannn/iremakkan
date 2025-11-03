import React from 'react'
import Link from 'next/link'

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode
}

export default function WhatsAppButton({
  phoneNumber = "905432313300", // İrem Akkan - Psikolojik Danışman
  message = "Merhaba, psikolojik danışmanlık hizmetiniz hakkında bilgi almak istiyorum.",
  variant = 'primary',
  size = 'md',
  className = '',
  children
}: WhatsAppButtonProps) {
  // WhatsApp URL'sini oluştur
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  // Variant stilleri
  const variantStyles = {
    primary: 'bg-[#25d366] hover:bg-[#128c7e] text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-teal hover:bg-teal/90 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-[#25d366] text-[#25d366] hover:bg-[#25d366] hover:text-white'
  }

  // Size stilleri
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <Link 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative inline-flex items-center justify-center gap-3
        font-semibold rounded-2xl transition-all duration-300 
        hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {/* WhatsApp İkonu */}
      <svg 
        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515"/>
      </svg>
      
      {children || (
        <span className="font-semibold">
          WhatsApp ile İletişim
        </span>
      )}
      
      {/* Hover efekti için ek ikon */}
      <svg 
        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  )
}