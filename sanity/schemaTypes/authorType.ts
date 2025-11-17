import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Yazar',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Ad Soyad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Ünvan',
      type: 'string',
      description: 'Örn: Psikolojik Danışman, Uzman Psikolog',
      placeholder: 'Psikolojik Danışman',
    }),
    defineField({
      name: 'image',
      title: 'Profil Fotoğrafı',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternatif Metin',
        })
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Kısa Biyografi',
      type: 'text',
      rows: 4,
      description: 'Yazar hakkında kısa bilgi (200-300 karakter)',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'expertise',
      title: 'Uzmanlık Alanları',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Örn: Anksiyete Danışmanlığı, Çift Danışmanlığı, Depresyon',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Sosyal Medya',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
