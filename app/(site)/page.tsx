import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import Card from "@/components/Card";
import AnimatedSection from "@/components/AnimatedSection";
import StatsCounter from "@/components/StatsCounter";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";


// --- Data types ---
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

// --- Service type ---
interface Service {
  title: string;
  slug: SanitySlug;
  summary: string;
  mainImage?: SanityImage;
}

// --- Blog Post type ---
interface BlogPost {
  title: string;
  slug: SanitySlug;
  excerpt: string;
  mainImage?: SanityImage;
  publishedAt: string;
  readingTime?: number;
  author?: {
    name: string;
    image?: string;
  };
  categories?: Array<{
    title: string;
    slug: SanitySlug;
  }>;
}

// --- Home Page Data type ---
interface HomePageData {
  heroBadge?: string;
  heroMainTitle?: string;
  heroMainTitleHighlight?: string;
  heroMainTitleSubtext?: string;
  heroDescription?: string;
  heroListItems?: Array<{ text: string }>;
  heroEndingText?: string;
  heroButton1Text?: string;
  heroButton2Text?: string;
  statsNumbers?: {
    experience: string;
    sessions: string;
    satisfaction: string;
    privacy: string;
  };
  statsSection?: {
    title: string;
    description: string;
    bottomText: string;
  };
  servicesSection?: {
    title: string;
    description: string;
    buttonText: string;
  };
  blogSection?: {
    title: string;
    description: string;
    buttonText: string;
  };
  whySection?: {
    badge: string;
    title: string;
    subtitle: string;
    cards: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  ctaSection?: {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
}



// --- Fetch services ---
async function getServices(): Promise<Service[]> {
  try {
    const services = await client.fetch<Service[]>(
      `*[_type == "service"][0...3]{
        title,
        slug,
        summary,
        mainImage
      }`
    );
    return services;
  } catch (error) {
    console.error("⚠️ Services fetch error:", error);
    return [];
  }
}

// --- Fetch blog posts ---
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch<BlogPost[]>(
      `*[_type == "post" && publishedAt < now()] | order(publishedAt desc)[0...3]{
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        readingTime,
        "author": author->{name, "image": image.asset->url},
        "categories": categories[]->{title, slug}
      }`
    );
    return posts;
  } catch (error) {
    console.error("⚠️ Blog posts fetch error:", error);
    return [];
  }
}

// --- Fetch home page data ---
async function getHomePageData(): Promise<HomePageData | null> {
  try {
    const homeData = await client.fetch<HomePageData>(
      `*[_type == "homePage"][0]{
        heroBadge,
        heroMainTitle,
        heroMainTitleHighlight,
        heroMainTitleSubtext,
        heroDescription,
        heroListItems,
        heroEndingText,
        heroButton1Text,
        heroButton2Text,
        statsNumbers,
        statsSection,
        servicesSection,
        blogSection,
        whySection,
        ctaSection
      }`
    );
    return homeData;
  } catch (error) {
    console.error("⚠️ Home page data fetch error:", error);
    return null;
  }
}

// Fetch settings including counselor data
async function getSettings() {
  try {
    const settings = await client.fetch<{
      counselor?: {
        name?: string;
        title?: string;
        image?: string;
        bio?: string;
        credentials?: string[];
        experience?: string;
      };
    }>(
      `*[_type == "settings"][0]{
        counselor {
          name,
          title,
          bio,
          credentials,
          experience,
          "image": image.asset->url
        }
      }`
    );
    return settings;
  } catch (error) {
    console.error("⚠️ Settings fetch error:", error);
    return null;
  }
}

