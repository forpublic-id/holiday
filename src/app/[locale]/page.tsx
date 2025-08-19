import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('HomePage')

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
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

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-card-foreground">{t('comingSoon')}</h2>
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