import { Holiday } from '@/types/holiday'

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

// Base keywords for each language
export const baseKeywords = {
  id: [
    'kalender libur', 'hari libur indonesia', 'cuti bersama', 'libur nasional',
    'hari libur 2025', 'kalender indonesia', 'libur daerah', 'hari raya'
  ],
  en: [
    'indonesian holidays', 'holiday calendar', 'public holidays', 'national holidays',
    'indonesia 2025 holidays', 'indonesian calendar', 'regional holidays', 'religious holidays'
  ]
}

// Generate month-specific keywords
export function generateMonthKeywords(month: number, year: number, locale: string): string[] {
  const base = baseKeywords[locale as keyof typeof baseKeywords] || baseKeywords.id
  const monthName = getMonthName(month, locale).toLowerCase()
  
  const monthSpecific = [
    `${monthName} ${year}`,
    `libur ${monthName} ${year}`,
    `kalender ${monthName} ${year}`,
    `hari libur ${monthName} ${year}`,
  ]
  
  // Add seasonal keywords
  const seasonal = getSeasonalKeywords(month, locale)
  
  return [...base, ...monthSpecific, ...seasonal]
}

// Get month name for URL and display
export function getMonthName(month: number, locale: string): string {
  const monthNames = {
    id: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
         'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    en: ['January', 'February', 'March', 'April', 'May', 'June',
         'July', 'August', 'September', 'October', 'November', 'December']
  }
  
  return monthNames[locale as keyof typeof monthNames][month - 1] || monthNames.id[month - 1]
}

// Get seasonal keywords based on month
export function getSeasonalKeywords(month: number, locale: string): string[] {
  if (locale === 'id') {
    switch (month) {
      case 1: return ['tahun baru', 'libur januari', 'imlek 2025']
      case 3: case 4: return ['lebaran 2025', 'idul fitri', 'mudik lebaran']
      case 6: return ['libur mid year', 'idul adha', 'haji']
      case 8: return ['17 agustus', 'kemerdekaan', 'hut ri', 'dirgahayu']
      case 12: return ['natal 2025', 'tahun baru 2026', 'libur akhir tahun']
      default: return []
    }
  } else {
    switch (month) {
      case 1: return ['new year', 'january holidays', 'chinese new year']
      case 3: case 4: return ['eid 2025', 'ramadan', 'islamic holidays']
      case 8: return ['independence day', 'august 17', 'indonesia independence']
      case 12: return ['christmas', 'new year 2026', 'year end holidays']
      default: return []
    }
  }
}

// Generate rich description for month page
export function generateMonthDescription(
  holidays: Holiday[], 
  monthName: string, 
  year: number, 
  locale: string
): string {
  const holidayCount = holidays.length
  const nationalCount = holidays.filter(h => h.type === 'national').length
  const jointLeaveCount = holidays.filter(h => h.type === 'joint_leave').length
  
  if (locale === 'id') {
    const majorHolidays = holidays
      .filter(h => h.type === 'national')
      .slice(0, 2)
      .map(h => h.name.id)
      .join(', ')
    
    let description = `Kalender hari libur ${monthName} ${year} lengkap dengan ${holidayCount} hari libur`
    
    if (nationalCount > 0) {
      description += `, termasuk ${nationalCount} libur nasional`
      if (majorHolidays) description += ` seperti ${majorHolidays}`
    }
    
    if (jointLeaveCount > 0) {
      description += ` dan ${jointLeaveCount} hari cuti bersama`
    }
    
    description += `. Perencanaan cuti dan long weekend untuk ${monthName} ${year} di Indonesia.`
    
    return description
  } else {
    const majorHolidays = holidays
      .filter(h => h.type === 'national')
      .slice(0, 2)
      .map(h => h.name.en)
      .join(', ')
    
    let description = `Complete ${monthName} ${year} Indonesian holiday calendar with ${holidayCount} holidays`
    
    if (nationalCount > 0) {
      description += `, including ${nationalCount} national holidays`
      if (majorHolidays) description += ` such as ${majorHolidays}`
    }
    
    if (jointLeaveCount > 0) {
      description += ` and ${jointLeaveCount} joint leave days`
    }
    
    description += `. Plan your vacation and long weekends for ${monthName} ${year} in Indonesia.`
    
    return description
  }
}

// Generate SEO-optimized title
export function generateMonthTitle(
  holidays: Holiday[], 
  monthName: string, 
  year: number, 
  locale: string
): string {
  const holidayCount = holidays.length
  
  if (locale === 'id') {
    if (holidayCount === 0) {
      return `Kalender ${monthName} ${year} - Tidak Ada Libur | Holiday Calendar Indonesia`
    } else if (holidayCount === 1) {
      const holiday = holidays[0]
      return `${holiday.name.id} - Libur ${monthName} ${year} | Kalender Indonesia`
    } else {
      return `Hari Libur ${monthName} ${year} - ${holidayCount} Libur & Cuti | Kalender Indonesia`
    }
  } else {
    if (holidayCount === 0) {
      return `${monthName} ${year} Calendar - No Holidays | Indonesian Holiday Calendar`
    } else if (holidayCount === 1) {
      const holiday = holidays[0]
      return `${holiday.name.en} - ${monthName} ${year} Holiday | Indonesian Calendar`
    } else {
      return `${monthName} ${year} Holidays - ${holidayCount} Indonesian Holidays | Holiday Calendar`
    }
  }
}