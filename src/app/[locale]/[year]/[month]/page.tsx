import { getTranslations } from 'next-intl/server'
import { Calendar } from '@/components/calendar'
import { HolidayList } from '@/components/holiday/HolidayList'
import { Header } from '@/components/layout/Header'
import { useMonthHolidays } from '@/hooks/use-holidays'
import { getHolidaysForYear } from '@/lib/holiday-data'
import { regionalHolidays2024 } from '@/data/holidays/regional-2024'
import { getHolidaysInMonth } from '@/lib/holiday-utils'
import { notFound } from 'next/navigation'

interface MonthPageProps {
  params: Promise<{ 
    locale: string
    year: string
    month: string
  }>
}

// Convert month name to number
function getMonthNumber(monthName: string): number {
  const monthNames = {
    'january': 1, 'januari': 1,
    'february': 2, 'februari': 2,
    'march': 3, 'maret': 3,
    'april': 4,
    'may': 5, 'mei': 5,
    'june': 6, 'juni': 6,
    'july': 7, 'juli': 7,
    'august': 8, 'agustus': 8,
    'september': 9,
    'october': 10, 'oktober': 10,
    'november': 11,
    'december': 12, 'desember': 12
  }
  
  return monthNames[monthName.toLowerCase() as keyof typeof monthNames] || 0
}

export default async function MonthPage({ params }: MonthPageProps) {
  const { locale, year: yearParam, month: monthParam } = await params
  const t = await getTranslations('HomePage')

  const year = parseInt(yearParam)
  const month = getMonthNumber(monthParam)

  // Validate year and month
  if (isNaN(year) || year < 2024 || year > 2030 || month === 0) {
    notFound()
  }

  // Get all holidays for the year
  const nationalHolidays = getHolidaysForYear(year)
  const regionalForYear = regionalHolidays2024.filter(h => h.year === year)
  const allHolidays = [...nationalHolidays, ...regionalForYear]
  
  // Get holidays for this specific month
  const monthHolidays = getHolidaysInMonth(year, month, allHolidays)

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              {t('title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('subtitle')}
            </p>
          </header>

          {/* Main Calendar */}
          <Calendar 
            locale={locale} 
            initialYear={year}
            initialMonth={month}
          />

          {/* Holiday List for Current Month */}
          <HolidayList 
            holidays={monthHolidays}
            year={year}
            month={month}
            locale={locale}
          />

          {/* Features Section */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-card-foreground">
              {locale === 'id' ? 'Fitur Unggulan' : 'Key Features'}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-md bg-secondary p-4 border border-border">
                <h3 className="font-medium text-secondary-foreground">{t('features.calendar.title')}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t('features.calendar.description')}</p>
              </div>
              <div className="rounded-md bg-secondary p-4 border border-border">
                <h3 className="font-medium text-secondary-foreground">{t('features.bilingual.title')}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t('features.bilingual.description')}</p>
              </div>
              <div className="rounded-md bg-secondary p-4 border border-border">
                <h3 className="font-medium text-secondary-foreground">{t('features.regional.title')}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t('features.regional.description')}</p>
              </div>
              <div className="rounded-md bg-secondary p-4 border border-border">
                <h3 className="font-medium text-secondary-foreground">{t('features.export.title')}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t('features.export.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}