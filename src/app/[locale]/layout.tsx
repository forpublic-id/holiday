import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['id', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Holiday Calendar Indonesia - ForPublic.id',
  description:
    'Comprehensive Indonesian holiday calendar with national holidays, regional celebrations, and smart planning tools.',
  keywords: [
    'holiday',
    'calendar',
    'indonesia',
    'libur',
    'nasional',
    'cuti',
    'hari libur',
    'kalender indonesia',
  ],
  metadataBase: new URL('https://holiday.forpublic.id'),
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/id',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Holiday Calendar Indonesia - ForPublic.id',
    description:
      'Comprehensive Indonesian holiday calendar with national holidays, regional celebrations, and smart planning tools.',
    url: 'https://holiday.forpublic.id',
    siteName: 'ForPublic.id',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Holiday Calendar Indonesia - ForPublic.id',
      },
    ],
    locale: 'id_ID',
    alternateLocale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Holiday Calendar Indonesia - ForPublic.id',
    description:
      'Comprehensive Indonesian holiday calendar with national holidays, regional celebrations, and smart planning tools.',
    images: ['/logo.svg'],
    creator: '@forpublic_id',
    site: '@forpublic_id',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg' }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </NextIntlClientProvider>
  );
}
