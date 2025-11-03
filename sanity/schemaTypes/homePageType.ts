import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Ana Sayfa',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // 🌟 Hero Section
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Metni',
      type: 'string',
      description: 'Üst küçük rozet metni (örn: "Psikolojik Destek")',
      initialValue: 'Psikolojik Destek'
    }),
    defineField({
      name: 'heroMainTitle',
      title: 'Ana Başlık - İlk Satır',
      type: 'string',
      description: 'Ana başlığın ilk satırı (örn: "Kendinize")',
      initialValue: 'Kendinize',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroMainTitleHighlight',
      title: 'Ana Başlık - Vurgulu Satır',
      type: 'string',
      description: 'Ana başlığın vurgulu (renkli) satırı (örn: "Yapacağınız En")',
      initialValue: 'Yapacağınız En',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroMainTitleSubtext',
      title: 'Ana Başlık - Alt Satır',
      type: 'string',
      description: 'Ana başlığın son satırı (örn: "Değerli Yatırım")',
      initialValue: 'Değerli Yatırım',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Açıklama',
      type: 'text',
      rows: 3,
      description: 'Ana açıklama paragrafı',
      initialValue: 'Yaşam yolculuğunuzda karşılaştığınız zorlukları birlikte aşalım. Bireysel, çift ve aile danışmanlığı hizmetlerimle, güvenli ve yargısız bir ortamda:'
    }),
    defineField({
      name: 'heroListItems',
      title: 'Hero Liste Öğeleri',
      type: 'array',
      description: 'Madde işaretli liste öğeleri',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Metin',
              type: 'string',
              description: 'HTML etiketleri kullanabilirsiniz (<strong>, <em> vb.)'
            }
          ]
        }
      ],
      initialValue: [
        { text: '<strong>İçsel farkındalığınızı</strong> geliştirmenize' },
        { text: '<strong>Duygusal dayanıklılığınızı</strong> güçlendirmenize' },
        { text: '<strong>İlişkilerinizde denge</strong> kurmanıza' },
        { text: '<strong>Potansiyelinizi keşfetmenize</strong> yardımcı oluyorum.' }
      ]
    }),
    defineField({
      name: 'heroEndingText',
      title: 'Hero Bitiş Metni',
      type: 'string',
      description: 'Liste sonrası final metni',
      initialValue: 'Değişim için ilk adımı birlikte atalım.'
    }),
    defineField({
      name: 'heroButton1Text',
      title: 'İlk Button Metni',
      type: 'string',
      description: 'Birincil button metni',
      initialValue: 'Randevu Alın'
    }),
    defineField({
      name: 'heroButton2Text',
      title: 'İkinci Button Metni',
      type: 'string',
      description: 'İkincil button metni',
      initialValue: 'Hizmetlerimi Keşfedin'
    }),

    // --- Legacy compatibility fields (some older documents use different field names)
    // These are hidden in the Studio but accepted so existing documents don't show "Unknown fields" warnings.
    defineField({
      name: 'heroTitle',
      title: 'Legacy: heroTitle (hidden)',
      type: 'string',
      hidden: true,
      description: 'Legacy field - kept for compatibility with older documents. Maps to heroMainTitle.'
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Legacy: heroSubtitle (hidden)',
      type: 'string',
      hidden: true,
      description: 'Legacy field - kept for compatibility with older documents. Maps to heroMainTitleHighlight.'
    }),
    defineField({
      name: 'heroButton',
      title: 'Legacy: heroButton (hidden)',
      type: 'string',
      hidden: true,
      description: 'Legacy field - kept for compatibility with older documents. Maps to heroButton1Text or heroButton2Text.'
    }),

    // 💳 Bilgi Kartları (Eğitim, Deneyim, Yaklaşım)
    defineField({
      name: 'infoCards',
      title: 'Bilgi Kartları (Eğitim, Deneyim, Yaklaşım)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'icon', 
              type: 'string', 
              title: 'İkon (emoji veya simge)',
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
            prepare({ title, subtitle }) {
              return {
                title: title || 'Bilgi Kartı',
                subtitle: subtitle,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3).min(3).error('Tam 3 bilgi kartı olmalıdır'),
    }),

    // 📊 İstatistik Sayıları
    defineField({
      name: 'statsNumbers',
      title: 'İstatistik Sayıları',
      type: 'object',
      fields: [
        defineField({
          name: 'experience',
          title: 'Yıl Deneyim (ör. 3+)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'sessions',
          title: 'Başarılı Görüşme (ör. 100+)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'satisfaction',
          title: 'Memnuniyet (ör. 98%)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'privacy',
          title: 'Gizlilik (ör. 100%)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // 📈 İstatistik Bölümü
    defineField({
      name: 'statsSection',
      title: 'İstatistik Bölümü',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Başlık',
          type: 'string',
          initialValue: 'Profesyonel Deneyim'
        }),
        defineField({
          name: 'description',
          title: 'Açıklama',
          type: 'text',
          rows: 2,
          initialValue: 'Psikolojik danışmanlık alanındaki deneyimim ve uzmanlığım ile yanınızdayım'
        }),
        defineField({
          name: 'bottomText',
          title: 'Alt Metin',
          type: 'text',
          rows: 2,
          initialValue: 'Her danışan özeldir. Bireysel ihtiyaçlarınıza uygun, kişiye özel terapi yöntemleriyle çalışıyorum.'
        })
      ]
    }),

    // 🏢 Hizmetler Bölümü
    defineField({
      name: 'servicesSection',
      title: 'Hizmetler Bölümü',
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
          initialValue: 'TÜM HİZMETLER',
        }),
      ],
    }),

    // 📝 Blog Bölümü
    defineField({
      name: 'blogSection',
      title: 'Blog Bölümü',
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
          initialValue: 'TÜM YAZILAR',
        }),
      ],
    }),

    // ❓ Neden Bölümü (Why / Value Proposition)
    defineField({
      name: 'whySection',
      title: 'Neden Bölümü',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Rozet Metni (küçük)',
          type: 'string',
          initialValue: 'Neden ?'
        }),
        defineField({
          name: 'title',
          title: 'Başlık (örn: Neden İrem AKKAN)',
          type: 'string'
        }),
        defineField({
          name: 'subtitle',
          title: 'Alt Başlık / Açıklama',
          type: 'text',
          rows: 2
        }),
        defineField({
          name: 'cards',
          title: 'Değer Kartları (Gizlilik, Yöntem, Empati vb.)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', type: 'string', title: 'SVG Path veya ikon', description: 'SVG path string veya açıklayıcı ikon etiketi' },
                { name: 'title', type: 'string', title: 'Başlık' },
                { name: 'description', type: 'text', title: 'Açıklama' }
              ]
            }
          ],
          validation: (Rule) => Rule.min(1)
        })
      ]
    }),

    // 🎯 CTA Section
    defineField({
      name: 'ctaSection',
      title: 'Çağrı Eylemi (CTA) Bölümü',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Rozet Metni',
          type: 'string',
          initialValue: 'Başlayalım',
        }),
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
          initialValue: 'Hemen Randevu Alın',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Buton Linki',
          type: 'string',
          description: 'Button\'un yönlendireceği sayfa (örn: /iletisim)',
          initialValue: '/iletisim'
        }),
        defineField({
          name: 'secondaryButtonText',
          title: 'İkincil Buton Metni',
          type: 'string',
          description: 'İkincil CTA buton metni (örn: Beni Tanıyın)',
          initialValue: 'Beni Tanıyın'
        }),
        defineField({
          name: 'secondaryButtonLink',
          title: 'İkincil Buton Linki',
          type: 'string',
          description: 'İkincil butonun yönlendireceği sayfa (örn: /hakkimda)',
          initialValue: '/hakkimda'
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
      title: 'heroMainTitle',
      subtitle: 'heroMainTitleHighlight',
    },
    prepare({ title, subtitle }) {
      return {
        title: 'Ana Sayfa',
        subtitle: title ? `${title} ${subtitle || ''}` : 'İçerik henüz eklenmemiş',
      }
    },
  },
})