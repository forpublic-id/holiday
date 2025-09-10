'use client';

import { Calendar, ChevronLeft, Info, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  formatHolidayDate,
  generateHolidaySlug,
  getAdjacentHolidays,
  getProvinceName,
} from '@/lib/holiday-utils';
import type { Holiday } from '@/types/holiday';
import AddToCalendarButton from './AddToCalendarButton';
import HolidayBadge from './HolidayBadge';
import HolidayBreadcrumb from './HolidayBreadcrumb';
import ShareButton from './ShareButton';

interface HolidayDetailPageProps {
  holiday: Holiday;
  locale: 'id' | 'en';
}

export default function HolidayDetailPage({
  holiday,
  locale,
}: HolidayDetailPageProps) {
  const router = useRouter();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const t = useTranslations('HolidayDetail');

  const formattedDate = formatHolidayDate(holiday.date, locale);
  const adjacentHolidays = getAdjacentHolidays(holiday);

  const handleBack = () => {
    router.back();
  };

  const getTypeLabel = (type: string) => {
    return t(`holidayTypes.${type}`) || type;
  };

  const getReligionLabel = (religion?: string) => {
    if (!religion) return null;
    return t(`religions.${religion}`) || religion;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <HolidayBreadcrumb holiday={holiday} locale={locale} />

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        {t('back')}
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Main Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {holiday.name[locale]}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{formattedDate}</span>
                </div>
                <HolidayBadge type={holiday.type} />
              </div>

              {/* Holiday Type & Religion */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {t('type')} {getTypeLabel(holiday.type)}
                  </span>
                </div>

                {holiday.religion && (
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {t('religion')} {getReligionLabel(holiday.religion)}
                    </span>
                  </div>
                )}

                {holiday.provinces && holiday.provinces.length > 0 && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">
                        {t('applicableIn')}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {holiday.provinces.map((province) => (
                          <span
                            key={province}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {getProvinceName(province)[locale]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 lg:flex-row">
              <ShareButton holiday={holiday} locale={locale} />
              <AddToCalendarButton holiday={holiday} locale={locale} />
            </div>
          </div>
        </div>

        {/* Description Section */}
        {holiday.description && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t('description')}
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {showFullDescription
                  ? holiday.description[locale]
                  : holiday.description[locale].substring(0, 200) +
                    (holiday.description[locale].length > 200 ? '...' : '')}
              </p>
              {holiday.description[locale].length > 200 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                >
                  {showFullDescription ? t('showLess') : t('readMore')}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('additionalInfo')}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                {t('dateStatus')}
              </h3>
              <p className="text-sm text-gray-600">
                {holiday.isVariable ? t('dateVariable') : t('dateFixed')}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                {t('year')}
              </h3>
              <p className="text-sm text-gray-600">{holiday.year}</p>
            </div>

            {holiday.source && (
              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-900 mb-2">
                  {t('officialSource')}
                </h3>
                <p className="text-sm text-gray-600">{holiday.source}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation to Previous/Next Holiday */}
        {(adjacentHolidays.previous || adjacentHolidays.next) && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('otherHolidays')}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {adjacentHolidays.previous && (
                <Link
                  href={`/${locale}/holiday/${generateHolidaySlug(adjacentHolidays.previous)}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm text-gray-500 mb-1">
                    {t('previous')}
                  </div>
                  <div className="font-medium text-gray-900 line-clamp-2">
                    {adjacentHolidays.previous.name[locale]}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {formatHolidayDate(adjacentHolidays.previous.date, locale)}
                  </div>
                </Link>
              )}

              {adjacentHolidays.next && (
                <Link
                  href={`/${locale}/holiday/${generateHolidaySlug(adjacentHolidays.next)}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm text-gray-500 mb-1">
                    {t('next')}
                  </div>
                  <div className="font-medium text-gray-900 line-clamp-2">
                    {adjacentHolidays.next.name[locale]}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {formatHolidayDate(adjacentHolidays.next.date, locale)}
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
