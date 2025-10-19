import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Sayfa',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa Başlığı',
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
      name: 'body',
      title: 'İçerik',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    // Profil Görselleri
    defineField({
      name: 'profileImage',
      title: 'Profil Fotoğrafı',
      type: 'image',
      description: 'Ana profil fotoğrafı (kare format önerilir)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatif Metin',
          description: 'Görsel açıklaması (SEO için önemli)',
        },
      ],
    }),
    defineField({
      name: 'officeImage',
      title: 'Ofis/Çalışma Alanı Fotoğrafı',
      type: 'image',
      description: 'Ofis veya danışmanlık ortamı görseli (opsiyonel)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatif Metin',
        },
      ],
    }),
    defineField({
      name: 'certificateImages',
      title: 'Sertifika/Diploma Görselleri',
      type: 'array',
      description: 'Eğitim ve sertifika görselleri (opsiyonel)',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternatif Metin',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Açıklama',
              description: 'Sertifika/diploma hakkında kısa açıklama',
            },
          ],
        },
      ],
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
