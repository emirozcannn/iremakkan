import type {StructureResolver} from 'sanity/structure'
import {CogIcon} from '@sanity/icons'

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
      
      // Blog
      S.documentTypeListItem('post').title('Blog Yazıları'),
      S.documentTypeListItem('category').title('Kategoriler'),
      
      S.divider(),
      
      // Hizmetler
      S.documentTypeListItem('service').title('Hizmetler'),
      
      S.divider(),
      
      // Sayfalar
      S.documentTypeListItem('page').title('Sayfalar'),
      
      S.divider(),
      
      // Diğer
      S.documentTypeListItem('author').title('Yazarlar'),
    ])
