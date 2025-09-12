import { getAvailableYears, getHolidaysForYear } from '@/lib/holiday-data';
import { generateHolidaySlug } from '@/lib/holiday-utils';

// Escape URL for XML to prevent parsing errors
function escapeXmlUrl(url: string): string {
  return url.replace(/&/g, '&amp;');
}

// Next.js sitemap type - images should be string URLs only
type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
  images?: string[];
};

// Get month name in URL format (lowercase)
function getMonthName(month: number, locale: string): string {
  const monthNames = {
    id: [
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
    ],
    en: [
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
    ],
  };

  return (
    monthNames[locale as keyof typeof monthNames][month - 1] ||
    monthNames.id[month - 1]
  );
}

// Get data last modified date (when holiday data was updated)
function getDataLastModified(year: number): Date {
  // Return actual data update dates based on when we updated the data
  if (year === 2024) return new Date('2025-08-25T12:00:00Z'); // Updated with SKB 2023 data
  if (year === 2025) return new Date('2025-08-19T12:00:00Z'); // When we updated 2025 data
  if (year === 2026) return new Date('2025-08-25T12:00:00Z'); // When we added 2026 data
  return new Date();
}

export default function sitemap(): SitemapEntry[] {
  const baseUrl = 'https://holiday.forpublic.id';
  const locales = ['id', 'en'] as const;
  const years = getAvailableYears(); // [2024, 2025, 2026]
  const currentYear = new Date().getFullYear();

  // Base pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
      images: [`${baseUrl}/logo.svg`],
    },
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
      images: [`${baseUrl}/logo.svg`],
    })),
    // About pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: [`${baseUrl}/logo.svg`],
    })),
    // Yearly holiday list pages
    ...years.flatMap((year) => [
      {
        url: `${baseUrl}/id/${year}/libur`,
        lastModified: getDataLastModified(year),
        changeFrequency:
          year === currentYear ? ('weekly' as const) : ('monthly' as const),
        priority: year === currentYear ? 0.8 : 0.6,
        images: [escapeXmlUrl(`${baseUrl}/api/og?year=${year}&locale=id&type=yearly`)],
      },
      {
        url: `${baseUrl}/en/${year}/holidays`,
        lastModified: getDataLastModified(year),
        changeFrequency:
          year === currentYear ? ('weekly' as const) : ('monthly' as const),
        priority: year === currentYear ? 0.8 : 0.6,
        images: [escapeXmlUrl(`${baseUrl}/api/og?year=${year}&locale=en&type=yearly`)],
      },
    ]),
  ];

  // Generate all month pages
  const monthPages = [];
  for (const locale of locales) {
    for (const year of years) {
      for (let month = 1; month <= 12; month++) {
        const monthName = getMonthName(month, locale);
        const lastModified = getDataLastModified(year);

        // Higher priority for current and upcoming years
        let priority = 0.5;
        if (year === currentYear) {
          priority = 0.8;
          if (month === new Date().getMonth() + 1) {
            priority = 0.9; // Current month gets highest priority
          }
        } else if (year === currentYear + 1) {
          priority = 0.7; // Next year gets higher priority
        } else if (year === currentYear - 1) {
          priority = 0.6; // Previous year gets medium priority
        }

        // More frequent updates for current year
        const changeFrequency =
          year === currentYear ? ('weekly' as const) : ('monthly' as const);

        monthPages.push({
          url: `${baseUrl}/${locale}/${year}/${monthName}`,
          lastModified,
          changeFrequency,
          priority,
          images: [
            escapeXmlUrl(`${baseUrl}/api/og?month=${month}&year=${year}&locale=${locale}`),
            `${baseUrl}/logo.svg`
          ],
        });
      }
    }
  }

  // Generate holiday detail pages
  const holidayPages = [];
  for (const locale of locales) {
    for (const year of years) {
      const holidays = getHolidaysForYear(year);

      for (const holiday of holidays) {
        const slug = generateHolidaySlug(holiday);
        const lastModified = getDataLastModified(year);

        // Priority based on holiday type and year
        let priority = 0.4;
        if (holiday.type === 'national') {
          priority = 0.7; // National holidays get higher priority
        } else if (holiday.type === 'joint_leave') {
          priority = 0.6; // Joint leave days get medium-high priority
        }

        // Boost priority for current year holidays
        if (year === currentYear) {
          priority += 0.1;

          // Boost for upcoming holidays
          const holidayDate = new Date(holiday.date);
          const today = new Date();
          if (holidayDate >= today) {
            priority += 0.1;
          }
        }

        // Cap priority at 1.0
        priority = Math.min(priority, 1.0);

        const changeFrequency =
          year === currentYear ? ('weekly' as const) : ('monthly' as const);

        holidayPages.push({
          url: `${baseUrl}/${locale}/holiday/${slug}`,
          lastModified,
          changeFrequency,
          priority,
          images: [escapeXmlUrl(`${baseUrl}/api/og?holiday=${holiday.id}&locale=${locale}`)],
        });
      }
    }
  }

  // Sort by priority (highest first) then by date
  const allPages = [...staticPages, ...monthPages, ...holidayPages].sort(
    (a, b) => b.priority - a.priority
  );

  return allPages;
}
