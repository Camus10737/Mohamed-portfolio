'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/i18n/context'

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: Math.random() * 5 + 2,
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: Math.random() * 18 + 12,
  delay: Math.random() * 6,
  gold: Math.random() > 0.5,
}))

export default function Hero() {
  const { t } = useLang()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#07080d' }}
    >
      {/* Radial glow behind headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(245,158,11,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Particles */}
      {mounted &&
        particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              background: p.gold
                ? 'rgba(245,158,11,0.35)'
                : 'rgba(255,255,255,0.12)',
            }}
          />
        ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] text-white/80 text-sm font-medium px-5 py-2.5 rounded-full mb-10"
        >
          <span className="pulse-dot w-2 h-2 rounded-full bg-emerald-400 inline-block flex-shrink-0" />
          {t.hero.badge}
        </motion.div>

        {/* Main headline — 3 lines */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[2.6rem] sm:text-6xl md:text-7xl font-black text-white leading-[1.07] tracking-tight mb-6"
        >
          {t.hero.line1}
          <br />
          <span className="gold-glow" style={{ color: '#f59e0b' }}>
            {t.hero.line2}
          </span>
          <br />
          <span className="text-white/90">{t.hero.line3}</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.48 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-4 bg-gold text-[#07080d] font-bold rounded-xl text-base sm:text-lg hover:bg-gold-hover transition-all duration-200 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] active:scale-[0.98]"
          >
            {t.hero.cta1}
          </button>
          <button
            onClick={() => scrollTo('#projets')}
            className="px-8 py-4 border border-white/20 text-white/80 font-semibold rounded-xl text-base sm:text-lg hover:border-white/40 hover:text-white hover:bg-white/[0.04] transition-all duration-200 active:scale-[0.98]"
          >
            {t.hero.cta2}
          </button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-white/30"
        >
          {['15+ projets livrés', 'Québec City', '30 jours garantis', 'Devis gratuit'].map(
            (item) => (
              <span key={item} className="flex items-center gap-2">
                <span
                  className="w-1 h-1 rounded-full inline-block"
                  style={{ background: '#f59e0b', opacity: 0.6 }}
                />
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <button
        onClick={() => scrollTo('#a-propos')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bounce-arrow text-white/25 hover:text-white/60 transition-colors"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
