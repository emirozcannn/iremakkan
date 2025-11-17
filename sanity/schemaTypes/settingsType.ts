import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Site Ayarları',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'phoneNumber',
      title: 'Telefon Numarası',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-posta Adresi',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'officeAddress',
      title: 'Ofis Adresi',
      type: 'text',
    }),
    defineField({
      name: 'locationInfo',
      title: 'Konum Bilgileri',
      type: 'object',
      fields: [
        defineField({
          name: 'city',
          title: 'Şehir',
          type: 'string',
          initialValue: 'Tekirdağ',
        }),
        defineField({
          name: 'district',
          title: 'İlçe',
          type: 'string',
          initialValue: 'Süleymanpaşa',
        }),
        defineField({
          name: 'googleMapsUrl',
          title: 'Google Maps URL',
          type: 'url',
          description: 'Google Maps\'ten aldığınız konumun direkt linkini buraya yapıştırın',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sosyal Medya Linkleri',
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
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'counselor',
      title: 'Danışman Bilgileri (Ana Sayfa Hero)',
      type: 'object',
      description: 'Ana sayfada gösterilecek danışman profili - güven ve kredibilite için',
      fields: [
        defineField({
          name: 'name',
          title: 'İsim Soyisim',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Ünvan',
          type: 'string',
          placeholder: 'Örn: Psikolojik Danışman',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Profesyonel Fotoğraf',
          type: 'image',
          description: 'Profesyonel, yüksek kaliteli fotoğraf (kare formatı önerilir)',
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'bio',
          title: 'Kısa Biyografi',
          type: 'text',
          rows: 3,
          placeholder: 'Örn: Bireylerin yaşam kalitelerini artırmak ve kendilerini daha iyi anlamalarına yardımcı olmak için tutkuyla çalışıyorum.',
        }),
        defineField({
          name: 'experience',
          title: 'Deneyim',
          type: 'string',
          placeholder: 'Örn: 10+ Yıl Deneyim',
        }),
        defineField({
          name: 'credentials',
          title: 'Sertifikalar/Eğitimler',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Örn: "Bilişsel Davranışçı Danışmanlık", "EMDR", "Aile Danışmanlığı"',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Ayarları',
      }
    },
  },
})
