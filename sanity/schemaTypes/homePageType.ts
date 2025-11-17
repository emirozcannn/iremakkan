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

    // 🎯 Yardımcı Olduğum Konular Bölümü
    defineField({
      name: 'helpTopicsSection',
      title: 'Yardımcı Olduğum Konular Bölümü',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Rozet Metni',
          type: 'string',
          initialValue: 'Uzmanlık Alanlarım'
        }),
        defineField({
          name: 'title',
          title: 'Ana Başlık',
          type: 'string',
          initialValue: 'Hangi Konularda **Yardımcı Oluyorum**'
        }),
        defineField({
          name: 'description',
          title: 'Açıklama',
          type: 'text',
          rows: 2,
          initialValue: 'Yaşadığınız zorluklarla başa çıkmanızda size rehberlik etmek için buradayım. Her birey özeldir ve her duruma özel yaklaşımlar geliştirilir.'
        }),
        defineField({
          name: 'topics',
          title: 'Yardımcı Olduğum Konular',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'helpTopic',
              title: 'Yardım Konusu',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'İkon',
                  type: 'string',
                  description: 'Emoji veya ikon kodu (🧠, 💚, ⚡ vb.)',
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: 'title',
                  title: 'Başlık',
                  type: 'string',
                  description: 'Konu başlığı (örn: Depresyon ve Kaygı)',
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: 'description',
                  title: 'Açıklama',
                  type: 'text',
                  rows: 3,
                  description: 'Konuyla ilgili detaylı açıklama',
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: 'accentColor',
                  title: 'Vurgu Rengi',
                  type: 'string',
                  description: 'Kartın vurgu rengi (örn: blue, green, purple, pink, orange)',
                  options: {
                    list: [
                      { title: 'Slate - Gri', value: 'slate' },
                      { title: 'Stone - Taş', value: 'stone' },
                      { title: 'Zinc - Çinko', value: 'zinc' },
                      { title: 'Neutral - Nötr', value: 'neutral' },
                      { title: 'Emerald - Zümrüt', value: 'emerald' },
                      { title: 'Blue - Mavi', value: 'blue' },
                      { title: 'Violet - Mor', value: 'violet' },
                      { title: 'Rose - Gül', value: 'rose' }
                    ]
                  },
                  initialValue: 'slate'
                }),
                defineField({
                  name: 'symptoms',
                  title: 'Belirtiler/Alt Konular',
                  type: 'array',
                  of: [{ type: 'string' }],
                  description: 'Bu konuyla ilgili belirtiler veya alt konular (örn: "Sürekli üzgünlük hali", "Uyku problemleri")'
                })
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                  icon: 'icon'
                },
                prepare({ title, subtitle, icon }) {
                  return {
                    title: `${icon} ${title}`,
                    subtitle: subtitle?.substring(0, 60) + (subtitle?.length > 60 ? '...' : '')
                  }
                }
              }
            }
          ],
          validation: (Rule) => Rule.min(8).max(8).error('Tam 8 konu olmalıdır (kompakt tasarım için)'),
          initialValue: [
            {
              icon: '🌊',
              title: 'Depresyon ve Kaygı Bozuklukları',
              description: 'Günlük yaşamınızı etkileyen depresif belirtiler, kaygı durumları ve panik atak sorunlarında profesyonel destek sağlıyorum. Birlikte duygusal dengenizi yeniden kuruyoruz.',
              accentColor: 'blue',
              symptoms: ['Sürekli üzgünlük hali', 'Motivasyon kaybı', 'Kaygı nöbetleri', 'Panik atak', 'Umutsuzluk']
            },
            {
              icon: '💚',
              title: 'İlişki ve İletişim Sorunları',
              description: 'Çift Danışmanlığı, aile içi iletişim problemleri ve kişilerarası ilişki zorluklarında rehberlik ediyorum. Sağlıklı iletişim becerilerinizi geliştiriyoruz.',
              accentColor: 'emerald',
              symptoms: ['İletişim kopukluğu', 'Çift uyumsuzluğu', 'Aile içi çatışmalar', 'Güven problemleri', 'Yakınlık korkusu']
            },
            {
              icon: '⚡',
              title: 'Travma ve Stres Yönetimi',
              description: 'Travma sonrası stres, yas süreci ve yaşamsal değişimlere uyum konularında özel destek veriyorum. İyileşme yolculuğunuzda yanınızdayım.',
              accentColor: 'violet',
              symptoms: ['Travma sonrası stres', 'Kayıp ve yas', 'Kronik stres', 'Uyum problemleri', 'Geçmiş yaşantılar']
            },
            {
              icon: '�',
              title: 'Benlik Saygısı ve Özgüven',
              description: 'Özgüven eksikliği, kendini kabul etme ve kişisel gelişim konularında yol gösteriyorum. İç gücünüzü keşfetmenize yardımcı oluyorum.',
              accentColor: 'rose',
              symptoms: ['Düşük özgüven', 'Kendini değersiz hissetme', 'Sosyal çekingenlik', 'Karar verme zorluğu', 'Kendini suçlama']
            },
            {
              icon: '🌀',
              title: 'Öfke ve Duygu Yönetimi',
              description: 'Öfke kontrolü, saldırganlık problemleri ve duygusal düzenleme konularında birlikte çalışıyoruz. Duygularınızı sağlıklı şekilde ifade etmeyi öğreniyoruz.',
              accentColor: 'slate',
              symptoms: ['Öfke patlamaları', 'Agresif davranışlar', 'Duygusal dengesizlik', 'İmpulsivite', 'Sabırsızlık']
            },
            {
              icon: '🤝',
              title: 'Sosyal Anksiyete ve Fobi',
              description: 'Sosyal ortamlarda yaşanan kaygı, fobiler ve toplumsal durum korkularında rehberlik sağlıyorum. Sosyal becerilerinizi güçlendiriyoruz.',
              accentColor: 'stone',
              symptoms: ['Sosyal kaygı', 'Konuşma korkusu', 'Topluluk fobisi', 'Performans kaygısı', 'Yargılanma korkusu']
            },
            {
              icon: '✨',
              title: 'Kişisel Gelişim ve Uyum',
              description: 'Yaşam değişiklikleri, yeni süreçlere uyum ve kişisel potansiyelinizi keşfetme konularında destek veriyorum. Hedeflerinize ulaşmanızda rehberim.',
              accentColor: 'zinc',
              symptoms: ['Yaşam geçişleri', 'Kariyer değişimi', 'İlişki değişiklikleri', 'Kişisel hedefler', 'Yaşam amacı']
            },
            {
              icon: '🌙',
              title: 'Uyku ve Yaşam Düzeni',
              description: 'Uyku bozuklukları, yaşam rutini problemleri ve sağlıklı alışkanlıklar konusunda yol gösteriyorum. Dengeli bir yaşam rutini oluşturuyoruz.',
              accentColor: 'neutral',
              symptoms: ['Uykusuzluk', 'Gece kaygısı', 'Düzensiz yaşam', 'Kronik yorgunluk', 'Gündüz uykusu']
            }
          ]
        }),
        defineField({
          name: 'bottomText',
          title: 'Alt Metin/Çağrı',
          type: 'text',
          rows: 2,
          initialValue: 'Yukarıdaki konulardan herhangi biriyle ilgili destek almak istiyorsanız, birlikte çalışabiliriz. Her birey özeldir ve size özel bir danışmanlık planı oluştururuz.'
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