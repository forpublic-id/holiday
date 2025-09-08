import { getTranslations } from 'next-intl/server';
import { Calendar, TodayInfo } from '@/components/calendar';
import { FilteredHolidayDisplay } from '@/components/holiday/FilteredHolidayDisplay';
import { CalendarErrorBoundary, HolidayListErrorBoundary } from '@/components/ui/error-boundary';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getHolidaysForYear } from '@/lib/holiday-data';
import { regionalHolidays2024 } from '@/data/holidays/regional-2024';
import { regionalHolidays2025 } from '@/data/holidays/regional-2025';
import { getHolidaysInMonth } from '@/lib/holiday-utils';
import {
  generateMonthTitle,
  generateMonthDescription,
  generateMonthKeywords,
  getMonthName,
} from '@/lib/seo-utils';
import { Holiday } from '@/types/holiday';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface MonthPageProps {
  params: Promise<{
    locale: string;
    year: string;
    month: string;
  }>;
}

// Convert month name to number
function getMonthNumber(monthName: string): number {
  const monthNames = {
    january: 1,
    januari: 1,
    february: 2,
    februari: 2,
    march: 3,
    maret: 3,
    april: 4,
    may: 5,
    mei: 5,
    june: 6,
    juni: 6,
    july: 7,
    juli: 7,
    august: 8,
    agustus: 8,
    september: 9,
    october: 10,
    oktober: 10,
    november: 11,
    december: 12,
    desember: 12,
  };

  return monthNames[monthName.toLowerCase() as keyof typeof monthNames] || 0;
}

// 🚀 Generate dynamic metadata for each month page
export async function generateMetadata({
  params,
}: MonthPageProps): Promise<Metadata> {
  const { locale, year: yearParam, month: monthParam } = await params;
  const year = parseInt(yearParam);
  const month = getMonthNumber(monthParam);

  // Get holidays for this month
  const nationalHolidays = getHolidaysForYear(year);

  let regionalForYear: Holiday[] = [];
  if (year === 2024) {
    regionalForYear = regionalHolidays2024.filter((h) => h.year === year);
  } else if (year === 2025) {
    regionalForYear = regionalHolidays2025.filter((h) => h.year === year);
  }

  const allHolidays = [...nationalHolidays, ...regionalForYear];
  const monthHolidays = getHolidaysInMonth(year, month, allHolidays);

  // Filter for national + joint leave holidays only (for SEO title accuracy)
  const defaultHolidays = allHolidays.filter(
    (h) => h.type === 'national' || h.type === 'joint_leave'
  );
  const monthDefaultHolidays = getHolidaysInMonth(year, month, defaultHolidays);

  const monthName = getMonthName(month, locale);

  // Generate SEO-optimized content (using default holidays for accurate count)
  const title = generateMonthTitle(
    monthDefaultHolidays,
    monthName,
    year,
    locale
  );
  const description = generateMonthDescription(
    monthDefaultHolidays,
    monthName,
    year,
    locale
  );
  const keywords = generateMonthKeywords(month, year, locale);

  // Add holiday-specific keywords
  const holidayKeywords = monthHolidays
    .slice(0, 3)
    .map((h) => h.name[locale as 'id' | 'en']);

  return {
    title,
    description,
    keywords: [...keywords, ...holidayKeywords],
    openGraph: {
      title,
      description,
      url: `https://holiday.forpublic.id/${locale}/${year}/${monthParam}`,
      images: [
        {
          url: `/api/og?month=${month}&year=${year}&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?month=${month}&year=${year}&locale=${locale}`],
    },
    alternates: {
      canonical: `/${locale}/${year}/${monthParam}`,
      languages: {
        'id-ID': `/id/${year}/${getMonthName(month, 'id').toLowerCase()}`,
        'en-US': `/en/${year}/${getMonthName(month, 'en').toLowerCase()}`,
      },
    },
  };
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default async function MonthPage({ params }: MonthPageProps) {
  const { locale, year: yearParam, month: monthParam } = await params;
  const t = await getTranslations('HomePage');

  const year = parseInt(yearParam);
  const month = getMonthNumber(monthParam);

  // Validate year and month
  if (isNaN(year) || year < 2024 || year > 2030 || month === 0) {
    notFound();
  }

  // Get all holidays for the year
  const nationalHolidays = getHolidaysForYear(year);

  // Get regional holidays for the specific year
  let regionalForYear: Holiday[] = [];
  if (year === 2024) {
    regionalForYear = regionalHolidays2024.filter((h) => h.year === year);
  } else if (year === 2025) {
    regionalForYear = regionalHolidays2025.filter((h) => h.year === year);
  }

  const allHolidays = [...nationalHolidays, ...regionalForYear];

  // Get holidays for this specific month
  const monthHolidays = getHolidaysInMonth(year, month, allHolidays);

  // Default calendar holidays (national + joint leave only)
  const defaultCalendarHolidays = allHolidays.filter(
    (h) => h.type === 'national' || h.type === 'joint_leave'
  );


  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              {t('title')}
            </h1>
            <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
          </header>

          {/* Today Info */}
          <TodayInfo holidays={defaultCalendarHolidays} locale={locale} />

          {/* Main Calendar */}
          <CalendarErrorBoundary>
            <Calendar
              locale={locale}
              initialYear={year}
              initialMonth={month}
              overrideHolidays={defaultCalendarHolidays}
            />
          </CalendarErrorBoundary>

          {/* Filtered Holiday List for Current Month */}
          <HolidayListErrorBoundary>
            <FilteredHolidayDisplay
              holidays={monthHolidays}
              year={year}
              month={month}
              locale={locale}
            />
          </HolidayListErrorBoundary>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
