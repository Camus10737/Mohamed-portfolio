import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n/context'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Mohamed Camara — Développeur web freelance à Québec City',
  description:
    'Développeur web freelance à Québec City. Sites web professionnels pour PME locales en 30 jours. Restaurants, salons, garages, commerces. Devis gratuit.',
  keywords: [
    'développeur web freelance Québec',
    'site web PME Québec City',
    'création site internet Québec',
    'web developer Quebec City',
    'site vitrine restaurant Québec',
    'Next.js',
    'React',
  ],
  authors: [{ name: 'Mohamed Camara' }],
  creator: 'Mohamed Camara',
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    title: 'Mohamed Camara — Développeur web freelance à Québec City',
    description:
      'Sites web professionnels pour PME locales en 30 jours ou vous ne payez pas. Basé à Québec City.',
    siteName: 'Mohamed Camara',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Camara — Développeur web freelance à Québec City',
    description:
      'Sites web professionnels pour PME locales en 30 jours ou vous ne payez pas.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CA" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23f59e0b'/><text x='16' y='23' text-anchor='middle' font-family='Inter,sans-serif' font-weight='700' font-size='16' fill='%2307080d'>MC</text></svg>"
        />
      </head>
      <body className="min-h-screen antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
