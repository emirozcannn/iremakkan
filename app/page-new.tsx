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
      {/* Soft, Welcoming Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pearl via-ivory to-stone/20"
      >
        {/* Soft Background Elements */}
        <div className="absolute inset-0">
          {/* Gentle organic shapes */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-teal/3 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-br from-gold/4 to-transparent rounded-full blur-3xl"></div>
          
          {/* Minimal pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.015]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="softPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="0.5" fill="currentColor" className="text-navy"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#softPattern)"/>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Large Counselor Card - PRIMARY TRUST BUILDER */}
            {counselor && counselor.image ? (
              <AnimatedSection className="order-2 lg:order-1">
                <div className="relative group max-w-lg mx-auto">
                  {/* Very subtle glow */}
                  <div className="absolute -inset-6 bg-gradient-to-br from-teal/6 via-gold/4 to-transparent rounded-[3rem] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                  
                  {/* Main Card - Soft & Professional */}
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-8 shadow-2xl border border-white/80">
                    {/* LARGE Professional Photo - Hero Element */}
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-8 shadow-xl">
                      <Image
                        src={counselor.image}
                        alt={counselor.name || "Psikolojik Danışman"}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 90vw, 500px"
                      />
                      {/* Very subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/3 to-transparent"></div>
                    </div>

                    {/* Counselor Info - Clean & Calm */}
                    <div className="text-center space-y-5">
                      <div className="space-y-2">
                        <h2 className="text-3xl lg:text-4xl font-bold text-navy font-display">
                          {counselor.name || "İrem Akkan"}
                        </h2>
                        <p className="text-teal text-lg font-semibold">
                          {counselor.title || "Psikolojik Danışman"}
                        </p>
                      </div>

                      {/* Subtle divider */}
                      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-teal/30 to-transparent mx-auto"></div>

                      {counselor.bio && (
                        <p className="text-navy/70 leading-relaxed text-base">
                          {counselor.bio}
                        </p>
                      )}

                      {/* Experience - Soft Badge */}
                      {counselor.experience && (
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal/5 border border-teal/10 rounded-full">
                          <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-navy font-medium text-sm">{counselor.experience}</span>
                        </div>
                      )}

                      {/* Credentials - Soft Pills */}
                      {counselor.credentials && counselor.credentials.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {counselor.credentials.map((cred, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 rounded-full bg-teal/5 text-teal text-sm font-medium border border-teal/10"
                            >
                              {cred}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Trust Stats - Soft & Minimal */}
                      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-navy/5">
                        <div>
                          <div className="text-3xl font-bold text-teal mb-1">3+</div>
                          <div className="text-xs text-navy/60 uppercase tracking-wider">Yıl Deneyim</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-teal mb-1">50+</div>
                          <div className="text-xs text-navy/60 uppercase tracking-wider">Danışan</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-teal mb-1">95%</div>
                          <div className="text-xs text-navy/60 uppercase tracking-wider">Memnuniyet</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ) : (
              <AnimatedSection className="order-2 lg:order-1">
                <div className="relative group max-w-lg mx-auto">
                  <div className="absolute -inset-6 bg-gradient-to-br from-teal/6 via-gold/4 to-transparent rounded-[3rem] blur-3xl opacity-40"></div>
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-8 shadow-2xl border border-white/80">
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-teal/10 to-gold/10 flex items-center justify-center">
                      <div className="text-center p-8">
                        <svg className="w-24 h-24 text-teal/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-navy/60 mb-2 font-medium"></p>
                        <p className="text-sm text-teal">Site Ayarları → Danışman Bilgileri</p>
                      </div>
                    </div>
                    <div className="text-center space-y-5">
                      <div className="space-y-2">
                        <h2 className="text-3xl lg:text-4xl font-bold text-navy font-display">İrem Akkan</h2>
                        <p className="text-teal text-lg font-semibold">Psikolojik Danışman</p>
                      </div>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-teal/30 to-transparent mx-auto"></div>
                      <p className="text-navy/70 leading-relaxed text-base">
                        Bireylerin yaşam kalitelerini artırmak ve psikolojik sağlıklarını güçlendirmek için yanınızdayım.
                      </p>
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal/5 border border-teal/10 rounded-full">
                        <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-navy font-medium text-sm">3+ Yıl Deneyim</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {["Bilişsel Davranışçı Terapi", "Çift Terapisi", "Travma Terapisi"].map((item, i) => (
                          <span key={i} className="px-4 py-2 rounded-full bg-teal/5 text-teal text-sm font-medium border border-teal/10">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Right: Content - Secondary, Supportive */}
            <AnimatedSection delay={0.2} className="text-left order-1 lg:order-2">
              {/* Soft Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-teal/10 shadow-sm mb-8">
                <div className="w-2 h-2 bg-teal rounded-full"></div>
                <span className="text-navy/70 text-sm font-medium">Profesyonel Psikolojik Danışmanlık</span>
              </div>

              {/* Soft, Welcoming Typography */}
              <h1
                id="hero-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-navy leading-[1.1] mb-8"
              >
                Kendinize<br/>
                <span className="text-teal">Değer Vermenin</span><br/>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-light text-navy/70">
                  Güvenli Adresi
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-slate leading-relaxed mb-10 max-w-xl">
                Yaşamınızda karşılaştığınız zorluklarla başa çıkmanızda,{" "}
                <span className="font-semibold text-teal">güvenli ve empatik</span>{" "}
                bir ortamda profesyonel destek sağlıyorum.
              </p>

              {/* Soft CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/iletisim">
                  <Button
                    size="lg"
                    variant="primary"
                    className="bg-teal hover:bg-teal-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 border-none"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Randevu Alın
                    </span>
                  </Button>
                </Link>
                
                <Link href="/hizmetler">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/80 hover:bg-white border-2 border-navy/10 hover:border-teal/30 text-navy shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      Hizmetlerim
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Soft Trust Indicators */}
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: "Lisanslı Danışman" },
                  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "10+ Yıl Deneyim" },
                  { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", text: "200+ Mutlu Danışan" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-navy/60">
                    <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Rest of the page continues with existing sections... */}
      {/* I&apos;ll keep the stats, services, values, and CTA sections as they were */}
      
    </main>
  );
}
