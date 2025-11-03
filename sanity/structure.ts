import type {StructureResolver} from 'sanity/structure'
import {CogIcon, HomeIcon, UserIcon, EnvelopeIcon, DocumentIcon, DocumentTextIcon} from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('İçerik')
    .items([
      // Singleton - Site Ayarları
      S.listItem()
        .title('Site Ayarları')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      S.divider(),
      
      // Sayfa Yönetimi
      S.listItem()
        .title('Sayfa İçerikleri')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Sayfa İçerikleri')
            .items([
              // Ana Sayfa
              S.listItem()
                .title('Ana Sayfa')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                ),
              
              // Hakkımda Sayfası
              S.listItem()
                .title('Hakkımda Sayfası')
                .icon(UserIcon)
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                ),
              
              // Hizmetler Sayfası
              S.listItem()
                .title('Hizmetler Sayfası')
                .child(
                  S.document()
                    .schemaType('servicesPage')
                    .documentId('servicesPage')
                ),
              
              // Blog Sayfası
              S.listItem()
                .title('Blog Sayfası')
                .child(
                  S.document()
                    .schemaType('blogPage')
                    .documentId('blogPage')
                ),
              
              // İletişim Sayfası
              S.listItem()
                .title('İletişim Sayfası')
                .icon(EnvelopeIcon)
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                ),
            ])
        ),
      
      S.divider(),
      
      // Blog & İçerikler
      S.listItem()
        .title('Blog & İçerikler')
        .child(
          S.list()
            .title('Blog & İçerikler')
            .items([
              S.documentTypeListItem('post').title('Blog Yazıları'),
              S.documentTypeListItem('category').title('Kategoriler'),
              S.documentTypeListItem('author').title('Yazarlar'),
            ])
        ),
      
      S.divider(),
      
      // Hizmetler
      S.documentTypeListItem('service').title('Hizmetler'),
      
      S.divider(),
      
      // Dinamik Test Sistemi
      S.listItem()
        .title('Test Sistemi')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Test Sistemi')
            .items([
              S.documentTypeListItem('testCategory').title('Test Kategorileri'),
              S.documentTypeListItem('question').title('Sorular'),
              S.documentTypeListItem('psychologyTest').title('Psikoloji Testleri'),
              S.documentTypeListItem('testResult').title('Test Sonuçları'),
            ])
        ),
      
      S.divider(),
      
      // Eski Psikolojik Testler (Fallback)
      S.documentTypeListItem('testPage').title('Eski Test Sayfaları (Fallback)'),
      
      S.divider(),
      
  
    ])