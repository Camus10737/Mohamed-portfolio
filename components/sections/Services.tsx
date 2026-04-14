'use client'

import { motion } from 'framer-motion'
import { Globe, ShoppingCart, Calendar, BarChart3, RefreshCw, Zap } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Site vitrine',
    tagline: 'Votre entreprise mérite dêtre trouvée en ligne',
    description:
      'Design moderne, mobile, SEO de base, livraison en 5–10 jours ouvrables.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    tagline: 'Vendez vos produits 24h/24, 7j/7',
    description:
      'Catalogue produits, panier, paiement Stripe / PayPal intégré.',
  },
  {
    icon: Calendar,
    title: 'Système de réservation',
    tagline: 'Fini les appels pour les rendez-vous',
    description:
      'Idéal salons, garages, cliniques — réservation en ligne automatique.',
  },
  {
    icon: BarChart3,
    title: 'Tableau de bord interne',
    tagline: 'Gérez votre business en un clic',
    description:
      'Suivi clients, inventaire, rapports — accès sécurisé et personnalisé.',
  },
  {
    icon: RefreshCw,
    title: 'Refonte de site',
    tagline: 'Votre vieux site vous fait honte ?',
    description:
      'Modernisation complète, même contenu, nouveau look professionnel.',
  },
  {
    icon: Zap,
    title: 'Maintenance & support',
    tagline: 'Je reste disponible après la livraison',
    description:
      'Mises à jour, corrections, évolutions — forfait mensuel sans surprise.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-surface">
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
          <p className="text-electric font-semibold text-sm uppercase tracking-wider mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-[2rem] font-bold text-navy mb-4">
            Ce que je fais pour vous
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            Des solutions numériques concrètes, adaptées aux PME québécoises
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-electric group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6 text-electric group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-1">{service.title}</h3>
                <p className="text-sm font-medium text-electric mb-3">{service.tagline}</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
