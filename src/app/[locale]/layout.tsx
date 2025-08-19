import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const locales = ['id', 'en']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Holiday Calendar Indonesia - ForPublic.id',
  description: 'Comprehensive Indonesian holiday calendar with national holidays, regional celebrations, and smart planning tools.',
  keywords: ['holiday', 'calendar', 'indonesia', 'libur', 'nasional', 'cuti'],
  authors: [{ name: 'ForPublic.id', url: 'https://forpublic.id' }],
  openGraph: {
    title: 'Holiday Calendar Indonesia',
    description: 'Comprehensive Indonesian holiday calendar for better planning',
    url: 'https://holiday.forpublic.id',
    siteName: 'ForPublic.id',
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}