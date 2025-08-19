'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
]

interface LanguageSwitcherProps {
  locale: string
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  const handleLanguageSwitch = (newLocale: string) => {
    // Replace the current locale in the pathname
    const pathSegments = pathname.split('/')
    if (pathSegments[1] === locale) {
      pathSegments[1] = newLocale
    } else {
      // If no locale in path, add it
      pathSegments.splice(1, 0, newLocale)
    }
    
    const newPath = pathSegments.join('/')
    router.push(newPath)
  }

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-transparent hover:border-red-600 hover:bg-red-50 transition-all duration-200 text-sm"
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
      </button>
      
      <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[140px] py-2">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageSwitch(language.code)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-3 ${
              language.code === locale 
                ? 'bg-red-50 text-red-600' 
                : 'text-foreground hover:text-accent-foreground'
            }`}
          >
            <span className="text-base">{language.flag}</span>
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}