import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
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

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const currentMonthUrl = getCurrentMonthUrl(locale);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo and Brand */}
          <Link
            href={currentMonthUrl}
            className="inline-flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6">
              <Image
                src="/logo.svg"
                alt="ForPublic.id Logo"
                width={24}
                height={24}
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <span className="text-lg font-bold">
              ForPublic<span className="text-red-600">.id</span>
            </span>
          </Link>

          {/* Project Description */}
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {locale === 'id'
              ? 'Kalender hari libur nasional dan regional Indonesia yang lengkap dengan informasi akurat untuk perencanaan yang lebih baik.'
              : 'Comprehensive Indonesian national and regional holiday calendar with accurate information for better planning.'}
          </p>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm">
            <Link
              href={currentMonthUrl}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {locale === 'id' ? 'Kalender' : 'Calendar'}
            </Link>
            <span className="hidden sm:inline text-gray-600">•</span>
            <Link
              href="https://forpublic.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {locale === 'id' ? 'Website Utama' : 'Main Website'}
            </Link>
            <span className="hidden sm:inline text-gray-600">•</span>
            <Link
              href="https://forpublic.id/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {locale === 'id' ? 'Kontak' : 'Contact'}
            </Link>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              © {currentYear} ForPublic
              <span className="text-red-600">.id</span>.{' '}
              {locale === 'id'
                ? 'Semua hak dilindungi. Dibuat dengan ❤️ untuk kebaikan publik.'
                : 'All rights reserved. Made with ❤️ for public good.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
