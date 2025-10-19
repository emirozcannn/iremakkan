import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Yazısı',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Özet',
      type: 'text',
      description: 'Blog yazısının kısa özeti (150-200 karakter önerilir)',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Ana Görsel',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternatif Metin (SEO)',
          validation: (Rule) => Rule.required(),
        })
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Yazar',
      type: 'reference',
      to: {type: 'author'},
      description: 'Bu yazıyı yazan kişi',
    }),
    defineField({
      name: 'categories',
      title: 'Kategoriler',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'readingTime',
      title: 'Okuma Süresi (dakika)',
      type: 'number',
      description: 'Tahmini okuma süresi (boş bırakılırsa otomatik hesaplanır)',
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: 'body',
      title: 'İçerik',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Öne Çıkan Yazı',
      type: 'boolean',
      description: 'Bu yazı ana sayfada veya blog listesinde öne çıkarılsın mı?',
      initialValue: false,
    }),
    // SEO Alanları
    defineField({
      name: 'seoTitle',
      title: 'SEO Başlığı',
      type: 'string',
      description: 'Arama motorları için optimize edilmiş başlık (50-60 karakter)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Açıklaması',
      type: 'text',
      description: 'Arama motorları için meta açıklama (150-160 karakter)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'socialImage',
      title: 'Sosyal Medya Görseli',
      type: 'image',
      description: 'Facebook, Twitter vb. için özel görsel (1200x630px önerilir)',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {title, media, publishedAt} = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('tr-TR') : 'Tarih yok'
      return {
        title,
        subtitle: date,
        media,
      }
    },
  },
})
