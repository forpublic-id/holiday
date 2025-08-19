export type HolidayType = 
  | 'national'        // Hari libur nasional
  | 'religious'       // Hari libur keagamaan
  | 'regional'        // Hari libur daerah
  | 'joint_leave'     // Cuti bersama
  | 'commemoration'   // Hari peringatan (tidak libur)

export type Religion = 
  | 'islam'
  | 'christian'
  | 'catholic'
  | 'hindu'
  | 'buddhist'
  | 'confucian'
  | 'secular'

export type Province = 
  | 'aceh'
  | 'sumatera_utara'
  | 'sumatera_barat'
  | 'riau'
  | 'kepulauan_riau'
  | 'jambi'
  | 'sumatera_selatan'
  | 'bangka_belitung'
  | 'bengkulu'
  | 'lampung'
  | 'dki_jakarta'
  | 'jawa_barat'
  | 'jawa_tengah'
  | 'diy_yogyakarta'
  | 'jawa_timur'
  | 'banten'
  | 'bali'
  | 'nusa_tenggara_barat'
  | 'nusa_tenggara_timur'
  | 'kalimantan_barat'
  | 'kalimantan_tengah'
  | 'kalimantan_selatan'
  | 'kalimantan_timur'
  | 'kalimantan_utara'
  | 'sulawesi_utara'
  | 'sulawesi_tengah'
  | 'sulawesi_selatan'
  | 'sulawesi_tenggara'
  | 'gorontalo'
  | 'sulawesi_barat'
  | 'maluku'
  | 'maluku_utara'
  | 'papua_barat'
  | 'papua'
  | 'papua_selatan'
  | 'papua_tengah'
  | 'papua_pegunungan'
  | 'papua_barat_daya'

export interface HolidayName {
  id: string  // Indonesian name
  en: string  // English name
}

export interface Holiday {
  id: string
  name: HolidayName
  date: string  // ISO date string (YYYY-MM-DD)
  type: HolidayType
  religion?: Religion
  provinces?: Province[]  // If empty/undefined, applies to all provinces
  isVariable: boolean  // Whether the date changes yearly (e.g., religious holidays)
  description?: HolidayName
  source?: string  // Government decree reference
  year: number
}

export interface HolidayYear {
  year: number
  holidays: Holiday[]
  jointLeaves: Holiday[]  // Cuti bersama specifically
  lastUpdated: string  // ISO timestamp
  source: string  // Official source/decree
}

export interface HolidayData {
  years: Record<number, HolidayYear>
  metadata: {
    lastUpdated: string
    version: string
    sources: string[]
  }
}

// Helper types for filtering and searching
export interface HolidayFilter {
  year?: number
  month?: number
  type?: HolidayType
  religion?: Religion
  province?: Province
}

export interface HolidaySearchResult {
  holidays: Holiday[]
  total: number
  year: number
}

// Long weekend calculation types
export interface LongWeekend {
  id: string
  name: HolidayName
  startDate: string
  endDate: string
  totalDays: number
  holidays: Holiday[]
  suggestedLeaves: string[]  // Dates to take leave for optimal long weekend
  leaveRequired: number
}

export interface LongWeekendCalculation {
  year: number
  longWeekends: LongWeekend[]
  optimalLeaveStrategy: {
    totalLeaveRequired: number
    totalDaysOff: number
    efficiency: number  // Days off per leave day
  }
}