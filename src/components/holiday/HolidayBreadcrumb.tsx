import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Holiday } from '@/types/holiday';

interface HolidayBreadcrumbProps {
  holiday: Holiday;
  locale: 'id' | 'en';
}

export default function HolidayBreadcrumb({
  holiday,
  locale,
}: HolidayBreadcrumbProps) {
  const date = new Date(holiday.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const getMonthName = (monthNumber: number) => {
    const months = {
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
    return months[locale][monthNumber - 1];
  };

  const breadcrumbItems = [
    {
      label: locale === 'id' ? 'Beranda' : 'Home',
      href: `/${locale}`,
    },
    {
      label: year.toString(),
      href: `/${locale}/${year}`,
    },
    {
      label: getMonthName(month),
      href: `/${locale}/${year}/${getMonthName(month)}`,
    },
    {
      label: holiday.name[locale],
      href: null, // Current page
    },
  ];

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}

          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium line-clamp-1">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
