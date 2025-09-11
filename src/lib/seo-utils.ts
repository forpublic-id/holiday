import type { Metadata } from 'next';
import type { Holiday } from '@/types/holiday';
import { formatHolidayDate, getProvinceName } from './holiday-utils';

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

// Base keywords for each language
export const baseKeywords = {
  id: [
    'kalender libur',
    'hari libur indonesia',
    'cuti bersama',
    'libur nasional',
    'hari libur 2025',
    'kalender indonesia',
    'libur daerah',
    'hari raya',
    'tanggal merah',
    'jadwal libur',
    'perencanaan cuti',
    'long weekend indonesia',
    'libur panjang',
    'cuti nasional',
    'kalender resmi',
    'hari libur terbaru',
  ],
  en: [
    'indonesian holidays',
    'holiday calendar',
    'public holidays',
    'national holidays',
    'indonesia 2025 holidays',
    'indonesian calendar',
    'regional holidays',
    'religious holidays',
    'red dates indonesia',
    'holiday schedule',
    'vacation planning',
    'long weekend indonesia',
    'extended holidays',
    'national leave',
    'official calendar',
    'latest holidays',
  ],
};

// Generate month-specific keywords with long-tail optimization
export function generateMonthKeywords(
  month: number,
  year: number,
  locale: string
): string[] {
  const base =
    baseKeywords[locale as keyof typeof baseKeywords] || baseKeywords.id;
  const monthName = getMonthName(month, locale).toLowerCase();

  const monthSpecific =
    locale === 'id'
      ? [
          `${monthName} ${year}`,
          `libur ${monthName} ${year}`,
          `kalender ${monthName} ${year}`,
          `hari libur ${monthName} ${year}`,
          `jadwal libur ${monthName} ${year}`,
          `libur nasional ${monthName} ${year}`,
          `cuti bersama ${monthName} ${year}`,
          `long weekend ${monthName} ${year}`,
          `perencanaan liburan ${monthName} ${year}`,
          `kapan libur ${monthName} ${year}`,
          `tanggal libur ${monthName} ${year}`,
          `daftar libur ${monthName} ${year}`,
          `agenda libur ${monthName} ${year}`,
          `rencana cuti ${monthName} ${year}`,
          `info libur ${monthName} ${year}`,
        ]
      : [
          `${monthName} ${year}`,
          `${monthName} ${year} holidays`,
          `${monthName} ${year} calendar`,
          `indonesian holidays ${monthName} ${year}`,
          `${monthName} ${year} public holidays`,
          `${monthName} ${year} national holidays`,
          `${monthName} ${year} joint leave`,
          `${monthName} ${year} long weekend`,
          `${monthName} ${year} vacation planning`,
          `when is holiday ${monthName} ${year}`,
          `${monthName} ${year} holiday dates`,
          `${monthName} ${year} holiday list`,
          `${monthName} ${year} holiday agenda`,
          `${monthName} ${year} leave planning`,
          `${monthName} ${year} holiday info`,
        ];

  // Add seasonal keywords
  const seasonal = getSeasonalKeywords(month, locale);

  // Add long-tail question keywords
  const longTail = generateLongTailKeywords(month, year, locale);

  return [...base, ...monthSpecific, ...seasonal, ...longTail];
}

