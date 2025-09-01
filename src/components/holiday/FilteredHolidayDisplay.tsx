'use client';

import { useState, useMemo } from 'react';
import { Holiday } from '@/types/holiday';
import { HolidayList } from './HolidayList';
import {
  HolidayFilter,
  HolidayFilterType,
  filterHolidaysByType,
  countHolidaysByType,
} from '@/components/ui/holiday-filter';

interface FilteredHolidayDisplayProps {
  holidays: Holiday[];
  year: number;
  month: number;
  locale?: string;
}

export function FilteredHolidayDisplay({
  holidays,
  year,
  month,
  locale = 'id',
}: FilteredHolidayDisplayProps) {
  // Default to showing national and joint leave holidays only
  const [activeFilter, setActiveFilter] =
    useState<HolidayFilterType>('national_joint');

  // Count holidays by type
  const holidayCounts = useMemo(
    () => countHolidaysByType(holidays),
    [holidays]
  );

  // Filter holidays based on active filter
  const filteredHolidays = useMemo(() => {
    return filterHolidaysByType(holidays, activeFilter);
  }, [holidays, activeFilter]);

  return (
    <div>
      <HolidayFilter
        locale={locale}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        holidayCounts={holidayCounts}
      />

      <HolidayList
        holidays={filteredHolidays}
        year={year}
        month={month}
        locale={locale}
      />
    </div>
  );
}
