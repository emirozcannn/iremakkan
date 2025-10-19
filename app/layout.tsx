import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { client } from "@/sanity/lib/client";

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
    default: "İrem Akkan – Psikolojik Danışmanlık",
    template: "%s | İrem Akkan",
  },
  description:
    "Profesyonel psikolojik danışmanlık, kişisel gelişim ve kurumsal destek hizmetleri. Güven, uzmanlık ve empati odaklı yaklaşım.",
  keywords: [
    "psikolojik danışmanlık",
    "terapi",
    "bireysel gelişim",
    "kurumsal danışmanlık",
    "İrem Akkan",
  ],
  authors: [{ name: "İrem Akkan" }],
  creator: "İrem Akkan",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://iremakkan.com",
    siteName: "İrem Akkan",
    title: "İrem Akkan – Psikolojik Danışmanlık",
    description:
      "Profesyonel psikolojik danışmanlık ve kurumsal hizmetler. Güven, empati ve bilimsel yaklaşım bir arada.",
    images: [
      {
        url: "https://iremakkan.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "İrem Akkan – Psikolojik Danışmanlık",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "İrem Akkan – Psikolojik Danışmanlık",
    description:
      "Profesyonel psikolojik danışmanlık ve stratejik çözümlerle yanınızdayız.",
    images: ["https://iremakkan.com/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// 🧩 Fetch settings from Sanity
async function getSettings() {
  try {
    const settings = await client.fetch(
      `*[_type == "settings" && _id == "settings"][0]{
        phoneNumber,
        email,
        officeAddress,
        socialLinks,
        counselor {
          name,
          title,
          "image": image.asset->url
        }
      }`
    );
    return settings;
  } catch (error) {
    console.error("⚠️ Sanity settings fetch failed:", error);
    return null;
  }
}

// 🏗️ Root Layout Component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-premium text-navy transition-colors duration-300">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="min-h-screen pt-20 relative overflow-hidden">
          {/* Hafif arka plan bloblar */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-1/4 left-[-10%] w-[40rem] h-[40rem] bg-gold/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 right-[-10%] w-[35rem] h-[35rem] bg-teal/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
          </div>
          {children}
        </main>

        {/* Footer */}
        <Footer settings={settings} />

        {/* Sticky CTA Button */}
        <StickyCTA />

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
