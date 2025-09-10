import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import HolidayDetailPage from '@/components/holiday/HolidayDetailPage';
import { getAllHolidayIds, getHolidayBySlug } from '@/lib/holiday-utils';
import { generateHolidayDetailMetadata } from '@/lib/seo-utils';

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

  return generateHolidayDetailMetadata(holiday, locale as 'id' | 'en');
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const holiday = getHolidayBySlug(slug);

  if (!holiday) {
    notFound();
  }

  const t = await getTranslations('HolidayDetail');

  return (
    <HolidayDetailPage
      holiday={holiday}
      locale={locale as 'id' | 'en'}
      messages={t}
    />
  );
}
