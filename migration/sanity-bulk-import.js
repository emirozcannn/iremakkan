// Sanity'ye toplu veri ekleme script'i
// npm install @sanity/client komutu ile sanity client'ı yükle

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'zst1k5yc',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN, // .env.local'den alacak
  useCdn: false,
  apiVersion: '2023-05-03',
})

// Test kategorisini oluştur
async function createTestCategory() {
  const category = {
    _type: 'testCategory',
    title: 'Anksiyete Testleri',
    slug: { current: 'anksiyete-testleri' },
    description: 'Kaygı ve anksiyete düzeyini değerlendiren testler',
    color: 'gold',
    sortOrder: 1,
    isActive: true,
  }

  try {
    const result = await client.create(category)
    console.log('✅ Test kategorisi oluşturuldu:', result._id)
    return result
  } catch (error) {
    console.error('❌ Kategori oluşturulurken hata:', error)
    throw error
  }
}

// Beck Anksiyete sorularını oluştur
async function createBeckAnxietyQuestions() {
  const questions = [
    "Bedeninizin herhangi bir yerinde uyuşma veya karıncalanma",
    "Sıcak/ateş basmaları",
    "Bacaklarda halsizlik, titreme",
    "Gevşeyememe",
    "Çok kötü şeyler olacak korkusu",
    "Baş dönmesi ve sersemlik",
    "Kalp çarpıntısı",
    "Dengeyi kaybetme duygusu",
    "Dehşete kapılma",
    "Sinirlilik",
    "Boğuluyormuş gibi olma duygusu",
    "Ellerde titreme",
    "Titreklik",
    "Kontrolü kaybetme korkusu",
    "Nefes almada güçlük",
    "Ölüm korkusu",
    "Korkuya kapılma",
    "Midede hazımsızlık yada rahatsızlık hissi",
    "Baygınlık",
    "Yüzün kızarması",
    "Terleme (sıcağa bağlı olmayan)"
  ]

  const options = [
    { text: 'Hiç', value: 0 },
    { text: 'Hafif Derecede', value: 1 },
    { text: 'Orta Derecede', value: 2 },
    { text: 'Ciddi derecede', value: 3 }
  ]

  const createdQuestions = []

  for (let i = 0; i < questions.length; i++) {
    const questionDoc = {
      _type: 'question',
      text: questions[i],
      options: options,
      category: 'anxiety',
      weight: 1.0,
      sortOrder: i + 1,
      isRequired: true,
    }

    try {
      const result = await client.create(questionDoc)
      console.log(`✅ Soru ${i + 1} oluşturuldu: ${result._id}`)
      createdQuestions.push(result)
    } catch (error) {
      console.error(`❌ Soru ${i + 1} oluşturulurken hata:`, error)
    }
  }

  return createdQuestions
}

// Beck Anksiyete testini oluştur
async function createBeckAnxietyTest(categoryId, questionIds) {
  const test = {
    _type: 'psychologyTest',
    title: 'Beck Anksiyete Ölçeği',
    slug: { current: 'beck-anksiyete' },
    category: {
      _type: 'reference',
      _ref: categoryId,
    },
    description: 'Beck Anksiyete Ölçeği, kaygı ve endişe belirtilerinin şiddetini ölçmek için kullanılan bir değerlendirme aracıdır. Bu test, bugün dahil son bir haftadır yaşadığınız kaygı belirtilerini değerlendirmenize yardımcı olur.',
    instructions: [
      'Son bir hafta içindeki durumunuzu düşünün',
      'Her belirti için size en uygun düzeyi seçin',
      'Belirtilerin sizi ne kadar rahatsız ettiğini değerlendirin',
      'Tüm soruları cevaplayın'
    ],
    disclaimer: 'Testlerden elde edeceğiniz sonuçlar bir tanı ya da psikolojik değerlendirme değil, sadece ipuçları ve genel bir bilgi edinme amaçlı olarak ele alınmalıdır.',
    duration: '5-10 dakika',
    questions: questionIds.map((id, index) => ({
      _type: 'object',
      _key: `question-${index}`,
      question: {
        _type: 'reference',
        _ref: id,
      },
      sortOrder: index + 1,
    })),
    scoringMethod: 'total',
    interpretationRanges: [
      {
        _type: 'object',
        _key: 'range-1',
        minScore: 0,
        maxScore: 7,
        interpretation: 'Düşük düzeyde anksiyete',
        severity: 'low',
        color: 'green',
      },
      {
        _type: 'object',
        _key: 'range-2',
        minScore: 8,
        maxScore: 15,
        interpretation: 'Hafif düzeyde anksiyete',
        severity: 'mild',
        color: 'yellow',
      },
      {
        _type: 'object',
        _key: 'range-3',
        minScore: 16,
        maxScore: 25,
        interpretation: 'Orta düzeyde anksiyete',
        severity: 'moderate',
        color: 'orange',
      },
      {
        _type: 'object',
        _key: 'range-4',
        minScore: 26,
        maxScore: 63,
        interpretation: 'Yüksek düzeyde anksiyete',
        severity: 'high',
        color: 'red',
      },
    ],
    isActive: true,
    showInNavbar: true,
    sortOrder: 1,
    tags: ['anksiyete', 'beck', 'psikolojik değerlendirme'],
    publishedAt: new Date().toISOString(),
  }

  try {
    const result = await client.create(test)
    console.log('✅ Beck Anksiyete testi oluşturuldu:', result._id)
    return result
  } catch (error) {
    console.error('❌ Test oluşturulurken hata:', error)
    throw error
  }
}

// Ana fonksiyon - tüm verileri sırasıyla oluştur
async function migrateData() {
  try {
    console.log('🚀 Beck Anksiyete testi migration başlıyor...')
    
    // 1. Kategori oluştur
    const category = await createTestCategory()
    
    // 2. Soruları oluştur
    console.log('📝 Sorular oluşturuluyor...')
    const questions = await createBeckAnxietyQuestions()
    const questionIds = questions.map(q => q._id)
    
    // 3. Testi oluştur
    console.log('🧠 Test oluşturuluyor...')
    const test = await createBeckAnxietyTest(category._id, questionIds)
    
    console.log('🎉 Migration tamamlandı!')
    console.log('📊 Oluşturulan veriler:')
    console.log(`   - Kategori: ${category.title} (${category._id})`)
    console.log(`   - Sorular: ${questions.length} adet`)
    console.log(`   - Test: ${test.title} (${test._id})`)
    
  } catch (error) {
    console.error('💥 Migration sırasında hata oluştu:', error)
  }
}

// Script'i çalıştır
migrateData()

export { migrateData }