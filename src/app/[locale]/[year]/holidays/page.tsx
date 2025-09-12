import { Calendar, Download, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FAQ } from '@/components/seo/FAQ';
import { InternalLinks } from '@/components/seo/InternalLinks';
import {
  EventSchema,
  LocalBusinessSchema,
  WebsiteSchema,
} from '@/components/seo/SchemaMarkup';
import { Badge } from '@/components/ui/badge';
import { YearNavigation } from '@/components/ui/year-navigation';
import { getAvailableYears, getHolidaysForYear } from '@/lib/holiday-data';
import { generateHolidaySlug } from '@/lib/holiday-utils';
import { generateYearlyComparison } from '@/lib/seo-utils';

interface YearlyHolidayPageProps {
  params: Promise<{
    locale: string;
    year: string;
  }>;
}

// Generate metadata for the yearly holiday list page
export async function generateMetadata({
  params,
}: YearlyHolidayPageProps): Promise<Metadata> {
  const { locale, year: yearParam } = await params;
  const year = parseInt(yearParam, 10);

  // Redirect ID users to /libur instead of /holidays
  if (locale === 'id') {
    redirect(`/${locale}/${year}/libur`);
  }

  const holidays = getHolidaysForYear(year);
  const nationalAndJointLeave = holidays.filter(
    (h) => h.type === 'national' || h.type === 'joint_leave'
  );

  // Generate yearly comparison data
  const comparison = generateYearlyComparison(year, holidays);

  const title = `Indonesian National Holidays ${year} - ${nationalAndJointLeave.length} Days | Holiday Calendar Indonesia`;

  let description = `Complete list of Indonesian national holidays and joint leave days for ${year} with total ${nationalAndJointLeave.length} holidays including New Year, Eid al-Fitr, Eid al-Adha, Independence Day, and joint leave days. `;

  // Add comparison context
  if (comparison.difference !== 0) {
    const moreOrFewer = comparison.isMore ? 'more' : 'fewer';
    description += `Year ${year} has ${Math.abs(comparison.difference)} ${moreOrFewer} holidays compared to ${year - 1} (${comparison.previousCount} days). `;
  }

  // Add long weekend opportunities
  if (
    comparison.longWeekendOpportunities > 0 ||
    comparison.strategicOpportunities > 0
  ) {
    description += `Enjoy ${comparison.longWeekendOpportunities} natural long weekend opportunities`;
    if (comparison.strategicOpportunities > 0) {
      description += ` and ${comparison.strategicOpportunities} additional long weekend chances with strategic leave planning`;
    }
    description += '. ';
  }

  description += `Use strategic vacation planning guide to maximize family holidays and rest time in ${year}. Official Indonesian government calendar with accurate and up-to-date information.`;

  return {
    title,
    description,
    keywords: [
      `indonesian holidays ${year}`,
      `national holidays ${year}`,
      `joint leave ${year}`,
      `indonesia public holidays ${year}`,
      'holiday calendar',
      'vacation planning',
      'long weekend',
      `leave strategy ${year}`,
      `vacation planning ${year}`,
      `long weekend ${year} indonesia`,
      `strategic leave ${year}`,
      `maximize holidays ${year}`,
      `holiday comparison ${year}`,
      `vacation tips ${year}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://holiday.forpublic.id/en/${year}/holidays`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/en/${year}/holidays`,
      languages: {
        'id-ID': `/id/${year}/libur`,
        'en-US': `/en/${year}/holidays`,
      },
    },
  };
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default async function YearlyHolidayPage({
  params,
}: YearlyHolidayPageProps) {
  const { locale, year: yearParam } = await params;
  const year = parseInt(yearParam, 10);

  // Redirect ID users to /libur instead of /holidays
  if (locale === 'id') {
    redirect(`/${locale}/${year}/libur`);
  }

  // Validate year
  if (Number.isNaN(year) || year < 2024 || year > 2030) {
    notFound();
  }

  const allHolidays = getHolidaysForYear(year);
  const availableYears = getAvailableYears();

  // Filter to show only national holidays and joint leave
  const holidays = allHolidays.filter(
    (h) => h.type === 'national' || h.type === 'joint_leave'
  );

  // Generate comparison data for display
  const comparison = generateYearlyComparison(year, allHolidays);

  // Group holidays by month
  const holidaysByMonth = holidays.reduce(
    (groups, holiday) => {
      const date = new Date(holiday.date);
      const month = date.getMonth();
      if (!groups[month]) groups[month] = [];
      groups[month].push(holiday);
      return groups;
    },
    {} as Record<number, typeof holidays>
  );

  // Sort holidays within each month
  Object.keys(holidaysByMonth).forEach((month) => {
    holidaysByMonth[parseInt(month, 10)].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  });

  const monthNames = [
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayName = dayNames[date.getDay()];
    return `${dayName}, ${date.getDate()} ${monthNames[date.getMonth()]} ${year}`;
  };

  const getTypeLabel = (type: string) => {
    return type === 'national' ? 'National Holiday' : 'Joint Leave';
  };

  const getTypeVariant = (_type: string): 'outline' => {
    return 'outline';
  };

  const getTypeBadgeClass = (type: string) => {
    if (type === 'national')
      return 'bg-red-600 text-white hover:bg-red-700 border-red-600';
    if (type === 'joint_leave')
      return 'bg-orange-500 text-white hover:bg-orange-600 border-orange-500';
    return 'bg-blue-500 text-white hover:bg-blue-600 border-blue-500'; // regional fallback
  };

  const breadcrumbItems = [
    {
      name: `${year} Holidays`,
      url: `/${locale}/${year}/holidays`,
      current: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Schema Markup */}
      <EventSchema holidays={holidays} locale={locale} />
      <WebsiteSchema locale={locale} />
      <LocalBusinessSchema locale={locale} />

      <Header locale={locale} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} locale={locale} />

          {/* Year Navigation */}
          <YearNavigation
            currentYear={year}
            availableYears={availableYears}
            locale={locale}
            basePath="holidays"
          />

          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              Indonesian National Holidays {year}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Complete list of national holidays and joint leave days in
              Indonesia
            </p>

            {/* Statistics */}
            <div className="flex justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {holidays.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Holidays
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {holidays.filter((h) => h.type === 'national').length}
                </div>
                <div className="text-sm text-muted-foreground">
                  National Holidays
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {holidays.filter((h) => h.type === 'joint_leave').length}
                </div>
                <div className="text-sm text-muted-foreground">Joint Leave</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
              <Download className="h-4 w-4" />
              Download PDF
            </button>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              View Calendar
            </Link>
          </div>

          {/* Holiday List by Month */}
          <div className="space-y-8">
            {Array.from({ length: 12 }, (_, i) => i).map((monthIndex) => {
              const monthHolidays = holidaysByMonth[monthIndex];
              if (!monthHolidays || monthHolidays.length === 0) return null;

              return (
                <div
                  key={monthIndex}
                  className="rounded-lg border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-card-foreground flex items-center gap-2">
                      {monthNames[monthIndex]} {year}
                    </h2>
                    <Link
                      href={`/${locale}/${year}/${monthNames[monthIndex].toLowerCase()}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      View Details
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>

                  <div className="grid gap-4">
                    {monthHolidays.map((holiday) => (
                      <Link
                        key={holiday.id}
                        href={`/${locale}/holiday/${generateHolidaySlug(holiday)}`}
                        className="flex items-center justify-between p-4 rounded-md border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-secondary-foreground mb-1 group-hover:text-primary">
                              {holiday.name.en}
                            </h3>
                            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(holiday.date)}
                          </p>
                        </div>
                        <Badge
                          variant={getTypeVariant(holiday.type)}
                          className={getTypeBadgeClass(holiday.type)}
                        >
                          {getTypeLabel(holiday.type)}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Navigation */}
          <div className="mt-12 p-6 rounded-lg border border-border bg-card shadow-sm">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              Quick Navigation
            </h2>
            <div className="flex flex-wrap gap-2">
              {monthNames.map((monthName, index) => {
                const hasHolidays = holidaysByMonth[index]?.length > 0;
                if (!hasHolidays) return null;

                return (
                  <Link
                    key={monthName}
                    href={`/${locale}/${year}/${monthName.toLowerCase()}`}
                    className="px-3 py-1 rounded-md text-sm bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {monthName} ({holidaysByMonth[index].length})
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Internal Links */}
          <InternalLinks currentYear={year} locale={locale} type="year" />

          {/* FAQ Section */}
          <FAQ locale={locale} />
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
