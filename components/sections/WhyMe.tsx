'use client'

import { motion } from 'framer-motion'
import { MapPin, Shield, DollarSign, HeadphonesIcon } from 'lucide-react'
import { useLang } from '@/lib/i18n/context'

const icons = [MapPin, Shield, DollarSign, HeadphonesIcon]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function WhyMe() {
  const { t } = useLang()

  return (
    <section
      id="pourquoi-moi"
      className="py-24 relative overflow-hidden"
      style={{ background: '#0d1117' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(245,158,11,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {t.whyme.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight whitespace-pre-line">
            {t.whyme.title}
          </h2>
        </motion.div>

        {/* Grid 2×2 */}
        <div className="grid sm:grid-cols-2 gap-5">
          {t.whyme.items.map((item, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-5 rounded-2xl p-6 border transition-all duration-300 hover:border-gold/20"
                style={{
                  background: 'rgba(22,27,39,0.8)',
                  borderColor: 'rgba(255,255,255,0.07)',
                }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(245,158,11,0.12)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#f59e0b' }} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Guarantee banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 rounded-2xl p-6 sm:p-8 text-center border"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.04) 100%)',
            borderColor: 'rgba(245,158,11,0.2)',
          }}
        >
          <p className="text-2xl sm:text-3xl font-black text-white mb-2">
            🛡️ Garantie 30 jours
          </p>
          <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto">
            Si votre site n&rsquo;est pas en ligne dans les 30 jours suivant le début du projet,{' '}
            <span style={{ color: '#f59e0b' }} className="font-semibold">
              vous ne payez rien.
            </span>{' '}
            C&rsquo;est écrit dans le contrat.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
