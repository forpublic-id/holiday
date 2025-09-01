'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
import { Holiday } from '@/types/holiday';

export type HolidayFilterType =
  | 'all'
  | 'national_joint'
  | 'regional'
  | 'national'
  | 'joint_leave';

interface HolidayFilterProps {
  locale?: string;
  activeFilter: HolidayFilterType;
  onFilterChange: (filter: HolidayFilterType) => void;
  holidayCounts: {
    total: number;
    national: number;
    joint_leave: number;
    regional: number;
  };
}

export function HolidayFilter({
  locale = 'id',
  activeFilter,
  onFilterChange,
  holidayCounts,
}: HolidayFilterProps) {
  const filterOptions = [
    {
      value: 'national_joint' as HolidayFilterType,
      label: locale === 'id' ? 'Nasional & Cuti' : 'National & Joint',
      count: holidayCounts.national + holidayCounts.joint_leave,
      description:
        locale === 'id'
          ? 'Libur nasional dan cuti bersama'
          : 'National holidays and joint leave',
    },
    {
      value: 'regional' as HolidayFilterType,
      label: locale === 'id' ? 'Libur Daerah' : 'Regional Holidays',
      count: holidayCounts.regional,
      description:
        locale === 'id' ? 'Libur khusus daerah' : 'Regional holidays',
    },
    {
      value: 'all' as HolidayFilterType,
      label: locale === 'id' ? 'Semua Libur' : 'All Holidays',
      count: holidayCounts.total,
      description: locale === 'id' ? 'Semua jenis libur' : 'All holiday types',
    },
  ];

  const getFilterVariant = (filterValue: HolidayFilterType) => {
    if (filterValue === activeFilter) return 'default';
    if (filterValue === 'regional') return 'secondary';
    return 'outline';
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-card-foreground">
          {locale === 'id' ? 'Jenis Libur:' : 'Holiday Type:'}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={getFilterVariant(option.value)}
            size="sm"
            onClick={() => onFilterChange(option.value)}
            className="gap-2"
          >
            {option.label}
            <Badge
              variant={option.value === activeFilter ? 'secondary' : 'outline'}
              className="px-1 py-0 text-xs"
            >
              {option.count}
            </Badge>
          </Button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        {activeFilter === 'national_joint' &&
          (locale === 'id'
            ? '✓ Menampilkan libur nasional dan cuti bersama (default)'
            : '✓ Showing national holidays and joint leave (default)')}
        {activeFilter === 'regional' &&
          (locale === 'id'
            ? '📍 Menampilkan libur khusus provinsi/daerah'
            : '📍 Showing province/region-specific holidays')}
        {activeFilter === 'all' &&
          (locale === 'id'
            ? '📋 Menampilkan semua jenis libur'
            : '📋 Showing all types of holidays')}
      </p>
    </div>
  );
}

// Helper function to filter holidays based on type
export function filterHolidaysByType(
  holidays: Holiday[],
  filterType: HolidayFilterType
): Holiday[] {
  switch (filterType) {
    case 'national_joint':
      return holidays.filter(
        (h) => h.type === 'national' || h.type === 'joint_leave'
      );
    case 'regional':
      return holidays.filter((h) => h.type === 'regional');
    case 'national':
      return holidays.filter((h) => h.type === 'national');
    case 'joint_leave':
      return holidays.filter((h) => h.type === 'joint_leave');
    case 'all':
    default:
      return holidays;
  }
}

// Helper function to count holidays by type
export function countHolidaysByType(holidays: Holiday[]) {
  return {
    total: holidays.length,
    national: holidays.filter((h) => h.type === 'national').length,
    joint_leave: holidays.filter((h) => h.type === 'joint_leave').length,
    regional: holidays.filter((h) => h.type === 'regional').length,
  };
}