// Generate long-tail question-based keywords
export function generateLongTailKeywords(
  month: number,
  year: number,
  locale: string
): string[] {
  const monthName = getMonthName(month, locale).toLowerCase();

  if (locale === 'id') {
    return [
      `kapan libur ${monthName} ${year}`,
      `berapa hari libur ${monthName} ${year}`,
      `libur apa saja di ${monthName} ${year}`,
      `jadwal cuti bersama ${monthName} ${year}`,
      `cara merencanakan libur ${monthName} ${year}`,
      `tips liburan ${monthName} ${year}`,
      `libur panjang ${monthName} ${year}`,
      `tanggal merah ${monthName} ${year}`,
      `hari libur nasional ${monthName} ${year}`,
      `strategi cuti ${monthName} ${year}`,
      `maksimalkan libur ${monthName} ${year}`,
      `panduan libur ${monthName} ${year}`,
    ];
  } else {
    return [
      `when are ${monthName} ${year} holidays`,
      `how many holidays in ${monthName} ${year}`,
      `what holidays in ${monthName} ${year}`,
      `${monthName} ${year} joint leave schedule`,
      `how to plan ${monthName} ${year} vacation`,
      `${monthName} ${year} vacation tips`,
      `${monthName} ${year} long holidays`,
      `${monthName} ${year} red dates`,
      `${monthName} ${year} national holidays`,
      `${monthName} ${year} leave strategy`,
      `maximize ${monthName} ${year} holidays`,
      `${monthName} ${year} holiday guide`,
    ];
  }
}

// Get month name for URL and display
export function getMonthName(month: number, locale: string): string {
  const monthNames = {
    id: [
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
    ],
    en: [
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
    ],
  };

  return (
    monthNames[locale as keyof typeof monthNames][month - 1] ||
    monthNames.id[month - 1]
  );
}

// Get seasonal keywords based on month
export function getSeasonalKeywords(month: number, locale: string): string[] {
  if (locale === 'id') {
    switch (month) {
      case 1:
        return ['tahun baru', 'libur januari', 'imlek 2025'];
      case 3:
      case 4:
        return ['lebaran 2025', 'idul fitri', 'mudik lebaran'];
      case 6:
        return ['libur mid year', 'idul adha', 'haji'];
      case 8:
        return ['17 agustus', 'kemerdekaan', 'hut ri', 'dirgahayu'];
      case 12:
        return ['natal 2025', 'tahun baru 2026', 'libur akhir tahun'];
      default:
        return [];
    }
  } else {
    switch (month) {
      case 1:
        return ['new year', 'january holidays', 'chinese new year'];
      case 3:
      case 4:
        return ['eid 2025', 'ramadan', 'islamic holidays'];
      case 8:
        return ['independence day', 'august 17', 'indonesia independence'];
      case 12:
        return ['christmas', 'new year 2026', 'year end holidays'];
      default:
        return [];
    }
  }
}

// Long weekend detection utility
interface LongWeekend {
  name: string;
  duration: number;
  dates: string[];
  cutiStrategy?: string;
}

export function detectLongWeekends(holidays: Holiday[], year: number, month: number): LongWeekend[] {
  const longWeekends: LongWeekend[] = [];
  
  holidays.forEach(holiday => {
    const holidayDate = new Date(holiday.date);
    const dayOfWeek = holidayDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    let duration = 1;
    let cutiStrategy = '';
    
    // Check for weekend proximity
    if (dayOfWeek === 1) { // Monday holiday
      duration = 3; // Sat-Sun-Mon
      cutiStrategy = 'Ambil cuti Selasa untuk long weekend 4 hari';
    } else if (dayOfWeek === 5) { // Friday holiday
      duration = 3; // Fri-Sat-Sun
      cutiStrategy = 'Ambil cuti Kamis untuk long weekend 4 hari';
    } else if (dayOfWeek === 2) { // Tuesday holiday
      cutiStrategy = 'Ambil cuti Senin untuk long weekend 4 hari';
    } else if (dayOfWeek === 4) { // Thursday holiday
      cutiStrategy = 'Ambil cuti Jumat untuk long weekend 4 hari';
    }
    
    if (duration > 1 || cutiStrategy) {
      longWeekends.push({
        name: holiday.name.id || holiday.name.en,
        duration,
        dates: [holiday.date],
        cutiStrategy
      });
    }
  });
  
  return longWeekends;
}

