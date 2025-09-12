import { holidays2024 } from '@/data/holidays/2024';
import { holidays2025 } from '@/data/holidays/2025';
import { holidays2026 } from '@/data/holidays/2026';
import type { Holiday, HolidayData, HolidayYear } from '@/types/holiday';

/**
 * Main holiday data store
 */
export const holidayData: HolidayData = {
  years: {
    2024: holidays2024,
    2025: holidays2025,
    2026: holidays2026,
    // Will be expanded with 2027-2030 data
  },
  metadata: {
    lastUpdated: '2025-08-19T00:00:00Z',
    version: '1.1.0',
    sources: [
      'SKB 3 Menteri No. 1067 Tahun 2023',
      'SKB 3 Menteri No. 1218 Tahun 2024',
      'Peraturan Pemerintah Republik Indonesia',
      'Kementerian Agama RI',
    ],
  },
};

/**
 * Get all holidays for a specific year
 */
export function getHolidaysForYear(year: number): Holiday[] {
  const yearData = holidayData.years[year];
  if (!yearData) return [];

  return [...yearData.holidays, ...(yearData.jointLeaves || [])];
}

/**
 * Get available years
 */
export function getAvailableYears(): number[] {
  return Object.keys(holidayData.years).map(Number).sort();
}

/**
 * Get holiday data for a specific year
 */
export function getYearData(year: number): HolidayYear | null {
  return holidayData.years[year] || null;
}

/**
 * Find a holiday by its ID across all years
 */
export function findHolidayById(holidayId: string): Holiday | null {
  for (const year of Object.keys(holidayData.years)) {
    const holidays = getHolidaysForYear(Number(year));
    const holiday = holidays.find(h => h.id === holidayId);
    if (holiday) {
      return holiday;
    }
  }
  return null;
}

/**
 * Check if year data is available
 */
export function hasYearData(year: number): boolean {
  return year in holidayData.years;
}

/**
 * Get current year
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Get next available year with data
 */
export function getNextAvailableYear(currentYear: number): number | null {
  const availableYears = getAvailableYears();
  const nextYear = availableYears.find((year) => year > currentYear);
  return nextYear || null;
}

/**
 * Get previous available year with data
 */
export function getPreviousAvailableYear(currentYear: number): number | null {
  const availableYears = getAvailableYears();
  const previousYears = availableYears.filter((year) => year < currentYear);
  return previousYears[previousYears.length - 1] || null;
}
