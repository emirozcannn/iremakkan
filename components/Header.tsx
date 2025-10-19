'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [testsDropdownOpen, setTestsDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Scroll effect için
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20)
    })
  }

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkımda', href: '/hakkimda' },
    { name: 'Blog', href: '/blog' },
    { name: 'Hizmetler', href: '/hizmetler' },
    { 
      name: 'Testler', 
      href: '#',
      dropdown: [
        { name: 'Young Şema Ölçeği', href: '/testler/young-sema-olcegi' },
        { name: 'Beck Depresyon Envanteri', href: '/testler/beck-depresyon' },
        { name: 'Beck Anksiyete Ölçeği', href: '/testler/beck-anksiyete' },
        { name: 'Kısa Semptom Envanteri', href: '/testler/kisa-symptom' },
      ]
    },
    { name: 'İletişim', href: '/iletisim' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-scrolled' : 'navbar-glass'
      }`}
    >
      <nav className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="group relative">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-gold"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-gold"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold"></div>
                </div>
                <img
                  src="/logo.png"
                  alt="İrem Akkan"
                  className="h-12 w-auto relative z-10 filter drop-shadow-lg group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="hidden sm:block">
                
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href || (item.dropdown && item.dropdown.some(sub => pathname === sub.href))
              
              if (item.dropdown) {
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative group"
                    onMouseEnter={() => setTestsDropdownOpen(true)}
                    onMouseLeave={() => setTestsDropdownOpen(false)}
                  >
                    <div
                      className={`nav-link px-4 py-2 text-sm font-medium uppercase tracking-wide ${
                        isActive ? 'nav-link-active' : ''
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        {item.name}
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {testsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 glass-card border border-gold/20 shadow-xl overflow-hidden"
                        >
                          <div className="p-2">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`block px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                                  pathname === subItem.href
                                    ? 'bg-gradient-to-r from-gold/20 to-gold/30 text-navy font-semibold'
                                    : 'text-navy hover:bg-gradient-to-r hover:from-gold/10 hover:to-teal/10'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              }
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`nav-link px-4 py-2 text-sm font-medium uppercase tracking-wide ${
                      isActive ? 'nav-link-active' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative group p-3 bg-white/80 backdrop-blur-sm border border-gold/20 rounded-xl hover:bg-gradient-to-r hover:from-gold/10 hover:to-teal/10 transition-all duration-300"
            aria-label="Menü"
          >
            <div className="relative z-10">
              {mobileMenuOpen ? (
                <motion.svg
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="h-5 w-5 text-navy group-hover:text-gold transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.div
                  className="space-y-1"
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-5 h-[2px] bg-navy group-hover:bg-gold transition-colors duration-300 rounded-full"></div>
                  <div className="w-4 h-[2px] bg-navy group-hover:bg-gold transition-colors duration-300 rounded-full"></div>
                  <div className="w-5 h-[2px] bg-navy group-hover:bg-gold transition-colors duration-300 rounded-full"></div>
                </motion.div>
              )}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-full left-4 right-4 mt-2 glass-card border border-gold/20 shadow-xl overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href || (item.dropdown && item.dropdown.some(sub => pathname === sub.href))
                  
                  if (item.dropdown) {
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="space-y-1"
                      >
                        <div
                          className={`p-3 rounded-lg font-medium text-navy ${
                            isActive
                              ? 'bg-gradient-to-r from-gold/20 to-gold/30'
                              : 'hover:bg-gradient-to-r hover:from-gold/10 hover:to-teal/10'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.name}</span>
                            <svg className="w-4 h-4 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Dropdown items */}
                        <div className="ml-4 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`block px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                                pathname === subItem.href
                                  ? 'bg-gradient-to-r from-gold/20 to-gold/30 text-navy font-semibold'
                                  : 'text-slate hover:bg-gradient-to-r hover:from-gold/10 hover:to-teal/10 hover:text-navy'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )
                  }
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block p-3 rounded-lg font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-gold/20 to-gold/30 text-navy'
                            : 'text-navy hover:bg-gradient-to-r hover:from-gold/10 hover:to-teal/10'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}