import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('HomePage')

  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-600">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t('poweredBy')} <span className="font-semibold">ForPublic.id</span>
          </p>
        </header>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">{t('comingSoon')}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md bg-blue-50 p-4">
              <h3 className="font-medium text-blue-900">{t('features.calendar.title')}</h3>
              <p className="text-sm text-blue-700">{t('features.calendar.description')}</p>
            </div>
            <div className="rounded-md bg-green-50 p-4">
              <h3 className="font-medium text-green-900">{t('features.bilingual.title')}</h3>
              <p className="text-sm text-green-700">{t('features.bilingual.description')}</p>
            </div>
            <div className="rounded-md bg-purple-50 p-4">
              <h3 className="font-medium text-purple-900">{t('features.regional.title')}</h3>
              <p className="text-sm text-purple-700">{t('features.regional.description')}</p>
            </div>
            <div className="rounded-md bg-orange-50 p-4">
              <h3 className="font-medium text-orange-900">{t('features.export.title')}</h3>
              <p className="text-sm text-orange-700">{t('features.export.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}