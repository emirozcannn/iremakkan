import { InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  error?: string
  multiline?: boolean
  rows?: number
}

export default function InputField({ 
  label, 
  error, 
  multiline = false,
  rows = 4,
  className = '',
  ...props 
}: InputFieldProps) {
  const baseStyles = `
    w-full px-6 py-4 
    bg-white/10 backdrop-blur-sm 
    border-2 border-white/20 
    rounded-2xl 
    text-navy placeholder:text-navy/50
    focus:outline-none focus:border-gold/50 focus:bg-white/15
    transition-all duration-300
    hover:border-white/30 hover:bg-white/12
    shadow-lg focus:shadow-xl focus:shadow-gold/10
  `
  
  const errorStyles = error 
    ? 'border-red-400 bg-red-50/10 focus:border-red-400 focus:shadow-red-400/20' 
    : ''
  
  return (
    <div className="w-full group">
      <label className="block text-navy font-semibold mb-3 text-lg group-focus-within:text-gold transition-colors duration-300">
        {label}
      </label>
      
      <div className="relative">
        {multiline ? (
          <textarea
            className={`${baseStyles} ${errorStyles} ${className} resize-none`}
            rows={rows}
            {...(props as InputHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            className={`${baseStyles} ${errorStyles} ${className}`}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        
        {/* Modern input decoration */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/5 to-teal/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        {/* Focus indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-gold to-teal rounded-full group-focus-within:w-full transition-all duration-500"></div>
      </div>
      
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  )
}
