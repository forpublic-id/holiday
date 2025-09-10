'use client';

import { useState, Suspense, lazy } from 'react';
import { useRouter } from 'next/navigation';
import { useHolidays } from '@/hooks/use-holidays';
import { getAvailableYears } from '@/lib/holiday-data';
import type { Holiday, Province } from '@/types/holiday';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';
const HolidayModal = lazy(() => import('./HolidayModal').then(module => ({ default: module.HolidayModal })));
import { CalendarLegend } from './CalendarLegend';

interface CalendarProps {
  locale?: string;
  initialYear?: number;
  initialMonth?: number;
  selectedProvince?: Province | null;
  overrideHolidays?: Holiday[]; // Allow override of holidays for filtering
}

export function Calendar({
  locale = 'id',
  initialYear,
  initialMonth,
  selectedProvince,
  overrideHolidays,
}: CalendarProps) {
  const router = useRouter();
  const currentDate = new Date();
  const [year] = useState(initialYear || currentDate.getFullYear());
  const [month] = useState(initialMonth || currentDate.getMonth() + 1);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { holidays: allHolidays } = useHolidays(year);

  // Use override holidays if provided, otherwise use all holidays
  const holidays = overrideHolidays || allHolidays;

  const availableYears = getAvailableYears();

  // Convert month number to name for URL
  const getMonthName = (monthNum: number) => {
    const monthNames =
      locale === 'id'
        ? [
            'januari',
            'februari',
            'maret',
            'april',
            'mei',
            'juni',
            'juli',
            'agustus',
            'september',
            'oktober',
            'november',
            'desember',
          ]
        : [
            'january',
            'february',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december',
          ];
    return monthNames[monthNum - 1];
  };

  const navigateToMonth = (newYear: number, newMonth: number) => {
    const monthName = getMonthName(newMonth);
    router.push(`/${locale}/${newYear}/${monthName}`);
  };

  const handlePrevMonth = () => {
    if (month === 1) {
      navigateToMonth(year - 1, 12);
    } else {
      navigateToMonth(year, month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      navigateToMonth(year + 1, 1);
    } else {
      navigateToMonth(year, month + 1);
    }
  };

  const handleDateClick = (date: string) => {
    const holiday = holidays.find((h) => h.date === date);
    if (holiday) {
      setSelectedHoliday(holiday);
      setIsModalOpen(true);
    }
  };

  const handleYearChange = (newYear: number) => {
    navigateToMonth(newYear, month);
  };

  const handleMonthChange = (newMonth: number) => {
    navigateToMonth(year, newMonth);
  };

  // Filter holidays by province if selected
  const filteredHolidays = selectedProvince
    ? holidays.filter(
        (holiday) =>
          !holiday.provinces ||
          holiday.provinces.length === 0 ||
          holiday.provinces.includes(selectedProvince)
      )
    : holidays;

  return (
    <div className="w-full space-y-6">
      {/* Calendar Container */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        {/* Calendar Header */}
        <CalendarHeader
          year={year}
          month={month}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          locale={locale}
          availableYears={availableYears}
        />

        {/* Calendar Legend */}
        <div className="mt-4">
          <CalendarLegend locale={locale} />
        </div>

        {/* Calendar Grid */}
        <div className="mt-6">
          <CalendarGrid
            year={year}
            month={month}
            holidays={filteredHolidays}
            onDateClick={handleDateClick}
            locale={locale}
          />
        </div>
      </div>

      {/* Holiday Details Modal */}
      <Suspense fallback={
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      }>
        <HolidayModal
          holiday={selectedHoliday}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          locale={locale}
        />
      </Suspense>
    </div>
  );
}
