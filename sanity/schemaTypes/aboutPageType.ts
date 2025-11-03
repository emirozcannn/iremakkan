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
    defineField({
      name: 'heroDescription',
      title: 'Hero Açıklaması',
      type: 'text',
      rows: 3,
      description: 'Kısa tanıtım paragrafı',
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
    // 🏢 Ofis / Danışmanlık Ortamı Görseli
    defineField({
      name: 'officeImage',
      title: 'Ofis / Ortam Görseli',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alternatif Metin' }],
      description: 'Danışmanlık ortamınızı gösteren fotoğraf (isteğe bağlı)'
    }),

    // 📝 Hakkımda İçeriği
    defineField({
      name: 'aboutContent',
      title: 'Hakkımda İçeriği',
      type: 'blockContent',
      description: 'Detaylı hakkımda metni - paragraflar, listeler ve formatlamalar kullanabilirsiniz',
    }),

    // 📋 Bilgi Kartları (Info Cards)
    defineField({
      name: 'infoCards',
      title: 'Bilgi Kartları',
      type: 'array',
      description: 'Hero bölümündeki 3 kart',
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
              title: 'Başlık',
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
              icon: 'icon',
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: `${icon || ''} ${title || 'Bilgi Kartı'}`,
                subtitle: subtitle || '',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3).error('En fazla 3 kart ekleyebilirsiniz'),
    }),

    // 🏷️ Sayfa içindeki buton/etiket metinleri
    defineField({
      name: 'labels',
      title: 'Buton ve Etiket Metinleri',
      type: 'object',
      fields: [
        { name: 'introButton', title: 'Giriş Butonu', type: 'string' },
        { name: 'profileButton', title: 'Profil Butonu', type: 'string' },
        { name: 'environmentButton', title: 'Ortam Butonu', type: 'string' },
        { name: 'detailsButton', title: 'Detaylar Butonu', type: 'string' },
        { name: 'certificatesButton', title: 'Sertifikalar Butonu', type: 'string' },
      ],
    }),

    // 🎓 Eğitim Bilgileri
    defineField({
      name: 'educationSection',
      title: 'Eğitim Bölümü Başlıkları',
      type: 'object',
      fields: [
        {
          name: 'buttonText',
          title: 'Buton Metni',
          type: 'string',
          initialValue: 'EĞİTİM BİLGİLERİ',
        },
        {
          name: 'title',
          title: 'Ana Başlık',
          type: 'string',
          description: 'Vurgulu kelime için ** arasına alın (ör: Akademik **Alt Yapı**)',
          initialValue: 'Akademik **Alt Yapı**',
        },
      ],
    }),
    defineField({
      name: 'education',
      title: 'Eğitim Bilgileri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'degree', 
              type: 'string', 
              title: 'Derece/Diploma',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'institution', 
              type: 'string', 
              title: 'Kurum',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'year', 
              type: 'string', 
              title: 'Yıl',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'description', 
              type: 'text', 
              title: 'Açıklama (Opsiyonel)',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'degree',
              subtitle: 'institution',
              year: 'year',
            },
            prepare({ title, subtitle, year }) {
              return {
                title: title || 'Eğitim',
                subtitle: `${subtitle || ''} - ${year || ''}`,
              }
            },
          },
        },
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



    // 💭 Kişisel Yaklaşım
    defineField({
      name: 'approach',
      title: 'Kişisel Yaklaşım',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Başlık',
          type: 'string',
          description: 'Vurgulu kelime için ** arasına alın',
        }),
        defineField({
          name: 'content',
          title: 'İçerik',
          type: 'blockContent',
          description: 'Yaklaşımınızı detaylı olarak anlatın',
        }),
      ],
    }),

    // 📊 İstatistikler
    defineField({
      name: 'stats',
      title: 'Başarı İstatistikleri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'number', 
              type: 'string', 
              title: 'Sayı',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'label', 
              type: 'string', 
              title: 'Açıklama',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'icon', 
              type: 'string', 
              title: 'İkon (emoji)',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'number',
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