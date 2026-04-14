'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: Math.random() * 15 + 10,
  delay: Math.random() * 5,
}))

export default function Hero() {
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
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}
    >
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
            }}
          />
        ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge disponibilité */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-8">
          <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block" />
          Disponible pour nouveaux projets
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold text-white leading-tight mb-4">
          Bonjour, je suis{' '}
          <span className="text-electric">Mohamed Camara</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-xl sm:text-2xl font-semibold text-white/80 mb-6">
          Développeur web freelance —{' '}
          <span className="text-white">
            Je crée la présence numérique de votre entreprise
          </span>
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Basé à Québec City, j&rsquo;aide les PME locales à se lancer en ligne avec des
          sites web professionnels et des outils numériques sur mesure.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('#projets')}
            className="px-8 py-4 bg-electric text-white font-semibold rounded-xl text-lg hover:bg-electric-hover transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Voir mes réalisations
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl text-lg hover:bg-white hover:text-navy transition-all duration-200 active:scale-[0.98]"
          >
            Me contacter
          </button>
        </div>
      </div>

      {/* Scroll arrow */}
      <button
        onClick={() => scrollTo('#a-propos')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bounce-arrow text-white/50 hover:text-white transition-colors"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
