"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface QuickActionsProps {
  post: {
    title: string;
    excerpt?: string;
  };
  readingTime: number;
}

export function QuickActions({ post, readingTime }: QuickActionsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const articleContent = document.getElementById("article-content");
      if (!articleContent) return;

      const articleRect = articleContent.getBoundingClientRect();
      const articleTop = articleRect.top + window.scrollY;
      const articleHeight = articleRect.height;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Yazının başlangıcından itibaren hesapla
      const scrolledPastArticleStart = Math.max(0, scrollTop - articleTop);
      const maxScrollableHeight = articleHeight - windowHeight;
      
      if (maxScrollableHeight > 0) {
        const progress = (scrolledPastArticleStart / maxScrollableHeight) * 100;
        setScrollProgress(Math.min(Math.max(0, progress), 100));
      } else {
        setScrollProgress(0);
      }
    };

    handleScroll(); // Initial calculation
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.title,
          url: window.location.href,
        });
      } catch {
        // Kullanıcı paylaşımı iptal etti
        console.log("Share cancelled");
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Quick Actions */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/60">
        <h3 className="text-lg font-bold text-navy mb-4">Hızlı İşlemler</h3>
        <div className="space-y-3">
          <button
            onClick={handlePrint}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/50 hover:bg-white/80 rounded-xl border border-white/50 hover:border-gold/30 transition-all duration-300 text-left group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-gold/20 to-gold-light/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-navy font-semibold text-sm">Yazdır</div>
              <div className="text-navy/60 text-xs">PDF olarak kaydet</div>
            </div>
          </button>

          <button
            onClick={handleShare}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/50 hover:bg-white/80 rounded-xl border border-white/50 hover:border-gold/30 transition-all duration-300 text-left group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-teal/20 to-teal-light/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-navy font-semibold text-sm">Paylaş</div>
              <div className="text-navy/60 text-xs">Bu yazıyı paylaş</div>
            </div>
          </button>

          <Link href="/blog" className="w-full flex items-center gap-3 px-4 py-3 bg-white/50 hover:bg-white/80 rounded-xl border border-white/50 hover:border-gold/30 transition-all duration-300 text-left group">
            <div className="w-10 h-10 bg-gradient-to-br from-navy/20 to-navy/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-navy font-semibold text-sm">Tüm Yazılar</div>
              <div className="text-navy/60 text-xs">Diğer içeriklere göz at</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Reading Progress */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/60">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-navy">Okuma İlerlemen</h3>
          <span className="text-xs text-navy/60">{readingTime} dk</span>
        </div>
        <div className="w-full h-2 bg-navy/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
        <p className="text-xs text-navy/60 mt-2">
          {scrollProgress < 10
            ? "Okumaya başla"
            : scrollProgress < 90
            ? `%${Math.round(scrollProgress)} tamamlandı`
            : "Neredeyse bitti!"}
        </p>
      </div>

      {/* Scroll to Top Button */}
      {scrollProgress > 20 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-white/80 backdrop-blur-md border border-white/60 hover:border-gold/50 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-xl z-50"
          aria-label="Yukarı çık"
        >
          <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
}