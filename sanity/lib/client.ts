import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Read-only client (CDN kullanır, hızlı)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Read işlemleri için CDN kullan
})

// Write operations için özel client
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Write işlemleri için CDN kapalı
  token: process.env.SANITY_API_TOKEN, // Write token
})
