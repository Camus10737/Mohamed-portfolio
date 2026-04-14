import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Mohamed Camara — Développeur web freelance à Québec City',
  description:
    'Développeur web freelance à Québec City. Je crée des sites web professionnels et des solutions numériques pour les PME locales. Devis gratuit.',
  keywords: [
    'développeur web',
    'freelance',
    'Québec City',
    'site vitrine',
    'PME',
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
      'Développeur web freelance à Québec City. Je crée des sites web professionnels et des solutions numériques pour les PME locales.',
    siteName: 'Mohamed Camara',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Camara — Développeur web freelance à Québec City',
    description:
      'Développeur web freelance à Québec City. Je crée des sites web professionnels et des solutions numériques pour les PME locales.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr-CA" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%232563EB'/><text x='16' y='23' text-anchor='middle' font-family='Inter,sans-serif' font-weight='700' font-size='16' fill='white'>MC</text></svg>" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
