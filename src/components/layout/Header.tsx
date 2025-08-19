import Image from 'next/image'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

interface HeaderProps {
  locale: string
}

function getCurrentMonthUrl(locale: string) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  
  const monthNames = locale === 'id' 
    ? ['januari', 'februari', 'maret', 'april', 'mei', 'juni',
       'juli', 'agustus', 'september', 'oktober', 'november', 'desember']
    : ['january', 'february', 'march', 'april', 'may', 'june',
       'july', 'august', 'september', 'october', 'november', 'december']
  
  const monthName = monthNames[month - 1]
  return `/${locale}/${year}/${monthName}`
}

export function Header({ locale }: HeaderProps) {
  const currentMonthUrl = getCurrentMonthUrl(locale)
  
  return (
    <header className="border-b bg-card shadow-sm sticky top-0 z-50 h-[72px]" suppressHydrationWarning>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between h-full">
        <Link
          href={currentMonthUrl}
          className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-200"
        >
          <div className="w-8 h-8 flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="ForPublic.id Logo"
              width={32}
              height={32}
              className="w-full h-full"
              priority
              unoptimized
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xl font-bold text-foreground whitespace-nowrap">
              {locale === 'id' ? 'Kalender Hari Libur Indonesia' : 'Holiday Calendar Indonesia'}
            </span>
            <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
              by ForPublic<span className="text-red-600">.id</span>
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href={currentMonthUrl}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <span className="whitespace-nowrap">
              {locale === 'id' ? 'Kalender' : 'Calendar'}
            </span>
          </Link>
          <Link 
            href={`/${locale}/${new Date().getFullYear()}/${locale === 'id' ? 'libur' : 'holidays'}`}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <span className="whitespace-nowrap">
              {locale === 'id' ? 'Daftar Libur' : 'Holiday List'}
            </span>
          </Link>
          <Link 
            href={`/${locale}/about`}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <span className="whitespace-nowrap">
              {locale === 'id' ? 'Tentang' : 'About'}
            </span>
          </Link>
          <Link 
            href="https://forpublic.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <span className="whitespace-nowrap">
              {locale === 'id' ? 'Website Utama' : 'Main Website'}
            </span>
          </Link>
          <LanguageSwitcher locale={locale} />
        </nav>

        {/* Mobile menu - language switcher only */}
        <div className="md:hidden">
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  )
}