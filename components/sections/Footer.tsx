'use client'

import { useLang } from '@/lib/i18n/context'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  const scrollTo = (href: string) => {
    if (typeof window === 'undefined') return
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    { href: '#a-propos', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#projets', label: t.nav.projects },
    { href: '#parcours', label: t.nav.timeline },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <footer style={{ background: '#030507' }} className="text-white py-10 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm group-hover:opacity-80 transition-opacity"
              style={{ background: '#f59e0b', color: '#07080d' }}
            >
              MC
            </div>
            <div className="text-left">
              <p className="font-bold text-white/90 text-sm">Mohamed Camara</p>
              <p className="text-xs text-white/35">{t.footer.tagline}</p>
            </div>
          </button>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-sm text-white/35 hover:text-white/70 transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-white/20">© {year} Mohamed Camara</p>
        </div>
      </div>
    </footer>
  )
}
