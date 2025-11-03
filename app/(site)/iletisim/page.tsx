import { Metadata } from "next";
import ContactForm from "./ContactForm";
import { client } from "@/sanity/lib/client";

interface Settings {
  phoneNumber?: string;
  email?: string;
  officeAddress?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

interface ContactPageData {
  title?: string;
  subtitle?: string;
  heroDescription?: string;
  heroHighlight?: string;
  promiseCards?: Array<{
    icon?: string;
    title?: string;
    description?: string;
  }>;
  formTitle?: string;
  formSubtitle?: string;
  infoTitle?: string;
  infoSubtitle?: string;
  socialTitle?: string;
  socialSubtitle?: string;
  socialDescription?: string;
  ctaBadge?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  ctaButtonLink?: string;
  seoTitle?: string;
  seoDescription?: string;
}

async function getSettings(): Promise<Settings | null> {
  try {
    return await client.fetch<Settings>(
      `*[_type == "settings" && _id == "settings"][0]{
        phoneNumber,
        email,
        officeAddress,
        socialLinks
      }`
    );
  } catch (error) {
    console.error("Settings fetch error:", error);
    return null;
  }
}

async function getContactPageData(): Promise<ContactPageData | null> {
  try {
    return await client.fetch<ContactPageData>(
      `*[_type == "contactPage"][0]{
        title,
        subtitle,
        heroDescription,
        heroHighlight,
        promiseCards,
        formTitle,
        formSubtitle,
        infoTitle,
        infoSubtitle,
        socialTitle,
        socialSubtitle,
        socialDescription,
        ctaBadge,
        ctaTitle,
        ctaDescription,
        ctaButtonLabel,
        ctaButtonLink,
        seoTitle,
        seoDescription
      }`
    );
  } catch (error) {
    console.error("ContactPage data fetch error:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getContactPageData();
  
  return {
    title: pageData?.seoTitle || "İletişim - İrem Akkan",
    description: pageData?.seoDescription || "Bizimle iletişime geçin. Sorularınız için buradayız.",
    openGraph: {
      title: pageData?.seoTitle || "İletişim - İrem Akkan",
      description: pageData?.seoDescription || "Bizimle iletişime geçin. Sorularınız için buradayız.",
      type: "website",
    },
  };
}

const HighlightedText = ({ text }: { text: string | undefined }) => {
  if (!text) return null;
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-gradient-gold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

export default async function ContactPage() {
  const [settings, pageData] = await Promise.all([getSettings(), getContactPageData()]);

  // Varsayılan değerler
  const defaultPromiseCards = [
    { icon: "🔒", title: "Gizlilik Garantisi", description: "Tüm bilgileriniz güvende" },
    { icon: "⚡", title: "Hızlı Yanıt", description: "24 saat içinde dönüş" },
    { icon: "👤", title: "Kişiye Özel", description: "Size özel çözümler" }
  ];

  const promiseCards = pageData?.promiseCards && pageData.promiseCards.length > 0 
    ? pageData.promiseCards 
    : defaultPromiseCards;

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Ultra-Modern Background - Form Odaklı Geometriler */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory via-pearl to-stone">
        {/* İletişim sayfasına özel form-inspired pattern */}
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(197,165,114,0.2) 0%, transparent 25%),
            linear-gradient(-45deg, rgba(44,95,93,0.15) 0%, transparent 25%),
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(197,165,114,0.1) 40px, rgba(197,165,114,0.1) 42px)
          `,
        }}></div>

        {/* Form-inspired floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Envelope geometries for contact theme */}
          <div className="absolute top-24 left-24 w-40 h-28 border-2 border-gold/25 rounded-lg transform rotate-12 animate-pulse" style={{animationDuration: '7s'}}>
            <div className="absolute top-2 left-2 right-2 h-0.5 bg-gold/30"></div>
            <div className="absolute top-4 left-2 right-2 h-0.5 bg-gold/20"></div>
          </div>
          
          <div className="absolute bottom-32 right-32 w-32 h-24 bg-gradient-to-br from-teal/20 to-transparent rounded-2xl blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
          
          {/* Message bubble shapes */}
          <div className="absolute top-1/3 right-1/4 w-24 h-16 bg-gold/15 rounded-full transform rotate-45"></div>
          <div className="absolute bottom-1/3 left-1/4 w-20 h-12 bg-teal/20 rounded-full transform -rotate-12"></div>
          
          {/* Form field inspired lines */}
          <div className="absolute top-1/2 left-16 w-2 h-48 bg-gradient-to-b from-gold/30 to-transparent"></div>
          <div className="absolute top-1/4 right-20 w-2 h-32 bg-gradient-to-b from-teal/25 to-transparent"></div>
          
          {/* Contact particles */}
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-pulse ${
                i % 3 === 0 ? 'bg-gold/30' : i % 3 === 1 ? 'bg-teal/25' : 'bg-gold/20'
              }`}
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${3 + Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Ultra-Modern Hero Section - İletişim Odaklı */}
      <section
        aria-labelledby="contact-heading"
        className="relative py-32 overflow-hidden text-center"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          {/* Premium contact badge */}
          <div className="relative inline-block mb-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 to-teal/30 rounded-full blur-xl"></div>
            <div className="relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white/15 backdrop-blur-xl border border-gold/25 shadow-2xl">
              <svg className="w-6 h-6 text-gold animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <span className="text-navy font-bold uppercase tracking-[0.3em] text-sm">
                İletişim
              </span>
              <svg className="w-6 h-6 text-teal animate-pulse" fill="currentColor" viewBox="0 0 24 24" style={{animationDelay: '1s'}}>
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="space-y-10 mb-16">
            <h1
              id="contact-heading"
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-navy font-display leading-[0.9]"
            >
              <HighlightedText text={pageData?.title || "Bizimle **İletişime Geçin**"} />
            </h1>

            {pageData?.subtitle && (
              <p className="text-xl md:text-2xl text-navy/80 max-w-4xl mx-auto leading-relaxed font-light">
                {pageData.subtitle}
              </p>
            )}

            {/* Contact specific separator */}
            <div className="flex items-center justify-center gap-8">
              <div className="w-32 h-[3px] bg-gradient-to-r from-transparent to-gold rounded-full"></div>
              <div className="flex gap-4">
                <div className="w-3 h-3 bg-gold rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-teal/70 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              <div className="w-32 h-[3px] bg-gradient-to-l from-transparent to-teal rounded-full"></div>
            </div>

            {pageData?.heroDescription && (
              <p className="text-xl md:text-2xl text-navy/80 max-w-4xl mx-auto leading-relaxed font-light">
                {pageData.heroDescription}
                {pageData?.heroHighlight && (
                  <>
                    <br />
                    <span className="text-gold font-medium">
                      {pageData.heroHighlight}
                    </span>
                  </>
                )}
              </p>
            )}
          </div>

          {/* Contact promise cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {promiseCards.map((item, index) => (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-xl hover:shadow-gold/10 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-gold/10 to-teal/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
                <div className="relative text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="text-lg font-bold text-navy mb-2">{item.title}</div>
                  <div className="text-navy/60 text-sm">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Modern Contact Content - Form Odaklı Tasarım */}
      <section
        aria-labelledby="form-section"
        className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sol: Ultra-Modern Contact Form */}
          <div className="group relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/25 via-transparent to-teal/25 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
            
