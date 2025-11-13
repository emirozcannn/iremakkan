import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { 
      testId, 
      testSlug, 
      testType, // legacy support
      answers, 
      totalScore, 
      interpretation, 
      severity,
      userInfo 
    } = body

    // Validasyon
    if (!userInfo?.firstName || !userInfo?.lastName || !userInfo?.email) {
      return NextResponse.json(
        { error: 'Ad, soyad ve e-posta alanları zorunludur.' },
        { status: 400 }
      )
    }

    // Email format kontrolü
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(userInfo.email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      )
    }

    // İsim kontrolü - sadece harf
    const nameRegex = /^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]{2,30}$/
    if (!nameRegex.test(userInfo.firstName) || !nameRegex.test(userInfo.lastName)) {
      return NextResponse.json(
        { error: 'Ad ve soyad sadece harf içermelidir (2-30 karakter).' },
        { status: 400 }
      )
    }

    // Disposable email kontrolü
    const disposableEmailDomains = [
      '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 
      'mailinator.com', 'temp-mail.org', 'yopmail.com'
    ]
    const emailDomain = userInfo.email.split('@')[1]?.toLowerCase()
    if (disposableEmailDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: 'Geçici e-posta adresleri kabul edilmez.' },
        { status: 400 }
      )
    }

    // Test sorularını al
    const getQuestionData = async (testType: string, questionIndex: number, answerValue: number) => {
      try {
        // Test soru dosyalarını dinamik olarak import et
        let questions: Array<{ id: number; text: string; options: string[] }> = []
        
        switch (testType) {
          case 'beck-depresyon':
            const beckDepModule = await import('@/app/(site)/testler/beck-depresyon/questions')
            questions = beckDepModule.questions
            break
          case 'beck-anksiyete':
            const beckAnxModule = await import('@/app/(site)/testler/beck-anksiyete/questions')
            questions = beckAnxModule.questions
            break
          case 'kisa-semptom':
            const shortSymptomModule = await import('@/app/(site)/testler/kisa-semptom/questions')
            questions = shortSymptomModule.questions
            break
          case 'young-sema-olcegi':
            const youngSchemaModule = await import('@/app/(site)/testler/young-sema-olcegi/questions')
            questions = youngSchemaModule.questions
            break
          default:
            return null
        }

        const question = questions[questionIndex]
        if (!question) return null

        return {
          questionId: `${testType}-q${questionIndex + 1}`,
          questionText: question.text,
          selectedOption: question.options[answerValue] || `Seçenek ${answerValue}`,
          selectedValue: answerValue,
          weight: 1.0,
        }
      } catch (error) {
        console.error(`Test soruları yüklenirken hata (${testType}):`, error)
        return null
      }
    }

    // Sanity'ye kaydetmek için test result belgesi oluştur
    const testResult = {
      _type: 'testResult',
      // Dinamik test için
      ...(testId && {
        test: {
          _type: 'reference',
          _ref: testId,
        }
      }),
      // Legacy test desteği için
      ...(testType && { testType }),
      
      // Yeni dinamik answer formatı
      ...(Array.isArray(answers) && answers.length > 0 && answers[0].questionId && {
        answers: answers.map((answer, index) => ({
          _type: 'object',
          _key: `answer-${index}`,
          questionId: answer.questionId,
          questionText: answer.questionText,
          selectedOption: answer.selectedOption,
          selectedValue: answer.selectedValue,
          weight: answer.weight || 1.0,
        }))
      }),
      
      // Legacy testler için gelişmiş answer formatı
      ...(Array.isArray(answers) && answers.length > 0 && typeof answers[0] === 'number' && testType && {
        answers: await Promise.all(
          answers.map(async (answerValue, index) => {
            const questionData = await getQuestionData(testType, index, answerValue)
            return questionData ? {
              _type: 'object',
              _key: `answer-${index}`,
              ...questionData
            } : {
              _type: 'object',
              _key: `answer-${index}`,
              questionId: `${testType}-q${index + 1}`,
              questionText: `Soru ${index + 1}`,
              selectedOption: `Seçenek ${answerValue}`,
              selectedValue: answerValue,
              weight: 1.0,
            }
          })
        ),
        // Legacy answers'ı da sakla geriye uyumluluk için
        legacyAnswers: answers
      }),
      
      totalScore: totalScore || 0,
      interpretation: interpretation || '',
      severity: severity || 'low',
      
      userInfo: {
        firstName: userInfo.firstName.trim(),
        lastName: userInfo.lastName.trim(),
        email: userInfo.email.trim().toLowerCase(),
        phone: userInfo.phone?.trim() || null,
      },
      
      // Metadata
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown',
      status: 'completed',
      needsFollowUp: severity === 'high' || severity === 'severe',
      createdAt: new Date().toISOString(),
    }

    // Sanity'ye kaydet
    const result = await writeClient.create(testResult)
    
    console.log('✅ Test sonucu Sanity\'ye kaydedildi:', {
      id: result._id,
      testId: testId || testType,
      testSlug,
      userEmail: userInfo.email,
      totalScore,
      interpretation
    })

    return NextResponse.json(
      { 
        message: 'Test sonucu başarıyla kaydedildi',
        id: result._id,
        totalScore,
        interpretation 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('❌ Test sonucu kaydedilirken hata:', error)
    
    if (error instanceof Error && error.message.includes('project user not found')) {
      return NextResponse.json(
        { error: 'Sanity veritabanına yazma yetkisi yok. Admin ile iletişime geçin.' },
        { status: 403 }
      )
    }
    
    return NextResponse.json(
      { error: 'Test sonucu kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}