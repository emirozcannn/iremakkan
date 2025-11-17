import { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import CertificatesSection from "@/components/CertificatesSection";

interface SanityImage {
  asset?: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  caption?: string;
}

interface Page {
  title?: string;
  aboutContent?: PortableTextBlock[];
  profileImage?: SanityImage;
  officeImage?: SanityImage;
  environmentDescription?: string;
  infoCards?: Array<{
    icon?: string;
    title?: string;
    description?: string;
  }>;
  educationSection?: {
    buttonText?: string;
    title?: string;
  };
  education?: Array<{
    degree?: string;
    institution?: string;
    year?: string;
    description?: string;
  }>;
  certificates?: Array<{
    title?: string;
    institution?: string;
    year?: string;
    image?: SanityImage;
  }>;
  seoTitle?: string;
  seoDescription?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroHighlight?: string;
  heroDescription?: string;
  stats?: Array<{
    number?: string;
    label?: string;
    icon?: string;
  }>;
  labels?: {
    introButton?: string;
    profileButton?: string;
    environmentButton?: string;
    detailsButton?: string;
    certificatesButton?: string;
  };
  approach?: { title?: string; content?: PortableTextBlock[] };
}

async function getAboutPage(): Promise<Page | null> {
  try {
    const page = await client.fetch<Page>(
      `*[_type == "aboutPage"][0]{
        heroTitle,
        heroSubtitle,
        heroHighlight,
        heroDescription,
        aboutContent,
        profileImage,
        officeImage,
        environmentDescription,
        infoCards[]{icon,title,description},
        educationSection{buttonText,title},
        education[]{degree,institution,year,description},
        certificates[]{title,institution,year,image},
        stats[]{number,label,icon},
        approach{title,content},
        labels{
          introButton,profileButton,environmentButton,detailsButton,certificatesButton
        },
        seoTitle,
        seoDescription
      }`
    );
    return page;
  } catch (error) {
    console.error("Page fetch error:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();

  const title = page?.seoTitle || "Hakkımda - İrem Akkan Psikolojik Danışmanlık";
  const description = page?.seoDescription || "Psikolojik danışmanlık hizmeti. Eğitim, deneyim ve terapötik yaklaşım hakkında bilgi edinin.";

  const ogImage = page?.profileImage
    ? urlFor(page.profileImage).width(1200).height(630).url()
    : undefined;

  const keywords = [
    "İrem Akkan",
    "psikolojik danışman",
    "psikolog hakkında",
    "terapis özgeçmiş",
    "psikoterapi uzmanı",
    "danışman profili",
    "psikoloji eğitimi",
    "terapi yaklaşımı",
    "profesyonel deneyim",
    "sertifikalar",
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "İrem Akkan", url: "https://iremakkan.com" }],
    creator: "İrem Akkan",
    publisher: "İrem Akkan Psikolojik Danışmanlık",
    alternates: {
      canonical: "https://iremakkan.com/hakkimda",
    },
    openGraph: {
      type: "profile",
      locale: "tr_TR",
      url: "https://iremakkan.com/hakkimda",
      title,
      description,
      siteName: "İrem Akkan Psikolojik Danışmanlık",
      firstName: "İrem",
      lastName: "Akkan",
      username: "iremakkan",
      gender: "female",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: page?.profileImage?.alt || "İrem Akkan - Psikolojik Danışman",
            },
          ]
        : [],
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

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="relative text-4xl md:text-5xl font-bold text-navy mt-16 mb-8 font-display">
        <span className="relative z-10">{children}</span>
        <div className="absolute -bottom-3 left-0 w-24 h-1.5 bg-gradient-to-r from-gold via-teal to-gold-light rounded-full"></div>
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="relative text-2xl md:text-3xl font-semibold text-navy mt-12 mb-6 font-display">
        <span className="relative z-10">{children}</span>
        <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-gold to-teal rounded-full"></div>
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-lg md:text-xl text-navy/80 mb-8 leading-relaxed font-light">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-4 mb-10 pl-2">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="group flex items-start text-navy/80 text-lg leading-relaxed">
        <div className="w-8 h-8 bg-gradient-to-br from-gold/20 to-teal/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 group-hover:from-gold/30 group-hover:to-teal/30 transition-all duration-300">
          <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="flex-1">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <span className="font-bold text-navy bg-gradient-to-r from-gold/20 via-teal/15 to-gold/20 px-2 py-1 rounded-lg border border-gold/30 shadow-sm">
        {children}
      </span>
    ),
  },
};

