import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Hizmetler Sayfası',
  type: 'document',
  icon: DocumentIcon,

  fields: [
    // 🟨 HERO
    defineField({
      name: 'heroTitle',
      title: 'Hero Üst Başlık (küçük rozet)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Hero Başlık',
      type: 'string',
      description:
        'Sayfanın en üstündeki ana başlık. Vurgulu kelime için ** arasına alın.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Açıklama',
      type: 'text',
      rows: 3,
    }),

    // 🟦 İSTATİSTİKLER
    defineField({
      name: 'stats',
      title: 'İstatistikler (emoji, sayı, açıklama)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'statItem',
          title: 'İstatistik Öğesi',
          fields: [
            {
              name: 'icon',
              title: 'Simge (emoji veya ikon)',
              type: 'string',
            },
            {
              name: 'number',
              title: 'Sayı',
              type: 'string',
            },
            {
              name: 'label',
              title: 'Açıklama',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'number',
              icon: 'icon',
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: title || 'İstatistik',
                subtitle: `${icon || '📊'} ${subtitle || ''}`,
              };
            },
          },
        },
      ],
    }),

    // 🟩 HİZMETLER BÖLÜMÜ BAŞLIKLARI (statik metin)
    defineField({
      name: 'sectionTitle',
      title: 'Hizmetler Bölümü Başlığı',
      type: 'string',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Hizmetler Alt Başlığı',
      type: 'string',
    }),

    // 🟦 CTA ALANI
    defineField({
      name: 'ctaTitle',
      title: 'CTA Başlığı',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Açıklaması',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Buton Metni',
      type: 'string',
      initialValue: 'Ücretsiz Ön Görüşme',
    }),
    
    // 🟪 SEO ALANLARI
    defineField({
      name: 'seoTitle',
      title: 'SEO Başlığı',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Açıklaması',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    }),
  ],

  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'title',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Hizmetler Sayfası',
        subtitle: subtitle ? `Hero: ${subtitle}` : '',
        media: DocumentIcon,
      }
    },
  },
})