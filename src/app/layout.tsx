import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kalender Hari Libur Indonesia | Holiday Calendar Indonesia',
  description: 'Kalender hari libur nasional dan regional Indonesia yang lengkap dengan informasi akurat untuk perencanaan yang lebih baik.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}