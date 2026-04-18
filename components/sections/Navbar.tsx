'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { useLang } from '@/lib/i18n/context'
import type { Lang } from '@/lib/i18n/translations'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '#a-propos', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#projets', label: t.nav.projects },
    { href: '#parcours', label: t.nav.timeline },
    { href: '#contact', label: t.nav.contact },
  ]

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY
    setScrolled(currentY > 40)
    if (currentY < 60) {
      setVisible(true)
    } else if (currentY > lastScrollY + 4) {
      setVisible(false)
      setMobileOpen(false)
    } else if (currentY < lastScrollY - 4) {
      setVisible(true)
    }
    setLastScrollY(currentY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled
            ? 'bg-[#07080d]/95 backdrop-blur-md border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center text-[#07080d] font-black text-sm group-hover:bg-gold-hover transition-colors">
                MC
              </div>
              <span className="hidden sm:block font-bold text-white/90 text-sm tracking-tight group-hover:text-white transition-colors">
                Mohamed Camara
              </span>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop right: lang toggle + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* FR / EN toggle */}
              <div className="flex items-center bg-white/[0.06] border border-white/[0.08] rounded-lg p-0.5">
                {(['fr', 'en'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-200 uppercase tracking-wider ${
                      lang === l
                        ? 'bg-gold text-[#07080d]'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollTo('#contact')}
                className="px-5 py-2.5 bg-gold text-[#07080d] text-sm font-bold rounded-xl hover:bg-gold-hover transition-all duration-200 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
              >
                {t.nav.cta}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-[#0d1117] border-l border-white/[0.07] shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.07]">
            <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center text-[#07080d] font-black text-sm">
              MC
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1 text-white/50 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-1 p-5">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left px-4 py-3 text-base font-medium text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
              >
                {link.label}
              </button>
            ))}

            {/* Lang toggle mobile */}
            <div className="flex items-center gap-2 mt-4 px-4">
              <span className="text-xs text-white/40 uppercase tracking-wider font-medium">
                Langue :
              </span>
              <div className="flex items-center bg-white/[0.06] border border-white/[0.08] rounded-lg p-0.5">
                {(['fr', 'en'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-200 uppercase tracking-wider ${
                      lang === l
                        ? 'bg-gold text-[#07080d]'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollTo('#contact')}
              className="mt-4 px-5 py-3.5 bg-gold text-[#07080d] font-bold rounded-xl hover:bg-gold-hover transition-colors text-sm shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
