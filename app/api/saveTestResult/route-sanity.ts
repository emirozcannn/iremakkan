import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-10-18',
  useCdn: false,
  ignoreBrowserTokenWarning: true,
  perspective: 'published', // Explicit perspective
})

export async function POST(req: Request) {
  try {
    // Debug: Environment variables'ları logla
    console.log('🔍 Debug - Environment:', {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      hasToken: !!process.env.SANITY_API_TOKEN,
      tokenPrefix: process.env.SANITY_API_TOKEN?.substring(0, 10) + '...'
    })

    const body = await req.json()

    const {
      testType,
      answers,
      totalScore,
      averageScore,
      interpretation,
      userInfo,
    } = body

    // 🛡️ Email validasyonu - bot koruması
    if (!userInfo?.email || !userInfo?.firstName || !userInfo?.lastName) {
      return NextResponse.json(
        { error: 'Ad, soyad ve e-posta alanları zorunludur.' },
        { status: 400 }
      )
    }

    // Güçlü email regex kontrolü
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(userInfo.email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      )
    }

    // Yaygın geçici/sahte email servislerini engelle
    const disposableEmailDomains = [
      '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 
      'tempmail.org', 'throwaway.email', '33mail.com', 'getnada.com',
      'yopmail.com', 'temp-mail.org', 'minuteinbox.com'
    ]
    const emailDomain = userInfo.email.toLowerCase().split('@')[1]
    if (disposableEmailDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: 'Geçici e-posta adresleri kabul edilmemektedir.' },
        { status: 400 }
      )
    }

    // İsim validasyonu - sadece harf ve temel karakterler
    const nameRegex = /^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]{2,30}$/
    if (!nameRegex.test(userInfo.firstName) || !nameRegex.test(userInfo.lastName)) {
      return NextResponse.json(
        { error: 'Ad ve soyad sadece harf içermelidir (2-30 karakter).' },
        { status: 400 }
      )
    }

    // 🧩 Uyumlu şekilde testResult dokümanı oluşturuluyor
    const doc = {
      _type: 'testResult',
      testType,
      answers,
      totalScore: totalScore ?? averageScore ?? null,
      interpretation,
      userInfo: {
        firstName: userInfo.firstName.trim(),
        lastName: userInfo.lastName.trim(),
        email: userInfo.email.toLowerCase().trim(),
        phone: userInfo.phone?.trim() || null,
      },
      createdAt: new Date().toISOString(),
    }

    console.log('🔍 Attempting to create document:', { docType: doc._type, testType: doc.testType })

    // İlk önce basit bir test sorgusu yapalım
    const testQuery = await client.fetch('*[_type == "testResult"][0..1]')
    console.log('🔍 Test query result:', testQuery)

    // Sonra document oluşturmayı deneyelim
    const result = await client.create(doc)

    return NextResponse.json(
      { message: 'Test sonucu başarıyla kaydedildi', id: result._id },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error('❌ Test sonucu kaydedilirken hata:', error)
    
    // Sanity permission hatasını özel olarak yakala
    if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 403) {
      return NextResponse.json(
        { error: 'Sanity veritabanına yazma yetkisi yok. Admin ile iletişime geçin.' },
        { status: 403 }
      )
    }

    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
    return NextResponse.json(
      { error: 'Test sonucu kaydedilemedi', details: errorMessage },
      { status: 500 }
    )
  }
}
