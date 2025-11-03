import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const testCategoryType = defineType({
  name: 'testCategory',
  title: 'Test Kategorisi',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Kategori Adı',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
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
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'Kategori Rengi',
      type: 'string',
      options: {
        list: [
          { title: 'Altın', value: 'gold' },
          { title: 'Teal', value: 'teal' },
          { title: 'Lacivert', value: 'navy' },
          { title: 'Yeşil', value: 'green' },
          { title: 'Kırmızı', value: 'red' },
          { title: 'Mor', value: 'purple' },
        ],
      },
      initialValue: 'gold',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sıralama',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif mi?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection
      return {
        title: title,
        subtitle: `${subtitle || ''} ${isActive ? '✅' : '❌'}`,
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
      title: 'Alfabe',
      name: 'title',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})