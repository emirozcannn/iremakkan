import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { QuickActions } from "./QuickActions";

interface SanitySlug {
  current: string;
}
interface SanityImage {
  asset?: { _ref: string; _type: string };
  alt?: string;
}
interface Category {
  title: string;
  slug: SanitySlug;
}
interface Author {
  name: string;
  title?: string;
  image?: SanityImage;
  bio?: string;
  expertise?: string[];
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}
type SanityBlock =
  | PortableTextBlock
  | {
      _key: string;
      _type: string;
      [key: string]: unknown;
    };
interface Post {
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  author?: Author;
  readingTime?: number;
  body: SanityBlock[];
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: SanityImage;
  categories?: Category[];
}

/* --------------------------- FETCH FUNCTIONS --------------------------- */
export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: SanitySlug }[]>(
    `*[_type == "post"]{ slug }`
  );
  return posts.map((p) => ({ slug: p.slug.current }));
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch<Post>(
      `*[_type == "post" && slug.current == $slug][0]{
        title, slug, excerpt, mainImage, publishedAt, readingTime,
        author->{name,title,image,bio,expertise,socialMedia},
        body, seoTitle, seoDescription, socialImage,
        categories[]->{title,slug}
      }`,
      { slug }
    );
  } catch (e) {
    console.error("Post fetch error:", e);
    return null;
  }
}

function calculateReadingTime(body: SanityBlock[]): number {
  const text = body
    .flatMap((block) =>
      block._type === "block" && "children" in block
        ? (block.children as { text?: string }[])
            .map((c) => (typeof c.text === "string" ? c.text : ""))
            .join(" ")
        : ""
    )
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/* ----------------------------- METADATA ----------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post)
    return {
      title: "Yazı Bulunamadı - İrem Akkan",
      description:
        "Aradığınız blog yazısı bulunamadı. Lütfen blog sayfasından diğer yazılarımıza göz atın.",
    };

  const ogImage =
    post.socialImage
      ? urlFor(post.socialImage).width(1200).height(630).url()
      : post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined;

  const title = post.seoTitle || `${post.title} - İrem Akkan Blog`;
  const description =
    post.seoDescription ||
    post.excerpt ||
    `${post.title} hakkında detaylı bilgi. Psikoloji, mental sağlık ve kişisel gelişim üzerine uzman görüşleri.`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

/* ---------------------- PORTABLE TEXT COMPONENTS ---------------------- */
const portableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) =>
      value?.asset?._ref ? (
        <figure className="my-12 -mx-4 lg:mx-0">
          <div className="relative aspect-[16/9] lg:rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={urlFor(value).width(1000).quality(85).url()}
              alt={value.alt || "Blog görseli"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1000px"
            />
          </div>
          {value.alt && (
            <figcaption className="text-center text-sm text-navy/60 mt-5 italic px-4">
              {value.alt}
            </figcaption>
          )}
        </figure>
      ) : null,
  },
  marks: {
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold font-semibold underline decoration-gold/30 decoration-2 underline-offset-4 hover:decoration-gold hover:text-navy transition-all duration-300"
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-navy font-bold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-navy/90">{children}</em>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl lg:text-4xl font-bold text-navy mt-16 mb-6 leading-tight tracking-tight">
        <span className="bg-gradient-to-r from-navy via-navy to-gold/20 bg-clip-text">
          {children}
        </span>
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl lg:text-3xl font-bold text-navy mt-12 mb-5 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-xl lg:text-2xl font-semibold text-navy mt-10 mb-4">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-navy/85 leading-[1.8] mb-6 text-base lg:text-lg font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="relative pl-8 pr-6 py-6 my-10 bg-gradient-to-r from-gold/5 to-transparent border-l-[3px] border-gold rounded-r-2xl">
        <div className="absolute -left-2 top-6 w-4 h-4 bg-gold rounded-full shadow-lg shadow-gold/30"></div>
        <div className="text-navy/90 text-lg lg:text-xl leading-relaxed italic font-light">
          {children}
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-4 my-8">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="space-y-4 my-8 counter-reset-list">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-4 text-navy/80 leading-relaxed text-base lg:text-lg">
        <span className="w-2 h-2 bg-gradient-to-br from-gold to-gold-light rounded-full mt-2.5 flex-shrink-0 shadow-sm"></span>
        <span className="flex-1">{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-4 text-navy/80 leading-relaxed text-base lg:text-lg">
        <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
          {children}
        </span>
        <span className="flex-1 pt-0.5">{children}</span>
      </li>
    ),
  },
};

