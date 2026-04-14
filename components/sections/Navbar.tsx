'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#a-propos', label: 'À propos' },
  { href: '#services', label: 'Services' },
  { href: '#projets', label: 'Projets' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY
    setScrolled(currentY > 20)
    if (currentY < 60) {
      setVisible(true)
    } else if (currentY > lastScrollY) {
      setVisible(false)
      setMobileOpen(false)
    } else {
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
        } ${scrolled ? 'bg-white shadow-sm' : 'bg-white'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 rounded-lg bg-electric flex items-center justify-center text-white font-bold text-sm group-hover:bg-electric-hover transition-colors">
                MC
              </div>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-medium text-text-secondary hover:text-navy transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollTo('#contact')}
                className="px-5 py-2.5 bg-electric text-white text-sm font-semibold rounded-xl hover:bg-electric-hover transition-colors shadow-sm"
              >
                Me contacter
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-text-primary"
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
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-electric flex items-center justify-center text-white font-bold text-sm">
              MC
            </div>
            <button onClick={() => setMobileOpen(false)} aria-label="Fermer">
              <X className="w-6 h-6 text-text-primary" />
            </button>
          </div>
          <div className="flex flex-col gap-1 p-6">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left px-4 py-3 text-base font-medium text-text-primary hover:bg-gray-50 rounded-xl transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className="mt-4 px-5 py-3 bg-electric text-white font-semibold rounded-xl hover:bg-electric-hover transition-colors"
            >
              Me contacter
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