export default async function AboutPage() {
  const page = await getAboutPage();

  // ** işaretli metni parse eden yardımcı fonksiyon
  const parseHighlightedText = (text?: string) => {
    if (!text) return { normal: "", highlighted: "" };
    
    const match = text.match(/^(.*?)\*\*(.*?)\*\*(.*)$/);
    if (match) {
      const [, before, highlighted, after] = match;
      return {
        normal: (before + after).trim(),
        highlighted: highlighted.trim(),
      };
    }
    
    return { normal: text, highlighted: "" };
  };

  // Default values
  const defaultLabels = {
    introButton: "BENİ TANIYIN",
    profileButton: "PROFİL",
    environmentButton: "DANIŞMANLIK ORTAMI",
    detailsButton: "DETAYLI BİLGİLER",
    certificatesButton: "EĞİTİM & SERTİFİKALAR",
  };

  const labels = page?.labels || defaultLabels;

  // Eğer Sanity'den içerik gelmezse placeholder göster
  if (!page || !page.aboutContent) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-pearl to-stone">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(197,165,114,0.4) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(44,95,93,0.3) 0%, transparent 40%),
              linear-gradient(135deg, rgba(197,165,114,0.1) 0%, transparent 30%)
            `,
          }}></div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-32 left-32 w-32 h-20 border-2 border-gold/25 rounded-xl rotate-12 animate-pulse" style={{animationDuration: '8s'}}>
              <div className="absolute top-2 left-2 w-4 h-4 bg-gold/30 rounded-full"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-teal/30 rounded-full"></div>
            </div>
            
            <div className="absolute bottom-40 right-40 w-28 h-36 bg-gradient-to-b from-teal/20 to-transparent rounded-lg transform -rotate-12">
              <div className="absolute top-3 left-3 right-3 h-1 bg-teal/40 rounded"></div>
              <div className="absolute top-6 left-3 right-3 h-0.5 bg-teal/30 rounded"></div>
            </div>
            
            <div className="absolute top-1/2 left-20 w-16 h-16 border-2 border-gold/30 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gold/25 rounded-full"></div>
            </div>
            
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full animate-pulse ${
                  i % 4 === 0 ? 'bg-gold/30' : i % 4 === 1 ? 'bg-teal/25' : i % 4 === 2 ? 'bg-gold/20' : 'bg-teal/20'
                }`}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${15 + Math.random() * 70}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative py-32 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center">
            <div className="relative inline-block mb-12">
              <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 to-teal/30 rounded-full blur-xl"></div>
              <div className="relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white/15 backdrop-blur-xl border border-gold/25 shadow-2xl">
                <svg className="w-6 h-6 text-gold animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
                <span className="text-navy font-bold uppercase tracking-[0.3em] text-sm">
                  {labels.introButton}
                </span>
                <svg className="w-6 h-6 text-teal animate-pulse" fill="currentColor" viewBox="0 0 24 24" style={{animationDelay: '1s'}}>
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-navy font-display leading-[0.9] mb-12">
              {page?.heroTitle || "Hakkımda"}
            </h2>

            <div className="max-w-3xl mx-auto">
              <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl">
                <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 to-teal/20 rounded-3xl blur-lg"></div>
                <p className="relative text-xl md:text-2xl text-navy/80 leading-relaxed font-light">
                  Şu anda bu sayfa güncelleniyor. Kısa süre içinde özgeçmiş ve
                  danışmanlık yaklaşımı burada yer alacak.
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>
    );
  }

  // Sayfa bulunduysa içeriği render et
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ivory via-pearl to-stone">
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(197,165,114,0.5) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(44,95,93,0.4) 0%, transparent 40%),
            linear-gradient(45deg, rgba(197,165,114,0.2) 0%, transparent 25%)
          `,
        }}></div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 right-24 w-36 h-24 border-2 border-gold/30 rounded-lg transform rotate-6 animate-pulse" style={{animationDuration: '9s'}}>
            <div className="absolute top-2 left-2 right-2 h-1 bg-gold/40 rounded"></div>
            <div className="absolute top-5 left-2 right-8 h-0.5 bg-gold/30 rounded"></div>
            <div className="absolute bottom-3 right-3 w-6 h-6 border border-gold/40 rounded-full"></div>
          </div>
          
          <div className="absolute bottom-32 left-24 w-28 h-32 bg-gradient-to-br from-teal/25 to-transparent" style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
          }}></div>
          
          <div className="absolute top-1/2 left-16 w-3 h-40 bg-gradient-to-b from-gold/30 via-teal/25 to-gold/20 rounded-full"></div>
          <div className="absolute top-1/3 right-20 w-2 h-28 bg-gradient-to-b from-teal/35 to-transparent rounded-full"></div>
          
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gold/30 rounded-full animate-pulse"
              style={{
                left: `${25 + Math.random() * 50}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${5 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-32 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 text-center">
          <div className="relative inline-block mb-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 to-teal/30 rounded-full blur-xl"></div>
            <div className="relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white/15 backdrop-blur-xl border border-gold/25 shadow-2xl">
              <svg className="w-6 h-6 text-gold animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
              <span className="text-navy font-bold uppercase tracking-[0.3em] text-sm">
                {labels.introButton}
              </span>
              <svg className="w-6 h-6 text-teal animate-pulse" fill="currentColor" viewBox="0 0 24 24" style={{animationDelay: '1s'}}>
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="space-y-10 mb-16">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-navy font-display leading-[0.9]">
              {page?.heroTitle || "Hakkımda"}
            </h1>

            <div className="flex items-center justify-center gap-8">
              <div className="w-32 h-[3px] bg-gradient-to-r from-transparent to-gold rounded-full"></div>
              <div className="flex gap-4">
                <div className="w-3 h-3 bg-gold rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-teal/70 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              <div className="w-32 h-[3px] bg-gradient-to-l from-transparent to-teal rounded-full"></div>
            </div>
          </div>


        </div>
      </div>

      {/* Profile Image Section */}
      {page.profileImage && (
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="group relative order-2 lg:order-1">
              <div className="absolute -inset-6 bg-gradient-to-br from-gold/30 via-teal/20 to-gold/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
              
              <div className="relative">
                <div className="absolute -inset-4 border-2 border-gold/30 rounded-3xl transform rotate-3 transition-transform duration-500 group-hover:rotate-6"></div>
                <div className="absolute -inset-4 border-2 border-teal/20 rounded-3xl transform -rotate-3 transition-transform duration-500 group-hover:-rotate-6"></div>
                
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent z-10"></div>
                  {page.profileImage?.asset?._ref ? (
                    <Image
                      src={urlFor(page.profileImage).width(800).height(1000).url()}
                      alt={page.profileImage.alt || "İrem Akkan - Psikolojik Danışman"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gold/20 to-navy/20 flex items-center justify-center">
                      <div className="text-6xl font-bold text-white/50">İA</div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center shadow-xl flex-shrink-0">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-white font-bold text-lg mb-1">İrem Akkan</div>
                          <div className="text-white/80 text-sm">Psikolojik Danışman</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-teal/20 to-transparent rounded-full blur-xl"></div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="relative inline-block">
                <div className="absolute -inset-3 bg-gradient-to-r from-gold/20 to-teal/20 rounded-2xl blur-lg"></div>
                <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-gold/25 shadow-xl">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy font-bold uppercase tracking-wide text-sm">
                    {labels.profileButton}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-display leading-tight">
                  {(() => {
                    const parsed = parseHighlightedText(page?.heroSubtitle);
                    return (
                      <>
                        {parsed.normal || "Güvenli ve Empatik"}{" "}
                        <span className="text-gradient-gold">
                          {parsed.highlighted || page?.heroHighlight || "Danışmanlık"}
                        </span>
                      </>
                    );
                  })()}
                </h2>

                <p className="text-xl text-navy/80 leading-relaxed font-light">
                  {page?.heroDescription ||
                    "Her bireyin kendine özgü bir yolculuğu vardır. Profesyonel yaklaşımım ve yıllarca süren deneyimimle, sizin bu yolculuğunuzda güvenilir bir rehber olmak için buradayım."}
                </p>
              </div>


            </div>
          </div>
        </div>
      )}

      {/* Office/Environment Image Section */}
      

      {/* Education Section */}
      {page.education && page.education.length > 0 && (
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 to-teal/20 rounded-2xl blur-lg"></div>
              <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-gold/25 shadow-xl">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span className="text-navy font-bold uppercase tracking-wide text-sm">
                  {page?.educationSection?.buttonText || "EĞİTİM BİLGİLERİ"}
                </span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy font-display">
              {(() => {
                const parsed = parseHighlightedText(page?.educationSection?.title);
                return (
                  <>
                    {parsed.normal || "Akademik"}{" "}
                    <span className="text-gradient-gold">
                      {parsed.highlighted || "Alt Yapı"}
                    </span>
                  </>
                );
              })()}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {page.education.map((edu, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-xl hover:shadow-gold/20 transition-all duration-500 hover:scale-105"
              >
                <div className={`absolute -inset-1 bg-gradient-to-br ${
                  index % 2 === 0 ? 'from-gold/20 to-gold/10' : 'from-teal/20 to-teal/10'
                } rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg`}></div>
                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${
                      index % 2 === 0 ? 'bg-gradient-to-br from-gold to-gold-light' : 'bg-gradient-to-br from-teal to-teal-dark'
                    } flex items-center justify-center shadow-xl flex-shrink-0`}>
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9L12 15L21 9V16H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-navy mb-2 font-display">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-navy/80 font-medium">{edu.institution}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-navy/60">{edu.year}</span>
                      </div>
                      {edu.description && (
                        <p className="text-navy/70 text-sm leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 pb-32">
        <div className="group relative">
          <div className="absolute -inset-6 bg-gradient-to-br from-white/20 via-gold/10 to-teal/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
          
          <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl p-12 lg:p-16 shadow-2xl">
            <div className="relative mb-12 text-center">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-gold/30 to-teal/30 rounded-2xl rotate-45"></div>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-gold/25 shadow-xl mb-6">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-navy font-bold uppercase tracking-wide text-sm">
                  {labels.detailsButton}
                </span>
              </div>
              
              <div className="w-32 h-1 bg-gradient-to-r from-gold via-teal to-gold rounded-full mx-auto"></div>
            </div>

            <div className="prose prose-lg prose-navy max-w-none">
              <PortableText value={page.aboutContent} components={portableTextComponents} />
            </div>

            <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-gold/25 to-teal/25 rounded-lg rotate-12"></div>
            <div className="absolute top-1/2 right-4 w-3 h-16 bg-gradient-to-b from-teal/30 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* --- YENİ SERTİFİKA BÖLÜMÜ --- */}
  <CertificatesSection certificates={page?.certificates || []} labels={labels} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "İrem Akkan",
            jobTitle: "Psikolojik Danışman",
            description: page.seoDescription || "Profesyonel psikolojik danışmanlık hizmeti sunan uzman psikolog.",
            url: "https://iremakkan.com/hakkimda",
            image: page.profileImage
              ? urlFor(page.profileImage).width(800).height(800).url()
              : "https://iremakkan.com/profile.jpg",
            sameAs: [
              "https://twitter.com/iremakkan",
              "https://linkedin.com/in/iremakkan",
            ],
            worksFor: {
              "@type": "Organization",
              name: "İrem Akkan Psikolojik Danışmanlık",
              url: "https://iremakkan.com",
            },
            knowsAbout: [
              "Psikolojik Danışmanlık",
              "Bireysel Terapi",
              "Çift Terapisi",
              "Aile Danışmanlığı",
              "Mental Sağlık",
              "Psikoterapi",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "İrem Akkan Psikolojik Danışmanlık",
            description: "Bireysel, çift ve aile danışmanlığı hizmetleri sunan profesyonel psikolojik danışmanlık merkezi.",
            url: "https://iremakkan.com",
            areaServed: "TR",
            availableLanguage: ["tr"],
            priceRange: "$",
            serviceType: [
              "Psikolojik Danışmanlık",
              "Bireysel Terapi",
              "Çift Terapisi",
              "Aile Danışmanlığı",
              "Online Terapi",
            ],
          }),
        }}
      />
    </div>
  );
}