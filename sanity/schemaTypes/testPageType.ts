import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const testPageType = defineType({
  name: 'testPage',
  title: 'Test Sayfası',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    // 🏷️ Test Bilgileri
    defineField({
      name: 'testName',
      title: 'Test Adı',
      type: 'string',
      description: 'Örn: Beck Depresyon Ölçeği, Young Şema Ölçeği',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testSlug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'testName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testType',
      title: 'Test Türü',
      type: 'string',
      options: {
        list: [
          { title: 'Beck Depresyon', value: 'beck-depresyon' },
          { title: 'Beck Anksiyete', value: 'beck-anksiyete' },
          { title: 'Young Şema Ölçeği', value: 'young-sema-olcegi' },
          { title: 'Kısa Semptom', value: 'kisa-semptom' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // 🌟 Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Başlığı',
      type: 'string',
      description: 'Ana başlık. Vurgulu kelime için ** arasına alın',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Açıklaması',
      type: 'text',
      rows: 3,
      description: 'Test hakkında kısa açıklama',
    }),

    // 📝 Test Açıklaması
    defineField({
      name: 'testDescription',
      title: 'Test Açıklaması',
      type: 'blockContent',
      description: 'Testin detaylı açıklaması, amacı ve nasıl değerlendirildiği',
    }),

    // ❓ Test Talimatları
    defineField({
      name: 'instructions',
      title: 'Test Talimatları',
      type: 'blockContent',
      description: 'Testin nasıl doldurulacağına dair açıklamalar',
    }),

    // ⚠️ Uyarılar
    defineField({
      name: 'warnings',
      title: 'Önemli Uyarılar',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Kullanıcıların dikkat etmesi gereken önemli noktalar',
    }),

    // 🎯 Test Özellikleri
    defineField({
      name: 'testFeatures',
      title: 'Test Özellikleri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'icon', 
              type: 'string', 
              title: 'İkon (emoji)',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'title', 
              type: 'string', 
              title: 'Özellik Başlığı',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'description', 
              type: 'string', 
              title: 'Açıklama',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    }),

    // 📊 Sonuç Açıklaması
    defineField({
      name: 'resultExplanation',
      title: 'Sonuçların Değerlendirilmesi',
      type: 'blockContent',
      description: 'Test sonuçlarının nasıl yorumlanacağı hakkında bilgi',
    }),

    // 🔗 İlgili Testler
    defineField({
      name: 'relatedTests',
      title: 'İlgili Testler',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testPage' }] }],
      description: 'Bu testle ilişkili diğer testler',
    }),

    // 🎯 CTA Bölümü
    defineField({
      name: 'ctaSection',
      title: 'Çağrı Eylemi (CTA) Bölümü',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Başlık',
          type: 'string',
          description: 'Vurgulu kelime için ** arasına alın',
        }),
        defineField({
          name: 'description',
          title: 'Açıklama',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'buttonText',
          title: 'Buton Metni',
          type: 'string',
          initialValue: 'Profesyonel Destek Alın',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Buton Linki',
          type: 'string',
          description: 'Tel: tel:+905551234567 veya sayfa: /iletisim',
        }),
      ],
    }),

    // 🧠 SEO
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
      title: 'testName',
      subtitle: 'testType',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Test Sayfası',
        subtitle: subtitle || 'Test türü belirtilmemiş',
      }
    },
  },
})