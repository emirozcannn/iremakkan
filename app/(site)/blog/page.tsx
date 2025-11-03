import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";

// --- INTERFACE'LER (TİP TANIMLARI) ---
// Mevcut interface'lerinizde bir değişiklik yok.
interface SanitySlug {
  current: string;
}
interface SanityImage {
  asset?: { _ref: string; _type: string; };
  alt?: string;
}
interface Category {
  title: string;
  slug: SanitySlug;
}
interface Post {
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImage;
  publishedAt: string;
  excerpt: string;
  categories?: Category[];
  readingTime?: number; // Okuma süresini de ekleyelim
}

// YENİ: blogPage şemasından gelecek veri için tip tanımı.
interface BlogPageData {
  heroTitle?: string;
  heroDescription?: string;
  features?: {
    icon: string;
    title: string;
    desc: string;
  }[];
  categorySectionTitle?: string;
  seoTitle?: string;
  seoDescription?: string;
}

// --- VERİ ÇEKME FONKSİYONLARI ---

// getPosts fonksiyonu aynı, sadece okuma süresini de çekelim.
async function getPosts(category?: string): Promise<Post[]> {
  try {
    const query = category
      ? `*[_type == "post" && references(*[_type == "category" && slug.current == $category]._id)] | order(publishedAt desc){
          title, slug, mainImage, publishedAt, readingTime,
          "excerpt": coalesce(excerpt, array::join(string::split(pt::text(body), "")[0...150], "") + "..."),
          categories[]->{title, slug}
        }`
      : `*[_type == "post"] | order(publishedAt desc){
          title, slug, mainImage, publishedAt, readingTime,
          "excerpt": coalesce(excerpt, array::join(string::split(pt::text(body), "")[0...150], "") + "..."),
          categories[]->{title, slug}
        }`;
    const posts = await client.fetch<Post[]>(query, { category });
    return posts;
  } catch (error) {
    console.error("Posts fetch error:", error);
    return [];
  }
}

// getCategories fonksiyonunda değişiklik yok.
async function getCategories(): Promise<Category[]> {
  try {
    const categories = await client.fetch<Category[]>(`*[_type == "category"] | order(title asc){ title, slug }`);
    return categories;
  } catch (error) {
    console.error("Categories fetch error:", error);
    return [];
  }
}

// YENİ: Blog ana sayfasının içeriğini Sanity'den çeken fonksiyon.
async function getBlogPageData(): Promise<BlogPageData | null> {
  try {
    const query = `*[_type == "blogPage"][0]{
      heroTitle,
      heroDescription,
      features,
      categorySectionTitle,
      seoTitle,
      seoDescription
    }`;
    const data = await client.fetch<BlogPageData>(query);
    return data;
  } catch (error) {
    console.error("BlogPage data fetch error:", error);
    return null;
  }
}

// generateMetadata fonksiyonunu Sanity verisiyle güncelliyoruz.
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string }> }): Promise<Metadata> {
    // Bu fonksiyonun mevcut hali de çalışır, ancak daha dinamik hale getirelim.
    const params = await searchParams;
    const categorySlug = params.category;
    
    const [pageData, categories, posts] = await Promise.all([
      getBlogPageData(),
      getCategories(),
      getPosts(categorySlug),
    ]);
  
    const categoryObj = categorySlug
      ? categories.find((c) => c.slug.current === categorySlug)
      : null;
  
    const title = categoryObj
      ? `${categoryObj.title} Yazıları - İrem Akkan Blog`
      : pageData?.seoTitle || "Blog - İrem Akkan Psikolojik Danışmanlık";
  
    const description = categoryObj
      ? `${categoryObj.title} kategorisindeki uzman psikoloji yazıları.`
      : pageData?.seoDescription || "Psikoloji, mental sağlık, kişisel gelişim ve ilişkiler üzerine uzman yazılar.";

    const ogImage = posts[0]?.mainImage ? urlFor(posts[0].mainImage).width(1200).height(630).url() : undefined;
  
    return {
      title,
      description,
      // Mevcut openGraph ve diğer ayarlarınız buraya gelebilir.
       openGraph: {
        title,
        description,
        images: ogImage ? [ogImage] : [],
      }
    };
}

