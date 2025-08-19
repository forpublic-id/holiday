import { redirect } from 'next/navigation'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
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
  
  // Redirect to current month
  redirect(`/${locale}/${year}/${monthName}`)
}