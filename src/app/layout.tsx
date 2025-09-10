import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={inter.variable}>
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Resource hints for performance */}
        <link rel="prefetch" href="/favicon.svg" />
        <link rel="prefetch" href="/logo.svg" />
      </head>
      <body
        className="min-h-screen bg-background font-sans antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
