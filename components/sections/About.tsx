'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/i18n/context'

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
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const duration = 1400
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, value])

  return <span ref={ref}>{count}{suffix}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  const { t } = useLang()

  return (
    <section id="a-propos" style={{ background: '#0d1117' }} className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
              {t.about.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6 whitespace-pre-line">
              {t.about.title}
            </h2>
            <p className="text-white/55 leading-relaxed mb-5 text-base">
              {t.about.p1}
            </p>
            <p className="text-white/55 leading-relaxed text-base">
              {t.about.p2}
            </p>

            {/* Gold accent line */}
            <div
              className="mt-8 h-px w-16"
              style={{ background: 'linear-gradient(90deg, #f59e0b, transparent)' }}
            />
          </motion.div>

          {/* Right column — stats + skills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {t.about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-5 rounded-2xl border"
                  style={{
                    background: '#161b27',
                    borderColor: 'rgba(255,255,255,0.07)',
                  }}
                >
                  <p
                    className="text-3xl font-black mb-1"
                    style={{ color: '#f59e0b' }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-white/45 font-medium leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <p className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">
                {t.about.skills_label}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium rounded-full border text-white/70 hover:text-white hover:border-gold/40 transition-colors duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.08)',
                    }}
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
