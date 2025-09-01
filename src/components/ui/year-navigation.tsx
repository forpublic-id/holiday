'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface YearNavigationProps {
  currentYear: number;
  availableYears: number[];
  locale: string;
  basePath: string; // e.g., 'holidays' or 'libur'
}

export function YearNavigation({
  currentYear,
  availableYears,
  locale,
  basePath,
}: YearNavigationProps) {
  const router = useRouter();

  const getPrevYear = () => availableYears.find((y) => y < currentYear);
  const getNextYear = () => availableYears.find((y) => y > currentYear);
  const prevYear = getPrevYear();
  const nextYear = getNextYear();

  const handleYearChange = (value: string) => {
    const newYear = parseInt(value);
    router.push(`/${locale}/${newYear}/${basePath}`);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <Link
        href={prevYear ? `/${locale}/${prevYear}/${basePath}` : '#'}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border transition-colors ${
          prevYear
            ? 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
            : 'border-input bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
        {prevYear || 'Prev'}
      </Link>

      <div className="flex items-center gap-2">
        <Select value={currentYear.toString()} onValueChange={handleYearChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Link
        href={nextYear ? `/${locale}/${nextYear}/${basePath}` : '#'}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border transition-colors ${
          nextYear
            ? 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
            : 'border-input bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        {nextYear || 'Next'}
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
