'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  locale?: string;
  availableYears?: number[];
}

export function CalendarHeader({
  year,
  month,
  onYearChange,
  onMonthChange,
  onPrevMonth,
  onNextMonth,
  locale = 'id',
  availableYears = [2024, 2025, 2026, 2027, 2028, 2029, 2030],
}: CalendarHeaderProps) {
  const months =
    locale === 'id'
      ? [
          'Januari',
          'Februari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember',
        ]
      : [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];

  const currentMonth = months[month - 1];

  return (
    <div className="flex items-center justify-between mb-6 gap-4">
      {/* Previous Month Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevMonth}
        className="shrink-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Month and Year Display/Selection */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {/* Mobile: Simple display */}
        <div className="sm:hidden flex-1 text-center">
          <h2 className="text-lg font-semibold truncate">
            {currentMonth} {year}
          </h2>
        </div>

        {/* Desktop: Selectable dropdowns */}
        <div className="hidden sm:flex items-center gap-2 flex-1 justify-center">
          <Select
            value={month.toString()}
            onValueChange={(value) => onMonthChange(parseInt(value))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((monthName, index) => (
                <SelectItem key={index} value={(index + 1).toString()}>
                  {monthName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={year.toString()}
            onValueChange={(value) => onYearChange(parseInt(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((availableYear) => (
                <SelectItem
                  key={availableYear}
                  value={availableYear.toString()}
                >
                  {availableYear}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Next Month Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onNextMonth}
        className="shrink-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
