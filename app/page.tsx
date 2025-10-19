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
  const settings = await getSettings();
  const counselor = settings?.counselor;

  return (
    <main className="bg-ivory overflow-hidden">
      {/* Soft, Calming Hero Section - Trust Through Visibility */}
      <section
        aria-labelledby="hero-heading"
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pearl via-ivory to-stone/10"
      >
        {/* Soft Background - Calming & Professional */}
        <div className="absolute inset-0">
          {/* Gentle organic blurs */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-teal/[0.02] to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-br from-gold/[0.025] to-transparent rounded-full blur-3xl"></div>
          
          {/* Minimal texture */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.012]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="calmPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="0.4" fill="currentColor" className="text-navy"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#calmPattern)"/>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: LARGE Counselor Card - PRIMARY TRUST ELEMENT */}
            {counselor && counselor.image ? (
              <AnimatedSection className="order-2 lg:order-1">
                <div className="relative group max-w-xl mx-auto">
                  {/* Very subtle, calming glow */}
                  <div className="absolute -inset-8 bg-gradient-to-br from-teal/[0.04] via-gold/[0.03] to-transparent rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
                  
                  {/* Main Card - Soft, Professional, Welcoming */}
                  <div className="relative bg-white/98 backdrop-blur-sm rounded-[2.5rem] p-10 lg:p-12 shadow-xl border border-white/90">
                    {/* EXTRA LARGE Professional Photo - Hero Element */}
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-8 shadow-2xl">
                      <Image
                        src={counselor.image}
                        alt={counselor.name || "Psikolojik Danışman"}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 95vw, 550px"
                      />
                      {/* Minimal overlay for warmth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/[0.02] to-transparent"></div>
                    </div>

                    {/* Counselor Info - Clean, Calm, Professional */}
                    <div className="text-center space-y-5">
                      <div className="space-y-2">
                        <h2 className="text-4xl lg:text-5xl font-bold text-navy font-display leading-tight">
                          {counselor.name || "İrem Akkan"}
                        </h2>
                        <p className="text-teal text-xl font-semibold">
                          {counselor.title || "Psikolojik Danışman"}
                        </p>
                      </div>

                      {/* Subtle divider */}
                      <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-teal/20 to-transparent mx-auto"></div>

                      {counselor.bio && (
                        <p className="text-navy/75 leading-relaxed text-lg">
                          {counselor.bio}
                        </p>
                      )}

                      {/* Experience - Soft Badge */}
                      {counselor.experience && (
                        <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-teal/[0.06] border border-teal/10 rounded-full">
                          <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-navy font-semibold text-base">{counselor.experience}</span>
                        </div>
                      )}

                      {/* Credentials - Soft Pills */}
                      {counselor.credentials && counselor.credentials.length > 0 && (
                        <div className="flex flex-wrap gap-2.5 justify-center">
                          {counselor.credentials.map((cred, i) => (
                            <span
                              key={i}
                              className="px-5 py-2.5 rounded-full bg-teal/[0.06] text-teal text-sm font-medium border border-teal/10"
                            >
                              {cred}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Trust Stats - Minimal & Elegant */}
                      <div className="grid grid-cols-3 gap-8 pt-8 border-t border-navy/[0.04]">
                        <div>
                          <div className="text-4xl font-bold text-teal mb-1.5">3+</div>
                          <div className="text-xs text-navy/60 uppercase tracking-widest font-medium">Yıl</div>
                        </div>
                        <div>
                          <div className="text-4xl font-bold text-teal mb-1.5">50+</div>
                          <div className="text-xs text-navy/60 uppercase tracking-widest font-medium">Danışan</div>
                        </div>
                        <div>
                          <div className="text-4xl font-bold text-teal mb-1.5">95%</div>
                          <div className="text-xs text-navy/60 uppercase tracking-widest font-medium">Memnun</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ) : (
              <AnimatedSection className="order-2 lg:order-1">
                <div className="relative group max-w-xl mx-auto">
                  <div className="absolute -inset-8 bg-gradient-to-br from-teal/[0.04] via-gold/[0.03] to-transparent rounded-[3rem] blur-3xl opacity-50"></div>
                  <div className="relative bg-white/98 backdrop-blur-sm rounded-[2.5rem] p-10 lg:p-12 shadow-xl border border-white/90">
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-teal/[0.08] to-gold/[0.08] flex items-center justify-center">
                      <div className="text-center p-8">
                        <svg className="w-32 h-32 text-teal/20 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-navy/60 mb-3 font-medium text-lg">Sanity Studio&apos;da fotoğraf ekleyin</p>
                        <p className="text-sm text-teal font-medium">Site Ayarları → Danışman Bilgileri</p>
                      </div>
                    </div>
                    <div className="text-center space-y-5">
                      <div className="space-y-2">
                        <h2 className="text-4xl lg:text-5xl font-bold text-navy font-display leading-tight">İrem Akkan</h2>
                        <p className="text-teal text-xl font-semibold">Psikolojik Danışman</p>
                      </div>
                      <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-teal/20 to-transparent mx-auto"></div>
                      <p className="text-navy/75 leading-relaxed text-lg">
                        Bireylerin yaşam kalitelerini artırmak ve psikolojik sağlıklarını güçlendirmek için yanınızdayım.
                      </p>
                      <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-teal/[0.06] border border-teal/10 rounded-full">
                        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-navy font-semibold text-base">10+ Yıl Deneyim</span>
                      </div>
                      <div className="flex flex-wrap gap-2.5 justify-center">
                        {["Bilişsel Davranışçı Terapi", "Çift Terapisi", "Travma Terapisi"].map((item, i) => (
                          <span key={i} className="px-5 py-2.5 rounded-full bg-teal/[0.06] text-teal text-sm font-medium border border-teal/10">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Right: Headline & CTA - Soft, Calming Copy */}
            <AnimatedSection className="text-center lg:text-left order-1 lg:order-2 space-y-8">
              {/* Soft Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-teal/[0.06] backdrop-blur-sm border border-teal/10 shadow-sm">
                <div className="w-2 h-2 bg-teal rounded-full animate-pulse"></div>
                <span className="text-navy text-sm font-semibold tracking-wide">
                  Psikolojik Destek
                </span>
              </div>

              <div className="space-y-6">
                <h1
                  id="hero-heading"
                  className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-navy leading-[1.15] tracking-tight"
                >
                  <span className="block">Kendinize</span>
                  <span className="block bg-gradient-to-r from-teal to-teal/70 bg-clip-text text-transparent">
                    Yapacağınız En
                  </span>
                  <span className="block text-3xl sm:text-4xl lg:text-5xl text-navy/80 font-light mt-3">
                    Değerli Yatırım

                  </span>
                </h1>

                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-teal/30 to-transparent mx-auto lg:mx-0"></div>
              </div>

             <p className="text-lg lg:text-xl text-navy/75 leading-relaxed max-w-2xl mx-auto lg:mx-0">
  Yaşam yolculuğunuzda karşılaştığınız zorlukları{" "}
  <span className="font-semibold text-teal">birlikte aşalım</span>. 
  Bireysel, çift ve aile danışmanlığı hizmetlerimle,{" "}
  <span className="font-semibold text-gold">güvenli ve yargısız</span> bir ortamda:
</p>

<ul className="text-lg lg:text-xl text-navy/75 leading-relaxed max-w-2xl mx-auto lg:mx-0 mt-4 space-y-3">
  <li className="flex items-start">
    <span className="text-teal mr-3 mt-1">•</span>
    <span><strong className="text-navy">İçsel farkındalığınızı</strong> geliştirmenize</span>
  </li>
  <li className="flex items-start">
    <span className="text-teal mr-3 mt-1">•</span>
    <span><strong className="text-navy">Duygusal dayanıklılığınızı</strong> güçlendirmenize</span>
  </li>
  <li className="flex items-start">
    <span className="text-teal mr-3 mt-1">•</span>
    <span><strong className="text-navy">İlişkilerinizde denge</strong> kurmanıza</span>
  </li>
  <li className="flex items-start">
    <span className="text-teal mr-3 mt-1">•</span>
    <span><strong className="text-navy">Potansiyelinizi keşfetmenize</strong> yardımcı oluyorum.</span>
  </li>
</ul>

<p className="text-lg lg:text-xl text-navy/75 leading-relaxed max-w-2xl mx-auto lg:mx-0 mt-6 font-semibold italic">
  Değişim için ilk adımı birlikte atalım.
</p>

              {/* Soft CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link href="/iletisim" className="group relative">
                  <Button
                    aria-label="Randevu alın"
                    size="lg"
                    variant="primary"
                    className="bg-teal hover:bg-teal/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Randevu Alın
                    </span>
                  </Button>
                </Link>
                
                <Link href="/hizmetler" className="group relative">
                  <Button
                    aria-label="Hizmetleri keşfedin"
                    size="lg"
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-teal/20 hover:border-teal/40 text-navy shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Hizmetlerimi Keşfedin
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Soft Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 pt-4">
                {[
                  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Güvenli" },
                  { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Bilimsel" },
                  { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "Empatik" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-4 bg-white/60 backdrop-blur-sm border border-teal/10 rounded-2xl hover:bg-white/80 transition-all duration-300">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <span className="text-navy/80 text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Simple Stats Section */}
  <section
    aria-labelledby="stats-heading"
    className="py-24 relative bg-ivory"
  >
    <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
      <div className="space-y-8 mb-12">
        <h2
          id="stats-heading"
          className="text-4xl md:text-5xl font-bold text-navy font-display"
        >
          Profesyonel Deneyim
        </h2>
        
        <div className="w-20 h-1 bg-gradient-to-r from-gold to-teal mx-auto rounded-full"></div>
        
        <p className="text-lg text-slate max-w-2xl mx-auto leading-relaxed">
          Psikolojik danışmanlık alanındaki deneyimim ve uzmanlığım ile yanınızdayım
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {[
          { 
            end: 3, 
            suffix: "+", 
            label: "Yıllık Deneyim", 
            description: "Psikolojik danışmanlık"
          },
          { 
            end: 3, 
            suffix: "+", 
            label: "Uzmanlık Alanı", 
            description: "Farklı terapi yöntemleri"
          },
          { 
            end: 100, 
            suffix: "+", 
            label: "Tamamlanan Seans", 
            description: "Bireysel ve çift terapileri"
          },
        ].map((stat, i) => (
          <div key={i} className="group">
            <div className="bg-white rounded-2xl p-6 border border-stone hover:border-gold/50 transition-all duration-300 hover:shadow-lg">
              {/* Counter */}
              <div className="mb-3">
                <StatsCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  label=""
                  className="text-4xl font-bold text-navy mb-1"
                />
              </div>

              {/* Label */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-navy">
                  {stat.label}
                </p>
                <p className="text-xs text-slate leading-tight">
                  {stat.description}
                </p>
              </div>
              
              {/* Simple accent line */}
              <div className="w-8 h-0.5 bg-gold rounded-full mt-3 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Simple CTA */}
      <div className="mt-12">
        <p className="text-slate text-sm max-w-xl mx-auto">
          Her danışan özeldir. Bireysel ihtiyaçlarınıza uygun, 
          kişiye özel terapi yöntemleriyle çalışıyorum.
        </p>
      </div>
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
                    Hizmetlerim
                  </span>
                  <div className="w-3 h-3 bg-teal-light rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>

              <div className="space-y-8">
                <h2
                  id="services-heading"
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-display leading-tight"
                >
                  Size Özel{" "}
                  <span className="text-gradient-gold block lg:inline">
                    Profesyonel Çözümler
                  </span>
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
                  Her bireyin ihtiyaçları benzersizdir. Sizin için özel olarak tasarlanmış danışmanlık hizmetleri sunuyorum.
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
                  Tüm Hizmetleri Görüntüle
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Ultra-Modern Value Proposition */}
      <section className="py-32 relative overflow-hidden">
        {/* Sophisticated background system */}
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-pearl to-stone">
          {/* Advanced geometric overlay */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(197,165,114,0.4) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(44,95,93,0.3) 1px, transparent 1px),
              linear-gradient(45deg, transparent 49%, rgba(26,31,46,0.05) 50%, transparent 51%)
            `,
            backgroundSize: '80px 80px, 60px 60px, 120px 120px'
          }}></div>

          {/* Dynamic elements */}
          <div className="absolute top-20 left-20 w-40 h-40 border border-navy/10 rotate-45 rounded-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-gold/15 to-transparent rounded-full blur-sm animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-3 h-16 bg-gradient-to-b from-teal/20 to-transparent rotate-12"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm border border-gold/20 shadow-lg mb-8">
              <div className="w-2 h-2 bg-navy rounded-full animate-pulse"></div>
              <span className="text-navy text-xs font-bold uppercase tracking-wider">Neden ?</span>
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-navy font-display leading-tight">
                Neden <span className="text-gradient-gold block lg:inline">İrem AKKAN</span>
              </h2>
              
              <div className="flex items-center justify-center gap-6">
                <div className="w-20 h-[3px] bg-gradient-to-r from-transparent via-navy/40 to-navy/60 rounded-full"></div>
                <div className="w-4 h-4 bg-gold/40 rotate-45 rounded-sm"></div>
                <div className="w-20 h-[3px] bg-gradient-to-l from-transparent via-navy/40 to-navy/60 rounded-full"></div>
              </div>
              
              <p className="text-lg text-slate max-w-3xl mx-auto leading-relaxed">
                Psikolojik danışmanlık sürecinde size sunduğum değerler
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Gizlilik ve Güven",
                desc: "Tüm görüşmeleriniz tamamen gizlidir. Güvenli bir ortamda kendinizi özgürce ifade edebilirsiniz.",
                gradient: "from-gold/20 to-gold/40",
                accent: "bg-gold"
              },
              {
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                title: "Kanıta Dayalı Yöntemler",
                desc: "Bilimsel araştırmalarla desteklenen, güncel psikolojik yaklaşımlar kullanıyorum.",
                gradient: "from-teal/20 to-teal/40",
                accent: "bg-teal"
              },
              {
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                title: "Empatik Yaklaşım",
                desc: "Sizi yargılamadan dinliyor, anlamaya çalışıyor ve birlikte çözüm yolları buluyoruz.",
                gradient: "from-navy/20 to-navy/40",
                accent: "bg-navy"
              }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="group relative">
                  {/* Advanced hover glow */}
                  <div className={`absolute -inset-3 bg-gradient-to-r ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`}></div>
                  
                  {/* Main card */}
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 border border-white/60 hover:border-gold/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full">
                    {/* Icon with enhanced styling */}
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gold/20`}>
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                      </div>
                      {/* Floating accent */}
                      <div className={`absolute -top-2 -right-2 w-6 h-6 ${item.accent} rounded-full border-3 border-white animate-pulse shadow-lg`}></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl lg:text-3xl font-bold text-navy font-display leading-tight">{item.title}</h3>
                      
                      {/* Decorative line */}
                      <div className="w-16 h-[3px] bg-gradient-to-r from-gold to-gold/30 rounded-full"></div>
                      
                      <p className="text-slate text-base lg:text-lg leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Subtle geometric accent */}
                    <div className="absolute bottom-6 right-6 w-8 h-8 border-2 border-gold/20 rotate-45 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Modern Final CTA */}
      <section className="py-32 lg:py-40 relative overflow-hidden bg-gradient-to-br from-pearl via-ivory to-white">
        {/* Soft, minimal background */}
        <div className="absolute inset-0">
          {/* Gentle organic blurs */}
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-teal/[0.03] to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-br from-gold/[0.025] to-transparent rounded-full blur-3xl"></div>
          
          {/* Minimal texture */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.015]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="ctaPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="0.4" fill="currentColor" className="text-teal"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ctaPattern)"/>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <AnimatedSection>
            {/* Soft badge */}
            <div className="relative inline-block mb-10">
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-teal/[0.06] backdrop-blur-sm border border-teal/10 shadow-sm">
                <div className="w-2.5 h-2.5 bg-teal rounded-full animate-pulse"></div>
                <span className="text-navy text-sm font-semibold tracking-widest uppercase">
                  Başlayalım
                </span>
              </div>
            </div>

            <div className="space-y-8 mb-14">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-navy font-display leading-[1.1]">
                İlk Adımı Atmaya{" "}
                <span className="bg-gradient-to-r from-teal to-teal/70 bg-clip-text text-transparent block lg:inline mt-2 lg:mt-0">
                  Hazır mısınız?
                </span>
              </h2>

              {/* Subtle separator */}
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-teal/20 to-transparent mx-auto"></div>

              <p className="text-xl md:text-2xl text-navy/70 max-w-3xl mx-auto leading-relaxed">
                Değişim için en iyi zaman şimdi. Kendinize yatırım yapın, daha mutlu ve dengeli bir yaşam için ilk adımı birlikte atalım.
              </p>
            </div>

            {/* Soft, modern CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/iletisim" className="group w-full sm:w-auto">
                <Button 
                  size="xl" 
                  variant="primary" 
                  className="w-full sm:w-auto bg-teal hover:bg-teal/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] px-10 py-5 text-lg font-semibold rounded-2xl"
                >
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Hemen Randevu Alın
                  </span>
                </Button>
              </Link>
              
              <Link href="/hakkimda" className="group w-full sm:w-auto">
                <Button 
                  size="xl" 
                  variant="outline" 
                  className="w-full sm:w-auto bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-teal/20 hover:border-teal/40 text-navy shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] px-10 py-5 text-lg font-semibold rounded-2xl"
                >
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Beni Tanıyın
                  </span>
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

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
            email: "info@iremakkan.com",
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
    </main>
  );
}
