import { getTranslations } from 'next-intl/server'
import { Calendar } from '@/components/calendar'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const t = await getTranslations('HomePage')

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {t('poweredBy')} <span className="font-semibold text-foreground">ForPublic.id</span>
          </p>
        </header>

        {/* Main Calendar */}
        <div className="mb-8">
          <Calendar locale={locale} />
        </div>

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
  )
}