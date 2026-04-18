'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/lib/i18n/context'

export default function Timeline() {
  const { t } = useLang()

  return (
    <section id="parcours" style={{ background: '#0d1117' }} className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
            {t.timeline.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">{t.timeline.title}</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'rgba(245,158,11,0.15)' }}
          />

          <div className="space-y-10">
            {t.timeline.entries.map((entry, index) => {
              const isLeft = index % 2 === 0
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -28 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex md:items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  {/* Card */}
                  <div
                    className="md:w-[calc(50%-2rem)] rounded-2xl p-6 border transition-all duration-300 hover:border-gold/20"
                    style={{ background: '#161b27', borderColor: 'rgba(255,255,255,0.07)' }}
                  >
                    <span
                      className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                      style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}
                    >
                      {entry.period}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1">{entry.title}</h3>
                    <p className="text-sm font-medium text-white/40 mb-3">{entry.organization}</p>
                    <p className="text-sm text-white/50 leading-relaxed">{entry.description}</p>
                  </div>

                  {/* Center dot */}
                  <div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                    style={{ background: '#f59e0b', borderColor: '#07080d' }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