// YENİ: Sanity'de yazdığınız **kelime**'yi, mevcut tasarımınızdaki renkli <span>'e çeviren yardımcı bileşen.
const HighlightedText = ({ text }: { text: string | undefined }) => {
  if (!text) return null;
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          // Buradaki className'ler sizin orijinal kodunuzdan alındı. Tasarım korunuyor.
          <span key={i} className="text-gradient-gold block lg:inline">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};


// --- ANA SAYFA BİLEŞENİ ---
export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  
  // ÜÇ FARKLI VERİYİ AYNI ANDA ÇEKEREK PERFORMANSI ARTIRIYORUZ.
  const [posts, categories, pageData] = await Promise.all([
    getPosts(params.category),
    getCategories(),
    getBlogPageData(),
  ]);

  return (
    // ANA DIV'İNİZİN TASARIMI OLDUĞU GİBİ KORUNUYOR.
    <div className="min-h-screen relative overflow-hidden">
      {/* ARKA PLAN TASARIMINIZ OLDUĞU GİBİ KORUNUYOR. */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory via-pearl to-stone">
        {/* İçindeki tüm div'ler ve animasyonlar dahil, hiçbir şey silinmedi. */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: ` radial-gradient(circle at 20% 30%, rgba(197,165,114,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(44,95,93,0.3) 0%, transparent 40%), linear-gradient(135deg, rgba(197,165,114,0.1) 0%, transparent 30%) ` }}></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-20 w-32 h-44 bg-white/30 rounded-lg shadow-lg transform rotate-6 animate-pulse" style={{animationDuration: '8s'}}>
             <div className="absolute top-3 left-3 right-3 h-1 bg-gold/40 rounded"></div><div className="absolute top-6 left-3 right-3 h-0.5 bg-gold/30 rounded"></div><div className="absolute top-8 left-3 right-6 h-0.5 bg-gold/25 rounded"></div><div className="absolute top-10 left-3 right-4 h-0.5 bg-gold/20 rounded"></div>
          </div>
          <div className="absolute bottom-40 right-24 w-24 h-24 border-2 border-teal/30 rounded-full"></div><div className="absolute bottom-40 right-12 w-24 h-24 border-2 border-teal/25 rounded-full"></div><div className="absolute bottom-44 right-18 w-16 h-1 bg-teal/30 rounded"></div>
          <div className="absolute top-1/2 left-10 w-20 h-8 bg-gradient-to-r from-gold/25 to-transparent rounded-full rotate-45"></div><div className="absolute top-1/3 right-16 w-16 h-6 bg-gradient-to-r from-teal/20 to-transparent rounded-full -rotate-12"></div>
          {Array.from({ length: 14 }).map((_, i) => (<div key={i} className={`absolute w-2 h-2 rounded-full animate-pulse ${ i % 3 === 0 ? 'bg-gold/30' : i % 3 === 1 ? 'bg-teal/25' : 'bg-gold/20' }`} style={{ left: `${25 + Math.random() * 50}%`, top: `${20 + Math.random() * 60}%`, animationDelay: `${Math.random() * 7}s`, animationDuration: `${4 + Math.random() * 4}s`, }}></div>))}
        </div>
      </div>

      {/* HERO BÖLÜMÜNÜN TASARIMI OLDUĞU GİBİ KORUNUYOR. */}
      <div className="relative py-32 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          
          {/* Badge'inizin tasarımı olduğu gibi korunuyor. */}
          <div className="relative inline-block mb-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 to-teal/30 rounded-full blur-xl"></div>
            <div className="relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white/15 backdrop-blur-xl border border-gold/25 shadow-2xl">
              <svg className="w-6 h-6 text-gold animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h2.25a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clipRule="evenodd" /></svg>
              <span className="text-navy font-bold uppercase tracking-[0.3em] text-sm">Blog & İçerikler</span>
              <svg className="w-6 h-6 text-teal animate-pulse" fill="currentColor" viewBox="0 0 24 24" style={{animationDelay: '1s'}}><path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5A3 3 0 0111.25 4.5H9.75a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C5.375 6.297 4.25 7.603 4.25 9.108V18a3 3 0 003 3h9.375a3.375 3.375 0 01-3.375-3.375V9.375A3.375 3.375 0 007.502 6z" clipRule="evenodd" /></svg>
            </div>
          </div>

          <div className="space-y-10 mb-16">
            {/* DEĞİŞİKLİK: Sabit metin yerine Sanity'den gelen veriyi ve yardımcı bileşeni kullanıyoruz. */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-navy font-display leading-[0.9]">
              <HighlightedText text={pageData?.heroTitle || "Psikoloji ve **Yaşam**"} />
            </h1>

            {/* Ayırıcı tasarımınız olduğu gibi korunuyor. */}
            <div className="flex items-center justify-center gap-8">
              <div className="w-32 h-[3px] bg-gradient-to-r from-transparent to-gold rounded-full"></div><div className="flex gap-4"><div className="w-3 h-3 bg-gold rounded-full animate-pulse"></div><div className="w-4 h-4 bg-teal/70 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div><div className="w-3 h-3 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div></div><div className="w-32 h-[3px] bg-gradient-to-l from-transparent to-teal rounded-full"></div>
            </div>

            {/* DEĞİŞİKLİK: Sabit açıklama yerine Sanity'den gelen veriyi kullanıyoruz. */}
            <p className="text-xl md:text-2xl text-navy/80 max-w-4xl mx-auto leading-relaxed font-light">
              {pageData?.heroDescription || "Mental sağlık, ilişkiler ve kişisel gelişim üzerine uzman yazılar"}
            </p>
          </div>

          {/* DEĞİŞİKLİK: Sabit kartlar yerine Sanity'den gelen `features` verisini map'liyoruz. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {(pageData?.features || []).map((item, index) => (
              // KARTLARINIZIN TASARIMI OLDUĞU GİBİ KORUNUYOR.
              <div key={index} className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-xl hover:shadow-gold/10 transition-all duration-500 hover:scale-105">
                <div className="absolute -inset-1 bg-gradient-to-br from-gold/10 to-teal/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
                <div className="relative text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="text-lg font-bold text-navy mb-2">{item.title}</div>
                  <div className="text-navy/60 text-sm">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* SAYFANIN GERİ KALANI ZATEN DİNAMİK OLDUĞU İÇİN BÜYÜK ÖLÇÜDE AYNI KALIYOR. */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">
        {categories.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
               {/* Badge'inizin tasarımı olduğu gibi korunuyor. */}
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 to-teal/20 rounded-2xl blur-lg"></div>
                <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-gold/20 shadow-xl">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                  <span className="text-navy font-bold uppercase tracking-wide text-sm">Kategoriler</span>
                </div>
              </div>
              {/* DEĞİŞİKLİK: Sabit metin yerine Sanity'den gelen veriyi ve yardımcı bileşeni kullanıyoruz. */}
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-display">
                <HighlightedText text={pageData?.categorySectionTitle || "İlgi Alanınıza Göre **Keşfedin**"} />
              </h2>
            </div>
            {/* Kategori linklerinin tasarımı zaten dinamik ve olduğu gibi korunuyor. */}
            <div className="flex flex-wrap gap-4 justify-center">
                 <Link href="/blog" className={`group relative px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all duration-500 hover:scale-105 shadow-xl ${ !params.category ? "bg-gradient-to-r from-gold to-gold-light text-white shadow-gold/40 scale-105" : "bg-white/15 backdrop-blur-xl border border-white/25 text-navy hover:bg-white/25 hover:shadow-gold/20" }`}>
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${ !params.category ? '' : 'bg-gradient-to-r from-gold/10 to-teal/10 blur-lg' }`}></div>
                    <span className="relative z-10">Tümü</span>
                 </Link>
                 {categories.map((category) => (
                    <Link key={category.slug.current} href={`/blog?category=${category.slug.current}`} className={`group relative px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all duration-500 hover:scale-105 shadow-xl ${ params.category === category.slug.current ? "bg-gradient-to-r from-navy to-teal text-white shadow-navy/40 scale-105" : "bg-white/15 backdrop-blur-xl border border-white/25 text-navy hover:bg-white/25 hover:shadow-teal/20" }`}>
                       <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${ params.category === category.slug.current ? '' : 'bg-gradient-to-r from-teal/10 to-gold/10 blur-lg' }`}></div>
                       <span className="relative z-10">{category.title}</span>
                    </Link>
                 ))}
            </div>
          </div>
        )}

        {/* Blog kartlarının listesi ve tasarımı olduğu gibi korunuyor. */}
        {posts.length > 0 ? (
          <div className="space-y-12">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                 <div className="absolute -inset-2 bg-gradient-to-r from-teal/20 to-gold/20 rounded-2xl blur-lg"></div>
                 <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-teal/20 shadow-xl">
                    <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                    <span className="text-navy font-bold uppercase tracking-wide text-sm">Güncel Yazılar</span>
                 </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <div key={post.slug.current} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="absolute -inset-2 bg-gradient-to-br from-gold/20 via-transparent to-teal/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                  <div className="relative h-full bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl overflow-hidden shadow-2xl hover:shadow-gold/20 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
                    {post.mainImage && (
                      <div className="relative h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent z-10"></div>
                        <Image src={urlFor(post.mainImage).width(700).height(500).url()} alt={post.mainImage.alt || post.title} width={700} height={500} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-4 right-4 z-20">
                          <div className="px-4 py-2 rounded-full bg-gold/90 backdrop-blur-sm shadow-xl"><span className="text-white font-bold text-xs uppercase tracking-wide">{new Date(post.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric", })}</span></div>
                        </div>
                        {/* DEĞİŞİKLİK: Okuma süresini dinamik olarak gösterelim */}
                        {post.readingTime && (
                            <div className="absolute bottom-4 left-4 z-20">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-navy/70 backdrop-blur-sm">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="text-white text-xs font-medium">{post.readingTime} dk</span>
                                </div>
                            </div>
                        )}
                      </div>
                    )}
                    <div className="p-8 space-y-6">
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.categories.slice(0, 2).map((category) => (
                            <span key={category.slug.current} className="px-3 py-1 text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-teal/20 to-gold/20 text-navy rounded-full border border-gold/20">{category.title}</span>
                          ))}
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-navy mb-3 font-display group-hover:text-gold transition-colors duration-300 line-clamp-2">{post.title}</h3>
                        <p className="text-navy/70 leading-relaxed line-clamp-3">{post.excerpt}</p>
                      </div>
                      <div className="pt-4">
                        {/* DEĞİŞİKLİK: Link'i `<a>` yerine Next.js `<Link>` bileşenine çevirerek performansı artırıyoruz. */}
                        <Link href={`/blog/${post.slug.current}`} className="group/btn relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy shadow-xl hover:shadow-navy/30 transition-all duration-300 text-white font-bold overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-teal/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                          <span className="relative z-10">Devamını Oku</span>
                          <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </Link>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-teal/30 to-gold/30 rounded-2xl rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Yazı bulunamadığında gösterilecek mesaj ve tasarım olduğu gibi korunuyor.
          <div className="text-center py-32">
            <div className="relative inline-block">
              <div className="absolute -inset-8 bg-gradient-to-br from-gold/20 to-teal/20 rounded-3xl blur-2xl"></div>
              <div className="relative p-16 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-br from-navy to-teal rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-navy mb-4 font-display">{params.category ? "Bu Kategoride" : "Blog"} Yazılar Hazırlanıyor</h3>
                <p className="text-xl text-navy/70 max-w-md mx-auto">{params.category ? "Bu kategoride henüz yazı bulunmuyor." : "Yakında değerli içeriklerle burada olacağız."}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}