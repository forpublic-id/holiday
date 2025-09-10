'use client';

import { BookOpen, Calendar, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatHolidayDate, getProvinceName } from '@/lib/holiday-utils';
import type { Holiday } from '@/types/holiday';

interface HolidayModalProps {
  holiday: Holiday | null;
  isOpen: boolean;
  onClose: () => void;
  locale?: string;
}

export function HolidayModal({
  holiday,
  isOpen,
  onClose,
  locale = 'id',
}: HolidayModalProps) {
  if (!holiday) return null;

  const getTypeLabel = (type: Holiday['type']) => {
    if (locale === 'id') {
      switch (type) {
        case 'national':
          return 'Hari Libur Nasional';
        case 'religious':
          return 'Hari Libur Keagamaan';
        case 'regional':
          return 'Hari Libur Daerah';
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

  const getReligionLabel = (religion: Holiday['religion']) => {
    if (!religion || religion === 'secular') return null;

    if (locale === 'id') {
      switch (religion) {
        case 'islam':
          return 'Islam';
        case 'christian':
          return 'Kristen';
        case 'catholic':
          return 'Katolik';
        case 'hindu':
          return 'Hindu';
        case 'buddhist':
          return 'Buddha';
        case 'confucian':
          return 'Konghucu';
        default:
          return religion;
      }
    } else {
      switch (religion) {
        case 'islam':
          return 'Islamic';
        case 'christian':
          return 'Christian';
        case 'catholic':
          return 'Catholic';
        case 'hindu':
          return 'Hindu';
        case 'buddhist':
          return 'Buddhist';
        case 'confucian':
          return 'Confucian';
        default:
          return religion;
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-left">
            {holiday.name[locale as 'id' | 'en']}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Date and Type */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {formatHolidayDate(holiday.date, locale)}
            </span>
          </div>

          {/* Type Badge */}
          <div className="flex items-center gap-2">
            <Badge variant={getTypeVariant(holiday.type)}>
              {getTypeLabel(holiday.type)}
            </Badge>
            {getReligionLabel(holiday.religion) && (
              <Badge variant="outline">
                {getReligionLabel(holiday.religion)}
              </Badge>
            )}
          </div>

          {/* Description */}
          {holiday.description && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                {locale === 'id' ? 'Deskripsi' : 'Description'}
              </div>
              <p className="text-sm text-muted-foreground pl-6">
                {holiday.description[locale as 'id' | 'en']}
              </p>
            </div>
          )}

          {/* Regional Information */}
          {holiday.provinces && holiday.provinces.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {locale === 'id' ? 'Berlaku di' : 'Applicable in'}
              </div>
              <div className="flex flex-wrap gap-1 pl-6">
                {holiday.provinces.map((province) => {
                  const provinceName = getProvinceName(province);
                  return (
                    <Badge key={province} variant="outline" className="text-xs">
                      {provinceName[locale as 'id' | 'en']}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              {holiday.isVariable
                ? locale === 'id'
                  ? 'Tanggal berubah setiap tahun'
                  : 'Date varies yearly'
                : locale === 'id'
                  ? 'Tanggal tetap setiap tahun'
                  : 'Fixed date yearly'}
            </div>

            {holiday.source && (
              <div className="text-xs text-muted-foreground">
                {locale === 'id' ? 'Sumber: ' : 'Source: '}
                {holiday.source}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
