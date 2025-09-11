import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HolidayDetailPage from '@/components/holiday/HolidayDetailPage';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import {
  EventSchema,
  HolidayFAQSchema,
  LocalBusinessSchema,
  WebsiteSchema,
} from '@/components/seo/SchemaMarkup';
import { getAllHolidayIds, getHolidayBySlug } from '@/lib/holiday-utils';
import { generateEnhancedHolidayDetailMetadata } from '@/lib/seo-utils';

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const holidayIds = getAllHolidayIds();

  return holidayIds.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const holiday = getHolidayBySlug(slug);

  if (!holiday) {
    return {
      title: 'Holiday Not Found',
    };
  }

  return generateEnhancedHolidayDetailMetadata(holiday, locale as 'id' | 'en');
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const holiday = getHolidayBySlug(slug);

  if (!holiday) {
    notFound();
  }

  const date = new Date(holiday.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const getMonthName = (monthNumber: number, locale: string) => {
    const months = {
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
    return months[locale as keyof typeof months][monthNumber - 1];
  };

  const breadcrumbItems = [
    {
      name: locale === 'id' ? 'Beranda' : 'Home',
      url: `/${locale}`,
      current: false,
    },
    {
      name: year.toString(),
      url: `/${locale}/${year}`,
      current: false,
    },
    {
      name: getMonthName(month, locale),
      url: `/${locale}/${year}/${getMonthName(month, locale).toLowerCase()}`,
      current: false,
    },
    {
      name: holiday.name[locale as 'id' | 'en'],
      url: `/${locale}/holiday/${slug}`,
      current: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Schema Markup */}
      <EventSchema holidays={[holiday]} locale={locale} />
      <HolidayFAQSchema holiday={holiday} locale={locale} />
      <WebsiteSchema locale={locale} />
      <LocalBusinessSchema locale={locale} />

      <Header locale={locale} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} locale={locale} />

          <HolidayDetailPage holiday={holiday} locale={locale as 'id' | 'en'} />
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
