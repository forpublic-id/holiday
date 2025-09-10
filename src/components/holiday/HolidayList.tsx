'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';
import { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { formatHolidayDate, getProvinceName } from '@/lib/holiday-utils';
import type { Holiday } from '@/types/holiday';

interface HolidayListProps {
  holidays: Holiday[];
  year: number;
  month: number;
  locale?: string;
}

export const HolidayList = memo(function HolidayList({
  holidays,
  year,
  month,
  locale = 'id',
}: HolidayListProps) {
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

  const getTypeLabel = (type: Holiday['type']) => {
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
      // Align with yearly pages: use outline + custom classes for key types
      case 'national':
        return 'outline';
      case 'religious':
        return 'secondary';
      case 'regional':
        return 'outline'; // Will override with custom colors
      case 'joint_leave':
        return 'outline'; // Will override with custom colors
      case 'commemoration':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getTypeBadgeClassName = (type: Holiday['type']) => {
    switch (type) {
      case 'national':
        return 'bg-red-600 text-white hover:bg-red-700 border-red-600';
      case 'joint_leave':
        return 'bg-orange-500 text-white hover:bg-orange-600 border-orange-500';
      case 'regional':
        return 'bg-blue-500 text-white hover:bg-blue-600 border-blue-500';
      default:
        return ''; // Use default badge styling
    }
  };

  const getDaysUntil = (date: string) => {
    const today = new Date();
    const holidayDate = new Date(date);
    const diffTime = holidayDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Sort holidays by date
  const sortedHolidays = [...holidays].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  if (sortedHolidays.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {locale === 'id'
            ? `Hari Libur ${monthNames[month - 1]} ${year}`
            : `${monthNames[month - 1]} ${year} Holidays`}
        </h2>
        <p className="text-muted-foreground text-center py-8">
          {locale === 'id'
            ? 'Tidak ada hari libur di bulan ini'
            : 'No holidays this month'}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        {locale === 'id'
          ? `Hari Libur ${monthNames[month - 1]} ${year}`
          : `${monthNames[month - 1]} ${year} Holidays`}
        <Badge variant="outline" className="ml-auto">
          {sortedHolidays.length} {locale === 'id' ? 'hari' : 'days'}
        </Badge>
      </h2>

      <div className="space-y-4">
        {sortedHolidays.map((holiday) => {
          const daysUntil = getDaysUntil(holiday.date);
          const isUpcoming = daysUntil > 0;
          const isToday = daysUntil === 0;
          // const isPast = daysUntil < 0

          return (
            <div
              key={holiday.id}
              className={
                'flex items-center justify-between p-4 rounded-md border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors'
              }
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-secondary-foreground mb-1">
                  {holiday.name[locale as 'id' | 'en']}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatHolidayDate(holiday.date, locale)}</span>
                </div>

                {/* Holiday type and timing info */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge
                    variant={getTypeVariant(holiday.type)}
                    className={getTypeBadgeClassName(holiday.type)}
                  >
                    {getTypeLabel(holiday.type)}
                  </Badge>

                  {isToday && (
                    <Badge
                      variant="default"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {locale === 'id' ? 'Hari Ini' : 'Today'}
                    </Badge>
                  )}

                  {isUpcoming && daysUntil <= 7 && (
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {daysUntil} {locale === 'id' ? 'hari lagi' : 'days left'}
                    </Badge>
                  )}
                </div>

                {/* Regional info */}
                {holiday.provinces && holiday.provinces.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {holiday.provinces
                        .slice(0, 2)
                        .map((province) => {
                          const provinceName = getProvinceName(province);
                          return provinceName[locale as 'id' | 'en'];
                        })
                        .join(', ')}
                      {holiday.provinces.length > 2 &&
                        ` +${holiday.provinces.length - 2} ${locale === 'id' ? 'lainnya' : 'more'}`}
                    </span>
                  </div>
                )}

                {/* Description */}
                {holiday.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {holiday.description[locale as 'id' | 'en']}
                  </p>
                )}
              </div>

              {/* Date display */}
              <div className="text-right">
                <div className="text-2xl font-bold text-card-foreground">
                  {new Date(holiday.date).getDate()}
                </div>
                <div className="text-xs text-muted-foreground uppercase">
                  {monthNames[month - 1].slice(0, 3)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
