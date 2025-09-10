'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

interface HeaderProps {
  locale: string;
}

function getCurrentMonthUrl(locale: string) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const monthNames =
    locale === 'id'
      ? [
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
        ]
      : [
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
        ];

  const monthName = monthNames[month - 1];
  return `/${locale}/${year}/${monthName}`;
}

export function Header({ locale }: HeaderProps) {
  const currentMonthUrl = getCurrentMonthUrl(locale);
  const pathname = usePathname();

  const isActivePage = (path: string) => {
    return pathname.includes(path);
  };

  const isCalendarActive = () => {
    // Active if on year/month pages but NOT on holiday list pages
    return (
      (pathname.includes('/2024') ||
        pathname.includes('/2025') ||
        pathname.includes('/2026')) &&
      !pathname.includes('/libur') &&
      !pathname.includes('/holidays')
    );
  };

  const isHolidayListActive = () => {
    return pathname.includes('/libur') || pathname.includes('/holidays');
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={currentMonthUrl} className="flex items-center space-x-3">
            <Image
              src="/logo.svg"
              alt="ForPublic.id Logo"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xl font-bold text-foreground whitespace-nowrap">
                Holiday <span className="text-primary">ForPublic</span>
              </span>
              <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                by <span className="text-foreground">ForPublic</span>
                <span className="text-red-600">.id</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href={currentMonthUrl}
              className={`transition-colors hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 rounded-sm px-1 py-1 ${
                isCalendarActive()
                  ? 'text-red-600 font-medium'
                  : 'text-gray-600'
              }`}
              aria-current={isCalendarActive() ? 'page' : undefined}
            >
              {locale === 'id' ? 'Kalender' : 'Calendar'}
            </Link>
            <Link
              href={`/${locale}/${new Date().getFullYear()}/${locale === 'id' ? 'libur' : 'holidays'}`}
              className={`transition-colors hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 rounded-sm px-1 py-1 ${
                isHolidayListActive()
                  ? 'text-red-600 font-medium'
                  : 'text-gray-600'
              }`}
              aria-current={isHolidayListActive() ? 'page' : undefined}
            >
              {locale === 'id' ? 'Daftar Libur' : 'Holiday List'}
            </Link>
            <Link
              href={`/${locale}/about`}
              className={`transition-colors hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 rounded-sm px-1 py-1 ${
                isActivePage('/about')
                  ? 'text-red-600 font-medium'
                  : 'text-gray-600'
              }`}
              aria-current={isActivePage('/about') ? 'page' : undefined}
            >
              {locale === 'id' ? 'Tentang' : 'About'}
            </Link>
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher locale={locale} />
          </div>

          {/* Mobile Language Switcher */}
          <div className="md:hidden">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
