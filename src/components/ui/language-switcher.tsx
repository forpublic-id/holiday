'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from './button';

// Flag Components using external SVG files
const IndonesianFlag = () => (
  <Image
    src="/flags/indonesia.svg"
    alt="Indonesian flag"
    width={16}
    height={12}
    priority
  />
);

const BritishFlag = () => (
  <Image
    src="/flags/united-kingdom.svg"
    alt="British flag"
    width={16}
    height={12}
    priority
  />
);

export function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageSwitch = (newLocale: string) => {
    if (isPending || locale === newLocale) return;

    startTransition(() => {
      // Replace the current locale in the pathname
      const pathSegments = pathname.split('/');

      if (pathSegments[1] === locale) {
        // Replace existing locale
        pathSegments[1] = newLocale;
      } else {
        // If no locale in path, add it
        pathSegments.splice(1, 0, newLocale);
      }

      const newPath = pathSegments.join('/');
      router.push(newPath);
      router.refresh();
    });
  };

  return (
    <div className="flex gap-1">
      <Button
        variant={locale === 'id' ? 'default' : 'ghost'}
        size="sm"
        className="h-8 px-3 flex items-center gap-1.5 cursor-pointer"
        disabled={isPending}
        onClick={() => handleLanguageSwitch('id')}
      >
        <IndonesianFlag />
        <span className="font-medium">ID</span>
      </Button>
      <Button
        variant={locale === 'en' ? 'default' : 'ghost'}
        size="sm"
        className="h-8 px-3 flex items-center gap-1.5 cursor-pointer"
        disabled={isPending}
        onClick={() => handleLanguageSwitch('en')}
      >
        <BritishFlag />
        <span className="font-medium">EN</span>
      </Button>
    </div>
  );
}
