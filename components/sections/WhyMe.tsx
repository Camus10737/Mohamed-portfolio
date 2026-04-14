'use client'

import { motion } from 'framer-motion'
import { MapPin, Zap, MessageSquare, Wrench } from 'lucide-react'

const arguments_ = [
  {
    icon: MapPin,
    title: 'Local & disponible',
    description:
      'Basé à Québec City, je me déplace pour vous rencontrer en personne. Pas de fuseau horaire, pas de barrière.',
  },
  {
    icon: Zap,
    title: 'Livraison rapide',
    description:
      'Un site vitrine livré en 5 à 10 jours ouvrables. Vous êtes en ligne rapidement, sans attendre des mois.',
  },
  {
    icon: MessageSquare,
    title: 'Communication claire',
    description:
      'Pas de jargon technique, je vous explique tout en langage clair. Vous êtes toujours au courant.',
  },
  {
    icon: Wrench,
    title: 'Suivi après livraison',
    description:
      'Je ne disparais pas après le lancement. Maintenance, corrections, évolutions — je reste à vos côtés.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function WhyMe() {
  return (
    <section
      id="pourquoi-moi"
      className="py-24"
      style={{ background: '#1e3a5f' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-blue-300 font-semibold text-sm uppercase tracking-wider mb-3">
            Pourquoi moi
          </p>
          <h2 className="text-3xl sm:text-[2rem] font-bold text-white">
            Pourquoi choisir Mohamed ?
          </h2>
        </motion.div>

        {/* Grid 2×2 */}
        <div className="grid sm:grid-cols-2 gap-6">
          {arguments_.map((arg, index) => {
            const Icon = arg.icon
            return (
              <motion.div
                key={arg.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-electric rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{arg.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{arg.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
