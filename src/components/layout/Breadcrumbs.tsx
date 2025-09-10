import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
}

export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const baseUrl = 'https://holiday.forpublic.id';
  const breadcrumbItems = [
    {
      name: locale === 'id' ? 'Beranda' : 'Home',
      url: `${baseUrl}/${locale}`,
    },
    ...items.map((item) => ({
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <nav
        className="flex items-center space-x-1 text-sm text-muted-foreground mb-6"
        aria-label="Breadcrumb"
      >
        <Link
          href={`/${locale}`}
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
          <span className="sr-only">
            {locale === 'id' ? 'Beranda' : 'Home'}
          </span>
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {item.current ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
