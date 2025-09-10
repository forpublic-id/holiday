export type HolidayType =
  | 'national' // Hari libur nasional
  | 'religious' // Hari libur keagamaan
  | 'regional' // Hari libur daerah
  | 'joint_leave' // Cuti bersama
  | 'commemoration'; // Hari peringatan (tidak libur)

export type Religion =
  | 'islam'
  | 'christian'
  | 'catholic'
  | 'hindu'
  | 'buddhist'
  | 'confucian'
  | 'secular';

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
  | 'papua_barat_daya';

export interface HolidayName {
  id: string; // Indonesian name
  en: string; // English name
}

export interface Holiday {
  id: string;
  name: HolidayName;
  date: string; // ISO date string (YYYY-MM-DD)
  type: HolidayType;
  religion?: Religion;
  provinces?: Province[]; // If empty/undefined, applies to all provinces
  isVariable: boolean; // Whether the date changes yearly (e.g., religious holidays)
  description?: HolidayName;
  source?: string; // Government decree reference
  year: number;
}

export interface HolidayYear {
  year: number;
  holidays: Holiday[];
  jointLeaves: Holiday[]; // Cuti bersama specifically
  lastUpdated: string; // ISO timestamp
  source: string; // Official source/decree
}

export interface HolidayData {
  years: Record<number, HolidayYear>;
  metadata: {
    lastUpdated: string;
    version: string;
    sources: string[];
  };
}

// Helper types for filtering and searching with generic improvements
export interface HolidayFilter {
  year?: number;
  month?: number;
  type?: HolidayType;
  religion?: Religion;
  province?: Province;
}

// Generic filter function type
export type FilterFunction<T> = (item: T, filter: Partial<T>) => boolean;

export interface HolidaySearchResult<T = Holiday> {
  holidays: T[];
  total: number;
  year: number;
  filteredCount?: number;
  facets?: {
    types: Array<{ type: HolidayType; count: number }>;
    religions: Array<{ religion: Religion; count: number }>;
    provinces: Array<{ province: Province; count: number }>;
  };
}

// Long weekend calculation types with generics
export interface LongWeekend<T = Holiday> {
  id: string;
  name: HolidayName;
  startDate: string;
  endDate: string;
  totalDays: number;
  holidays: T[];
  suggestedLeaves: string[]; // Dates to take leave for optimal long weekend
  leaveRequired: number;
  efficiency: number; // Days gained per leave day taken
}

export interface LongWeekendCalculation<T = Holiday> {
  year: number;
  longWeekends: LongWeekend<T>[];
  optimalLeaveStrategy: {
    totalLeaveRequired: number;
    totalDaysOff: number;
    efficiency: number; // Days off per leave day
    recommendations: Array<{
      period: string;
      leaveDate: string;
      daysGained: number;
      holidays: T[];
    }>;
  };
}

// Utility types for better type safety
export type HolidayKey = keyof Holiday;
export type LocalizedString<T extends 'id' | 'en' = 'id' | 'en'> = Record<
  T,
  string
>;
export type OptionalHoliday = Partial<Holiday>;
export type HolidayWithoutId = Omit<Holiday, 'id'>;
export type HolidayUpdate = Partial<
  Pick<Holiday, 'name' | 'date' | 'type' | 'description'>
>;
