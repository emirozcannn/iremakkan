'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { questions } from './questions'

type Answer = {
  questionId: number
  value: number
}

// 💬 Young Schema genel değerlendirme (0–6 arası ölçek)
function interpretYoungSchema(score: number) {
  if (score <= 2) return 'Düşük şema etkisi (sağlıklı düzey)'
  if (score <= 3.5) return 'Orta düzeyde şema etkisi'
  return 'Yüksek düzeyde şema etkisi (dikkat edilmesi gerekir)'
}

export default function YoungSchemaQuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [started, setStarted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [totalScore, setTotalScore] = useState<number | null>(null)
  const [interpretation, setInterpretation] = useState<string | null>(null)
  const [awaitingContact, setAwaitingContact] = useState(false)
  const [contactFirstName, setContactFirstName] = useState('')
  const [contactLastName, setContactLastName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')

  const totalQuestions = questions.length
  const progress = ((currentStep + 1) / totalQuestions) * 100

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers]
    const existingIndex = newAnswers.findIndex(a => a.questionId === currentStep + 1)

    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId: currentStep + 1, value }
    } else {
      newAnswers.push({ questionId: currentStep + 1, value })
    }

    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentStep < totalQuestions - 1) {
        setCurrentStep(currentStep + 1)
      }
    }, 300)
  }

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    const total = answers.reduce((sum, a) => sum + a.value, 0)
    const avg = total / totalQuestions
    const interpretationText = interpretYoungSchema(avg)

    setTotalScore(avg)
    setInterpretation(interpretationText)
    setAwaitingContact(true)

  }

  const saveContactAndResult = async () => {
    // Temel validasyon
    if (!contactFirstName.trim() || !contactLastName.trim() || !contactEmail.trim()) {
      alert('Lütfen ad, soyad ve e-posta adresinizi giriniz.')
      return
    }

    // Email format kontrolü
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(contactEmail.trim())) {
      alert('Lütfen geçerli bir e-posta adresi giriniz.')
      return
    }

    // İsim kontrolü - sadece harf
    const nameRegex = /^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]{2,30}$/
    if (!nameRegex.test(contactFirstName.trim()) || !nameRegex.test(contactLastName.trim())) {
      alert('Ad ve soyad sadece harf içermelidir (2-30 karakter).')
      return
    }

    try {
      const response = await fetch('/api/saveTestResult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testType: 'young-sema-olcegi',
          answers: answers.map(a => a.value),
          totalScore: totalScore,
          interpretation: interpretation,
          userInfo: {
            firstName: contactFirstName.trim(),
            lastName: contactLastName.trim(),
            email: contactEmail.trim().toLowerCase(),
            phone: contactPhone.trim() || null,
          },
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Sunucu hatası oluştu.')

      console.log('✅ Young Schema sonucu Sanity\'ye kaydedildi:', data)
      setSubmitted(true)
      setAwaitingContact(false)
    } catch (error) {
      console.error('❌ Sanity kaydı hatası:', error)
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata oluştu'
      alert(`Hata: ${errorMessage}`)
    }
  }

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentStep + 1)?.value
  }

  // 🟡 Başlangıç Ekranı
  if (!started) {
    return (
      <main className="min-h-screen bg-premium pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-teal/5 rounded-full blur-3xl"></div>

            <div className="relative bg-white/80 backdrop-blur-xl border border-gold/20 rounded-3xl p-12 shadow-2xl">
              <div className="absolute top-8 right-8 w-20 h-20 border-2 border-gold/20 rotate-12 rounded-2xl"></div>
              <div className="absolute bottom-8 left-8 w-3 h-16 bg-gradient-to-b from-teal/30 to-transparent rotate-45"></div>

              <div className="relative z-10 text-center space-y-8">
                <div className="inline-block">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gold to-gold-dark rounded-2xl flex items-center justify-center shadow-lg shadow-gold/30">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
                  Young Şema Ölçeği
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full mx-auto"></div>

                <p className="text-lg text-navy/70 leading-relaxed max-w-2xl mx-auto">
                  Bu test 90 sorudan oluşmaktadır. Her soru için size en uygun seçeneği işaretleyiniz. 
                  Sonuçlarınız gizli tutulacak ve yalnızca profesyonel değerlendirme amacıyla kullanılacaktır.
                </p>

                <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-navy mb-2">Önemli Notlar</h3>
                      <ul className="text-sm text-navy/70 space-y-2">
                        <li>• Test yaklaşık 15-20 dakika sürmektedir</li>
                        <li>• Her soruyu dikkatlice okuyun ve samimi yanıtlayın</li>
                        <li>• Doğru ya da yanlış cevap yoktur</li>
                        <li>• Test sonuçları yalnızca profesyonel değerlendirme içindir</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStarted(true)}
                  className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-gold to-gold-dark text-white font-semibold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <span>Teste Başla</span>
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  // 🟢 SONUÇ SAYFASI
  if (submitted) {
    return (
      <main className="min-h-screen bg-premium pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative bg-white/80 backdrop-blur-xl border border-gold/20 rounded-3xl p-12 shadow-2xl text-center space-y-8">
              <div className="inline-block">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-display font-bold text-navy mb-4">Test Tamamlandı!</h2>
                <p className="text-lg text-navy/70 mb-2">
                  Ortalama Puanınız: <span className="font-semibold text-navy">{totalScore?.toFixed(2)}</span>
                </p>
                <p className="text-lg text-navy/70 mb-8">
                  Değerlendirme: <span className="font-semibold text-gold">{interpretation}</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  Ana Sayfaya Dön
                </Link>
                <Link href="/iletisim" className="px-8 py-4 bg-white border-2 border-gold text-navy font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  İletişime Geç
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  // 🔵 SORU SAYFASI
  const currentQuestion = questions[currentStep]
  const currentAnswer = getCurrentAnswer()

  return (
    <main className="min-h-screen bg-premium pt-32 pb-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-navy">
              Soru {currentStep + 1} / {totalQuestions}
            </span>
            <span className="text-sm font-semibold text-gold">%{Math.round(progress)}</span>
          </div>
          <div className="relative h-3 bg-white/60 backdrop-blur-sm rounded-full overflow-hidden border border-gold/20 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold to-gold-dark rounded-full shadow-lg"
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/80 backdrop-blur-xl border border-gold/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-xl mb-6">
                <span className="text-sm font-bold text-gold">SORU {currentStep + 1}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-navy leading-relaxed mb-8">
                {currentQuestion.text}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                  const value = index + 1
                  const isSelected = currentAnswer === value
                  return (
                    <motion.button
                      key={value}
                      onClick={() => handleAnswer(value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-r from-gold/20 to-gold/30 border-gold shadow-lg'
                          : 'bg-white/50 border-gray-200 hover:border-gold/50 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? 'bg-gold border-gold shadow-lg'
                              : 'bg-white border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`font-medium ${isSelected ? 'text-navy' : 'text-navy/70'}`}>
                          {option}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-gold/20">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white border-2 border-gold text-navy hover:bg-gold/10 hover:shadow-lg'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Önceki
                </button>

                {currentStep === totalQuestions - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!currentAnswer}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      currentAnswer
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl hover:-translate-y-1'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Gönder
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                ) : (
                  <div className="text-sm text-navy/60">
                    Seçiminizi yaptıktan sonra otomatik olarak ilerleyecektir
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
