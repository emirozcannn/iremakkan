import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'testResult',
  title: 'Test Sonuçları',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'test',
      title: 'Test',
      type: 'reference',
      to: [{ type: 'psychologyTest' }],
      description: 'Hangi test için sonuç gönderlidi',
    }),
    defineField({
      name: 'testType',
      title: 'Test Tipi (Legacy)',
      type: 'string',
      description: 'Eski statik testler için kullanılır',
      options: {
        list: [
          { title: 'Beck Anksiyete', value: 'beck-anksiyete' },
          { title: 'Beck Depresyon', value: 'beck-depresyon' },
          { title: 'Kısa Semptom Envanteri', value: 'kisa-semptom' },
          { title: 'Young Şema Ölçeği', value: 'young-sema-olcegi' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'answers',
      title: 'Verilen Cevaplar',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'answer',
          title: 'Cevap',
          fields: [
            defineField({
              name: 'questionId',
              title: 'Soru ID',
              type: 'string',
              description: 'Sorunun benzersiz kimliği',
            }),
            defineField({
              name: 'questionText',
              title: 'Soru Metni',
              type: 'text',
              description: 'Sorunun tam metni (raporlama için)',
            }),
            defineField({
              name: 'selectedOption',
              title: 'Seçilen Seçenek',
              type: 'string',
              description: 'Kullanıcının seçtiği cevap metni',
            }),
            defineField({
              name: 'selectedValue',
              title: 'Seçilen Değer',
              type: 'number',
              description: 'Seçeneğin puan değeri',
            }),
            defineField({
              name: 'weight',
              title: 'Ağırlık',
              type: 'number',
              description: 'Sorunun ağırlık faktörü',
              initialValue: 1.0,
            }),
          ],
          preview: {
            select: {
              questionText: 'questionText',
              selectedOption: 'selectedOption',
              selectedValue: 'selectedValue',
            },
            prepare(selection) {
              const { questionText, selectedOption, selectedValue } = selection
              return {
                title: questionText ? (questionText.length > 50 ? `${questionText.substring(0, 50)}...` : questionText) : 'Soru',
                subtitle: `${selectedOption} (${selectedValue} puan)`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'legacyAnswers',
      title: 'Eski Cevaplar (Legacy)',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'Eski statik testlerden gelen basit puan dizisi',
    }),
    defineField({
      name: 'totalScore',
      title: 'Toplam Puan',
      type: 'number',
    }),
    defineField({
      name: 'averageScore',
      title: 'Ortalama Puan',
      type: 'number',
    }),
    defineField({
      name: 'weightedScore',
      title: 'Ağırlıklı Puan',
      type: 'number',
    }),
    defineField({
      name: 'categoryScores',
      title: 'Kategori Puanları',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'categoryScore',
          title: 'Kategori Puanı',
          fields: [
            defineField({
              name: 'category',
              title: 'Kategori',
              type: 'string',
            }),
            defineField({
              name: 'score',
              title: 'Puan',
              type: 'number',
            }),
            defineField({
              name: 'maxScore',
              title: 'Maksimum Puan',
              type: 'number',
            }),
            defineField({
              name: 'percentage',
              title: 'Yüzde',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'interpretation',
      title: 'Yorum',
      type: 'text',
      rows: 3,
      description: 'Puan aralığına göre otomatik hesaplanan yorum.',
    }),
    defineField({
      name: 'severity',
      title: 'Şiddet Düzeyi',
      type: 'string',
      options: {
        list: [
          { title: 'Düşük', value: 'low' },
          { title: 'Hafif', value: 'mild' },
          { title: 'Orta', value: 'moderate' },
          { title: 'Yüksek', value: 'high' },
          { title: 'Ciddi', value: 'severe' },
        ],
      },
    }),
    defineField({
      name: 'userInfo',
      title: 'Kullanıcı Bilgileri',
      type: 'object',
      fields: [
        { name: 'firstName', title: 'Ad', type: 'string' },
        { name: 'lastName', title: 'Soyad', type: 'string' },
        { name: 'email', title: 'E-posta', type: 'string' },
        { name: 'phone', title: 'Telefon', type: 'string' },
      ],
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Adresi',
      type: 'string',
      description: 'Güvenlik ve analiz için',
    }),
    defineField({
      name: 'userAgent',
      title: 'Tarayıcı Bilgisi',
      type: 'text',
      description: 'Teknik destek için',
    }),
    defineField({
      name: 'completionTime',
      title: 'Tamamlanma Süresi',
      type: 'number',
      description: 'Test tamamlanma süresi (saniye)',
    }),
    defineField({
      name: 'status',
      title: 'Durum',
      type: 'string',
      options: {
        list: [
          { title: 'Tamamlandı', value: 'completed' },
          { title: 'Yarıda Bırakıldı', value: 'abandoned' },
          { title: 'Hatalı', value: 'error' },
        ],
      },
      initialValue: 'completed',
    }),
    defineField({
      name: 'needsFollowUp',
      title: 'Takip Gerekli mi?',
      type: 'boolean',
      description: 'Yüksek skorlar için manuel işaretleme',
      initialValue: false,
    }),
    defineField({
      name: 'adminNotes',
      title: 'Admin Notları',
      type: 'text',
      description: 'Yönetici tarafından eklenen notlar',
    }),
    defineField({
      name: 'createdAt',
      title: 'Oluşturulma Tarihi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Güncellenme Tarihi',
      type: 'datetime',
    }),
  ],
  orderings: [
    {
      title: 'Yeni Sonuçlar (Tarihe göre)',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Takip Gerekliler',
      name: 'needsFollowUp',
      by: [{ field: 'needsFollowUp', direction: 'desc' }],
    },
    {
      title: 'Test Tipine Göre',
      name: 'testType',
      by: [{ field: 'test.title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      testTitle: 'test.title',
      testType: 'testType',
      totalScore: 'totalScore',
      date: 'createdAt',
      firstName: 'userInfo.firstName',
      lastName: 'userInfo.lastName',
      needsFollowUp: 'needsFollowUp',
    },
    prepare(selection) {
      const { testTitle, testType, totalScore, date, firstName, lastName, needsFollowUp } = selection
      const formattedDate = date ? new Date(date).toLocaleDateString('tr-TR') : 'Tarih Yok'
      const testName = testTitle || testType || 'Test Sonucu'
      const userName = firstName && lastName ? `${firstName} ${lastName}` : 'Anonim'
      const followUpIcon = needsFollowUp ? ' 🔔' : ''
      
      return {
        title: `${testName} - ${userName}${followUpIcon}`,
        subtitle: totalScore ? `Puan: ${totalScore} (${formattedDate})` : formattedDate,
        media: DocumentIcon,
      }
    },
  },
})
