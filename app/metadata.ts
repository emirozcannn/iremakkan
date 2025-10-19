import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://iremakkan.com'),
  title: {
    default: 'İrem Akkan | Psikolojik Danışman - Bireysel & Çift Terapisi',
    template: '%s | İrem Akkan',
  },
  description: 'Profesyonel psikolojik danışmanlık hizmeti. 8+ yıl deneyim ile bireysel terapi, çift danışmanlığı ve aile terapisi. Online ve yüz yüze görüşme seçenekleri.',
  keywords: [
    'psikolojik danışman',
    'psikolog',
    'terapis',
    'bireysel terapi',
    'çift terapisi',
    'aile danışmanlığı',
    'online terapi',
    'psikoterapi',
    'mental sağlık',
    'psikolojik destek',
    'anksiyete tedavisi',
    'depresyon tedavisi',
    'stres yönetimi',
    'ilişki danışmanlığı',
    'İrem Akkan',
    'güvenilir psikolog',
    'profesyonel danışman',
  ],
  authors: [{ name: 'İrem Akkan', url: 'https://iremakkan.com' }],
  creator: 'İrem Akkan',
  publisher: 'İrem Akkan Psikolojik Danışmanlık',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://iremakkan.com',
    siteName: 'İrem Akkan Psikolojik Danışmanlık',
    title: 'İrem Akkan | Profesyonel Psikolojik Danışman',
    description: 'Güvenli ve empatik psikolojik danışmanlık hizmeti. Bireysel, çift ve aile terapisi ile mental sağlığınızı destekliyoruz.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'İrem Akkan - Psikolojik Danışman',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@iremakkan',
    creator: '@iremakkan',
    title: 'İrem Akkan | Profesyonel Psikolojik Danışman',
    description: 'Güvenli ve empatik psikolojik danışmanlık hizmeti. Bireysel, çift ve aile terapisi.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://iremakkan.com',
  },
  verification: {
    google: 'google-site-verification-code', // Kullanıcı ekleyecek
    // yandex: 'yandex-verification-code',
  },
  category: 'Health & Wellness',
};
