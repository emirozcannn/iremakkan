import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {serviceType} from './serviceType'
import {pageType} from './pageType'
import {settingsType} from './settingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content types
    blockContentType,
    postType,
    serviceType,
    pageType,
    
    // Reference types
    categoryType,
    authorType,
    
    // Singleton
    settingsType,
  ],
}
