import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/Button";

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
  details: PortableTextBlock[]; // Portable Text content
  seoTitle?: string;
  seoDescription?: string;
}

// Generate static paths for all services at build time
export async function generateStaticParams() {
  const services = await client.fetch<{ slug: SanitySlug }[]>(
    `*[_type == "service"]{ slug }`
  );

  return services.map((service) => ({
    slug: service.slug.current,
  }));
}

async function getService(slug: string): Promise<Service | null> {
  try {
    const service = await client.fetch<Service>(
      `*[_type == "service" && slug.current == $slug][0]{
        title,
        slug,
        summary,
        mainImage,
        details,
        seoTitle,
        seoDescription
      }`,
      { slug }
    );
    return service;
  } catch (error) {
    console.error("Service fetch error:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: "Hizmet Bulunamadı - İrem Akkan",
      description: "Aradığınız hizmet bulunamadı. Lütfen hizmetler sayfasından diğer danışmanlık seçeneklerimize göz atın.",
    };
  }

  const ogImage = service.mainImage
    ? urlFor(service.mainImage).width(1200).height(630).url()
    : undefined;

  const title = service.seoTitle || `${service.title} - İrem Akkan Psikolojik Danışmanlık`;
  const description = service.seoDescription || service.summary;

  // Dynamic keywords based on service
  const keywords = [
    "psikolojik danışmanlık",
    "psikoterapi",
    "terapi",
    "İrem Akkan",
    "online terapi",
    service.title.toLowerCase(),
    ...service.summary.toLowerCase().split(' ').filter((word: string) => word.length > 5).slice(0, 3),
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "İrem Akkan", url: "https://iremakkan.com" }],
    creator: "İrem Akkan",
    publisher: "İrem Akkan Psikolojik Danışmanlık",
    alternates: {
      canonical: `https://iremakkan.com/hizmetler/${slug}`,
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: `https://iremakkan.com/hizmetler/${slug}`,
      title,
      description,
      siteName: "İrem Akkan Psikolojik Danışmanlık",
      images: ogImage ? [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: service.mainImage?.alt || service.title,
      }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
      creator: "@iremakkan",
      site: "@iremakkan",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Ultra-Modern Portable Text Components
const portableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-12 group relative">
          <div className="absolute -inset-2 bg-gradient-to-br from-gold/20 to-teal/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={urlFor(value).width(800).url()}
              alt={value.alt || "Hizmet görseli"}
              width={800}
              height={600}
              className="w-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl md:text-4xl font-bold text-navy mt-12 mb-6 font-display relative">
        <span className="relative z-10">{children}</span>
        <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-gold to-teal rounded-full"></div>
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl md:text-3xl font-semibold text-navy mt-10 mb-5 font-display relative">
        <span className="relative z-10">{children}</span>
        <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-gold to-gold-light rounded-full"></div>
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-lg md:text-xl text-navy/80 mb-6 leading-relaxed font-light">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-8 space-y-3">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-4 text-lg text-navy/80 leading-relaxed">
        <div className="w-2 h-2 bg-gradient-to-br from-gold to-teal rounded-full mt-3 flex-shrink-0"></div>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-navy bg-gradient-to-r from-gold/20 to-teal/20 px-2 py-1 rounded-lg">
        {children}
      </strong>
    ),
  },
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra-Modern Background System */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory via-pearl to-stone">
        {/* Advanced pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(197,165,114,0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(44,95,93,0.3) 0%, transparent 40%),
            linear-gradient(45deg, rgba(197,165,114,0.1) 0%, transparent 30%)
          `,
        }}></div>

        {/* Floating geometric elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 border-2 border-gold/25 rotate-45 rounded-2xl animate-pulse" style={{animationDuration: '6s'}}></div>
          <div className="absolute bottom-32 left-16 w-24 h-48 bg-gradient-to-t from-teal/20 to-transparent rounded-full blur-xl"></div>
          
          {/* Particle system */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gold/40 rounded-full animate-pulse"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${15 + Math.random() * 70}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 py-20">
        {/* Ultra-Modern Breadcrumb */}
        <nav className="mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl">
            <Link href="/" className="text-navy/70 hover:text-gold transition-colors duration-300 font-medium">
              Ana Sayfa
            </Link>
            <div className="w-1 h-1 bg-gold rounded-full"></div>
            <Link href="/hizmetler" className="text-navy/70 hover:text-gold transition-colors duration-300 font-medium">
              Hizmetler
            </Link>
            <div className="w-1 h-1 bg-gold rounded-full"></div>
            <span className="text-navy font-bold">{service.title}</span>
          </div>
        </nav>

        {/* Premium Header Section */}
        <header className="mb-16 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 to-teal/30 rounded-full blur-xl"></div>
            <div className="relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-gold/25 shadow-2xl">
              <svg className="w-6 h-6 text-gold animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
              <span className="text-navy font-bold uppercase tracking-wider">
                Profesyonel Hizmet
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-navy mb-8 font-display leading-tight">
            {service.title}
          </h1>
          
          {/* Enhanced summary with premium design */}
          <div className="max-w-3xl mx-auto">
            <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl">
              <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 to-teal/20 rounded-3xl blur-lg"></div>
              <p className="relative text-xl md:text-2xl text-navy/80 leading-relaxed font-light">
                {service.summary}
              </p>
            </div>
          </div>
        </header>

        {/* Ultra-Modern Image Section */}
        {service.mainImage && (
          <div className="mb-20 relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/25 to-teal/25 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent z-10"></div>
              <Image
                src={urlFor(service.mainImage).width(1200).url()}
                alt={service.mainImage.alt || service.title}
                width={1200}
                height={675}
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              
             
             
            </div>
          </div>
        )}

        {/* Ultra-Modern Content Section */}
        <div className="mb-20">
          <div className="relative p-10 md:p-12 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl">
            <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
            <div className="relative prose prose-lg prose-navy max-w-none">
              <PortableText
                value={service.details}
                components={portableTextComponents}
              />
            </div>
            
            {/* Geometric accent elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-gold/30 to-teal/30 rounded-lg rotate-45"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-br from-teal/40 to-gold/40 rounded-full"></div>
          </div>
        </div>

        {/* Ultra-Modern CTA Section */}
        <div className="mb-16">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-gold/25 via-teal/25 to-gold/25 rounded-3xl blur-2xl animate-pulse" style={{animationDuration: '5s'}}></div>
            <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-navy via-navy-light to-charcoal text-center shadow-2xl">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gold/20 backdrop-blur-xl border border-gold/30 mb-8">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-white font-bold uppercase tracking-wide text-sm">
                  Ücretsiz Ön Görüşme
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                Bu hizmet hakkında daha fazla bilgi almak{" "}
                <span className="text-gradient-gold">ister misiniz?</span>
              </h2>
              
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Size özel çözümler üretmek ve size yardımcı olmak için buradayım.
                İlk görüşmemiz tamamen ücretsizdir.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/iletisim" className="group relative">
                  <div className="absolute -inset-3 bg-gradient-to-r from-gold via-gold-light to-gold rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
                  <Button 
                    size="lg" 
                    className="relative bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold shadow-2xl hover:shadow-gold/50 transition-all duration-300 hover:scale-105 px-10 py-5 text-lg font-bold"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      İletişime Geçin
                    </span>
                  </Button>
                </Link>
                
                <Link href="tel:+905551234567" className="group relative">
                  <div className="absolute -inset-3 bg-gradient-to-r from-white/10 to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
                  <button className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/30 hover:border-white/50 text-white shadow-xl hover:shadow-white/10 transition-all duration-300 hover:scale-105 font-bold text-lg">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Hemen Arayın
                  </button>
                </Link>
              </div>

              {/* Floating elements */}
              <div className="absolute top-8 left-8 w-12 h-12 bg-gold/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 right-8 w-8 h-8 bg-teal/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>

        {/* Ultra-Modern Navigation */}
        <div className="pt-8">
          <Link
            href="/hizmetler"
            className="group inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/25 hover:border-gold/40 shadow-xl hover:shadow-gold/20 transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center shadow-lg group-hover:shadow-gold/30 transition-shadow duration-300">
              <svg
                className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            <div>
              <div className="text-navy font-bold text-lg">Tüm Hizmetlere Dön</div>
              <div className="text-navy/60 text-sm">Diğer danışmanlık hizmetlerini keşfedin</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
