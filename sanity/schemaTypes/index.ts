import { type SchemaTypeDefinition } from 'sanity'

// 🧩 Content Types
import { blockContentType } from './blockContentType'
import { postType } from './postType'
import { serviceType } from './serviceType'
import { servicesPageType } from './servicesPage'
import { pageType } from './pageType'
import { contactPageType } from './contactPageType'
import { homePageType } from './homePageType'
import { aboutPageType } from './aboutPageType'
import { testPageType } from './testPageType'
import blogPage from './blogPage'
import testResult from './testResult'

// 🔬 Psychology Test System
import { testCategoryType } from './testCategoryType'
import { questionType } from './questionType'
import { psychologyTestType } from './psychologyTestType'

// 🏷️ Reference Types
import { categoryType } from './categoryType'
import { authorType } from './authorType'

// ⚙️ Singleton Types
import { settingsType } from './settingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // === Content ===
    blockContentType,
    postType,
    serviceType,
    servicesPageType,
    pageType,
    homePageType,
    aboutPageType,
    contactPageType,
    testPageType,
    blogPage,
    testResult,

    // === Psychology Test System ===
    testCategoryType,
    questionType,
    psychologyTestType,

    // === Reference ===
    categoryType,
    authorType,

    // === Singleton ===
    settingsType,
  ],
}
