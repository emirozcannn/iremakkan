import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Hizmet',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Hizmet Adı',
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
      name: 'summary',
      title: 'Kısa Özet',
      type: 'text',
      description: 'Hizmet kartlarında gösterilecek kısa açıklama (150-200 karakter)',
      validation: (Rule) => Rule.required().max(200),
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
      name: 'details',
      title: 'Detaylı Açıklama',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
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
      subtitle: 'summary',
      media: 'mainImage',
    },
  },
})
