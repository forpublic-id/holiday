import Image from 'next/image'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

interface HeaderProps {
  locale: string
}

export function Header({ locale }: HeaderProps) {
  return (
    <header className="border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8">
            <Image
              src="/logo.svg"
              alt="ForPublic.id Logo"
              width={32}
              height={32}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground">
              {locale === 'id' ? 'Kalender Hari Libur Indonesia' : 'Holiday Calendar Indonesia'}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              by ForPublic<span className="text-red-600">.id</span>
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href={`/${locale}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {locale === 'id' ? 'Kalender' : 'Calendar'}
          </Link>
          <Link 
            href="https://forpublic.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {locale === 'id' ? 'Website Utama' : 'Main Website'}
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