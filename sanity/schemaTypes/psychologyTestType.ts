import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const psychologyTestType = defineType({
  name: 'psychologyTest',
  title: 'Psikoloji Testi',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Test Başlığı',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'testCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Test Açıklaması',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(10).max(1000),
    }),
    defineField({
      name: 'instructions',
      title: 'Test Talimatları',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1).max(10),
    }),
    defineField({
      name: 'disclaimer',
      title: 'Uyarı Metni',
      type: 'text',
      rows: 3,
      initialValue: 'Testlerden elde edeceğiniz sonuçlar bir tanı ya da psikolojik değerlendirme değil, sadece ipuçları ve genel bir bilgi edinme amaçlı olarak ele alınmalıdır.',
    }),
    defineField({
      name: 'duration',
      title: 'Tahmini Süre',
      type: 'string',
      initialValue: '5-10 dakika',
    }),
    defineField({
      name: 'questions',
      title: 'Sorular',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testQuestion',
          title: 'Test Sorusu',
          fields: [
            defineField({
              name: 'question',
              title: 'Soru',
              type: 'reference',
              to: [{ type: 'question' }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'sortOrder',
              title: 'Sıralama',
              type: 'number',
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              title: 'question.text',
              sortOrder: 'sortOrder',
            },
            prepare(selection) {
              const { title, sortOrder } = selection
              return {
                title: title ? (title.length > 50 ? `${title.substring(0, 50)}...` : title) : 'Soru seçilmedi',
                subtitle: `Sıra: ${sortOrder}`,
              }
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1).max(100),
    }),
    defineField({
      name: 'scoringMethod',
      title: 'Puanlama Metodu',
      type: 'string',
      options: {
        list: [
          { title: 'Toplam Puan', value: 'total' },
          { title: 'Ortalama Puan', value: 'average' },
          { title: 'Ağırlıklı Toplam', value: 'weighted' },
          { title: 'Kategori Bazlı', value: 'category' },
          { title: 'Özel Formül', value: 'custom' },
        ],
      },
      initialValue: 'total',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'customScoringFormula',
      title: 'Özel Puanlama Formülü',
      type: 'text',
      description: 'JavaScript kodu olarak yazın. Örnek: answers.reduce((sum, answer) => sum + answer.value, 0)',
      hidden: ({ document }) => document?.scoringMethod !== 'custom',
    }),
    defineField({
      name: 'interpretationRanges',
      title: 'Yorum Aralıkları',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'interpretationRange',
          title: 'Yorum Aralığı',
          fields: [
            defineField({
              name: 'minScore',
              title: 'Minimum Puan',
              type: 'number',
              validation: (rule) => rule.required().min(0),
            }),
            defineField({
              name: 'maxScore',
              title: 'Maksimum Puan',
              type: 'number',
              validation: (rule) => rule.required().min(0),
            }),
            defineField({
              name: 'interpretation',
              title: 'Yorum',
              type: 'string',
              validation: (rule) => rule.required().min(5).max(200),
            }),
            defineField({
              name: 'severity',
              title: 'Şiddet Düzeyi',
              type: 'string',
              options: {
                list: [
                  { title: 'Düşük', value: 'low' },
                  { title: 'Hafif', value: 'mild' },
                  { title: 'Orta', value: 'moderate' },
                  { title: 'Yüksek', value: 'high' },
                  { title: 'Ciddi', value: 'severe' },
                ],
              },
              initialValue: 'low',
            }),
            defineField({
              name: 'color',
              title: 'Renk',
              type: 'string',
              options: {
                list: [
                  { title: 'Yeşil (Normal)', value: 'green' },
                  { title: 'Sarı (Dikkat)', value: 'yellow' },
                  { title: 'Turuncu (Orta)', value: 'orange' },
                  { title: 'Kırmızı (Yüksek)', value: 'red' },
                ],
              },
              initialValue: 'green',
            }),
          ],
          preview: {
            select: {
              minScore: 'minScore',
              maxScore: 'maxScore',
              interpretation: 'interpretation',
              severity: 'severity',
            },
            prepare(selection) {
              const { minScore, maxScore, interpretation, severity } = selection
              return {
                title: `${minScore}-${maxScore} puan`,
                subtitle: `${interpretation} (${severity})`,
              }
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1).max(20),
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif mi?',
      type: 'boolean',
      initialValue: true,
      description: 'Pasif testler navbar\'da görünmez',
    }),
    defineField({
      name: 'showInNavbar',
      title: 'Navbar\'da Göster',
      type: 'boolean',
      initialValue: true,
      description: 'Bu test ana menüde görünsün mü?',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Navbar Sıralaması',
      type: 'number',
      initialValue: 0,
      description: 'Navbar\'daki sıralama (küçükten büyüğe)',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Öne Çıkan Görsel',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      questionCount: 'questions',
      isActive: 'isActive',
      showInNavbar: 'showInNavbar',
    },
    prepare(selection) {
      const { title, category, questionCount, isActive, showInNavbar } = selection
      const qCount = Array.isArray(questionCount) ? questionCount.length : 0
      const status = isActive ? (showInNavbar ? '🌟' : '✅') : '❌'
      return {
        title: title,
        subtitle: `${category || 'Kategorisiz'} • ${qCount} soru ${status}`,
      }
    },
  },
  orderings: [
    {
      title: 'Navbar Sıralaması',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Yayın Tarihi',
      name: 'publishedAt',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Başlık',
      name: 'title',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})