export default async function Home() {
  const services = await getServices();
  const blogPosts = await getBlogPosts();
  const homePageData = await getHomePageData();
  const settings = await getSettings();
  const counselor = settings?.counselor;

  return (
    <>
      {/* Professional Hero Section with Counselor Trust Card */}
      <section
        aria-labelledby="hero-heading"
        className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden"
      >
        {/* Sophisticated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-charcoal">
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="heroPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="rgba(197,165,114,0.4)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroPattern)"/>
          </svg>

          {/* Ambient lighting */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gold/15 via-gold/5 to-transparent blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-teal/20 via-teal/8 to-transparent blur-3xl"></div>
          </div>
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-32">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Counselor Card - Trust & Credibility */}
              {counselor && counselor.image && (
                <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                  <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 via-teal/20 to-gold/30 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Main Card */}
                    <div className="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 shadow-2xl border border-white/60 hover:border-gold/40 transition-all duration-500">
                      {/* Large Professional Photo */}
                      <div className="relative w-64 h-64 lg:w-80 lg:h-80 mx-auto mb-6 rounded-3xl overflow-hidden ring-4 ring-gold/30 ring-offset-4 ring-offset-white shadow-2xl">
                        <Image
                          src={counselor.image}
                          alt={counselor.name || "Psikolojik Danışman"}
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 768px) 256px, 320px"
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
                      </div>

                      {/* Counselor Info */}
                      <div className="text-center space-y-4">
                        <div>
                          <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-2 font-display">
                            {counselor.name || "İrem Akkan"}
                          </h2>
                          <p className="text-xl text-gold font-semibold mb-3">
                            {counselor.title || "Psikolojik Danışman"}
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center justify-center gap-3 py-2">
                          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-gold rounded-full"></div>
                          <div className="w-2 h-2 bg-gold rounded-full"></div>
                          <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-gold rounded-full"></div>
                        </div>

                        {counselor.bio && (
                          <p className="text-navy/80 leading-relaxed text-base lg:text-lg max-w-md mx-auto">
                            {counselor.bio}
                          </p>
                        )}

                        {/* Credentials/Experience */}
                        {(counselor.credentials || counselor.experience) && (
                          <div className="pt-4 space-y-3">
                            {counselor.experience && (
                              <div className="flex items-center justify-center gap-2 text-navy/70">
                                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-semibold">{counselor.experience}</span>
                              </div>
                            )}
                            {counselor.credentials && counselor.credentials.length > 0 && (
                              <div className="flex flex-wrap gap-2 justify-center">
                                {counselor.credentials.map((cred, i) => (
                                  <span
                                    key={i}
                                    className="px-4 py-2 rounded-full bg-navy/10 text-navy/80 text-sm font-medium border border-navy/20"
                                  >
                                    {cred}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Trust Badge */}
                        <div className="pt-6 flex items-center justify-center gap-3">
                          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30">
                            <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-bold text-gold">Lisanslı Danışman</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Right: Headline & CTA */}
              <div className="text-center lg:text-left order-1 lg:order-2">
                {/* Badge */}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-gold/30 shadow-lg mb-8">
                  <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-bold uppercase tracking-wider">
                    {homePageData?.heroBadge || "Profesyonel Destek"}
                  </span>
                </div>

                <div className="space-y-6 mb-10">
                  <h1
                    id="hero-heading"
                    className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight"
                  >
                    <span className="block">{homePageData?.heroMainTitle || "Kendinize"}</span>
                    <span className="block text-gradient-gold">{homePageData?.heroMainTitleHighlight || "Değer Vermenin"}</span>
                    <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white/90 font-light mt-2">
                      {homePageData?.heroMainTitleSubtext || "Güvenli Adresi"}
                    </span>
                  </h1>

                  <div className="flex items-center justify-center lg:justify-start gap-4 my-6">
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-gold"></div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                    <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-gold"></div>
                  </div>
                </div>

                <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {homePageData?.heroDescription || "Yaşamınızda karşılaştığınız zorluklarla başa çıkmanızda, güvenli ve empatik bir ortamda profesyonel destek sağlıyorum. Bireysel, çift ve aile danışmanlığı ile kendinizi daha iyi anlamanıza yardımcı oluyorum."}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-10">
                  <Link href="/iletisim" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                    <Button
                      aria-label="Randevu alın"
                      size="lg"
                      variant="primary"
                      className="relative bg-gradient-to-r from-gold via-gold-light to-gold hover:from-gold-light hover:via-gold hover:to-gold-dark shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {homePageData?.heroButton1Text || "Randevu Alın"}
                      </span>
                    </Button>
                  </Link>
                  
                  <Link href="/hizmetler" className="group relative">
                    <Button
                      aria-label="Hizmetleri keşfedin"
                      size="lg"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-xl hover:bg-white/20 border-2 border-white/40 hover:border-white/60 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {homePageData?.heroButton2Text || "Hizmetlerimi Keşfedin"}
                      </span>
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
                  {[
                    { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Güvenli" },
                    { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Bilimsel" },
                    { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "Empatik" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-300">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                      <span className="text-white/90 text-sm font-semibold">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Ultra-Modern Stats Section */}
      <section
        aria-labelledby="stats-heading"
        className="py-32 relative overflow-hidden"
      >
        {/* Sophisticated background system */}
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-pearl to-stone">
          {/* Geometric grid overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(26,31,46,0.05) 25%, rgba(26,31,46,0.05) 26%, transparent 27%, transparent 74%, rgba(26,31,46,0.05) 75%, rgba(26,31,46,0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(197,165,114,0.1) 25%, rgba(197,165,114,0.1) 26%, transparent 27%, transparent 74%, rgba(197,165,114,0.1) 75%, rgba(197,165,114,0.1) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '80px 80px'
          }}></div>
          
          {/* Ambient elements */}
          <div className="absolute top-20 right-20 w-32 h-32 border border-gold/20 rotate-45 rounded-2xl animate-pulse" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-teal/10 to-transparent rounded-full blur-sm"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <AnimatedSection>
            {/* Modern section badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gold/20 shadow-lg mb-8">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
              <span className="text-navy text-xs font-bold uppercase tracking-wider">Güvenilir Deneyim</span>
              <div className="w-2 h-2 bg-teal rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="space-y-6 mb-16">
              <h2
                id="stats-heading"
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-navy font-display leading-tight"
              >
                {homePageData?.statsSection?.title ? (
                  <>
                    {homePageData.statsSection.title.split(' ').slice(0, -1).join(' ')}{" "}
                    <span className="text-gradient-gold block lg:inline">
                      {homePageData.statsSection.title.split(' ').slice(-1)[0]}
                    </span>
                  </>
                ) : (
                  <>
                    Deneyim ve{" "}
                    <span className="text-gradient-gold block lg:inline">Güven</span>
                  </>
                )}
              </h2>
              
              {/* Artistic separator */}
              <div className="flex items-center justify-center gap-6">
                <div className="w-20 h-[2px] bg-gradient-to-r from-transparent to-navy/30"></div>
                <div className="w-4 h-4 bg-gold/30 rotate-45"></div>
                <div className="w-20 h-[2px] bg-gradient-to-l from-transparent to-navy/30"></div>
              </div>
              
              <p className="text-lg text-slate max-w-3xl mx-auto leading-relaxed">
                {homePageData?.statsSection?.description || "Psikolojik danışmanlık alanında uzun yıllara dayanan deneyimimizle yanınızdayız"}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {(() => {
                // Stats data from Sanity or fallback
                const stats = homePageData?.statsNumbers ? [
                  { 
                    value: homePageData.statsNumbers.experience, 
                    label: "Yıllık Deneyim", 
                    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", 
                    gradient: "from-gold/20 to-gold/40" 
                  },
                  { 
                    value: homePageData.statsNumbers.sessions, 
                    label: "Başarılı Seans", 
                    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", 
                    gradient: "from-navy/20 to-navy/40" 
                  },
                  { 
                    value: homePageData.statsNumbers.satisfaction, 
                    label: "Memnuniyet", 
                    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", 
                    gradient: "from-gold/20 to-teal/20" 
                  },
                  { 
                    value: homePageData.statsNumbers.privacy, 
                    label: "Gizlilik", 
                    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", 
                    gradient: "from-teal/20 to-teal/40" 
                  },
                ] : [
                  { value: "8+", label: "Yıllık Deneyim", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-gold/20 to-gold/40" },
                  { value: "200+", label: "Mutlu Danışan", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", gradient: "from-teal/20 to-teal/40" },
                  { value: "500+", label: "Başarılı Seans", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-navy/20 to-navy/40" },
                  { value: "95%", label: "Memnuniyet", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", gradient: "from-gold/20 to-teal/20" },
                ];

                return stats.map((stat, i) => {
                  // Parse number and suffix from value like "8+", "200+", "95%"
                  const match = stat.value.match(/^(\d+)(.*)$/);
                  const number = match ? parseInt(match[1]) : 10;
                  const suffix = match ? match[2] : "+";

                  return (
                    <div key={i} className="group relative">
                      {/* Hover glow effect */}
                      <div className={`absolute -inset-2 bg-gradient-to-r ${stat.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                      
                      {/* Main card */}
                      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:border-gold/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                        {/* Icon with advanced styling */}
                        <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                          </svg>
                          {/* Micro accent */}
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-white animate-pulse"></div>
                        </div>

                        {/* Counter with enhanced typography */}
                        <div className="mb-4">
                          <StatsCounter
                            end={number}
                            suffix={suffix}
                            label=""
                            className="text-5xl lg:text-6xl font-bold text-navy mb-2 leading-none"
                          />
                        </div>

                        {/* Label with modern styling */}
                        <div className="relative">
                          <p className="text-sm font-bold uppercase tracking-wider text-slate mb-2">
                            {stat.label}
                          </p>
                          <div className="w-12 h-[2px] bg-gradient-to-r from-gold to-transparent rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Ultra-Modern Services Showcase */}
      {services.length > 0 && (
        <section
          aria-labelledby="services-heading"
          className="py-32 relative overflow-hidden"
        >
          {/* Advanced background architecture */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-charcoal">
            {/* Hexagonal pattern overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 60 60" preserveAspectRatio="none">
              <defs>
                <pattern id="servicesHex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                  <path d="M30,4 L50,15 L50,37 L30,48 L10,37 L10,15 Z" fill="none" stroke="rgba(197,165,114,0.3)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#servicesHex)"/>
            </svg>

            {/* Dynamic geometric elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-32 right-32 w-48 h-48 border-2 border-gold/20 rotate-12 rounded-3xl animate-pulse" style={{animationDuration: '5s'}}></div>
              <div className="absolute bottom-24 left-24 w-32 h-32 bg-gradient-to-br from-teal/15 to-transparent rounded-full blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 right-1/4 w-6 h-24 bg-gradient-to-b from-gold/30 to-transparent rotate-45"></div>
              
              {/* Floating particles */}
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-gold/40 rounded-full animate-pulse"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                  }}
                ></div>
              ))}
            </div>

            {/* Ambient lighting system */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-gold/12 via-gold/4 to-transparent blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-teal/18 via-teal/6 to-transparent blur-3xl"></div>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="text-center mb-20">
              {/* Premium section badge */}
              <div className="relative inline-block mb-8">
                <div className="absolute -inset-3 bg-gradient-to-r from-gold/20 to-teal/20 rounded-full blur-lg"></div>
                <div className="relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-gold/30 shadow-2xl">
                  <div className="w-3 h-3 bg-gold rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-bold uppercase tracking-[0.2em]">
                    Hizmetlerimiz
                  </span>
                  <div className="w-3 h-3 bg-teal-light rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>

              <div className="space-y-8">
                <h2
                  id="services-heading"
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-display leading-tight"
                >
                  {homePageData?.servicesSection?.title ? (
                    <>
                      {homePageData.servicesSection.title.split('**')[0]}
                      {homePageData.servicesSection.title.includes('**') && (
                        <span className="text-gradient-gold block lg:inline">
                          {homePageData.servicesSection.title.split('**')[1]}
                        </span>
                      )}
                      {homePageData.servicesSection.title.split('**')[2]}
                    </>
                  ) : (
                    <>
                      Size Özel{" "}
                      <span className="text-gradient-gold block lg:inline">
                        Profesyonel Çözümler
                      </span>
                    </>
                  )}
                </h2>

                {/* Artistic divider */}
                <div className="flex items-center justify-center gap-8">
                  <div className="w-24 h-[2px] bg-gradient-to-r from-transparent to-gold/60"></div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-2 h-2 bg-gold/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                  <div className="w-24 h-[2px] bg-gradient-to-l from-transparent to-gold/60"></div>
                </div>

                <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                  {homePageData?.servicesSection?.description || "Her bireyin ihtiyaçları benzersizdir. Sizin için özel olarak tasarlanmış danışmanlık hizmetleri sunuyorum."}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <AnimatedSection key={service.slug.current} delay={index * 0.1}>
                  <Card
                    title={service.title}
                    description={service.summary}
                    image={
                      service.mainImage
                        ? urlFor(service.mainImage).width(700).height(500).url()
                        : undefined
                    }
                    imageAlt={service.mainImage?.alt || service.title}
                    href={`/hizmetler/${service.slug.current}`}
                  />
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.4} className="text-center mt-12">
              <Link href="/hizmetler">
                <Button size="lg" variant="primary" className="shadow-xl hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300">
                  {homePageData?.servicesSection?.buttonText || "Tüm Hizmetleri Görüntüle"}
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Ultra-Modern Blog Section */}
      {blogPosts.length > 0 && (
        <section
          aria-labelledby="blog-heading"
          className="py-32 relative overflow-hidden"
        >
          {/* Sophisticated background system */}
          <div className="absolute inset-0 bg-gradient-to-br from-ivory via-pearl to-stone">
            {/* Advanced geometric overlay */}
            <div className="absolute inset-0 opacity-15" style={{
              backgroundImage: `
                radial-gradient(circle at 30% 70%, rgba(197,165,114,0.3) 2px, transparent 2px),
                radial-gradient(circle at 70% 30%, rgba(44,95,93,0.2) 1px, transparent 1px),
                linear-gradient(135deg, transparent 49%, rgba(26,31,46,0.03) 50%, transparent 51%)
              `,
              backgroundSize: '100px 100px, 80px 80px, 150px 150px'
            }}></div>

            {/* Dynamic elements */}
            <div className="absolute top-24 right-24 w-36 h-36 border border-teal/20 rotate-12 rounded-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
            <div className="absolute bottom-32 left-32 w-28 h-28 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-sm animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="text-center mb-20">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm border border-teal/20 shadow-lg mb-8">
                <div className="w-2 h-2 bg-teal rounded-full animate-pulse"></div>
                <span className="text-navy text-xs font-bold uppercase tracking-wider">
                  {homePageData?.blogSection?.title ? homePageData.blogSection.title.split('**')[0] : "Blog"}
                </span>
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>

              <div className="space-y-6">
                <h2
                  id="blog-heading"
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-navy font-display leading-tight"
                >
                  {homePageData?.blogSection?.title ? (
                    <>
                      {homePageData.blogSection.title.split('**')[0]}
                      {homePageData.blogSection.title.includes('**') && (
                        <span className="text-gradient-teal block lg:inline">
                          {homePageData.blogSection.title.split('**')[1]}
                        </span>
                      )}
                      {homePageData.blogSection.title.split('**')[2]}
                    </>
                  ) : (
                    <>
                      Güncel{" "}
                      <span className="text-gradient-teal block lg:inline">
                        Blog Yazıları
                      </span>
                    </>
                  )}
                </h2>
                
                <div className="flex items-center justify-center gap-6">
                  <div className="w-20 h-[3px] bg-gradient-to-r from-transparent via-teal/40 to-teal/60 rounded-full"></div>
                  <div className="w-4 h-4 bg-teal/40 rotate-45 rounded-sm"></div>
                  <div className="w-20 h-[3px] bg-gradient-to-l from-transparent via-teal/40 to-teal/60 rounded-full"></div>
                </div>
                
                <p className="text-lg text-slate max-w-3xl mx-auto leading-relaxed">
                  {homePageData?.blogSection?.description || "Psikoloji, kişisel gelişim ve mental sağlık konularında güncel yazılarımı okuyun"}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <AnimatedSection key={post.slug.current} delay={index * 0.1}>
                  <article className="group relative">
                    {/* Advanced hover glow */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-teal/20 to-gold/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                    
                    {/* Main card */}
                    <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/60 hover:border-teal/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full">
                      {/* Image */}
                      {post.mainImage && (
                        <div className="relative w-full h-48 lg:h-56 overflow-hidden">
                          <Image
                            src={urlFor(post.mainImage).width(600).height(400).url()}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
                          
                          {/* Reading time badge */}
                          {post.readingTime && (
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-teal/30 shadow-lg">
                              <span className="text-xs font-bold text-navy">{post.readingTime} dk</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 lg:p-8">
                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories.slice(0, 2).map((category, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-semibold border border-teal/20"
                              >
                                {category.title}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-xl lg:text-2xl font-bold text-navy font-display leading-tight mb-3 group-hover:text-teal transition-colors duration-300">
                          {post.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-slate text-sm lg:text-base leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta info */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate/20">
                          <div className="flex items-center gap-3">
                            {post.author?.image && (
                              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                <Image
                                  src={post.author.image}
                                  alt={post.author.name}
                                  fill
                                  className="object-cover"
                                  sizes="32px"
                                />
                              </div>
                            )}
                            {post.author && (
                              <span className="text-xs font-semibold text-slate">
                                {post.author.name}
                              </span>
                            )}
                          </div>
                          
                          <time className="text-xs text-slate/70">
                            {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </time>
                        </div>

                        {/* Read more link */}
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="absolute inset-0 z-10"
                          aria-label={`${post.title} yazısını oku`}
                        />
                      </div>

                      {/* Subtle geometric accent */}
                      <div className="absolute bottom-6 right-6 w-8 h-8 border-2 border-teal/20 rotate-45 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.4} className="text-center mt-12">
              <Link href="/blog">
                <Button size="lg" variant="primary" className="bg-gradient-to-r from-teal via-teal-light to-teal hover:from-teal-light hover:via-teal hover:to-teal-dark shadow-xl hover:shadow-2xl hover:shadow-teal/30 transition-all duration-300">
                  {homePageData?.blogSection?.buttonText || "Tüm Yazıları Görüntüle"}
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      

      {/* Comprehensive Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": "https://iremakkan.com/#organization",
            name: "İrem Akkan Psikolojik Danışmanlık",
            alternateName: "İrem Akkan Psikolog",
            url: "https://iremakkan.com",
            logo: "https://iremakkan.com/logo.png",
            image: "https://iremakkan.com/og-image.png",
            description: "Profesyonel psikolojik danışmanlık hizmeti. Bireysel terapi, çift danışmanlığı ve aile terapisi.",
            telephone: "+90-555-123-4567",
            email: "psk.dan.iremakkan@gmail.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Istanbul",
              addressCountry: "TR",
            },
            areaServed: {
              "@type": "Country",
              name: "Turkey",
            },
            availableLanguage: ["tr", "en"],
            priceRange: "$$",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Psikolojik Danışmanlık Hizmetleri",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Bireysel Terapi",
                    description: "Kişisel gelişim ve mental sağlık için bireysel psikoterapi seansları",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Çift Terapisi",
                    description: "İlişki sorunları ve iletişim problemleri için çift danışmanlığı",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Aile Danışmanlığı",
                    description: "Aile içi sorunlar ve ilişki dinamikleri için aile terapisi",
                  },
                },
              ],
            },
            founder: {
              "@type": "Person",
              name: "İrem Akkan",
              jobTitle: "Psikolojik Danışman",
              url: "https://iremakkan.com/hakkimda",
            },
            sameAs: [
              "https://twitter.com/iremakkan",
              "https://linkedin.com/in/iremakkan",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://iremakkan.com/#website",
            url: "https://iremakkan.com",
            name: "İrem Akkan Psikolojik Danışmanlık",
            description: "Profesyonel psikolojik danışmanlık ve terapi hizmetleri",
            publisher: {
              "@id": "https://iremakkan.com/#organization",
            },
            inLanguage: "tr-TR",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://iremakkan.com/#webpage",
            url: "https://iremakkan.com",
            name: "Ana Sayfa - İrem Akkan Psikolojik Danışman",
            isPartOf: {
              "@id": "https://iremakkan.com/#website",
            },
            about: {
              "@id": "https://iremakkan.com/#organization",
            },
            description: "Güvenli ve empatik psikolojik danışmanlık hizmeti. 8+ yıl deneyim ile bireysel, çift ve aile terapisi.",
            inLanguage: "tr-TR",
          }),
        }}
      />
    </>
  );
}
