'use client';

import { Holiday } from '@/types/holiday';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, XCircle } from 'lucide-react';

interface TodayInfoProps {
  holidays: Holiday[];
  locale?: string;
}

export function TodayInfo({ holidays, locale = 'id' }: TodayInfoProps) {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Get day name
  const dayNames =
    locale === 'id'
      ? ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
      : [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];

  const dayName = dayNames[today.getDay()];

  // Get month name
  const monthNames =
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

  const monthName = monthNames[today.getMonth()];
  const formattedDate = `${today.getDate()} ${monthName} ${today.getFullYear()}`;

  // Find today's holiday
  const todayHoliday = holidays.find((h) => h.date === todayString);

  // Check if it's weekend
  const isWeekend = today.getDay() === 0 || today.getDay() === 6; // Sunday or Saturday

  // Determine if it's a day off
  const isDayOff =
    isWeekend ||
    todayHoliday?.type === 'national' ||
    todayHoliday?.type === 'joint_leave';

  const getHolidayTypeLabel = (type: Holiday['type']) => {
    if (locale === 'id') {
      switch (type) {
        case 'national':
          return 'Libur Nasional';
        case 'religious':
          return 'Libur Keagamaan';
        case 'regional':
          return 'Libur Daerah';
        case 'joint_leave':
          return 'Cuti Bersama';
        case 'commemoration':
          return 'Hari Peringatan';
        default:
          return 'Lainnya';
      }
    } else {
      switch (type) {
        case 'national':
          return 'National Holiday';
        case 'religious':
          return 'Religious Holiday';
        case 'regional':
          return 'Regional Holiday';
        case 'joint_leave':
          return 'Joint Leave';
        case 'commemoration':
          return 'Commemoration Day';
        default:
          return 'Other';
      }
    }
  };

  const getTypeVariant = (type: Holiday['type']) => {
    switch (type) {
      case 'national':
        return 'destructive';
      case 'religious':
        return 'secondary';
      case 'regional':
        return 'default';
      case 'joint_leave':
        return 'outline';
      case 'commemoration':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-semibold text-card-foreground">
              {locale === 'id' ? 'Hari Ini' : 'Today'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {dayName}, {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          {/* Holiday Status */}
          <div className="flex items-center gap-2">
            {isDayOff ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-gray-400" />
            )}
            <div className="text-right">
              <div className="text-sm font-medium text-card-foreground">
                {isDayOff
                  ? locale === 'id'
                    ? 'Hari Libur'
                    : 'Holiday'
                  : locale === 'id'
                    ? 'Hari Kerja'
                    : 'Working Day'}
              </div>
              {todayHoliday ? (
                <div className="flex items-center gap-1 mt-1">
                  <Badge
                    variant={getTypeVariant(todayHoliday.type)}
                    className="text-xs"
                  >
                    {getHolidayTypeLabel(todayHoliday.type)}
                  </Badge>
                </div>
              ) : isWeekend ? (
                <div className="text-xs text-muted-foreground">
                  {locale === 'id' ? 'Akhir pekan' : 'Weekend'}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">
                  {locale === 'id' ? 'Tidak ada libur' : 'No holidays'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Holiday Name */}
      {todayHoliday && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="font-medium text-card-foreground">
            🎉 {todayHoliday.name[locale as 'id' | 'en']}
          </p>
          {todayHoliday.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {todayHoliday.description[locale as 'id' | 'en']}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
