import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-10-18',
  useCdn: false,
})

export async function POST(req: Request) {
  try {
    console.log('🔍 API called with:', {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      hasToken: !!process.env.SANITY_API_TOKEN,
    })

    const body = await req.json()
    console.log('🔍 Request body:', body)

    const {
      testType,
      answers,
      totalScore,
      interpretation,
      userInfo,
    } = body

    // Basit validasyon
    if (!userInfo?.firstName || !userInfo?.lastName || !userInfo?.email) {
      return NextResponse.json(
        { error: 'Ad, soyad ve e-posta alanları zorunludur.' },
        { status: 400 }
      )
    }

    // Basit document
    const doc = {
      _type: 'testResult',
      testType,
      answers,
      totalScore,
      interpretation,
      userInfo,
      createdAt: new Date().toISOString(),
    }

    console.log('🔍 Creating document:', doc)

    // Test connection first
    try {
      const connectionTest = await client.fetch('*[_type == "testResult"][0]')
      console.log('🔍 Connection test successful:', !!connectionTest)
    } catch (connError) {
      console.error('❌ Connection test failed:', connError)
      return NextResponse.json(
        { error: 'Sanity bağlantı hatası', details: connError },
        { status: 500 }
      )
    }

    // Create document
    const result = await client.create(doc)
    console.log('✅ Document created:', result._id)

    return NextResponse.json(
      { message: 'Test sonucu başarıyla kaydedildi', id: result._id },
      { status: 200 }
    )

  } catch (error: unknown) {
    console.error('❌ Genel hata:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
    return NextResponse.json(
      { error: 'Test sonucu kaydedilemedi', details: errorMessage },
      { status: 500 }
    )
  }
}