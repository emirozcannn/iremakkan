import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Sayfa Bulunamadı',
  description: 'Aradığınız sayfa bulunamadı.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-pearl to-stone flex items-center justify-center px-6">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Arka plan efektleri */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        {/* 404 Numarası */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-display font-bold text-gradient-gold drop-shadow-2xl">
            404
          </h1>
        </div>

        {/* Mesaj */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">
            Kaybolmak Bazen Yeni Yollar Bulmaktır
          </h2>
          <p className="text-lg md:text-xl text-slate leading-relaxed max-w-xl mx-auto">
            Aradığınız sayfa maalesef bulunamadı. Ancak size yardımcı olabileceğimiz birçok başka alan var.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-gold text-white font-bold rounded-xl shadow-gold-lg hover:shadow-gold hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy font-bold rounded-xl border-2 border-navy hover:bg-navy hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            İletişime Geç
          </Link>
        </div>

        {/* Yardımcı Linkler */}
        <div className="mt-16 pt-8 border-t border-gold/30">
          <p className="text-sm text-slate mb-4">Popüler sayfalar:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Hizmetler', href: '/hizmetler' },
              { name: 'Blog', href: '/blog' },
              { name: 'Hakkımda', href: '/hakkimda' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-navy hover:text-gold underline underline-offset-4 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
