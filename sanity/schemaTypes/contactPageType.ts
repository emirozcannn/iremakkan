import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'İletişim Sayfası',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Ana Başlık',
      type: 'string',
      description: 'Sayfanın en üstündeki ana başlık. Vurgulu kelime için ** arasına alın.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Alt Başlık',
      type: 'text',
      description: 'Başlığın altındaki kısa açıklama.',
    }),

    // 💬 Hero Alt Metin (örneğin: "Randevu almak veya sorularınızı iletmek için formu doldurun.")
    defineField({
      name: 'heroDescription',
      title: 'Hero Açıklama Metni',
      type: 'text',
    }),

    // 🪪 Hero Alt Vurgu ("24 saat içinde size geri dönüş yapacağız.")
    defineField({
      name: 'heroHighlight',
      title: 'Hero Vurgu Metni',
      type: 'string',
    }),

    // 🧱 Üçlü Güven Kartları (örnek: Gizlilik, Hızlı Yanıt, Kişiye Özel)
    defineField({
      name: 'promiseCards',
      title: 'Bilgi Kartları',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Emoji / İkon', type: 'string' },
            { name: 'title', title: 'Başlık', type: 'string' },
            { name: 'description', title: 'Açıklama', type: 'string' },
          ],
        },
      ],
      description: 'Ana başlık altındaki küçük bilgi kartları (örnek: Gizlilik Garantisi vb.)',
    }),

    // 📬 Form Alanı
    defineField({
      name: 'formTitle',
      title: 'Form Başlığı',
      type: 'string',
      description: 'İletişim formunun üzerindeki başlık.',
    }),
    defineField({
      name: 'formSubtitle',
      title: 'Form Alt Başlık',
      type: 'string',
      description: 'Formun altındaki kısa açıklama (örnek: Güvenli ve hızlı iletişim)',
    }),

    // ℹ️ İletişim Bilgileri
    defineField({
      name: 'infoTitle',
      title: 'İletişim Bilgileri Başlığı',
      type: 'string',
      description: 'Telefon, e-posta gibi bilgilerin listelendiği bölümün başlığı.',
    }),
    defineField({
      name: 'infoSubtitle',
      title: 'İletişim Bilgileri Alt Başlık',
      type: 'string',
      description: 'İletişim bilgilerinin altındaki kısa açıklama (örnek: Doğrudan ulaşın)',
    }),

    // 📱 Sosyal Medya Bölümü
    defineField({
      name: 'socialTitle',
      title: 'Sosyal Medya Başlığı',
      type: 'string',
      description: 'Sosyal medya kartının başlığı.',
    }),
    defineField({
      name: 'socialSubtitle',
      title: 'Sosyal Medya Alt Başlık',
      type: 'string',
      description: 'Sosyal medya kartı alt açıklaması.',
    }),
    defineField({
      name: 'socialDescription',
      title: 'Sosyal Medya Açıklaması',
      type: 'text',
      description: 'Sosyal medya bağlantılarının üzerindeki metin.',
    }),

    // 📞 CTA (Randevu Kartı)
    defineField({
      name: 'ctaBadge',
      title: 'CTA Rozet Metni',
      type: 'string',
      description: 'Örnek: Ücretsiz Ön Görüşme',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Başlığı',
      type: 'string',
      description: 'Örnek: Randevu Almaya **Hazır mısınız?** (Vurgular için ** kullanın)',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Açıklaması',
      type: 'text',
      description: 'Alt açıklama metni (örnek: İlk görüşmemiz tamamen ücretsiz...)',
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA Buton Yazısı',
      type: 'string',
      description: 'Örnek: Hemen Arayın',
    }),
    defineField({
  name: 'ctaButtonLinkType',
  title: 'CTA Link Tipi',
  type: 'string',
  options: {
    list: [
      { title: 'Telefon', value: 'tel' },
      { title: 'Web Sitesi', value: 'url' },
      { title: 'E-posta', value: 'mailto' }
    ],
    layout: 'radio'
  },
  initialValue: 'tel'
}),
defineField({
  name: 'ctaButtonLink',
  title: 'CTA Buton Linki',
  type: 'string',
  description: 'Telefon için: +905551234567, Web için: https://example.com',
  hidden: ({ parent }) => !parent?.ctaButtonLinkType,
})
,

    // 🔍 SEO Alanları
    defineField({
      name: 'seoTitle',
      title: 'SEO Başlığı',
      type: 'string',
      description: 'Sayfanın arama motorlarındaki başlığı (Önerilen: 50-60 karakter).',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Açıklaması',
      type: 'text',
      description: 'Sayfanın arama motorlarındaki açıklaması (Önerilen: 150-160 karakter).',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'İletişim Sayfası',
      }
    },
  },
})
