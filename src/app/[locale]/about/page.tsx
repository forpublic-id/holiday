import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Calendar, Clock, Globe, Download, MapPin, Smartphone } from 'lucide-react'
import type { Metadata } from 'next'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  
  const title = locale === 'id' 
    ? 'Tentang Holiday Calendar Indonesia | Fitur & Informasi Lengkap'
    : 'About Indonesian Holiday Calendar | Features & Information'
    
  const description = locale === 'id'
    ? 'Pelajari lebih lanjut tentang Holiday Calendar Indonesia - aplikasi kalender libur nasional terlengkap dengan fitur bilingual, filter daerah, dan informasi hari libur real-time.'
    : 'Learn more about Indonesian Holiday Calendar - the most comprehensive national holiday calendar app with bilingual support, regional filters, and real-time holiday information.'

  return {
    title,
    description,
    keywords: locale === 'id' 
      ? ['tentang aplikasi', 'fitur kalender', 'informasi holiday calendar', 'aplikasi libur indonesia']
      : ['about app', 'calendar features', 'holiday calendar info', 'indonesian holidays app'],
    openGraph: {
      title,
      description,
      url: `https://holiday.forpublic.id/${locale}/about`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const t = await getTranslations('AboutPage')

  const features = [
    {
      icon: Calendar,
      titleKey: 'features.calendar.title',
      descKey: 'features.calendar.description',
      color: 'bg-blue-500'
    },
    {
      icon: Globe,
      titleKey: 'features.bilingual.title', 
      descKey: 'features.bilingual.description',
      color: 'bg-green-500'
    },
    {
      icon: MapPin,
      titleKey: 'features.regional.title',
      descKey: 'features.regional.description', 
      color: 'bg-orange-500'
    },
    {
      icon: Clock,
      titleKey: 'features.realtime.title',
      descKey: 'features.realtime.description',
      color: 'bg-purple-500'
    },
    {
      icon: Smartphone,
      titleKey: 'features.responsive.title',
      descKey: 'features.responsive.description',
      color: 'bg-pink-500'
    },
    {
      icon: Download,
      titleKey: 'features.export.title',
      descKey: 'features.export.description',
      color: 'bg-indigo-500'
    }
  ]

  const stats = [
    {
      number: '20+',
      label: locale === 'id' ? 'Libur Nasional per Tahun' : 'National Holidays per Year'
    },
    {
      number: '34+',
      label: locale === 'id' ? 'Provinsi Didukung' : 'Provinces Supported'
    },
    {
      number: '2',
      label: locale === 'id' ? 'Bahasa Tersedia' : 'Languages Available'
    },
    {
      number: '100%',
      label: locale === 'id' ? 'Gratis & Open Source' : 'Free & Open Source'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <h1 className="mb-6 text-4xl font-bold text-foreground">
              {locale === 'id' ? 'Tentang Holiday Calendar Indonesia' : 'About Indonesian Holiday Calendar'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {locale === 'id' 
                ? 'Aplikasi kalender libur nasional terlengkap dan termudah untuk merencanakan hari libur dan cuti Anda di Indonesia.'
                : 'The most comprehensive and user-friendly national holiday calendar app for planning your holidays and leave days in Indonesia.'
              }
            </p>
          </header>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-border bg-card shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <section className="mb-16">
            <h2 className="mb-8 text-3xl font-bold text-foreground text-center">
              {locale === 'id' ? 'Fitur Unggulan' : 'Key Features'}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(feature.descKey)}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-card-foreground text-center">
                {locale === 'id' ? 'Misi Kami' : 'Our Mission'}
              </h2>
              <p className="text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
                {locale === 'id'
                  ? 'Menyediakan informasi hari libur nasional Indonesia yang akurat, terkini, dan mudah diakses untuk membantu masyarakat merencanakan aktivitas dan cuti dengan lebih baik. Kami berkomitmen untuk terus mengembangkan fitur-fitur yang bermanfaat dan menjaga kualitas data yang tinggi.'
                  : 'To provide accurate, up-to-date, and easily accessible Indonesian national holiday information to help people plan their activities and leave days better. We are committed to continuously developing useful features and maintaining high data quality.'
                }
              </p>
            </div>
          </section>

          {/* Technology Section */}
          <section className="mb-16">
            <h2 className="mb-8 text-2xl font-bold text-foreground text-center">
              {locale === 'id' ? 'Teknologi yang Digunakan' : 'Technology Stack'}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: 'Next.js 15', desc: locale === 'id' ? 'Framework React modern' : 'Modern React framework' },
                { name: 'TypeScript', desc: locale === 'id' ? 'Type safety & DX' : 'Type safety & DX' },
                { name: 'Tailwind CSS', desc: locale === 'id' ? 'Styling responsif' : 'Responsive styling' },
                { name: 'next-intl', desc: locale === 'id' ? 'Dukungan multi-bahasa' : 'Multi-language support' },
                { name: 'Lucide Icons', desc: locale === 'id' ? 'Ikon modern' : 'Modern icons' },
                { name: 'Vercel', desc: locale === 'id' ? 'Hosting & deployment' : 'Hosting & deployment' }
              ].map((tech, index) => (
                <div key={index} className="rounded-md border border-border bg-secondary p-4">
                  <h3 className="font-medium text-secondary-foreground">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{tech.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <div className="rounded-lg border border-border bg-card p-8 shadow-sm text-center">
              <h2 className="mb-4 text-2xl font-bold text-card-foreground">
                {locale === 'id' ? 'Hubungi Kami' : 'Contact Us'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {locale === 'id'
                  ? 'Punya saran, masukan, atau menemukan kesalahan data? Kami senang mendengar dari Anda!'
                  : 'Have suggestions, feedback, or found data errors? We\'d love to hear from you!'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://forpublic.id" 
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'id' ? 'Kunjungi ForPublic.id' : 'Visit ForPublic.id'}
                </a>
                <a 
                  href="https://github.com/forpublic-id/holiday" 
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'id' ? 'Lihat di GitHub' : 'View on GitHub'}
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer locale={locale} />
    </div>
  )
}