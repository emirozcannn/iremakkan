import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface SanitySlug {
  current: string;
}

interface SanityImage {
  asset?: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

interface Service {
  title: string;
  slug: SanitySlug;
  summary: string;
  mainImage?: SanityImage;
  seoTitle?: string;
  seoDescription?: string;
}

async function getServices(): Promise<Service[]> {
  try {
    const services = await client.fetch<Service[]>(`
      *[_type == "service"] | order(_createdAt desc){
        title,
        slug,
        summary,
        mainImage,
        seoTitle,
        seoDescription
      }
    `);
    return services;
  } catch (error) {
    console.error("Services fetch error:", error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const services = await getServices();
  
  const pageTitle = "Psikolojik Danışmanlık Hizmetleri | İrem Akkan";
  const pageDescription = "Bireysel, çift ve aile danışmanlığı hizmetleri. Profesyonel psikolojik destek ile yaşam kalitenizi artırın. 8+ yıllık deneyim, %98 memnuniyet oranı.";
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "psikolojik danışmanlık",
      "bireysel terapi",
      "çift terapisi",
      "aile danışmanlığı",
      "psikolojik destek",
      "online terapi",
      "İrem Akkan",
      ...services.map(s => s.title)
    ],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      locale: "tr_TR",
      siteName: "İrem Akkan - Psikolojik Danışman",
      images: services[0]?.mainImage ? [
        {
          url: urlFor(services[0].mainImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: services[0].mainImage.alt || services[0].title,
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: services[0]?.mainImage ? [urlFor(services[0].mainImage).width(1200).height(630).url()] : [],
    },
    alternates: {
      canonical: "https://iremakkan.com/hizmetler",
    },
  };
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra-Modern Background System */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory via-pearl to-stone">
        {/* Sophisticated pattern overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(197,165,114,0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(44,95,93,0.3) 0%, transparent 40%),
            radial-gradient(circle at 40% 90%, rgba(197,165,114,0.2) 0%, transparent 50%)
          `,
        }}></div>

        {/* Dynamic geometric elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-20 w-64 h-64 border-2 border-gold/20 rotate-12 rounded-[4rem] animate-pulse" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-br from-teal/15 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-96 bg-gradient-to-b from-gold/20 to-transparent rotate-45"></div>
          
          {/* Enhanced particle system */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gold/25 rounded-full animate-pulse"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Ultra-Modern Hero Section */}
      <div className="relative py-32 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          {/* Premium service badge */}
          <div className="relative inline-block mb-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 to-teal/30 rounded-full blur-xl"></div>
            <div className="relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white/15 backdrop-blur-xl border border-gold/25 shadow-2xl">
              <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
              <span className="text-navy font-bold uppercase tracking-[0.3em] text-sm">
                Profesyonel Danışmanlık
              </span>
              <svg className="w-6 h-6 text-teal animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>

          <div className="space-y-10 mb-16">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-navy font-display leading-[0.9]">
              Size Özel{" "}
              <span className="text-gradient-gold block lg:inline">
                Destek Programları
              </span>
            </h1>

            {/* Artistic separator with enhanced design */}
            <div className="flex items-center justify-center gap-8">
              <div className="w-40 h-[3px] bg-gradient-to-r from-transparent via-gold to-teal rounded-full"></div>
              <div className="flex gap-3">
                <div className="w-4 h-4 bg-gold rounded-full animate-pulse"></div>
                <div className="w-5 h-5 bg-teal/70 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-4 h-4 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              <div className="w-40 h-[3px] bg-gradient-to-l from-transparent via-teal to-gold rounded-full"></div>
            </div>

            <p className="text-2xl md:text-3xl text-navy/70 max-w-4xl mx-auto leading-relaxed font-light">
              Bireysel, çift ve aile danışmanlığı ile yaşam kalitenizi artırın
            </p>
          </div>

          {/* Premium statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Başarılı Danışmanlık", icon: "👥" },
              { number: "8+", label: "Yıllık Deneyim", icon: "⭐" },
              { number: "98%", label: "Memnuniyet Oranı", icon: "💎" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group relative p-8 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-gold/20 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 to-teal/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
                <div className="relative text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-navy mb-2 font-display">{stat.number}</div>
                  <div className="text-navy/60 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ultra-Modern Services Grid */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pb-32">
        {services.length > 0 ? (
          <div className="space-y-16">
            {/* Section header with premium design */}
            <div className="text-center">
              <div className="relative inline-block mb-8">
                <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 to-teal/20 rounded-2xl blur-lg"></div>
                <div className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-gold/20 shadow-xl">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-navy font-bold uppercase tracking-wide">
                    Danışmanlık Hizmetleri
                  </span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-display">
                Hayatınızı <span className="text-gradient-gold">Dönüştüren</span> Programlar
              </h2>
            </div>

            {/* Premium services grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.slug.current}
                  className="group relative"
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Enhanced card with ultra-modern design */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-gold/20 via-transparent to-teal/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
                  
                  <div className="relative h-full bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl p-8 shadow-2xl hover:shadow-gold/20 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
                    {/* Card image with overlay effects */}
                    {service.mainImage && (
                      <div className="relative mb-8 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent z-10"></div>
                        <Image
                          src={urlFor(service.mainImage).width(700).height(400).url()}
                          alt={service.mainImage.alt || service.title}
                          width={700}
                          height={400}
                          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 z-20">
                          <div className="w-12 h-12 bg-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Card content with premium typography */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-navy mb-4 font-display group-hover:text-gold transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-navy/70 leading-relaxed text-lg">
                          {service.summary}
                        </p>
                      </div>

                      {/* Premium CTA button */}
                      <div className="pt-4">
                        <a
                          href={`/hizmetler/${service.slug.current}`}
                          className="group/btn relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold shadow-xl hover:shadow-gold/40 transition-all duration-300 text-white font-bold overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-teal/20 to-gold/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                          <span className="relative z-10">Detayları İncele</span>
                          <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Geometric accent */}
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-gold/30 to-teal/30 rounded-2xl rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="relative inline-block">
              <div className="absolute -inset-8 bg-gradient-to-br from-gold/20 to-teal/20 rounded-3xl blur-2xl"></div>
              <div className="relative p-16 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-br from-gold to-gold-light rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-navy mb-4 font-display">
                  Hizmetler Çok Yakında
                </h3>
                <p className="text-xl text-navy/70 max-w-md mx-auto">
                  Psikolojik danışmanlık hizmetlerimiz hazırlanıyor.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ultra-modern CTA section */}
        <div className="mt-24 text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-6 bg-gradient-to-r from-gold/25 via-teal/25 to-gold/25 rounded-3xl blur-2xl animate-pulse" style={{animationDuration: '4s'}}></div>
            <div className="relative p-12 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-navy mb-6 font-display">
                Kişiye Özel Danışmanlığa <span className="text-gradient-gold">İhtiyacınız mı Var?</span>
              </h3>
              <p className="text-lg text-navy/70 mb-8 max-w-2xl mx-auto">
                Size en uygun hizmeti birlikte belirleyelim ve yaşam kalitenizi artırmanın ilk adımını atalım.
              </p>
              <Link
                href="/iletisim"
                className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy text-white font-bold text-lg shadow-2xl hover:shadow-navy/30 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-teal/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">Ücretsiz Ön Görüşme</span>
                <svg className="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
