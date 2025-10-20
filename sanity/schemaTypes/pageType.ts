import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Sayfa',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    // 🧱 İçerik (Body)
    defineField({
      name: 'body',
      title: 'İçerik',
      type: 'blockContent',
      description: 'Sayfa içeriği (metin, görsel veya video)',
    }),

    // 🌟 Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Başlığı',
      type: 'string',
      description: 'Örn: Güvenli ve Empatik',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Alt Başlığı',
      type: 'string',
      description: 'Örn: Danışmanlık',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Açıklaması',
      type: 'text',
      rows: 3,
      description:
        'Kısa tanıtım paragrafı, örn: Her bireyin kendine özgü bir yolculuğu vardır...',
    }),

    // 💬 Buton Etiketleri
    defineField({
      name: 'labels',
      title: 'Bölüm Buton Etiketleri',
      type: 'object',
      fields: [
        defineField({
          name: 'introButton',
          title: 'Beni Tanıyın Butonu',
          type: 'string',
          initialValue: 'BENİ TANIYIN',
        }),
        defineField({
          name: 'profileButton',
          title: 'Profil Butonu',
          type: 'string',
          initialValue: 'PROFİL',
        }),
        defineField({
          name: 'environmentButton',
          title: 'Danışmanlık Ortamı Butonu',
          type: 'string',
          initialValue: 'DANIŞMANLIK ORTAMI',
        }),
        defineField({
          name: 'detailsButton',
          title: 'Detaylı Bilgiler Butonu',
          type: 'string',
          initialValue: 'DETAYLI BİLGİLER',
        }),
        defineField({
          name: 'certificatesButton',
          title: 'Eğitim & Sertifikalar Butonu',
          type: 'string',
          initialValue: 'EĞİTİM & SERTİFİKALAR',
        }),
      ],
    }),

    // 🧩 Kartlar
    defineField({
      name: 'infoCards',
      title: 'Bilgi Kartları (Eğitim, Deneyim, Yaklaşım)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'İkon (emoji veya simge)' },
            { name: 'title', type: 'string', title: 'Başlık' },
            { name: 'desc', type: 'string', title: 'Açıklama' },
          ],
        },
      ],
      description: 'Hero altındaki 3 kart (ör: Eğitim, Deneyim, Yaklaşım)',
    }),

    // 📈 İstatistik Sayıları
    defineField({
      name: 'statsNumbers',
      title: 'İstatistik Sayıları',
      type: 'object',
      fields: [
        defineField({
          name: 'experience',
          title: 'Yıl Deneyim (ör. 3+)',
          type: 'string',
        }),
        defineField({
          name: 'sessions',
          title: 'Başarılı Görüşme (ör. 100+)',
          type: 'string',
        }),
        defineField({
          name: 'satisfaction',
          title: 'Memnuniyet (ör. 98%)',
          type: 'string',
        }),
        defineField({
          name: 'privacy',
          title: 'Gizlilik (ör. 100%)',
          type: 'string',
        }),
      ],
    }),

    // 🖼️ Görseller
    defineField({
      name: 'profileImage',
      title: 'Profil Fotoğrafı',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alternatif Metin' }],
    }),
    defineField({
      name: 'officeImage',
      title: 'Ofis Fotoğrafı',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alternatif Metin' }],
    }),

    // 📜 Sertifikalar
    defineField({
      name: 'certificateImages',
      title: 'Sertifika/Diploma Görselleri',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alternatif Metin' },
            { name: 'caption', type: 'string', title: 'Açıklama' },
          ],
        },
      ],
      description: 'Eğitim ve sertifika görselleri (opsiyonel)',
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
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
