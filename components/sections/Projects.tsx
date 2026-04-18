'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Info, X } from 'lucide-react'
import Image from 'next/image'
import { useLang } from '@/lib/i18n/context'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  description: string
  longDescription: string
  stack: string[]
  image: string
  url: string
  featured: boolean
  visible: boolean
  order: number
  createdAt: string
}

const categoryColors: Record<string, string> = {
  'site-vitrine': 'rgba(96,165,250,0.15)',
  'e-commerce': 'rgba(167,139,250,0.15)',
  'systeme-interne': 'rgba(251,146,60,0.15)',
  application: 'rgba(52,211,153,0.15)',
}
const categoryText: Record<string, { fr: string; en: string }> = {
  'site-vitrine': { fr: 'Site vitrine', en: 'Business website' },
  'e-commerce': { fr: 'E-commerce', en: 'E-commerce' },
  'systeme-interne': { fr: 'Système interne', en: 'Internal system' },
  application: { fr: 'Application', en: 'App' },
}
const categoryTextColor: Record<string, string> = {
  'site-vitrine': '#60a5fa',
  'e-commerce': '#a78bfa',
  'systeme-interne': '#fb923c',
  application: '#34d399',
}

function CategoryPill({ category, lang }: { category: string; lang: 'fr' | 'en' }) {
  const bg = categoryColors[category] ?? 'rgba(255,255,255,0.08)'
  const color = categoryTextColor[category] ?? '#94a3b8'
  const label = categoryText[category]?.[lang] ?? category
  return (
    <span
      className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full"
      style={{ background: bg, color }}
    >
      {label}
    </span>
  )
}

function ProjectCard({ project, onDetails, lang }: { project: Project; onDetails: (p: Project) => void; lang: 'fr' | 'en' }) {
  const { t } = useLang()
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl overflow-hidden border flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:border-gold/20"
      style={{ background: '#161b27', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden" style={{ background: '#0d1117' }}>
        {!imgError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/30 text-sm font-medium">{project.title}</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3" style={{ background: 'rgba(7,8,13,0.85)' }}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 text-[#07080d] text-sm font-bold rounded-xl flex items-center gap-1.5 transition-colors hover:opacity-90"
            style={{ background: '#f59e0b' }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {t.projects.visit}
          </a>
          <button
            onClick={() => onDetails(project)}
            className="px-4 py-2 bg-white/10 text-white text-sm font-semibold rounded-xl hover:bg-white/20 transition-colors flex items-center gap-1.5 border border-white/20"
          >
            <Info className="w-3.5 h-3.5" />
            {t.projects.details}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <CategoryPill category={project.category} lang={lang} />
        </div>
        <h3 className="text-base font-bold text-white mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-white/45 leading-relaxed mb-4 flex-1 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium rounded-md text-white/50"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose, lang }: { project: Project; onClose: () => void; lang: 'fr' | 'en' }) {
  const { t } = useLang()
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border"
        style={{ background: '#161b27', borderColor: 'rgba(255,255,255,0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-video rounded-t-2xl overflow-hidden" style={{ background: '#0d1117' }}>
          {!imgError ? (
            <Image src={project.image} alt={project.title} fill sizes="672px" className="object-cover" onError={() => setImgError(true)} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/30 text-base font-medium">{project.title}</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-3">
            <CategoryPill category={project.category} lang={lang} />
          </div>
          <h3 className="text-2xl font-black text-white mb-4">{project.title}</h3>
          <p className="text-white/55 leading-relaxed mb-6">
            {project.longDescription || project.description}
          </p>
          <div className="mb-6">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
              {t.projects.stack_label}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-medium rounded-full text-white/70"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-[#07080d] font-bold rounded-xl hover:opacity-90 transition-opacity text-sm"
              style={{ background: '#f59e0b' }}
            >
              <ExternalLink className="w-4 h-4" />
              {t.projects.visit_full}
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 text-white/60 font-medium rounded-xl hover:bg-white/[0.06] hover:text-white transition-colors text-sm border border-white/10"
            >
              {t.projects.close}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { t, lang } = useLang()
  const [projects, setProjects] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState('tous')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data: Project[]) => {
        const sorted = data.filter((p) => p.visible).sort((a, b) => a.order - b.order)
        setProjects(sorted)
      })
      .catch(() => {})
  }, [])

  const filtered =
    activeFilter === 'tous' ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <>
      <section id="projets" style={{ background: '#07080d' }} className="py-24">
        <div className="section-divider mb-0" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
              {t.projects.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight whitespace-pre-line">
              {t.projects.title}
            </h2>
            <p className="text-white/45 text-base">{t.projects.sub}</p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {t.projects.filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
                  activeFilter === f.key
                    ? 'text-[#07080d] font-bold border-gold'
                    : 'text-white/50 border-white/10 hover:border-white/25 hover:text-white/80'
                }`}
                style={activeFilter === f.key ? { background: '#f59e0b' } : {}}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} onDetails={setSelectedProject} lang={lang} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-white/35 py-12 text-sm">{t.projects.empty}</p>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-14"
          >
            <button
              onClick={() => { const el = document.querySelector('#contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-8 py-4 text-[#07080d] font-bold rounded-xl text-base hover:opacity-90 transition-all duration-200 shadow-[0_0_30px_rgba(245,158,11,0.25)]"
              style={{ background: '#f59e0b' }}
            >
              {t.projects.cta}
            </button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} lang={lang} />
        )}
      </AnimatePresence>
    </>
  )
}
