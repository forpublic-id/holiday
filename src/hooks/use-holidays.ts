'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Holiday,
  HolidayFilter,
  HolidaySearchResult,
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

  // Get all holidays for the current year (national + regional)
  const allHolidays = useMemo(() => {
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

    return [...nationalHolidays, ...regionalForYear];
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

  return {
    holidays,
    allHolidays,
    currentYear,
    setCurrentYear,
    selectedProvince,
    setSelectedProvince,
    nextHoliday,
    hasData: hasYearData(currentYear),
  };
}

/**
 * Hook for filtering holidays
 */
export function useHolidayFilter(
  holidays: Holiday[],
  initialFilter?: HolidayFilter
) {
  const [filter, setFilter] = useState<HolidayFilter>(initialFilter || {});

  const filteredResult = useMemo(() => {
    return filterHolidays(holidays, filter);
  }, [holidays, filter]);

  const updateFilter = (newFilter: Partial<HolidayFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const clearFilter = () => {
    setFilter({});
  };

  return {
    filter,
    filteredResult,
    updateFilter,
    clearFilter,
    setFilter,
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

/**
 * Hook for holiday search functionality
 */
export function useHolidaySearch(holidays: Holiday[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return holidays;
    }

    const term = searchTerm.toLowerCase();
    return holidays.filter(
      (holiday) =>
        holiday.name.id.toLowerCase().includes(term) ||
        holiday.name.en.toLowerCase().includes(term) ||
        holiday.description?.id.toLowerCase().includes(term) ||
        holiday.description?.en.toLowerCase().includes(term)
    );
  }, [holidays, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
  };
}
