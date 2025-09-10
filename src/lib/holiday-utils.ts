import type {
  Holiday,
  HolidayFilter,
  HolidaySearchResult,
  LongWeekend,
  Province,
} from '@/types/holiday';

/**
 * Get all holidays for a specific year
 */
export function getHolidaysByYear(_year: number): Holiday[] {
  // This will be populated when we load the data
  // For now, we'll ignore the year parameter but keep it for future implementation
  return [];
}

/**
 * Filter holidays based on criteria
 */
export function filterHolidays(
  holidays: Holiday[],
  filter: HolidayFilter
): HolidaySearchResult {
  let filtered = holidays;

  if (filter.year) {
    filtered = filtered.filter((h) => h.year === filter.year);
  }

  if (filter.month) {
    filtered = filtered.filter((h) => {
      const date = new Date(h.date);
      return date.getMonth() + 1 === filter.month;
    });
  }

  if (filter.type) {
    filtered = filtered.filter((h) => h.type === filter.type);
  }

  if (filter.religion) {
    filtered = filtered.filter((h) => h.religion === filter.religion);
  }

  if (filter.province) {
    filtered = filtered.filter(
      (h) =>
        !h.provinces ||
        h.provinces.length === 0 ||
        (filter.province && h.provinces.includes(filter.province))
    );
  }

  return {
    holidays: filtered.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ),
    total: filtered.length,
    year: filter.year || new Date().getFullYear(),
  };
}

/**
 * Check if a date is a holiday
 */
export function isHoliday(date: string, holidays: Holiday[]): Holiday | null {
  return holidays.find((h) => h.date === date) || null;
}

/**
 * Get next upcoming holiday
 */
export function getNextHoliday(holidays: Holiday[]): Holiday | null {
  const today = new Date().toISOString().split('T')[0];
  const upcoming = holidays
    .filter((h) => h.date >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return upcoming[0] || null;
}

/**
 * Calculate days until next holiday
 */
export function getDaysUntilHoliday(holiday: Holiday): number {
  const today = new Date();
  const holidayDate = new Date(holiday.date);
  const diffTime = holidayDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get holidays in a specific month
 */
export function getHolidaysInMonth(
  year: number,
  month: number,
  holidays: Holiday[]
): Holiday[] {
  return holidays.filter((h) => {
    const date = new Date(h.date);
    return date.getFullYear() === year && date.getMonth() + 1 === month;
  });
}

/**
 * Check if a date falls on weekend
 */
export function isWeekend(date: string): boolean {
  const d = new Date(date);
  const day = d.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

/**
 * Calculate long weekends
 */
export function calculateLongWeekends(
  year: number,
  holidays: Holiday[]
): LongWeekend[] {
  const longWeekends: LongWeekend[] = [];
  const yearHolidays = holidays.filter((h) => h.year === year);

  // This is a simplified version - full implementation would be more complex
  for (const holiday of yearHolidays) {
    const holidayDate = new Date(holiday.date);
    const dayOfWeek = holidayDate.getDay();

    // Check for long weekend opportunities
    if (dayOfWeek === 1 || dayOfWeek === 5) {
      // Monday or Friday
      const longWeekend: LongWeekend = {
        id: `long-weekend-${holiday.id}`,
        name: {
          id: `Libur Panjang ${holiday.name.id}`,
          en: `${holiday.name.en} Long Weekend`,
        },
        startDate: holiday.date,
        endDate: holiday.date,
        totalDays: 3,
        holidays: [holiday],
        suggestedLeaves: [],
        leaveRequired: 0,
        efficiency: 3,
      };
      longWeekends.push(longWeekend);
    }
  }

  return longWeekends;
}

/**
 * Format date for display
 */
export function formatHolidayDate(date: string, locale: string = 'id'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get province name in Indonesian
 */
export function getProvinceName(province: Province): {
  id: string;
  en: string;
} {
  const provinceNames: Record<Province, { id: string; en: string }> = {
    aceh: { id: 'Aceh', en: 'Aceh' },
    sumatera_utara: { id: 'Sumatera Utara', en: 'North Sumatra' },
    sumatera_barat: { id: 'Sumatera Barat', en: 'West Sumatra' },
    riau: { id: 'Riau', en: 'Riau' },
    kepulauan_riau: { id: 'Kepulauan Riau', en: 'Riau Islands' },
    jambi: { id: 'Jambi', en: 'Jambi' },
    sumatera_selatan: { id: 'Sumatera Selatan', en: 'South Sumatra' },
    bangka_belitung: { id: 'Bangka Belitung', en: 'Bangka Belitung' },
    bengkulu: { id: 'Bengkulu', en: 'Bengkulu' },
    lampung: { id: 'Lampung', en: 'Lampung' },
    dki_jakarta: { id: 'DKI Jakarta', en: 'Jakarta' },
    jawa_barat: { id: 'Jawa Barat', en: 'West Java' },
    jawa_tengah: { id: 'Jawa Tengah', en: 'Central Java' },
    diy_yogyakarta: { id: 'D.I. Yogyakarta', en: 'Yogyakarta' },
    jawa_timur: { id: 'Jawa Timur', en: 'East Java' },
    banten: { id: 'Banten', en: 'Banten' },
    bali: { id: 'Bali', en: 'Bali' },
    nusa_tenggara_barat: {
      id: 'Nusa Tenggara Barat',
      en: 'West Nusa Tenggara',
    },
    nusa_tenggara_timur: {
      id: 'Nusa Tenggara Timur',
      en: 'East Nusa Tenggara',
    },
    kalimantan_barat: { id: 'Kalimantan Barat', en: 'West Kalimantan' },
    kalimantan_tengah: { id: 'Kalimantan Tengah', en: 'Central Kalimantan' },
    kalimantan_selatan: { id: 'Kalimantan Selatan', en: 'South Kalimantan' },
    kalimantan_timur: { id: 'Kalimantan Timur', en: 'East Kalimantan' },
    kalimantan_utara: { id: 'Kalimantan Utara', en: 'North Kalimantan' },
    sulawesi_utara: { id: 'Sulawesi Utara', en: 'North Sulawesi' },
    sulawesi_tengah: { id: 'Sulawesi Tengah', en: 'Central Sulawesi' },
    sulawesi_selatan: { id: 'Sulawesi Selatan', en: 'South Sulawesi' },
    sulawesi_tenggara: { id: 'Sulawesi Tenggara', en: 'Southeast Sulawesi' },
    gorontalo: { id: 'Gorontalo', en: 'Gorontalo' },
    sulawesi_barat: { id: 'Sulawesi Barat', en: 'West Sulawesi' },
    maluku: { id: 'Maluku', en: 'Maluku' },
    maluku_utara: { id: 'Maluku Utara', en: 'North Maluku' },
    papua_barat: { id: 'Papua Barat', en: 'West Papua' },
    papua: { id: 'Papua', en: 'Papua' },
    papua_selatan: { id: 'Papua Selatan', en: 'South Papua' },
    papua_tengah: { id: 'Papua Tengah', en: 'Central Papua' },
    papua_pegunungan: { id: 'Papua Pegunungan', en: 'Highland Papua' },
    papua_barat_daya: { id: 'Papua Barat Daya', en: 'Southwest Papua' },
  };

  return provinceNames[province] || { id: province, en: province };
}
