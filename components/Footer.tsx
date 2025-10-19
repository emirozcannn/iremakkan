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

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-28">
        {/* Avant-garde header */}
        <div className="text-center mb-24">
          <div className="relative inline-block group">
            {/* Dynamic frame animation */}
            <div className="absolute -inset-12 opacity-0 group-hover:opacity-100 transition-all duration-1000">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-gold animate-pulse"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-gold animate-pulse" style={{animationDelay: '0.25s'}}></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-gold animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-gold animate-pulse" style={{animationDelay: '0.75s'}}></div>
            </div>

            {/* Logo centerpiece */}
            <div className="relative mb-8">
              <div className="absolute -inset-8 bg-gradient-to-r from-gold/15 via-gold/5 to-gold/15 blur-2xl rounded-full group-hover:from-gold/25 group-hover:via-gold/10 group-hover:to-gold/25 transition-all duration-700"></div>
              <img
                src="/logo-footer.png"
                alt="İrem Akkan"
                className="h-32 w-auto relative z-10 filter drop-shadow-2xl group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Artistic text arrangement */}
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-6">
                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-gold"></div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 bg-gold/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                <div className="w-32 h-[1px] bg-gradient-to-l from-transparent via-gold/60 to-gold"></div>
              </div>
              
              <h2 className="text-3xl font-display font-light text-white/95 tracking-wide">
                Güven <span className="text-gold">•</span> Empati <span className="text-gold">•</span> Profesyonellik
              </h2>
              
              <div className="space-y-3">
                <p className="text-sm text-gold/90 uppercase tracking-[0.6em] font-medium">
                  Psikolojik Danışmanlık
                </p>
                <div className="flex justify-center">
                  <div className="w-24 h-[3px] bg-gradient-to-r from-gold via-gold-light to-gold rounded-full shadow-lg shadow-gold/30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Düzenlenmiş grid sistemi */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 mb-24 items-start">
          {/* Sol (Navigasyon) */}
          <div className="xl:col-span-3 flex flex-col justify-start">
            <div className="space-y-8">
              <div className="relative">
                <h3 className="text-xl font-display font-medium text-white relative pb-4">
                  Navigasyon
                  <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-gradient-to-r from-gold to-gold/30 rounded-full"></div>
                </h3>
              </div>
              <nav className="space-y-4">
                {[
                  { href: '/hizmetler', label: 'Hizmetler' },
                  { href: '/blog', label: 'Blog' },
                  { href: '/hakkimda', label: 'Hakkımda' },
                  { href: '/iletisim', label: 'İletişim' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-4 text-white/70 hover:text-gold transition-all duration-300"
                  >
                    <div className="w-0 group-hover:w-4 h-[1px] bg-gradient-to-r from-gold to-transparent transition-all duration-300"></div>
                    <span className="font-medium relative">
                      {item.label}
                      <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[1px] bg-gold/50 transition-all duration-300"></div>
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Orta (İletişim) */}
          <div className="xl:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-3xl space-y-8">
              <div className="relative">
                <h3 className="text-xl font-display font-medium text-white relative pb-4 text-center xl:text-left">
                  İletişim
                  <div className="absolute bottom-0 left-1/2 xl:left-0 -translate-x-1/2 xl:translate-x-0 w-12 h-[2px] bg-gradient-to-r from-gold to-gold/30 rounded-full"></div>
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center items-stretch">
                {settings?.phoneNumber && (
                  <div className="group relative w-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-teal/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <a
                      href={`tel:${settings.phoneNumber}`}
                      className="relative block p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-gold/30 transition-all duration-500 group h-full"
                    >
                      <div className="flex items-center justify-center gap-6">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-gold/40 to-gold/70 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gold/20">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-navy-dark animate-pulse"></div>
                        </div>
                        <div className="flex-1 text-center">
                          <p className="text-xs text-gold/80 uppercase tracking-wider font-bold mb-3 flex items-center justify-center gap-2">
                            <span>Telefon</span>
                            <span className="w-8 h-[1px] bg-gold/40 inline-block align-middle"></span>
                          </p>
                          <p className="text-white/95 font-semibold text-lg">{settings.phoneNumber}</p>
                          <p className="text-white/50 text-sm mt-2">Hemen arayın</p>
                        </div>
                      </div>
                    </a>
                  </div>
                )}

                {settings?.email && (
                  <div className="group relative w-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal/20 to-gold/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <a
                      href={`mailto:${settings.email}`}
                      className="relative block p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-teal/30 transition-all duration-500 h-full"
                    >
                      <div className="flex items-center justify-center gap-6">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-teal/40 to-teal/70 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-teal/20">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-navy-dark animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        </div>
                        <div className="flex-1 text-center">
                          <p className="text-xs text-teal-light/80 uppercase tracking-wider font-bold mb-3 flex items-center justify-center gap-2">
                            <span>E-posta</span>
                            <span className="w-8 h-[1px] bg-teal/40 inline-block align-middle"></span>
                          </p>
                          <p className="text-white/95 font-semibold break-all">{settings.email}</p>
                          <p className="text-white/50 text-sm mt-2">Mesaj gönderin</p>
                        </div>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              {settings?.officeAddress && (
                <div className="relative group mt-8">
                  <div className="absolute -inset-1 bg-gradient-to-r from-navy-light/30 to-charcoal/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                    <div className="flex items-center justify-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-charcoal/60 to-navy-light/60 rounded-2xl flex items-center justify-center shadow-lg shadow-navy/30">
                        <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-xs text-gold/80 uppercase tracking-wider font-bold mb-3 flex items-center justify-center gap-2">
                          <span>Ofis Adresi</span>
                          <div className="w-8 h-[1px] bg-gold/40"></div>
                        </p>
                        <p className="text-white/95 leading-relaxed">{settings.officeAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sağ (Sosyal Medya) */}
          <div className="xl:col-span-3 flex flex-col justify-start">
            <div className="space-y-8 mt-4">
              <div className="relative">
                <h3 className="text-xl font-display font-medium text-white relative pb-4">
                  Sosyal Medya
                  <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-gradient-to-r from-gold to-gold/30 rounded-full"></div>
                </h3>
              </div>
              <p className="text-white/60 leading-relaxed text-sm">
                Güncel içerikler ve özel paylaşımları kaçırmayın.
              </p>

              {settings?.socialLinks && (
                <div className="space-y-4">
                  {settings.socialLinks.instagram && (
                    <a
                      href={settings.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-4 p-4 bg-white/5 hover:bg-gradient-to-r hover:from-pink-600/10 hover:to-purple-600/10 border border-white/10 hover:border-pink-500/40 rounded-xl transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <span className="font-medium text-white/90 group-hover:text-pink-400 transition-colors">Instagram</span>
                    </a>
                  )}

                  {settings.socialLinks.linkedin && (
                    <a
                      href={settings.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-4 p-4 bg-white/5 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-blue-500/10 border border-white/10 hover:border-blue-500/40 rounded-xl transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600/30 to-blue-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <span className="font-medium text-white/90 group-hover:text-blue-400 transition-colors">LinkedIn</span>
                    </a>
                  )}

                  

                 
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ultra-sleek bottom section */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
          
          <div className="pt-16 flex flex-col xl:flex-row justify-between items-center gap-8">
            <div className="flex flex-col xl:flex-row items-center gap-6">
              <p className="text-white/60">
                &copy; {currentYear} <span className="text-gold font-semibold">İrem Akkan</span>
              </p>
              <div className="flex items-center gap-4 text-xs text-white/40">
                <div className="w-2 h-[1px] bg-gold/50"></div>
                <span>Profesyonel Psikolojik Danışmanlık</span>
                <div className="w-2 h-[1px] bg-gold/50"></div>
              </div>
            </div>

            <div className="flex gap-10">
              {[
                { href: '/gizlilik-politikasi', label: 'Gizlilik Politikası' },
                { href: '/kvkk', label: 'KVKK' },
                { href: '/cerez-politikasi', label: 'Çerez Politikası' }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/60 hover:text-gold transition-colors duration-300 relative group text-sm"
                >
                  {item.label}
                  <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-gold to-gold/50 group-hover:w-full transition-all duration-300 rounded-full"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}