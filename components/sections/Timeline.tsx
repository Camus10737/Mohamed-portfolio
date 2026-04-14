'use client'

import { motion } from 'framer-motion'

// TODO: Mohamed remplacera ces entrées par ses vraies expériences
const entries = [
  {
    period: '2023 — Présent',
    title: 'Développeur web freelance',
    organization: 'Indépendant — Québec City',
    description:
      'Conception et livraison de sites web et applications pour des PME québécoises. Spécialisation dans les sites vitrines, systèmes de réservation et tableaux de bord sur mesure.',
  },
  {
    period: '2021 — 2023',
    title: 'Développeur front-end',
    organization: 'Agence numérique — Québec City',
    description:
      'Développement dinterfaces web modernes avec React et Next.js. Collaboration avec des équipes de design et de back-end pour livrer des projets clients dans les délais.',
  },
  {
    period: '2018 — 2021',
    title: 'Formation en développement web',
    organization: 'Université / Bootcamp — Québec',
    description:
      'Apprentissage des fondamentaux du développement web : HTML, CSS, JavaScript, puis spécialisation en React et Node.js. Réalisation de projets personnels et stages.',
  },
]

export default function Timeline() {
  return (
    <section id="parcours" className="py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-electric font-semibold text-sm uppercase tracking-wider mb-3">
            Expérience
          </p>
          <h2 className="text-3xl sm:text-[2rem] font-bold text-navy">Mon parcours</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-200" />

          <div className="space-y-10">
            {entries.map((entry, index) => {
              const isLeft = index % 2 === 0
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex md:items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  {/* Card */}
                  <div className="md:w-[calc(50%-2rem)] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <span className="inline-block text-xs font-semibold text-electric bg-blue-50 px-3 py-1 rounded-full mb-3">
                      {entry.period}
                    </span>
                    <h3 className="text-lg font-bold text-navy mb-1">{entry.title}</h3>
                    <p className="text-sm font-medium text-text-secondary mb-3">
                      {entry.organization}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {entry.description}
                    </p>
                  </div>

                  {/* Center dot — desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-electric border-4 border-white shadow-md" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
