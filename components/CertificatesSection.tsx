// components/CertificatesSection.tsx

"use client"; // Bu bileşenin bir istemci bileşeni olduğunu belirtir

import { useRef } from 'react';
import Image from 'next/image';

// Sanity ve TypeScript tiplerini ana sayfadan alıyoruz
// Kendi projenizdeki doğru yolları belirttiğinizden emin olun
import { urlFor } from '@/sanity/lib/image'; 

interface SanityImage {
  asset?: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  caption?: string;
}

interface CertificatesSectionProps {
  certificateImages: SanityImage[];
  labels: {
    certificatesButton?: string;
  };
}

const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificateImages, labels }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      // Her tıklamada container'ın görünen genişliğinin %90'ı kadar kaydır
      const scrollAmount = current.offsetWidth * 0.9;

      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Eğer sertifika yoksa bu bölümü hiç gösterme
  if (!certificateImages || certificateImages.length === 0) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 to-teal/20 rounded-2xl blur-lg"></div>
          <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-gold/25 shadow-xl">
            <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-navy font-bold uppercase tracking-wide text-sm">
              {labels.certificatesButton}
            </span>
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-navy font-display">
          Profesyonel <span className="text-gradient-gold">Yetkinlikler</span>
        </h2>
      </div>

      <div className="relative">
        {/* Sol Ok Butonu */}
        <button
          onClick={() => scroll('left')}
          aria-label="Önceki sertifikaları gör"
          className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-20 bg-white/50 hover:bg-white/90 backdrop-blur-sm rounded-full p-2.5 transition-all duration-300 shadow-lg hidden md:flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 snap-x snap-mandatory scroll-smooth scrollbar-hide py-4 -mx-6 px-6"
        >
          {certificateImages.map((cert, index) => (
            <div
              key={index}
              className="group relative flex-shrink-0 snap-center w-[90%] md:w-1/2 lg:w-1/3"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-gold/20 via-transparent to-teal/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
              
              <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl overflow-hidden shadow-xl hover:shadow-gold/20 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1 h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent z-10"></div>
                  <Image
                    src={urlFor(cert).width(600).height(400).url()}
                    alt={cert.alt || "Sertifika"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <div className="p-2 rounded-full bg-gold/90 backdrop-blur-sm shadow-xl">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {cert.caption && (
                  <div className="p-6 flex-grow flex items-center justify-center">
                    <p className="text-navy font-medium leading-relaxed text-center">
                      {cert.caption}
                    </p>
                  </div>
                )}

                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-teal/30 to-gold/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Sağ Ok Butonu */}
        <button
          onClick={() => scroll('right')}
          aria-label="Sonraki sertifikaları gör"
          className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-20 bg-white/50 hover:bg-white/90 backdrop-blur-sm rounded-full p-2.5 transition-all duration-300 shadow-lg hidden md:flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CertificatesSection;