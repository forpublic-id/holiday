'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default function HomePage({ params }: HomePageProps) {
  const router = useRouter()
  
  useEffect(() => {
    async function handleRedirect() {
      const { locale } = await params
      
      // Get current date
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      
      // Convert month number to name
      const monthNames = locale === 'id' 
        ? ['januari', 'februari', 'maret', 'april', 'mei', 'juni',
           'juli', 'agustus', 'september', 'oktober', 'november', 'desember']
        : ['january', 'february', 'march', 'april', 'may', 'june',
           'july', 'august', 'september', 'october', 'november', 'december']
      
      const monthName = monthNames[month - 1]
      
      // Client-side redirect to current month
      router.replace(`/${locale}/${year}/${monthName}`)
    }
    
    handleRedirect()
  }, [params, router])
  
  // Return a minimal loading state to avoid flash
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-sm text-muted-foreground">Loading calendar...</p>
      </div>
    </div>
  )
}