            <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl p-10 lg:p-12 shadow-2xl">
              {/* Form header with premium design */}
              <div className="relative mb-10">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-gold/30 to-teal/30 rounded-2xl rotate-45"></div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-gold to-gold-light rounded-2xl flex items-center justify-center shadow-xl shadow-gold/30">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h2 id="form-section" className="text-3xl font-bold text-navy font-display">
                      {pageData?.formTitle || "Mesaj Gönderin"}
                    </h2>
                    <p className="text-navy/60 text-sm mt-1">
                      {pageData?.formSubtitle || "Güvenli ve hızlı iletişim"}
                    </p>
                  </div>
                </div>

                {/* Form specific decorative line */}
                <div className="w-24 h-1 bg-gradient-to-r from-gold via-teal to-gold rounded-full mb-2"></div>
              </div>
              
              <ContactForm />

              {/* Form footer accent */}
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-teal/25 to-gold/25 rounded-2xl rotate-12"></div>
            </div>
          </div>

          {/* Sağ: Ultra-Modern Contact Info */}
          <div className="space-y-8">
            {/* İletişim Bilgileri Kartı */}
            <div className="group relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-teal/20 via-transparent to-gold/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
              
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-8 lg:p-10 shadow-2xl">
                {/* Info header with contact-specific geometry */}
                <div className="relative mb-8">
                  <div className="absolute -top-4 -right-4 w-12 h-12 border-2 border-teal/30 rounded-xl rotate-45"></div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal to-teal-light rounded-2xl flex items-center justify-center shadow-xl shadow-teal/20">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-navy font-display">
                        {pageData?.infoTitle || "İletişim Bilgileri"}
                      </h2>
                      <p className="text-navy/60 text-sm">
                        {pageData?.infoSubtitle || "Doğrudan ulaşın"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-20 h-1 bg-gradient-to-r from-teal to-teal-light rounded-full"></div>
                </div>

                {settings ? (
                  <div className="space-y-8">
                    {settings.phoneNumber && (
                      <InfoItem
                        icon="phone"
                        label="Telefon"
                        href={`tel:${settings.phoneNumber}`}
                        value={settings.phoneNumber}
                      />
                    )}
                    {settings.email && (
                      <InfoItem
                        icon="email"
                        label="E-posta"
                        href={`mailto:${settings.email}`}
                        value={settings.email}
                      />
                    )}
                    {settings.officeAddress && (
                      <InfoItem
                        icon="location"
                        label="Adres"
                        value={settings.officeAddress}
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gold animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <p className="text-navy/70 text-lg">
                      İletişim bilgileri yüklenemedi. Lütfen daha sonra tekrar deneyin.
                    </p>
                  </div>
                )}

                {/* Info card bottom accent */}
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-gold/20 to-teal/20 rounded-lg rotate-45"></div>
              </div>
            </div>

            {/* Ultra-Modern Social Media Card */}
            {settings?.socialLinks && (
              <div className="group relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-gold/15 via-transparent to-teal/15 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-8 lg:p-10 shadow-2xl">
                  {/* Social header with network-inspired geometry */}
                  <div className="relative mb-8">
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-gold/25 to-teal/25 rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-teal/30 to-gold/30 rounded-full"></div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-teal/20 backdrop-blur-sm border-2 border-gold/30 rounded-2xl flex items-center justify-center shadow-xl">
                        <svg className="w-7 h-7 text-gold" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-navy font-display">
                          {pageData?.socialTitle || "Sosyal Medya"}
                        </h2>
                        <p className="text-navy/60 text-sm">
                          {pageData?.socialSubtitle || "Bizi takip edin"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-20 h-1 bg-gradient-to-r from-gold via-teal to-gold rounded-full"></div>
                  </div>

                  <p className="text-navy/70 mb-8 leading-relaxed">
                    {pageData?.socialDescription || "Sosyal medya hesaplarımızdan bizi takip edin ve güncellemeleri kaçırmayın."}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <SocialLinks social={settings.socialLinks} />
                  </div>

                  {/* Social card decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-12 bg-gradient-to-b from-gold/30 to-transparent rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-3 bg-gradient-to-r from-teal/30 to-transparent rounded-full"></div>
                </div>
              </div>
            )}

            {/* Ultra-Modern CTA Card - Randevu Odaklı */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-navy/20 via-gold/20 to-teal/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
              
              <div className="relative bg-gradient-to-br from-navy via-navy-light to-charcoal rounded-3xl p-10 shadow-2xl text-center">
                {/* Premium appointment badge */}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gold/20 backdrop-blur-xl border border-gold/30 mb-6">
                  <svg className="w-5 h-5 text-gold animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white font-bold uppercase tracking-wide text-sm">
                    {pageData?.ctaBadge || "Ücretsiz Ön Görüşme"}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4 font-display">
                  <HighlightedText text={pageData?.ctaTitle || "Randevu Almaya **Hazır mısınız?**"} />
                </h3>
                
                <p className="text-white/80 mb-8 leading-relaxed">
                  {pageData?.ctaDescription || "İlk görüşmemiz tamamen ücretsiz. Size en uygun çözümü birlikte bulalım."}
                </p>
                <a
                  href={pageData?.ctaButtonLink || "tel:+905551234567"}
                  className="group/btn relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold shadow-xl hover:shadow-gold/40 transition-all duration-300 hover:scale-105 text-white font-bold text-lg"
                >
                  <svg className="w-6 h-6 transition-transform duration-300 group-hover/btn:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{pageData?.ctaButtonLabel || "Hemen Arayın"}</span>
                </a>

                {/* CTA decorative elements */}
                <div className="absolute top-6 left-6 w-8 h-8 bg-gold/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 right-6 w-6 h-6 bg-teal/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* 🧱 Small Reusable Subcomponents */
function InfoItem({
  icon,
  label,
  href,
  value,
}: {
  icon: "phone" | "email" | "location";
  label: string;
  href?: string;
  value: string;
}) {
  const icons = {
    phone: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0120 15v4a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
    email: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    location: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ),
  };
  
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 bg-gradient-to-br from-gold/20 to-teal/20 rounded-xl flex items-center justify-center">
<svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
{icons[icon]}
</svg>
</div>
<div>
<div className="text-navy font-bold text-lg">{label}</div>
{href ? (
<a href={href} className="text-teal underline break-all">{value}</a>
) : (
<div className="text-navy/80 break-all">{value}</div>
)}
</div>
</div>
);
}
function SocialLinks({ social }: { social: Settings["socialLinks"] }) {
  if (!social) return null;

  const socialPlatforms = [
    {
      name: "Instagram",
      url: social.instagram,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      gradient: "from-pink-500 to-purple-600",
    },
    {
      name: "LinkedIn",
      url: social.linkedin,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
        </svg>
      ),
      gradient: "from-blue-600 to-blue-700",
    },
    {
      name: "Twitter",
      url: social.twitter,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      gradient: "from-sky-400 to-blue-500",
    },
    {
      name: "Facebook",
      url: social.facebook,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      gradient: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <>
      {socialPlatforms.map((platform) =>
        platform.url ? (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/social relative"
            aria-label={`${platform.name} sayfamızı ziyaret edin`}
          >
            <div
              className="absolute -inset-2 bg-gradient-to-br opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 rounded-2xl blur-lg"
              style={{
                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
              }}
            ></div>
            <div
              className={`relative w-14 h-14 bg-gradient-to-br ${platform.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover/social:scale-110`}
            >
              {platform.icon}
            </div>
          </a>
        ) : null
      )}
    </>
  );
}
