import { Calendar, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { getMonthName } from '@/lib/seo-utils';

interface InternalLinksProps {
  currentYear: number;
  currentMonth?: number;
  locale: string;
  type?: 'month' | 'year' | 'home';
}

export function InternalLinks({
  currentYear,
  currentMonth,
  locale,
  type = 'month',
}: InternalLinksProps) {
  const currentDate = new Date();
  const thisYear = currentDate.getFullYear();
  const thisMonth = currentDate.getMonth() + 1;

  // Generate related links based on page type
  const generateRelatedLinks = () => {
    const links = [];

    if (type === 'month' && currentMonth) {
      // Previous/Next month links
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
      const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
      const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;

      links.push(
        {
          href: `/${locale}/${prevYear}/${getMonthName(prevMonth, locale).toLowerCase()}`,
          title:
            locale === 'id'
              ? `Libur ${getMonthName(prevMonth, locale)} ${prevYear}`
              : `${getMonthName(prevMonth, locale)} ${prevYear} Holidays`,
          icon: Calendar,
          rel: 'prev',
        },
        {
          href: `/${locale}/${nextYear}/${getMonthName(nextMonth, locale).toLowerCase()}`,
          title:
            locale === 'id'
              ? `Libur ${getMonthName(nextMonth, locale)} ${nextYear}`
              : `${getMonthName(nextMonth, locale)} ${nextYear} Holidays`,
          icon: Calendar,
          rel: 'next',
        }
      );

      // Current month if different
      if (currentYear !== thisYear || currentMonth !== thisMonth) {
        links.push({
          href: `/${locale}/${thisYear}/${getMonthName(thisMonth, locale).toLowerCase()}`,
          title:
            locale === 'id'
              ? `Libur ${getMonthName(thisMonth, locale)} ${thisYear} (Bulan Ini)`
              : `${getMonthName(thisMonth, locale)} ${thisYear} Holidays (This Month)`,
          icon: Clock,
          rel: 'current',
        });
      }

      // Year overview
      links.push({
        href: `/${locale}/${currentYear}/${locale === 'id' ? 'libur' : 'holidays'}`,
        title:
          locale === 'id'
            ? `Semua Libur ${currentYear}`
            : `All ${currentYear} Holidays`,
        icon: Calendar,
        rel: 'up',
      });
    }

    if (type === 'year') {
      // Previous/Next year
      links.push(
        {
          href: `/${locale}/${currentYear - 1}/${locale === 'id' ? 'libur' : 'holidays'}`,
          title:
            locale === 'id'
              ? `Libur ${currentYear - 1}`
              : `${currentYear - 1} Holidays`,
          icon: Calendar,
          rel: 'prev',
        },
        {
          href: `/${locale}/${currentYear + 1}/${locale === 'id' ? 'libur' : 'holidays'}`,
          title:
            locale === 'id'
              ? `Libur ${currentYear + 1}`
              : `${currentYear + 1} Holidays`,
          icon: Calendar,
          rel: 'next',
        }
      );

      // Current month
      links.push({
        href: `/${locale}/${thisYear}/${getMonthName(thisMonth, locale).toLowerCase()}`,
        title:
          locale === 'id'
            ? `Libur ${getMonthName(thisMonth, locale)} ${thisYear}`
            : `${getMonthName(thisMonth, locale)} ${thisYear} Holidays`,
        icon: Clock,
        rel: 'current',
      });
    }

    // Popular months (always include)
    const popularMonths = [
      { month: 1, keyword: locale === 'id' ? 'Tahun Baru' : 'New Year' },
      { month: 4, keyword: locale === 'id' ? 'Lebaran' : 'Eid' },
      { month: 8, keyword: locale === 'id' ? 'Kemerdekaan' : 'Independence' },
      { month: 12, keyword: locale === 'id' ? 'Natal' : 'Christmas' },
    ].filter((item) => type !== 'month' || item.month !== currentMonth);

    popularMonths.forEach((item) => {
      links.push({
        href: `/${locale}/${thisYear}/${getMonthName(item.month, locale).toLowerCase()}`,
        title:
          locale === 'id'
            ? `Libur ${getMonthName(item.month, locale)} ${thisYear} (${item.keyword})`
            : `${getMonthName(item.month, locale)} ${thisYear} Holidays (${item.keyword})`,
        icon: MapPin,
        rel: 'related',
      });
    });

    return links.slice(0, 6); // Limit to 6 links
  };

  const relatedLinks = generateRelatedLinks();

  if (relatedLinks.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        {locale === 'id' ? 'Kalender Terkait' : 'Related Calendars'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {relatedLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link
              key={index}
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
              rel={link.rel}
            >
              <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              <span className="text-sm font-medium group-hover:text-foreground transition-colors">
                {link.title}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          {locale === 'id'
            ? 'Temukan lebih banyak hari libur dan perencanaan cuti untuk tahun ini dan yang akan datang.'
            : 'Discover more holidays and vacation planning for this year and upcoming years.'}
        </p>
      </div>
    </div>
  );
}
