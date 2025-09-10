import type { Holiday } from '@/types/holiday';

interface EventSchemaProps {
  holidays: Holiday[];
  locale: string;
}

interface WebsiteSchemaProps {
  locale: string;
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function EventSchema({ holidays, locale }: EventSchemaProps) {
  if (!holidays.length) return null;

  const events = holidays.map((holiday, index) => ({
    '@type': 'Event',
    '@id': `https://holiday.forpublic.id/#event-${holiday.date}-${index}`,
    name: holiday.name[locale as 'id' | 'en'],
    startDate: holiday.date,
    endDate: holiday.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Country',
      name: locale === 'id' ? 'Indonesia' : 'Indonesia',
      addressCountry: 'ID',
    },
    description: `${holiday.name[locale as 'id' | 'en']} - ${
      locale === 'id'
        ? 'Hari libur nasional Indonesia'
        : 'Indonesian national holiday'
    }`,
    organizer: {
      '@type': 'Organization',
      name: 'Pemerintah Indonesia',
      url: 'https://indonesia.go.id',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
    },
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@graph': events,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema({ locale }: WebsiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://holiday.forpublic.id/#website',
    url: 'https://holiday.forpublic.id',
    name:
      locale === 'id'
        ? 'Holiday Calendar Indonesia'
        : 'Indonesian Holiday Calendar',
    description:
      locale === 'id'
        ? 'Kalender hari libur Indonesia lengkap dengan libur nasional, cuti bersama, dan libur daerah'
        : 'Complete Indonesian holiday calendar with national holidays, joint leave days, and regional holidays',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://forpublic.id/#organization',
      name: 'ForPublic.id',
      url: 'https://forpublic.id',
      logo: {
        '@type': 'ImageObject',
        url: 'https://holiday.forpublic.id/logo.svg',
        width: 200,
        height: 60,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://holiday.forpublic.id/{locale}/{year}/{month}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: [
      {
        '@type': 'Language',
        name: 'Indonesian',
        alternateName: 'id',
      },
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema({ locale }: { locale: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://forpublic.id/#localbusiness',
    name: 'ForPublic.id',
    url: 'https://forpublic.id',
    description:
      locale === 'id'
        ? 'Platform informasi publik Indonesia yang menyediakan kalender hari libur nasional, data pemerintahan, dan layanan informasi publik lainnya.'
        : 'Indonesian public information platform providing national holiday calendar, government data, and other public information services.',
    logo: {
      '@type': 'ImageObject',
      url: 'https://holiday.forpublic.id/logo.svg',
      width: 200,
      height: 60,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
      addressRegion: 'Indonesia',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Indonesian', 'English'],
    },
    sameAs: ['https://holiday.forpublic.id'],
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    knowsAbout: [
      'Indonesian national holidays',
      'Government calendar',
      'Public holidays Indonesia',
      'Holiday planning',
      'Indonesian calendar system',
    ],
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name:
          locale === 'id'
            ? 'Layanan Kalender Hari Libur Indonesia'
            : 'Indonesian Holiday Calendar Service',
        description:
          locale === 'id'
            ? 'Akses gratis ke kalender hari libur Indonesia lengkap dengan informasi cuti bersama dan perencanaan liburan.'
            : 'Free access to complete Indonesian holiday calendar with joint leave information and vacation planning.',
      },
      price: '0',
      priceCurrency: 'IDR',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ locale }: { locale: string }) {
  const faqs =
    locale === 'id'
      ? [
          {
            question: 'Kapan libur Lebaran 2025?',
            answer:
              'Libur Lebaran 2025 diprediksi jatuh pada 30 Maret - 6 April 2025, termasuk cuti bersama. Tanggal pasti akan dikonfirmasi setelah penetapan resmi pemerintah.',
          },
          {
            question: 'Berapa hari libur nasional Indonesia tahun 2025?',
            answer:
              'Indonesia memiliki sekitar 16 hari libur nasional dan cuti bersama pada tahun 2025, termasuk Tahun Baru, Imlek, Hari Raya Nyepi, Idul Fitri, Hari Buruh, Waisak, Idul Adha, HUT Kemerdekaan, Maulid Nabi, dan Natal.',
          },
          {
            question: 'Apa perbedaan libur nasional dan cuti bersama?',
            answer:
              'Libur nasional adalah hari libur resmi yang ditetapkan pemerintah, sedangkan cuti bersama adalah hari kerja yang diliburkan untuk memperpanjang masa libur nasional agar menjadi long weekend.',
          },
          {
            question:
              'Bagaimana cara merencanakan liburan dengan kalender ini?',
            answer:
              'Gunakan fitur filter untuk melihat libur nasional dan cuti bersama, lalu kombinasikan dengan cuti pribadi untuk membuat long weekend yang optimal. Kalender kami menampilkan semua informasi yang dibutuhkan untuk perencanaan liburan.',
          },
        ]
      : [
          {
            question: 'When is Eid holiday 2025 in Indonesia?',
            answer:
              'Eid holiday 2025 is predicted to fall on March 30 - April 6, 2025, including joint leave days. The exact dates will be confirmed after official government announcement.',
          },
          {
            question: 'How many national holidays does Indonesia have in 2025?',
            answer:
              'Indonesia has approximately 16 national holidays and joint leave days in 2025, including New Year, Chinese New Year, Nyepi, Eid al-Fitr, Labor Day, Vesak, Eid al-Adha, Independence Day, Maulid, and Christmas.',
          },
          {
            question:
              'What is the difference between national holidays and joint leave days?',
            answer:
              'National holidays are official holidays set by the government, while joint leave days are working days that are made holidays to extend national holidays into long weekends.',
          },
          {
            question: 'How to plan vacation using this calendar?',
            answer:
              'Use the filter feature to view national holidays and joint leave days, then combine with personal leave to create optimal long weekends. Our calendar displays all the information needed for vacation planning.',
          },
        ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
