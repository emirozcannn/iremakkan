import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Hakkımda Sayfası',
  type: 'document',
  icon: UserIcon,
  fields: [
    // 🌟 Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Ana Başlık',
      type: 'string',
      description: 'Ana başlık (ör: Hakkımda)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Başlığı (Psikolojik)',
      type: 'string',
      description: 'Vurgulu ana başlık (ör: Güvenli ve Empatik)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Hero Vurgulu Kelime',
      type: 'string',
      description: 'Vurgulu renkli kelime (ör: Danışmanlık)',
      validation: (Rule) => Rule.required(),
    }),

    // 🖼️ Profil Görseli
    defineField({
      name: 'profileImage',
      title: 'Profil Fotoğrafı',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alternatif Metin' }],
      validation: (Rule) => Rule.required(),
    }),

    // 📝 Hakkımda İçeriği
    defineField({
      name: 'aboutContent',
      title: 'Hakkımda İçeriği',
      type: 'blockContent',
      description: 'Detaylı hakkımda metni - paragraflar, listeler ve formatlamalar kullanabilirsiniz',
    }),

    // 🏷️ Sayfa içindeki buton/etiket metinleri
    defineField({
      name: 'labels',
      title: 'Buton ve Etiket Metinleri',
      type: 'object',
      fields: [
        { name: 'introButton', title: 'Giriş Butonu', type: 'string' },
        { name: 'profileButton', title: 'Profil Butonu', type: 'string' },
        { name: 'certificatesButton', title: 'Sertifikalar Butonu', type: 'string' },
      ],
    }),

    // 🏆 Sertifikalar
    defineField({
      name: 'certificates',
      title: 'Sertifikalar ve Uzmanlıklar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'title', 
              type: 'string', 
              title: 'Sertifika Adı',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'institution', 
              type: 'string', 
              title: 'Veren Kurum',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'year', 
              type: 'string', 
              title: 'Alındığı Yıl',
            },
            { 
              name: 'image', 
              type: 'image', 
              title: 'Sertifika Görseli (Opsiyonel)',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Alternatif Metin' }],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'institution',
              media: 'image',
            },
          },
        },
      ],
    }),



    // 🎯 Uzmanlık Alanları (Sol-Sağ Tasarım)
    defineField({
      name: 'specializations',
      title: 'Uzmanlık Alanları',
      type: 'array',
      description: 'Çalıştığınız alanlar (Sol-sağ dönüşümlü gösterilecek)',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'icon', 
              type: 'string', 
              title: 'İkon (emoji)',
              description: 'ör: 🎓, ⚡️, 💔, ✨',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'title', 
              type: 'string', 
              title: 'Başlık',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'description', 
              type: 'text', 
              title: 'Açıklama',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              icon: 'icon',
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: `${icon || ''} ${title || 'Uzmanlık Alanı'}`,
                subtitle: subtitle ? subtitle.substring(0, 60) + '...' : '',
              }
            },
          },
        },
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
      title: 'heroTitle',
      media: 'profileImage',
    },
    prepare({ title, media }) {
      return {
        title: 'Hakkımda Sayfası',
        subtitle: title || 'İçerik henüz eklenmemiş',
        media,
      }
    },
  },
})