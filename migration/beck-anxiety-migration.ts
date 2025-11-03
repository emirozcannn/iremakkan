// Beck Anksiyete Testini Sanity'e aktarmak için migration script
// Bu script'i Sanity'de kullanmak için veri formatını hazırlıyor

import { questions, testInfo } from '../app/(site)/testler/beck-anksiyete/questions'

// Test kategorisi
const anxietyCategory = {
  _type: 'testCategory',
  title: 'Anksiyete Testleri',
  slug: { current: 'anksiyete-testleri' },
  description: 'Kaygı ve anksiyete düzeyini değerlendiren testler',
  color: 'gold',
  sortOrder: 1,
  isActive: true,
}

// Beck Anksiyete soruları için soru şemaları
const beckAnxietyQuestions = questions.map((q, index) => ({
  _type: 'question',
  text: q.text,
  options: q.options.map((optionText, optionIndex) => ({
    text: optionText,
    value: optionIndex, // 0, 1, 2, 3 puanları
  })),
  category: 'anxiety',
  weight: 1.0,
  sortOrder: index + 1,
  isRequired: true,
}))

// Beck Anksiyete testi ana şeması
const beckAnxietyTest = {
  _type: 'psychologyTest',
  title: testInfo.title,
  slug: { current: 'beck-anksiyete' },
  // category: anxietyCategory referansı Sanity'de manuel eklenecek
  description: testInfo.description,
  instructions: testInfo.instructions,
  disclaimer: testInfo.disclaimer,
  duration: testInfo.duration,
  // questions: sorular Sanity'de manuel bağlanacak
  scoringMethod: 'total',
  interpretationRanges: [
    {
      minScore: 0,
      maxScore: 7,
      interpretation: 'Düşük düzeyde anksiyete',
      severity: 'low',
      color: 'green',
    },
    {
      minScore: 8,
      maxScore: 15,
      interpretation: 'Hafif düzeyde anksiyete',
      severity: 'mild',
      color: 'yellow',
    },
    {
      minScore: 16,
      maxScore: 25,
      interpretation: 'Orta düzeyde anksiyete',
      severity: 'moderate',
      color: 'orange',
    },
    {
      minScore: 26,
      maxScore: 63, // 21 soru x 3 maksimum puan
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

// JSON formatında export et
console.log('=== BECK ANKSİYETE KATEGORİSİ ===')
console.log(JSON.stringify(anxietyCategory, null, 2))

console.log('\n=== BECK ANKSİYETE SORULARI ===')
beckAnxietyQuestions.forEach((q, index) => {
  console.log(`\n--- Soru ${index + 1} ---`)
  console.log(JSON.stringify(q, null, 2))
})

console.log('\n=== BECK ANKSİYETE TESTİ ===')
console.log(JSON.stringify(beckAnxietyTest, null, 2))

// Node.js için export
export {
  anxietyCategory,
  beckAnxietyQuestions,
  beckAnxietyTest,
}