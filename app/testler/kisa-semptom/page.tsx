'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { questions, testInfo } from './questions'

type Answer = {
  questionId: number
  value: number
}

export default function BeckDepressionTestPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [started, setStarted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [autoAdvance, setAutoAdvance] = useState(false)

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  // Geçerli sorunun cevabını bul
  const getCurrentAnswer = () =>
    answers.find(a => a.questionId === currentQuestion?.id)?.value

  const currentAnswer = getCurrentAnswer()

  // Cevap seçimi
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

    setAutoAdvance(true)
  }

  // Otomatik ilerleme (race condition’sız)
  useEffect(() => {
    if (autoAdvance && currentStep < questions.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setAutoAdvance(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [autoAdvance, currentStep])

  const handlePrevious = () => {
    setCurrentStep(prev => (prev > 0 ? prev - 1 : prev))
  }

  const handleSubmit = () => {
    console.log('Test Sonuçları:', answers)
    setSubmitted(true)
  }

  // 🟡 Başlangıç Ekranı
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
              <p className="text-lg text-navy/70 max-w-2xl mx-auto">{testInfo.description}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gold/20 p-8 md:p-12 mb-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Soru Sayısı */}
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

                {/* Tahmini Süre */}
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

              {/* Talimatlar */}
              <div className="border-t border-gold/20 pt-8">
                <h3 className="font-display font-bold text-xl text-navy mb-4">Test Talimatları</h3>
                <ul className="space-y-3">
                  {testInfo.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center mt-0.5">
                        <span className="text-gold text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-navy/70">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not */}
              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                <p className="text-sm text-amber-900 leading-relaxed">
                  <span className="font-semibold">Not:</span> {testInfo.disclaimer}
                </p>
              </div>

              {/* Başla Butonu */}
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

  // 🟢 Test Sonu Ekranı
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
              <p className="text-lg text-navy/70 mb-8">
                Yanıtlarınız başarıyla kaydedildi. Sonuçlar değerlendirilecek ve sizinle iletişime geçilecektir.
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

  // 🔵 Soru Ekranı
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
              <span className="text-sm font-medium text-navy/60">%{Math.round(progress)}</span>
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

          {/* Question Card */}
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

              {/* Navigation Buttons */}
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