// Weekend proximity checker
export function checkWeekendProximity(date: Date): {
  isLongWeekend: boolean;
  duration: number;
  cutiStrategy?: string;
} {
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 1) { // Monday
    return {
      isLongWeekend: true,
      duration: 3,
      cutiStrategy: 'Selasa'
    };
  } else if (dayOfWeek === 5) { // Friday
    return {
      isLongWeekend: true,
      duration: 3,
      cutiStrategy: 'Kamis'
    };
  } else if (dayOfWeek === 2) { // Tuesday
    return {
      isLongWeekend: false,
      duration: 1,
      cutiStrategy: 'Senin'
    };
  } else if (dayOfWeek === 4) { // Thursday
    return {
      isLongWeekend: false,
      duration: 1,
      cutiStrategy: 'Jumat'
    };
  }
  
  return {
    isLongWeekend: false,
    duration: 1
  };
}

// Get day name in Indonesian
export function getDayName(dayIndex: number, locale: string): string {
  const dayNames = {
    id: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  };
  
  return dayNames[locale as keyof typeof dayNames][dayIndex] || dayNames.id[dayIndex];
}

// Generate rich description for month page
export function generateMonthDescription(
  holidays: Holiday[],
  monthName: string,
  year: number,
  locale: string,
  month: number
): string {
  const holidayCount = holidays.length;
  const nationalCount = holidays.filter((h) => h.type === 'national').length;
  const jointLeaveCount = holidays.filter(
    (h) => h.type === 'joint_leave'
  ).length;

  // Detect long weekends
  const longWeekends = detectLongWeekends(holidays, year, month);

  if (locale === 'id') {
    const majorHolidays = holidays
      .filter((h) => h.type === 'national')
      .slice(0, 3) // Increased to show more holidays
      .map((h) => h.name.id)
      .join(', ');

    let description = `Kalender hari libur ${monthName} ${year} lengkap dengan ${holidayCount} hari libur`;

    if (nationalCount > 0) {
      description += `, termasuk ${nationalCount} libur nasional`;
      if (majorHolidays) {
        // Use proper conjunction for single vs multiple holidays
        if (nationalCount === 1) {
          description += ` yaitu ${majorHolidays}`;
        } else {
          description += ` seperti ${majorHolidays}`;
        }
      }
    }

    if (jointLeaveCount > 0) {
      description += ` dan ${jointLeaveCount} hari cuti bersama`;
    }

    // Add long weekend information
    if (longWeekends.length > 0) {
      description += `. Tersedia ${longWeekends.length} peluang long weekend di ${monthName} ${year}`;
      const strategicHoliday = longWeekends.find(lw => lw.cutiStrategy);
      if (strategicHoliday && strategicHoliday.cutiStrategy) {
        description += ` - ${strategicHoliday.cutiStrategy.toLowerCase()}`;
      }
    }

    description += `. Perencanaan cuti dan long weekend untuk ${monthName} ${year} di Indonesia. `;
    description += `Gunakan kalkulator cuti untuk maksimalkan hari libur dengan strategi cuti sandwich. `;
    description += `Jadwal tanggal merah, tips liburan, dan strategi mengatur cuti bersama untuk perencanaan liburan optimal. `;
    description += `Kalender resmi pemerintah Indonesia dengan informasi akurat dan terbaru.`;

    return description;
  } else {
    const majorHolidays = holidays
      .filter((h) => h.type === 'national')
      .slice(0, 3) // Increased to show more holidays
      .map((h) => h.name.en)
      .join(', ');

    let description = `Complete ${monthName} ${year} Indonesian holiday calendar with ${holidayCount} holidays`;

    if (nationalCount > 0) {
      description += `, including ${nationalCount} national holidays`;
      if (majorHolidays) {
        // Use proper conjunction for single vs multiple holidays
        if (nationalCount === 1) {
          description += ` which is ${majorHolidays}`;
        } else {
          description += ` such as ${majorHolidays}`;
        }
      }
    }

    if (jointLeaveCount > 0) {
      description += ` and ${jointLeaveCount} joint leave days`;
    }

    // Add long weekend information
    if (longWeekends.length > 0) {
      description += `. ${longWeekends.length} long weekend opportunities available in ${monthName} ${year}`;
      const strategicHoliday = longWeekends.find(lw => lw.cutiStrategy);
      if (strategicHoliday && strategicHoliday.cutiStrategy) {
        description += ` - take strategic leave for extended holidays`;
      }
    }

    description += `. Plan your vacation and long weekends for ${monthName} ${year} in Indonesia. `;
    description += `Use leave calculator to maximize holidays with sandwich leave strategy. `;
    description += `Official Indonesian government calendar with accurate information for optimal vacation planning. `;
    description += `Red dates schedule, holiday tips, and joint leave strategies for perfect trip planning.`;

    return description;
  }
}

