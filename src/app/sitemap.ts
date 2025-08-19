import { MetadataRoute } from 'next'
import { getAvailableYears } from '@/lib/holiday-data'

// Get month name in URL format (lowercase)
function getMonthName(month: number, locale: string): string {
  const monthNames = {
    id: ['januari', 'februari', 'maret', 'april', 'mei', 'juni',
         'juli', 'agustus', 'september', 'oktober', 'november', 'desember'],
    en: ['january', 'february', 'march', 'april', 'may', 'june',
         'july', 'august', 'september', 'october', 'november', 'december']
  }
  
  return monthNames[locale as keyof typeof monthNames][month - 1] || monthNames.id[month - 1]
}

// Get data last modified date (when holiday data was updated)
function getDataLastModified(year: number): Date {
  // Return actual data update dates
  if (year === 2025) return new Date('2025-08-19T12:00:00Z') // When we updated 2025 data
  if (year === 2024) return new Date('2024-12-01T00:00:00Z') // Estimated 2024 data date
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://holiday.forpublic.id'
  const locales = ['id', 'en'] as const
  const years = getAvailableYears() // [2024, 2025]
  const currentYear = new Date().getFullYear()
  
  // Base pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...locales.map(locale => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    })),
    // About pages
    ...locales.map(locale => ({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  ]
  
  // Generate all month pages
  const monthPages = []
  for (const locale of locales) {
    for (const year of years) {
      for (let month = 1; month <= 12; month++) {
        const monthName = getMonthName(month, locale)
        const lastModified = getDataLastModified(year)
        
        // Higher priority for current year, current month gets highest
        let priority = 0.6
        if (year === currentYear) {
          priority = 0.8
          if (month === new Date().getMonth() + 1) {
            priority = 0.9 // Current month gets highest priority
          }
        }
        
        // More frequent updates for current year
        const changeFrequency = year === currentYear ? 'weekly' as const : 'monthly' as const
        
        monthPages.push({
          url: `${baseUrl}/${locale}/${year}/${monthName}`,
          lastModified,
          changeFrequency,
          priority,
        })
      }
    }
  }
  
  // Sort by priority (highest first) then by date
  const allPages = [...staticPages, ...monthPages].sort((a, b) => b.priority - a.priority)
  
  return allPages
}