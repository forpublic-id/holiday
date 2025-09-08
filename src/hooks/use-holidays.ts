'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Holiday,
  HolidayFilter,
  Province,
} from '@/types/holiday';
import {
  getHolidaysForYear,
  getCurrentYear,
  hasYearData,
} from '@/lib/holiday-data';
import {
  filterHolidays,
  getNextHoliday,
  isHoliday,
  getHolidaysInMonth,
} from '@/lib/holiday-utils';
import { regionalHolidays2024 } from '@/data/holidays/regional-2024';
import { regionalHolidays2025 } from '@/data/holidays/regional-2025';

// Cache for holiday data to avoid recalculating
const holidayCache = new Map<string, Holiday[]>();

function getCachedHolidays(year: number): Holiday[] | null {
  const cacheKey = `holidays-${year}`;
  const cached = holidayCache.get(cacheKey);
  
  if (cached) {
    // For production, always return cached data
    // For development, add cache expiry
    return cached;
  }
  
  return null;
}

function setCachedHolidays(year: number, holidays: Holiday[]): void {
  const cacheKey = `holidays-${year}`;
  holidayCache.set(cacheKey, holidays);
}

/**
 * Hook for managing holiday data
 */
export function useHolidays(initialYear?: number) {
  const [currentYear, setCurrentYear] = useState(
    initialYear || getCurrentYear()
  );
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );

  // Get all holidays for the current year (national + regional) with caching
  const allHolidays = useMemo(() => {
    // Check cache first
    const cached = getCachedHolidays(currentYear);
    if (cached) {
      return cached;
    }

    const nationalHolidays = getHolidaysForYear(currentYear);

    // Get regional holidays for the specific year
    let regionalForYear: Holiday[] = [];
    if (currentYear === 2024) {
      regionalForYear = regionalHolidays2024.filter(
        (h) => h.year === currentYear
      );
    } else if (currentYear === 2025) {
      regionalForYear = regionalHolidays2025.filter(
        (h) => h.year === currentYear
      );
    }

    const result = [...nationalHolidays, ...regionalForYear];
    
    // Cache the result
    setCachedHolidays(currentYear, result);
    
    return result;
  }, [currentYear]);

  // Filter holidays based on selected province
  const holidays = useMemo(() => {
    if (!selectedProvince) {
      return allHolidays;
    }
    return allHolidays.filter(
      (holiday) =>
        !holiday.provinces ||
        holiday.provinces.length === 0 ||
        holiday.provinces.includes(selectedProvince)
    );
  }, [allHolidays, selectedProvince]);

  // Get next upcoming holiday
  const nextHoliday = useMemo(() => {
    return getNextHoliday(holidays);
  }, [holidays]);

  // Memoized setters to prevent unnecessary re-renders
  const setCurrentYearMemo = useCallback((year: number) => {
    setCurrentYear(year);
  }, []);

  const setSelectedProvinceMemo = useCallback((province: Province | null) => {
    setSelectedProvince(province);
  }, []);

  return {
    holidays,
    allHolidays,
    currentYear,
    setCurrentYear: setCurrentYearMemo,
    selectedProvince,
    setSelectedProvince: setSelectedProvinceMemo,
    nextHoliday,
    hasData: hasYearData(currentYear),
  };
}

/**
 * Hook for filtering holidays with optimized performance
 */
export function useHolidayFilter(
  holidays: Holiday[],
  initialFilter?: HolidayFilter
) {
  const [filter, setFilter] = useState<HolidayFilter>(initialFilter || {});

  const filteredResult = useMemo(() => {
    return filterHolidays(holidays, filter);
  }, [holidays, filter]);

  const updateFilter = useCallback((newFilter: Partial<HolidayFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  }, []);

  const clearFilter = useCallback(() => {
    setFilter({});
  }, []);

  const setFilterMemo = useCallback((newFilter: HolidayFilter) => {
    setFilter(newFilter);
  }, []);

  return {
    filter,
    filteredResult,
    updateFilter,
    clearFilter,
    setFilter: setFilterMemo,
  };
}

/**
 * Hook for checking if a specific date is a holiday
 */
export function useIsHoliday(date: string, holidays: Holiday[]) {
  return useMemo(() => {
    return isHoliday(date, holidays);
  }, [date, holidays]);
}

/**
 * Hook for getting holidays in a specific month
 */
export function useMonthHolidays(
  year: number,
  month: number,
  holidays: Holiday[]
) {
  return useMemo(() => {
    return getHolidaysInMonth(year, month, holidays);
  }, [year, month, holidays]);
}

// Cache for search results
const searchCache = new Map<string, Holiday[]>();

/**
 * Hook for holiday search functionality with caching
 */
export function useHolidaySearch(holidays: Holiday[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return holidays;
    }

    const cacheKey = `${holidays.length}-${searchTerm.toLowerCase()}`;
    const cached = searchCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const term = searchTerm.toLowerCase();
    const results = holidays.filter(
      (holiday) =>
        holiday.name.id.toLowerCase().includes(term) ||
        holiday.name.en.toLowerCase().includes(term) ||
        holiday.description?.id.toLowerCase().includes(term) ||
        holiday.description?.en.toLowerCase().includes(term)
    );
    
    // Cache results for future use
    searchCache.set(cacheKey, results);
    
    return results;
  }, [holidays, searchTerm]);

  const setSearchTermMemo = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return {
    searchTerm,
    setSearchTerm: setSearchTermMemo,
    searchResults,
  };
}
