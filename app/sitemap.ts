import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

interface Post {
  slug: { current: string };
  publishedAt: string;
}

interface Service {
  slug: { current: string };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://iremakkan.com";

  // Blog yazılarını çek
  const posts = await client.fetch<Post[]>(`
    *[_type == "post"]{
      slug,
      publishedAt
    }
  `);

  // Hizmetleri çek
  const services = await client.fetch<Service[]>(`
    *[_type == "service"]{
      slug
    }
  `);

  // Statik sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimda`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    // Psikolojik testler
    {
      url: `${baseUrl}/testler/young-sema-olcegi`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/testler/beck-depresyon`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/testler/beck-anksiyete`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/testler/kisa-semptom`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // Blog sayfaları
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Hizmet sayfaları
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/hizmetler/${service.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...servicePages];
}
