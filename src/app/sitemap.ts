import { getAvailableYears } from '@/lib/holiday-data';

// Extended sitemap type to support images
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
  images?: Array<{
    url: string;
    title?: string;
    caption?: string;
  }>;
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
      images: [
        {
          url: `${baseUrl}/logo.svg`,
          title: 'Holiday Calendar Indonesia',
          caption: 'Indonesian Holiday Calendar - ForPublic.id',
        },
      ],
    },
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
      images: [
        {
          url: `${baseUrl}/logo.svg`,
          title: 'Holiday Calendar Indonesia',
          caption: 'Indonesian Holiday Calendar - ForPublic.id',
        },
      ],
    })),
    // About pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: [
        {
          url: `${baseUrl}/logo.svg`,
          title: 'About Holiday Calendar Indonesia',
          caption:
            locale === 'id'
              ? 'Tentang Kalender Libur Indonesia'
              : 'About Indonesian Holiday Calendar',
        },
      ],
    })),
    // Yearly holiday list pages
    ...years.flatMap((year) => [
      {
        url: `${baseUrl}/id/${year}/libur`,
        lastModified: getDataLastModified(year),
        changeFrequency:
          year === currentYear ? ('weekly' as const) : ('monthly' as const),
        priority: year === currentYear ? 0.8 : 0.6,
        images: [
          {
            url: `${baseUrl}/api/og?year=${year}&locale=id&type=yearly`,
            title: `Daftar Libur ${year} Indonesia`,
            caption: `Kalender hari libur nasional dan cuti bersama tahun ${year}`,
          },
        ],
      },
      {
        url: `${baseUrl}/en/${year}/holidays`,
        lastModified: getDataLastModified(year),
        changeFrequency:
          year === currentYear ? ('weekly' as const) : ('monthly' as const),
        priority: year === currentYear ? 0.8 : 0.6,
        images: [
          {
            url: `${baseUrl}/api/og?year=${year}&locale=en&type=yearly`,
            title: `${year} Indonesian Holidays List`,
            caption: `Indonesian national holidays and joint leave days for ${year}`,
          },
        ],
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
            {
              url: `${baseUrl}/api/og?month=${month}&year=${year}&locale=${locale}`,
              title: `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year} Holiday Calendar`,
              caption:
                locale === 'id'
                  ? `Kalender libur ${monthName} ${year} Indonesia`
                  : `Indonesian holiday calendar for ${monthName} ${year}`,
            },
            {
              url: `${baseUrl}/logo.svg`,
              title: 'Holiday Calendar Indonesia Logo',
              caption: 'ForPublic.id Holiday Calendar',
            },
          ],
        });
      }
    }
  }

  // Sort by priority (highest first) then by date
  const allPages = [...staticPages, ...monthPages].sort(
    (a, b) => b.priority - a.priority
  );

  return allPages;
}