// Generate SEO-optimized title with consistent format
export function generateMonthTitle(
  holidays: Holiday[],
  monthName: string,
  year: number,
  locale: string
): string {
  const holidayCount = holidays.length;

  if (locale === 'id') {
    if (holidayCount === 0) {
      return `Kalender ${monthName} ${year} - Tidak Ada Libur | Holiday Calendar Indonesia`;
    } else if (holidayCount === 1) {
      return `Hari Libur ${monthName} ${year} - 1 Libur Nasional | Kalender Indonesia`;
    } else {
      return `Hari Libur ${monthName} ${year} - ${holidayCount} Libur & Cuti | Kalender Indonesia`;
    }
  } else {
    if (holidayCount === 0) {
      return `${monthName} ${year} Calendar - No Holidays | Indonesian Holiday Calendar`;
    } else if (holidayCount === 1) {
      return `${monthName} ${year} Holidays - 1 Indonesian Holiday | Holiday Calendar`;
    } else {
      return `${monthName} ${year} Holidays - ${holidayCount} Indonesian Holidays | Holiday Calendar`;
    }
  }
}

/**
 * Generate metadata for holiday detail page
 */
export function generateHolidayDetailMetadata(
  holiday: Holiday,
  locale: 'id' | 'en'
): Metadata {
  const holidayName = holiday.name[locale];
  const formattedDate = formatHolidayDate(holiday.date, locale);
  const year = holiday.year;

  // Generate title
  const title =
    locale === 'id'
      ? `${holidayName} ${year} - ${formattedDate} | Kalender Libur Indonesia`
      : `${holidayName} ${year} - ${formattedDate} | Indonesian Holiday Calendar`;

  // Generate description
  let description = '';
  if (locale === 'id') {
    description = `${holidayName} jatuh pada ${formattedDate}. `;

    if (holiday.type === 'national') {
      description += 'Ini adalah hari libur nasional Indonesia. ';
    } else if (holiday.type === 'regional' && holiday.provinces) {
      const provinceNames = holiday.provinces
        .map((p) => getProvinceName(p).id)
        .join(', ');
      description += `Hari libur regional untuk provinsi: ${provinceNames}. `;
    } else if (holiday.type === 'joint_leave') {
      description += 'Ini adalah hari cuti bersama. ';
    }

    if (holiday.description) {
      description += `${holiday.description.id} `;
    }

    description += `Informasi lengkap tentang ${holidayName} ${year}, termasuk sejarah, tradisi, dan tips perencanaan libur. `;
    description +=
      'Kalender resmi hari libur Indonesia dengan informasi akurat untuk perencanaan liburan.';
  } else {
    description = `${holidayName} falls on ${formattedDate}. `;

    if (holiday.type === 'national') {
      description += 'This is an Indonesian national holiday. ';
    } else if (holiday.type === 'regional' && holiday.provinces) {
      const provinceNames = holiday.provinces
        .map((p) => getProvinceName(p).en)
        .join(', ');
      description += `Regional holiday for provinces: ${provinceNames}. `;
    } else if (holiday.type === 'joint_leave') {
      description += 'This is a joint leave day. ';
    }

    if (holiday.description) {
      description += `${holiday.description.en} `;
    }

    description += `Complete information about ${holidayName} ${year}, including history, traditions, and vacation planning tips. `;
    description +=
      'Official Indonesian holiday calendar with accurate information for vacation planning.';
  }

  // Generate keywords
  const keywords = generateHolidayDetailKeywords(holiday, locale);

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: `${year}-01-01T00:00:00Z`,
      tags: keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/holiday/${holiday.id}`,
      languages: {
        id: `/id/holiday/${holiday.id}`,
        en: `/en/holiday/${holiday.id}`,
      },
    },
  };
}

/**
 * Generate keywords for holiday detail page
 */
function generateHolidayDetailKeywords(
  holiday: Holiday,
  locale: 'id' | 'en'
): string[] {
  const holidayName = holiday.name[locale].toLowerCase();
  const year = holiday.year.toString();

  const base = baseKeywords[locale] || baseKeywords.id;

  const holidaySpecific =
    locale === 'id'
      ? [
          holidayName,
          `${holidayName} ${year}`,
          `kapan ${holidayName} ${year}`,
          `tanggal ${holidayName} ${year}`,
          `info ${holidayName}`,
          `sejarah ${holidayName}`,
          `tradisi ${holidayName}`,
          `makna ${holidayName}`,
          `arti ${holidayName}`,
          `perayaan ${holidayName}`,
        ]
      : [
          holidayName,
          `${holidayName} ${year}`,
          `when is ${holidayName} ${year}`,
          `${holidayName} ${year} date`,
          `${holidayName} information`,
          `${holidayName} history`,
          `${holidayName} traditions`,
          `${holidayName} meaning`,
          `${holidayName} celebration`,
        ];

  // Add type-specific keywords
  const typeSpecific =
    locale === 'id'
      ? (() => {
          switch (holiday.type) {
            case 'national':
              return [
                'libur nasional',
                'hari libur nasional',
                'tanggal merah nasional',
              ];
            case 'regional':
              return ['libur daerah', 'hari libur regional', 'libur provinsi'];
            case 'joint_leave':
              return [
                'cuti bersama',
                'hari cuti bersama',
                'libur cuti bersama',
              ];
            case 'religious':
              return ['hari libur keagamaan', 'perayaan keagamaan'];
            default:
              return [];
          }
        })()
      : (() => {
          switch (holiday.type) {
            case 'national':
              return [
                'national holiday',
                'public holiday',
                'national celebration',
              ];
            case 'regional':
              return [
                'regional holiday',
                'provincial holiday',
                'local holiday',
              ];
            case 'joint_leave':
              return ['joint leave', 'collective leave', 'government leave'];
            case 'religious':
              return ['religious holiday', 'religious celebration'];
            default:
              return [];
          }
        })();

  return [...base.slice(0, 10), ...holidaySpecific, ...typeSpecific];
}

/**
 * Generate FAQ schema for holiday detail page
 */
export function generateHolidayFAQSchema(holiday: Holiday, locale: 'id' | 'en') {
  const holidayName = holiday.name[locale];
  const formattedDate = formatHolidayDate(holiday.date, locale);
  const year = holiday.year;
  const holidayDate = new Date(holiday.date);
  const dayName = getDayName(holidayDate.getDay(), locale);
  const weekendProximity = checkWeekendProximity(holidayDate);
  
  const faqs = locale === 'id' ? [
    {
      question: `Kapan ${holidayName} ${year}?`,
      answer: `${holidayName} ${year} jatuh pada hari ${dayName}, ${formattedDate}.`
    },
    {
      question: `Apakah ${holidayName} libur nasional?`,
      answer: holiday.type === 'national' 
        ? `Ya, ${holidayName} adalah hari libur nasional Indonesia yang ditetapkan pemerintah.`
        : holiday.type === 'joint_leave'
        ? `${holidayName} adalah hari cuti bersama yang ditetapkan pemerintah Indonesia.`
        : `${holidayName} adalah hari libur regional untuk provinsi tertentu di Indonesia.`
    },
    {
      question: `Bagaimana strategi cuti untuk ${holidayName} ${year}?`,
      answer: weekendProximity.cutiStrategy 
        ? `${holidayName} jatuh pada hari ${dayName}. Untuk long weekend optimal, ambil cuti pada hari ${weekendProximity.cutiStrategy} sehingga Anda bisa menikmati libur lebih panjang.`
        : `${holidayName} jatuh pada hari ${dayName}. Rencanakan aktivitas liburan Anda dengan baik untuk memanfaatkan hari libur ini secara optimal.`
    },
    {
      question: `Apa tradisi dan makna ${holidayName}?`,
      answer: holiday.description?.id 
        ? `${holiday.description.id} Ini adalah momen penting dalam kalender Indonesia untuk merayakan dan menghormati nilai-nilai yang terkandung dalam ${holidayName}.`
        : `${holidayName} adalah hari penting dalam kalender Indonesia yang dirayakan secara nasional dengan berbagai tradisi dan aktivitas khusus.`
    }
  ] : [
    {
      question: `When is ${holidayName} ${year}?`,
      answer: `${holidayName} ${year} falls on ${dayName}, ${formattedDate}.`
    },
    {
      question: `Is ${holidayName} a national holiday?`,
      answer: holiday.type === 'national'
        ? `Yes, ${holidayName} is an Indonesian national holiday officially designated by the government.`
        : holiday.type === 'joint_leave'
        ? `${holidayName} is a joint leave day designated by the Indonesian government.`
        : `${holidayName} is a regional holiday for specific provinces in Indonesia.`
    },
    {
      question: `How to plan leave for ${holidayName} ${year}?`,
      answer: weekendProximity.cutiStrategy
        ? `${holidayName} falls on ${dayName}. For an optimal long weekend, take leave on ${weekendProximity.cutiStrategy} so you can enjoy an extended holiday.`
        : `${holidayName} falls on ${dayName}. Plan your holiday activities well to make the most of this holiday optimally.`
    },
    {
      question: `What are the traditions and meaning of ${holidayName}?`,
      answer: holiday.description?.en
        ? `${holiday.description.en} This is an important moment in the Indonesian calendar to celebrate and honor the values contained in ${holidayName}.`
        : `${holidayName} is an important day in the Indonesian calendar that is celebrated nationally with various special traditions and activities.`
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Enhanced holiday detail metadata with planning context
 */
export function generateEnhancedHolidayDetailMetadata(
  holiday: Holiday,
  locale: 'id' | 'en'
): Metadata {
  const holidayName = holiday.name[locale];
  const formattedDate = formatHolidayDate(holiday.date, locale);
  const year = holiday.year;
  const holidayDate = new Date(holiday.date);
  const dayName = getDayName(holidayDate.getDay(), locale);
  const weekendProximity = checkWeekendProximity(holidayDate);

  // Consistent title format for all holiday detail pages
  const title = locale === 'id'
    ? `${holidayName} ${year} - ${formattedDate} | Kalender Libur Indonesia`
    : `${holidayName} ${year} - ${formattedDate} | Indonesian Holiday Calendar`;

  // Enhanced description with day context and planning tips
  let description = '';
  if (locale === 'id') {
    description = `${holidayName} jatuh pada hari ${dayName}, ${formattedDate}. `;

    if (weekendProximity.isLongWeekend) {
      description += `Karena jatuh pada hari ${dayName}, ini adalah peluang long weekend ${weekendProximity.duration} hari. `;
    }

    if (weekendProximity.cutiStrategy) {
      description += `Tips perencanaan: ambil cuti hari ${weekendProximity.cutiStrategy} untuk long weekend optimal. `;
    }

    if (holiday.type === 'national') {
      description += 'Ini adalah hari libur nasional Indonesia. ';
    } else if (holiday.type === 'regional' && holiday.provinces) {
      const provinceNames = holiday.provinces
        .map((p) => getProvinceName(p).id)
        .join(', ');
      description += `Hari libur regional untuk provinsi: ${provinceNames}. `;
    } else if (holiday.type === 'joint_leave') {
      description += 'Ini adalah hari cuti bersama. ';
    }

    if (holiday.description) {
      description += `${holiday.description.id} `;
    }

    description += `Informasi lengkap tentang ${holidayName} ${year}, termasuk sejarah, tradisi, dan tips perencanaan libur strategis. `;
    description += 'Kalender resmi hari libur Indonesia dengan informasi akurat untuk perencanaan liburan optimal dan maksimalkan waktu istirahat Anda.';
  } else {
    description = `${holidayName} falls on ${dayName}, ${formattedDate}. `;

    if (weekendProximity.isLongWeekend) {
      description += `Since it falls on ${dayName}, this is a ${weekendProximity.duration}-day long weekend opportunity. `;
    }

    if (weekendProximity.cutiStrategy) {
      description += `Planning tip: take leave on ${weekendProximity.cutiStrategy} for an optimal long weekend. `;
    }

    if (holiday.type === 'national') {
      description += 'This is an Indonesian national holiday. ';
    } else if (holiday.type === 'regional' && holiday.provinces) {
      const provinceNames = holiday.provinces
        .map((p) => getProvinceName(p).en)
        .join(', ');
      description += `Regional holiday for provinces: ${provinceNames}. `;
    } else if (holiday.type === 'joint_leave') {
      description += 'This is a joint leave day. ';
    }

    if (holiday.description) {
      description += `${holiday.description.en} `;
    }

    description += `Complete information about ${holidayName} ${year}, including history, traditions, and strategic vacation planning tips. `;
    description += 'Official Indonesian holiday calendar with accurate information for optimal vacation planning and maximizing your time off.';
  }

  // Enhanced keywords with planning intent
  const planningKeywords = locale === 'id' ? [
    `strategi cuti ${holidayName.toLowerCase()}`,
    `perencanaan liburan ${holidayName.toLowerCase()}`,
    `long weekend ${holidayName.toLowerCase()}`,
    `tips libur ${holidayName.toLowerCase()}`,
    `maksimalkan libur ${year}`
  ] : [
    `${holidayName.toLowerCase()} leave strategy`,
    `${holidayName.toLowerCase()} vacation planning`,
    `${holidayName.toLowerCase()} long weekend`,
    `${holidayName.toLowerCase()} holiday tips`,
    `maximize ${year} holidays`
  ];

  const keywords = generateHolidayDetailKeywords(holiday, locale);

  return {
    title,
    description,
    keywords: [...keywords, ...planningKeywords].join(', '),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: `${year}-01-01T00:00:00Z`,
      modifiedTime: holiday.date,
      tags: [...keywords, ...planningKeywords],
      images: [{
        url: `/api/og?holiday=${holiday.id}&locale=${locale}&enhanced=true`,
        width: 1200,
        height: 630,
        alt: title
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/holiday/${holiday.id}`,
      languages: {
        id: `/id/holiday/${holiday.id}`,
        en: `/en/holiday/${holiday.id}`,
      },
    },
    other: {
      'article:author': 'ForPublic.id',
      'article:section': locale === 'id' ? 'Hari Libur Indonesia' : 'Indonesian Holidays',
      'article:tag': [...keywords, ...planningKeywords].join(', '),
    },
  };
}

/**
 * Generate yearly holiday comparison
 */
export function generateYearlyComparison(currentYear: number, holidays: Holiday[]) {
  const nationalAndJoint = holidays.filter(h => h.type === 'national' || h.type === 'joint_leave');
  
  // Mock previous year data (in real app, you'd fetch this)
  const previousYearCount = currentYear === 2025 ? 19 : currentYear === 2024 ? 18 : 20;
  
  const difference = nationalAndJoint.length - previousYearCount;
  const longWeekendOpportunities = holidays.reduce((count, holiday) => {
    const date = new Date(holiday.date);
    const proximity = checkWeekendProximity(date);
    return proximity.isLongWeekend ? count + 1 : count;
  }, 0);
  
  return {
    currentCount: nationalAndJoint.length,
    previousCount: previousYearCount,
    difference,
    isMore: difference > 0,
    longWeekendOpportunities,
    strategicOpportunities: holidays.filter(holiday => {
      const date = new Date(holiday.date);
      const proximity = checkWeekendProximity(date);
      return proximity.cutiStrategy;
    }).length
  };
}
