import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const questionType = defineType({
  name: 'question',
  title: 'Soru',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Soru Metni',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(5).max(500),
    }),
    defineField({
      name: 'options',
      title: 'Cevap Seçenekleri',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'option',
          title: 'Seçenek',
          fields: [
            defineField({
              name: 'text',
              title: 'Seçenek Metni',
              type: 'string',
              validation: (rule) => rule.required().min(1).max(200),
            }),
            defineField({
              name: 'value',
              title: 'Puan Değeri',
              type: 'number',
              validation: (rule) => rule.required().min(0).max(100),
            }),
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'value',
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title,
                subtitle: `Puan: ${subtitle}`,
              }
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(2).max(10),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Anksiyete', value: 'anxiety' },
          { title: 'Depresyon', value: 'depression' },
          { title: 'Genel Belirtiler', value: 'general' },
          { title: 'Şema', value: 'schema' },
          { title: 'Diğer', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'weight',
      title: 'Ağırlık Faktörü',
      type: 'number',
      description: 'Puanlama sırasında bu sorunun ağırlığı (1.0 = normal)',
      initialValue: 1.0,
      validation: (rule) => rule.min(0.1).max(5.0),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sıralama',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isRequired',
      title: 'Zorunlu mu?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'text',
      category: 'category',
      optionsCount: 'options',
      isRequired: 'isRequired',
    },
    prepare(selection) {
      const { title, category, optionsCount, isRequired } = selection
      const optionCount = Array.isArray(optionsCount) ? optionsCount.length : 0
      return {
        title: title.length > 60 ? `${title.substring(0, 60)}...` : title,
        subtitle: `${category || 'Kategorisiz'} • ${optionCount} seçenek ${isRequired ? '• Zorunlu' : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Sıralama',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Kategori',
      name: 'category',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})