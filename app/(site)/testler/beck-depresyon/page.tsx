'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { questions, testInfo } from './questions'

type Answer = {
  questionId: number
  value: number
}

// 💬 Beck Depresyon Ölçeği Yorumlama Fonksiyonu
function interpretBeckDepression(score: number) {
  if (score <= 9) return "Minimal depresyon düzeyi"
  if (score <= 16) return "Hafif depresyon düzeyi"
  if (score <= 29) return "Orta depresyon düzeyi"
  return "Şiddetli depresyon düzeyi"
}

function getSeverityLevel(score: number) {
  if (score <= 9) return "low"
  if (score <= 16) return "mild"
  if (score <= 29) return "moderate"
  return "severe"
}

export default function BeckDepressionTestPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [started, setStarted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [totalScore, setTotalScore] = useState<number | null>(null)
  const [interpretation, setInterpretation] = useState<string | null>(null)
  // collect contact AFTER test completion
  const [awaitingContact, setAwaitingContact] = useState(false)
  const [contactFirstName, setContactFirstName] = useState('')
  const [contactLastName, setContactLastName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')

  const currentQuestion = questions[currentStep]
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id)?.value
  const progress = ((currentStep + 1) / questions.length) * 100

  // ✅ Cevap seçildiğinde kaydet
  const handleAnswer = (value: number) => {
    if (!currentQuestion) return
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === currentQuestion.id)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = { questionId: currentQuestion.id, value }
        return updated
      }
      return [...prev, { questionId: currentQuestion.id, value }]
    })
  }

  // ✅ Otomatik ilerleme
  useEffect(() => {
    if (currentAnswer !== undefined && currentStep < questions.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep(s => s + 1)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [currentAnswer, currentStep])

  const handlePrevious = () => setCurrentStep(s => (s > 0 ? s - 1 : s))

  // when finished with questions, compute results and show contact form
  const handleSubmit = () => {
    const total = answers.reduce((sum, a) => sum + a.value, 0)
    const interpretationText = interpretBeckDepression(total)
    const severityLevel = getSeverityLevel(total)
    setTotalScore(total)
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
          testType: 'beck-depresyon',
          answers: answers.map(a => a.value),
          totalScore: totalScore,
          interpretation: interpretation,
          severity: getSeverityLevel(totalScore || 0),
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

      console.log('✅ Test sonucu Sanity\'ye kaydedildi:', data)
      setSubmitted(true)
      setAwaitingContact(false)
    } catch (error) {
      console.error('❌ Test sonucu kaydedilirken hata:', error)
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata oluştu'
      alert(`Hata: ${errorMessage}`)
    }
  }

  // 🟡 BAŞLANGIÇ SAYFASI
  if (!started) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-ivory via-pearl to-stone pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-2 bg-gold/10 rounded-full mb-6">
                <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                  Psikolojik Değerlendirme
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-6">
                {testInfo.title}
              </h1>
              <p className="text-lg text-navy/70 max-w-2xl mx-auto">
                {testInfo.description}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gold/20 p-8 md:p-12 mb-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 to-teal/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-navy/60 font-medium">Soru Sayısı</p>
                    <p className="text-2xl font-bold text-navy">{questions.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal/20 to-gold/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-navy/60 font-medium">Tahmini Süre</p>
                    <p className="text-2xl font-bold text-navy">{testInfo.duration}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gold/20 pt-8">
                <h3 className="font-display font-bold text-xl text-navy mb-4">Test Talimatları</h3>
                <ul className="space-y-3">
                  {testInfo.instructions.map((instruction, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center mt-0.5">
                        <span className="text-gold text-sm font-bold">{i + 1}</span>
                      </div>
                      <span className="text-navy/70">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* (Kullanıcı bilgileri artık test SONRASI toplanacak) */}

              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-900">
                <span className="font-semibold">Not:</span> {testInfo.disclaimer}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setStarted(true)}
                  className="px-12 py-5 bg-gradient-to-r from-gold to-gold-dark text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  Teste Başla
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  // show contact form after test completion, before final submitted state
  if (awaitingContact) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-ivory via-pearl to-stone pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gold/20 p-12">
              <h2 className="text-3xl font-display font-bold text-navy mb-4">Test Sonuçları</h2>
              <p className="text-lg text-navy/70 mb-2">Toplam Puanınız: <span className="font-semibold text-navy">{totalScore}</span></p>
              <p className="text-lg text-navy/70 mb-6">Değerlendirme: <span className="font-semibold text-gold">{interpretation}</span></p>

              <div className="text-left max-w-md mx-auto">
                <h3 className="font-semibold text-navy mb-3">İletişim Bilgileri</h3>
                <div className="grid grid-cols-1 gap-3">
                  <input value={contactFirstName} onChange={e => setContactFirstName(e.target.value)} type="text" placeholder="Ad" className="w-full p-3 border border-gold/30 rounded-xl" />
                  <input value={contactLastName} onChange={e => setContactLastName(e.target.value)} type="text" placeholder="Soyad" className="w-full p-3 border border-gold/30 rounded-xl" />
                  <input value={contactEmail} onChange={e => setContactEmail(e.target.value)} type="email" placeholder="E-posta" className="w-full p-3 border border-gold/30 rounded-xl" />
                  <input value={contactPhone} onChange={e => setContactPhone(e.target.value)} type="tel" placeholder="Telefon (opsiyonel)" className="w-full p-3 border border-gold/30 rounded-xl" />
                </div>
                <div className="mt-6 flex gap-4 justify-center">
                  <button onClick={saveContactAndResult} className="px-8 py-3 bg-gradient-to-r from-gold to-gold-dark text-white rounded-2xl font-semibold">Sonuçları Kaydet</button>
                  <button onClick={() => setAwaitingContact(false)} className="px-6 py-3 bg-white border-2 border-gold text-navy rounded-2xl">Gözden Geç</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  // 🟢 TAMAMLANDI SAYFASI
  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-ivory via-pearl to-stone pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gold/20 p-12">
              <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-display font-bold text-navy mb-4">Test Tamamlandı!</h2>
              <p className="text-lg text-navy/70 mb-2">
                Toplam Puanınız: <span className="font-semibold text-navy">{totalScore}</span>
              </p>
              <p className="text-lg text-navy/70 mb-8">
                Değerlendirme: <span className="font-semibold text-gold">{interpretation}</span>
              </p>
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
  return (
    <main className="min-h-screen bg-gradient-to-br from-ivory via-pearl to-stone pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-navy/60">
                Soru {currentStep + 1} / {questions.length}
              </span>
              <span className="text-sm font-medium text-navy/60">
                %{Math.round(progress)}
              </span>
            </div>
            <div className="h-3 bg-white/50 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gold/20 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-navy mb-8">
                {currentQuestion.text}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                      currentAnswer === index
                        ? 'border-gold bg-gradient-to-r from-gold/10 to-gold/20 shadow-lg'
                        : 'border-stone hover:border-gold/50 hover:bg-gold/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          currentAnswer === index ? 'border-gold bg-gold' : 'border-navy/30'
                        }`}
                      >
                        {currentAnswer === index && <div className="w-3 h-3 bg-white rounded-full" />}
                      </div>
                      <span
                        className={`text-lg ${
                          currentAnswer === index ? 'text-navy font-semibold' : 'text-navy/70'
                        }`}
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-8 border-t border-gold/20">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 0
                      ? 'opacity-50 cursor-not-allowed bg-stone text-navy/50'
                      : 'bg-white border-2 border-gold text-navy hover:bg-gold/10'
                  }`}
                >
                  ← Önceki
                </button>

                {currentStep === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={currentAnswer === undefined}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      currentAnswer === undefined
                        ? 'opacity-50 cursor-not-allowed bg-stone text-navy/50'
                        : 'bg-gradient-to-r from-gold to-gold-dark text-white hover:shadow-lg hover:-translate-y-1'
                    }`}
                  >
                    Sonuçları Gönder
                  </button>
                ) : (
                  <div className="text-navy/60 text-sm">
                    Cevap seçtiğinizde otomatik ilerler
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
