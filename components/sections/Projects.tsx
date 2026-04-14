'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Info, X } from 'lucide-react'
import Image from 'next/image'
import { CategoryBadge } from '@/components/ui/Badge'

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

const filters = [
  { key: 'tous', label: 'Tous' },
  { key: 'site-vitrine', label: 'Site vitrine' },
  { key: 'e-commerce', label: 'E-commerce' },
  { key: 'systeme-interne', label: 'Système interne' },
  { key: 'application', label: 'Application' },
]

function ProjectCard({
  project,
  onDetails,
}: {
  project: Project
  onDetails: (p: Project) => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-video bg-gradient-to-br from-navy to-electric overflow-hidden">
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
            <span className="text-white/60 text-sm font-medium">{project.title}</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 bg-white text-navy text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Voir le site
          </a>
          <button
            onClick={() => onDetails(project)}
            className="px-4 py-2 bg-electric text-white text-sm font-semibold rounded-xl hover:bg-electric-hover transition-colors flex items-center gap-2"
          >
            <Info className="w-4 h-4" />
            Détails
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <CategoryBadge category={project.category} />
        </div>
        <h3 className="text-lg font-bold text-navy mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1 line-clamp-2">
          {project.description}
        </p>
        {/* Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-video bg-gradient-to-br from-navy to-electric rounded-t-2xl overflow-hidden">
          {!imgError ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="672px"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/60 text-base font-medium">{project.title}</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
          >
            <X className="w-5 h-5 text-navy" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-3">
            <CategoryBadge category={project.category} />
          </div>
          <h3 className="text-2xl font-bold text-navy mb-4">{project.title}</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            {project.longDescription || project.description}
          </p>

          <div className="mb-6">
            <p className="text-sm font-semibold text-text-primary mb-2">Stack technique</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
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
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-electric text-white font-semibold rounded-xl hover:bg-electric-hover transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Voir le site en ligne
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 border border-gray-200 text-text-secondary font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState('tous')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data: Project[]) => {
        const sorted = data
          .filter((p) => p.visible)
          .sort((a, b) => a.order - b.order)
        setProjects(sorted)
      })
      .catch(() => {})
  }, [])

  const filtered =
    activeFilter === 'tous'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section id="projets" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-electric font-semibold text-sm uppercase tracking-wider mb-3">
              Réalisations
            </p>
            <h2 className="text-3xl sm:text-[2rem] font-bold text-navy mb-4">
              Mes réalisations
            </h2>
            <p className="text-text-secondary text-base max-w-xl mx-auto">
              Des projets concrets, livrés à des clients réels
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
                  activeFilter === f.key
                    ? 'bg-electric text-white border-electric shadow-sm'
                    : 'border-gray-200 text-gray-600 hover:border-electric hover:text-electric'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDetails={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-text-secondary py-12">
              Aucun projet dans cette catégorie pour l&rsquo;instant.
            </p>
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
              onClick={() => scrollTo('#contact')}
              className="px-8 py-4 bg-electric text-white font-semibold rounded-xl text-lg hover:bg-electric-hover transition-colors shadow-md hover:shadow-lg"
            >
              Discutons de votre projet
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