/* ------------------------------ PAGE ------------------------------ */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();

  const readingTime = post.readingTime || calculateReadingTime(post.body);

  return (
  <article className="min-h-screen relative overflow-hidden bg-gradient-to-br from-ivory via-pearl to-stone">
    {/* Print-only: Sadece yazı ve yazar */}
    <div className="print-content">
      <div className="prose prose-lg max-w-none">
        {Array.isArray(post.body) && post.body.length > 0 ? (
          <>
            <h1>{post.title}</h1>
            <PortableText
              value={post.body.map((block) =>
                typeof block === "object" && block._type === "block"
                  ? {
                      ...block,
                      children: Array.isArray(block.children)
                        ? block.children.filter(
                            (child) => typeof (child as { text?: string }).text === "string"
                          )
                        : [],
                    }
                  : block
              )}
              components={portableTextComponents}
            />
            {/* Print: Yazar bilgisi yazının sonunda */}
            <div className="mt-12 pt-8 border-t border-navy/10 flex items-center gap-4 print-author">
              {post.author && (
                <>
                  {post.author.image ? (
                    <img
                      src={urlFor(post.author.image).width(80).height(80).quality(90).url()}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      style={{ borderRadius: '50%', marginRight: '16px' }}
                    />
                  ) : null}
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{post.author.name}</div>
                    {post.author.title && (
                      <div style={{ color: '#c5a572', fontSize: '0.95em' }}>{post.author.title}</div>
                    )}
                    {post.author.bio && (
                      <div style={{ color: '#444', fontSize: '0.95em', marginTop: '4px' }}>{post.author.bio}</div>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-16 px-6 bg-white/50 rounded-2xl border border-white/60">
            <svg className="w-16 h-16 text-navy/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-navy/60 italic text-lg">
              Bu yazının içeriği henüz eklenmemiş.
            </p>
          </div>
        )}
      </div>
    </div>

    {/* Normal görünüm: Tüm bileşenler */}
    <div className="no-print">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.06),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,45,86,0.03),transparent_40%)]"></div>

      {/* Hero Section */}
      <div className="relative">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <nav className="mb-6" aria-label="Breadcrumb">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/50 shadow-sm">
              <Link href="/" className="text-navy/60 hover:text-gold text-xs font-medium transition-colors">
                Ana Sayfa
              </Link>
              <svg className="w-1 h-1 text-gold/50" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="4" />
              </svg>
              <Link href="/blog" className="text-navy/60 hover:text-gold text-xs font-medium transition-colors">
                Blog
              </Link>
              <svg className="w-1 h-1 text-gold/50" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="4" />
              </svg>
              <span className="text-navy font-semibold text-xs truncate max-w-[120px] sm:max-w-[200px]">
                {post.title}
              </span>
            </div>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <header className="text-center mb-12">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {post.categories.map((cat) => (
                  <Link
                    key={cat.slug.current}
                    href={`/blog?category=${cat.slug.current}`}
                    className="px-5 py-2 bg-white/50 hover:bg-gold/10 border border-gold/20 hover:border-gold/40 text-gold font-semibold text-sm rounded-full transition-all duration-300 backdrop-blur-sm"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy mb-8 leading-[1.15] tracking-tight max-w-4xl mx-auto">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl lg:text-2xl text-navy/70 leading-relaxed max-w-3xl mx-auto mb-10 font-light">
                {post.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center gap-2.5 px-5 py-2.5 bg-white/50 backdrop-blur-md rounded-full border border-white/50 shadow-sm">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-navy/70 text-sm font-medium">
                  {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2.5 bg-white/50 backdrop-blur-md rounded-full border border-white/50 shadow-sm">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-navy/70 text-sm font-medium">{readingTime} dk okuma</span>
              </div>
            </div>

            {/* Author Compact */}
            {post.author && (
              <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/50 shadow-lg">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gold/30 ring-offset-2 ring-offset-white/50">
                  {post.author.image ? (
                    <Image
                      src={urlFor(post.author.image).width(100).height(100).quality(90).url()}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold to-gold-light text-white font-bold text-lg">
                      {post.author.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <div className="text-navy font-bold text-sm">
                    {post.author.name}
                  </div>
                  {post.author.title && (
                    <div className="text-navy/60 text-xs">
                      {post.author.title}
                    </div>
                  )}
                </div>
              </div>
            )}
          </header>
        </div>

        {/* Hero Image */}
        {post.mainImage && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={urlFor(post.mainImage).width(1400).height(600).quality(85).url()}
                alt={post.mainImage.alt || post.title}
                width={1400}
                height={600}
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/10 to-transparent"></div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content - Split Layout */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Article Content */}
          <div className="lg:col-span-8">
            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-white/60" id="article-content">
              <div className="prose prose-lg max-w-none">
                {Array.isArray(post.body) && post.body.length > 0 ? (
                  <PortableText
                    value={post.body.map((block) =>
                      typeof block === "object" && block._type === "block"
                        ? {
                            ...block,
                            children: Array.isArray(block.children)
                              ? block.children.filter(
                                  (child) => typeof (child as { text?: string }).text === "string"
                                )
                              : [],
                          }
                        : block
                    )}
                    components={portableTextComponents}
                  />
                ) : (
                  <div className="text-center py-16 px-6 bg-white/50 rounded-2xl border border-white/60">
                    <svg className="w-16 h-16 text-navy/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-navy/60 italic text-lg">
                      Bu yazının içeriği henüz eklenmemiş.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Author Bio Card */}
              {post.author && (
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/60">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mb-4 ring-2 ring-gold/30 ring-offset-4 ring-offset-white/50">
                      {post.author.image ? (
                        <Image
                          src={urlFor(post.author.image).width(200).height(200).quality(90).url()}
                          alt={post.author.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-white font-bold text-2xl">
                          {post.author.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-navy mb-1">
                      {post.author.name}
                    </h3>
                    {post.author.title && (
                      <p className="text-gold font-semibold text-sm mb-3">
                        {post.author.title}
                      </p>
                    )}
                    
                    {post.author.bio && (
                      <p className="text-navy/70 text-sm leading-relaxed mb-4">
                        {post.author.bio}
                      </p>
                    )}

                    {post.author.expertise && post.author.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {post.author.expertise.map((e, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-navy/10 text-navy/80 text-xs font-medium"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Social Media */}
                    {(post.author.socialMedia?.instagram || post.author.socialMedia?.linkedin || post.author.socialMedia?.twitter) && (
                      <div className="flex gap-3 pt-4 border-t border-navy/10 w-full justify-center">
                        {post.author.socialMedia?.instagram && (
                          <a
                            href={post.author.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-navy/5 hover:bg-gold/10 border border-navy/10 hover:border-gold/30 transition-all duration-300"
                            aria-label="Instagram"
                          >
                            <svg className="w-5 h-5 text-navy" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        )}
                        {post.author.socialMedia?.linkedin && (
                          <a
                            href={post.author.socialMedia.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-navy/5 hover:bg-gold/10 border border-navy/10 hover:border-gold/30 transition-all duration-300"
                            aria-label="LinkedIn"
                          >
                            <svg className="w-5 h-5 text-navy" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {post.author.socialMedia?.twitter && (
                          <a
                            href={post.author.socialMedia.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-navy/5 hover:bg-gold/10 border border-navy/10 hover:border-gold/30 transition-all duration-300"
                            aria-label="Twitter"
                          >
                            <svg className="w-5 h-5 text-navy" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Actions & Reading Progress */}
              <QuickActions post={post} readingTime={readingTime} />
            </div>
          </aside>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-12 border-t border-white/60">
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
            <Link
              href="/blog"
              className="group flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/60 hover:border-gold/50 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-navy font-bold">Tüm Yazılara Dön</div>
                <div className="text-navy/60 text-sm">Blog ana sayfası</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </article>
  );
}