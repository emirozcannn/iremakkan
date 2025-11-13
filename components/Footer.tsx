import Link from 'next/link'

interface FooterProps {
  settings?: {
    phoneNumber?: string
    email?: string
    officeAddress?: string
    socialLinks?: {
      instagram?: string
      linkedin?: string
      twitter?: string
      facebook?: string
    }
  }
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden">
      {/* Ultra-Modern Background Architecture */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy to-charcoal">
        {/* Layered geometric patterns */}
        <div className="absolute inset-0">
          {/* Primary geometric layer */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="hexPattern" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                <path d="M0,8.66 L5,0 L15,0 L20,8.66 L15,17.32 L5,17.32 Z" fill="none" stroke="rgba(197,165,114,0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPattern)"/>
          </svg>

          {/* Floating elements */}
          <div className="absolute top-20 right-20 w-64 h-64 border border-gold/20 rotate-12 rounded-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-16 w-32 h-32 bg-gradient-to-br from-teal/10 to-transparent rounded-full blur-sm"></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-20 bg-gradient-to-b from-gold/30 to-transparent rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-2 bg-gradient-to-r from-teal/40 to-transparent"></div>
        </div>

        {/* Ambient lighting system */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-gold/8 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-teal/12 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-8 bg-gradient-to-r from-transparent via-gold/5 to-transparent blur-2xl"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 py-16">
        {/* Kompakt header */}
        <div className="text-center mb-16">
          <div className="relative inline-block group">
            {/* Logo */}
            <div className="relative mb-6">
              <img
                src="/footer-logo.png"
                alt="İrem Akkan"
                className="h-40 w-auto mx-auto group-hover:scale-105 transition-all duration-300 filter drop-shadow-lg"
              />
            </div>

            {/* Başlık ve açıklama */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-light text-white/95 tracking-wide">
                Güven <span className="text-gold">•</span> Empati <span className="text-gold">•</span> Profesyonellik
              </h2>
              
              <div className="space-y-2">
                <p className="text-sm text-gold/90 uppercase tracking-[0.4em] font-medium">
                  Psikolojik Danışmanlık
                </p>
                <div className="flex justify-center">
                  <div className="w-16 h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kompakt grid sistemi */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-start">
          
          {/* Sol - Navigasyon */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-display font-medium text-white mb-6 relative">
              Navigasyon
              <div className="absolute -bottom-2 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-8 h-[1px] bg-gold/60"></div>
            </h3>
            <nav className="space-y-3">
              {[
                { href: '/hizmetler', label: 'Hizmetler' },
                { href: '/blog', label: 'Blog' },
                { href: '/hakkimda', label: 'Hakkımda' },
                { href: '/iletisim', label: 'İletişim' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-white/70 hover:text-gold transition-colors duration-300 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Orta - İletişim */}
          <div className="text-center">
            <h3 className="text-lg font-display font-medium text-white mb-6 relative">
              İletişim
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-gold/60"></div>
            </h3>

            <div className="space-y-4">
              {settings?.phoneNumber && (
                <a
                  href={`tel:${settings.phoneNumber}`}
                  className="block p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold/40 to-gold/70 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/95 font-semibold">{settings.phoneNumber}</p>
                      <p className="text-white/60 text-xs">Telefon</p>
                    </div>
                  </div>
                </a>
              )}

              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="block p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal/30 rounded-xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal/40 to-teal/70 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/95 font-semibold text-sm break-all">{settings.email}</p>
                      <p className="text-white/60 text-xs">E-posta</p>
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Sağ - Sosyal Medya */}
          <div className="text-center lg:text-right">
            <h3 className="text-lg font-display font-medium text-white mb-6 relative">
              Sosyal Medya
              <div className="absolute -bottom-2 left-1/2 lg:right-0 lg:left-auto -translate-x-1/2 lg:translate-x-0 w-8 h-[1px] bg-gold/60"></div>
            </h3>
            
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Güncel içerikler ve özel paylaşımlar için takip edin.
            </p>

            {settings?.socialLinks && (
              <div className="flex justify-center lg:justify-end gap-3">
                {settings.socialLinks.instagram && (
                  <a
                    href={settings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-pink-500/30 to-purple-600/30 hover:from-pink-500/50 hover:to-purple-600/50 border border-white/10 hover:border-pink-400/40 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  >
                    <svg className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}

                {settings.socialLinks.linkedin && (
                  <a
                    href={settings.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-blue-600/30 to-blue-500/30 hover:from-blue-600/50 hover:to-blue-500/50 border border-white/10 hover:border-blue-400/40 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  >
                    <svg className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Kompakt bottom section */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <p className="text-white/60 text-sm">
                &copy; {currentYear} <span className="text-gold font-semibold">İrem Akkan</span> Tüm hakları saklıdır.
              </p>
              <div className="hidden md:flex items-center gap-3 text-xs text-white/40">
                <div className="w-1 h-1 bg-gold/50 rounded-full"></div>
                <span>Psikolojik Danışmanlık</span>
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              {[
                { href: '/gizlilik-politikasi', label: 'Gizlilik' },
                { href: '/kvkk', label: 'KVKK' },
                { href: '/cerez-politikasi', label: 'Çerezler' }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/60 hover:text-gold transition-colors duration-300 relative group"
                >
                  {item.label}
                  <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}