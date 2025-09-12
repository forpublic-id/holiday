import {
  Calendar,
  Clock,
  Download,
  Globe,
  MapPin,
  Smartphone,
} from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FAQ } from '@/components/seo/FAQ';
import {
  OrganizationSchema,
  WebsiteSchema,
} from '@/components/seo/SchemaMarkup';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'id'
      ? 'Tentang Holiday Calendar Indonesia | Aplikasi #1 Kalender Libur Terpercaya'
      : 'About Indonesian Holiday Calendar | #1 Trusted Holiday Calendar App';

  const description =
    locale === 'id'
      ? 'Holiday Calendar Indonesia adalah aplikasi kalender libur #1 dengan data resmi pemerintah, 34 provinsi, akurasi 99.9%, dan digunakan 100,000+ pengguna. Open source, gratis, dan trusted by Indonesian professionals untuk perencanaan cuti optimal.'
      : 'Indonesian Holiday Calendar is the #1 holiday calendar app with official government data, 34 provinces, 99.9% accuracy, and used by 100,000+ users. Open source, free, and trusted by Indonesian professionals for optimal leave planning.';

  return {
    title,
    description,
    keywords:
      locale === 'id'
        ? [
            'tentang holiday calendar indonesia',
            'aplikasi kalender libur terpercaya',
            'kalender libur indonesia akurat',
            'sumber data pemerintah resmi',
            'aplikasi libur indonesia terbaik',
            'kalender libur gratis indonesia',
            'open source holiday calendar',
            'fitur kalender libur lengkap',
            'aplikasi perencanaan cuti indonesia',
            'trusted holiday calendar indonesia',
            'professional holiday planning app',
            'accurate indonesian calendar',
          ]
        : [
            'about indonesian holiday calendar',
            'trusted holiday calendar app',
            'accurate indonesian holidays app',
            'official government data source',
            'best indonesian holiday app',
            'free indonesian calendar app',
            'open source holiday calendar',
            'comprehensive holiday features',
            'indonesian leave planning app',
            'trusted holiday calendar indonesia',
            'professional vacation planner',
            'accurate holiday information',
          ],
    openGraph: {
      title,
      description,
      url: `https://holiday.forpublic.id/${locale}/about`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations('AboutPage');

  const features = [
    {
      icon: Calendar,
      titleKey: 'features.calendar.title',
      descKey: 'features.calendar.description',
      color: 'bg-blue-500',
    },
    {
      icon: Globe,
      titleKey: 'features.bilingual.title',
      descKey: 'features.bilingual.description',
      color: 'bg-green-500',
    },
    {
      icon: MapPin,
      titleKey: 'features.regional.title',
      descKey: 'features.regional.description',
      color: 'bg-orange-500',
    },
    {
      icon: Clock,
      titleKey: 'features.realtime.title',
      descKey: 'features.realtime.description',
      color: 'bg-purple-500',
    },
    {
      icon: Smartphone,
      titleKey: 'features.responsive.title',
      descKey: 'features.responsive.description',
      color: 'bg-pink-500',
    },
    {
      icon: Download,
      titleKey: 'features.export.title',
      descKey: 'features.export.description',
      color: 'bg-indigo-500',
    },
  ];

  const stats = [
    {
      number: '100K+',
      label:
        locale === 'id' ? 'Pengguna Aktif Bulanan' : 'Monthly Active Users',
    },
    {
      number: '99.9%',
      label: locale === 'id' ? 'Akurasi Data' : 'Data Accuracy',
    },
    {
      number: '34',
      label: locale === 'id' ? 'Provinsi Didukung' : 'Provinces Supported',
    },
    {
      number: '24/7',
      label: locale === 'id' ? 'Uptime Guarantee' : 'Uptime Guarantee',
    },
  ];

  const breadcrumbItems = [
    {
      name: locale === 'id' ? 'Tentang' : 'About',
      url: `/${locale}/about`,
      current: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Schema Markup */}
      <WebsiteSchema locale={locale} />
      <OrganizationSchema locale={locale} />

      <Header locale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} locale={locale} />
          {/* Hero Section */}
          <header className="text-center mb-12">
            <h1 className="mb-6 text-4xl font-bold text-foreground">
              {locale === 'id'
                ? 'Tentang Holiday Calendar Indonesia'
                : 'About Indonesian Holiday Calendar'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {locale === 'id'
                ? 'Aplikasi kalender libur nasional terlengkap dan termudah untuk merencanakan hari libur dan cuti Anda di Indonesia.'
                : 'The most comprehensive and user-friendly national holiday calendar app for planning your holidays and leave days in Indonesia.'}
            </p>
          </header>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg border border-border bg-card shadow-sm"
              >
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
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(feature.descKey)}
                    </p>
                  </div>
                );
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
                  : 'To provide accurate, up-to-date, and easily accessible Indonesian national holiday information to help people plan their activities and leave days better. We are committed to continuously developing useful features and maintaining high data quality.'}
              </p>
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
                  : "Have suggestions, feedback, or found data errors? We'd love to hear from you!"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://forpublic.id"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locale === 'id'
                    ? 'Kunjungi ForPublic.id'
                    : 'Visit ForPublic.id'}
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

          {/* FAQ Section */}
          <FAQ locale={locale} />
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
