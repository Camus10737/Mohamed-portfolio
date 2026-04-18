'use client'

import { motion } from 'framer-motion'
import { Globe, ShoppingCart, Calendar, BarChart3, RefreshCw, Zap } from 'lucide-react'
import { useLang } from '@/lib/i18n/context'

const icons = [Globe, ShoppingCart, Calendar, BarChart3, RefreshCw, Zap]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function Services() {
  const { t } = useLang()

  return (
    <section id="services" style={{ background: '#07080d' }} className="py-24">
      {/* Top divider */}
      <div className="section-divider mb-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-0">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
            {t.services.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight whitespace-pre-line">
            {t.services.title}
          </h2>
          <p className="text-white/45 text-base max-w-xl mx-auto">
            {t.services.sub}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.services.items.map((service, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#161b27',
                  borderColor: 'rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245,158,11,0.25)'
                  e.currentTarget.style.background = '#1c2333'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = '#161b27'
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                  style={{ background: 'rgba(245,158,11,0.1)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#f59e0b' }} />
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {service.title}
                </h3>
                <p className="text-sm font-medium mb-3" style={{ color: '#f59e0b' }}>
                  {service.tagline}
                </p>
                <p className="text-sm text-white/45 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <button
            onClick={() => {
              const el = document.querySelector('#contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 hover:border-gold/60 transition-all duration-200 text-sm"
          >
            {t.nav.cta} →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
