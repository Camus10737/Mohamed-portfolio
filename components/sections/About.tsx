'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// TODO: Mohamed remplacera ces stats via le JSON ou directement ici
const stats = [
  { value: 12, label: 'Projets livrés', suffix: '+' },
  { value: 10, label: 'Clients satisfaits', suffix: '+' },
  { value: 3, label: "Années d'expérience", suffix: '+' },
]

const skills = [
  'React', 'Next.js', 'TypeScript', 'Node.js',
  'PostgreSQL', 'Tailwind CSS', 'Figma', 'WordPress',
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const duration = 1500
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <section id="a-propos" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Colonne gauche — texte */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <p className="text-electric font-semibold text-sm uppercase tracking-wider mb-3">
              À propos de moi
            </p>
            <h2 className="text-3xl sm:text-[2rem] font-bold text-navy mb-6 leading-tight">
              À propos de moi
            </h2>
            <p className="text-text-secondary leading-relaxed mb-5 text-base">
              Je suis Mohamed Camara, développeur web freelance passionné basé à Québec
              City. Je me spécialise dans la création de solutions numériques pour les
              entreprises locales qui souhaitent établir ou améliorer leur présence en
              ligne.
            </p>
            <p className="text-text-secondary leading-relaxed text-base">
              Mon approche est simple : je prends le temps de comprendre votre business
              avant d&rsquo;écrire la première ligne de code. Chaque projet est unique, et
              chaque solution doit l&rsquo;être aussi.
            </p>
          </motion.div>

          {/* Colonne droite — stats + compétences */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-10"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-5 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <p className="text-3xl font-extrabold text-navy mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-text-secondary font-medium leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Compétences */}
            <div>
              <p className="text-sm font-semibold text-text-primary mb-4">
                Technologies maîtrisées
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
