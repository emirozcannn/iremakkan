import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

// 🧠 Font setup (with CSS variables for Tailwind theme)
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// 🌐 SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://iremakkan.com"),
  title: {
    default: "İrem Akkan – Psikolojik Danışman İzmir",
    template: "%s | İrem Akkan",
  },
  description:
    "Psikolojik Danışman İrem Akkan - İzmir merkezli online psikolojik danışmanlık, terapi ve kişisel gelişim hizmetleri. Güven, uzmanlık ve empati odaklı yaklaşım.",
  keywords: [
    "Psikolojik Danışman İzmir",
    "İrem Akkan",
    "online psikolojik danışmanlık",
    "İzmir psikolog",
    "online terapi",
    "psikolojik destek İzmir",
    "bireysel gelişim",
    "kurumsal danışmanlık",
    "online psikoloji",
  ],
  authors: [{ name: "İrem Akkan" }],
  creator: "İrem Akkan",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://iremakkan.com",
    siteName: "İrem Akkan - Psikolojik Danışman",
    title: "İrem Akkan – Psikolojik Danışman İzmir",
    description:
      "İzmir merkezli online psikolojik danışmanlık ve kurumsal hizmetler. Güven, empati ve bilimsel yaklaşım bir arada.",
    images: [
      {
        url: "https://iremakkan.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "İrem Akkan – Psikolojik Danışman İzmir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "İrem Akkan – Psikolojik Danışman İzmir",
    description:
      "İzmir merkezli online psikolojik danışmanlık. Güven ve empati ile yanınızdayız.",
    images: ["https://iremakkan.com/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

// 🏗️ Root Layout Component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className="antialiased bg-premium text-navy transition-colors duration-300">
        {children}
        <Analytics />

        {/* Accessibility Fallback */}
        <noscript>
          <div className="p-4 text-center text-sm text-slate bg-pearl">
            Bu site en iyi deneyim için JavaScript gerektirir.
          </div>
        </noscript>
      </body>
    </html>
  );
}
