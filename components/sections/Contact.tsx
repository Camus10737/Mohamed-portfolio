'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  projectType: string
  message: string
}

const projectTypes = [
  { value: '', label: 'Type de projet' },
  { value: 'site-vitrine', label: 'Site vitrine' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'reservation', label: 'Système de réservation' },
  { value: 'systeme-interne', label: 'Système interne' },
  { value: 'autre', label: 'Autre' },
]

type ToastType = 'success' | 'error' | null

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<ToastType>(null)

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!form.name.trim()) newErrors.name = 'Ce champ est requis'
    if (!form.email.trim()) {
      newErrors.email = 'Ce champ est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email invalide'
    }
    if (!form.projectType) newErrors.projectType = 'Veuillez sélectionner un type'
    if (!form.message.trim()) {
      newErrors.message = 'Ce champ est requis'
    } else if (form.message.trim().length < 20) {
      newErrors.message = 'Minimum 20 caractères'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setToast('success')
        setForm({ name: '', email: '', company: '', projectType: '', message: '' })
        setErrors({})
      } else {
        setToast('error')
      }
    } catch {
      setToast('error')
    } finally {
      setLoading(false)
      setTimeout(() => setToast(null), 5000)
    }
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-text-primary placeholder-gray-400 outline-none transition-colors ${
      errors[field]
        ? 'border-red-400 focus:border-red-500 bg-red-50'
        : 'border-gray-200 focus:border-electric bg-white'
    }`

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-electric font-semibold text-sm uppercase tracking-wider mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-[2rem] font-bold text-navy mb-4">
            Parlons de votre projet
          </h2>
          <p className="text-text-secondary text-base">
            Un café virtuel ou en personne à Québec City, c&rsquo;est parti&nbsp;!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Colonne gauche — infos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-electric" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary mb-1">Email</p>
                {/* TODO: Mohamed remplacera cet email */}
                <a
                  href="mailto:contact@mohamedcamara.ca"
                  className="text-electric hover:underline text-sm"
                >
                  contact@mohamedcamara.ca
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-electric" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary mb-1">Localisation</p>
                <p className="text-text-secondary text-sm">Québec City, QC, Canada</p>
              </div>
            </div>

            <div className="p-5 bg-green-50 border border-green-200 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm font-semibold text-green-700">
                  Disponible pour nouveaux projets
                </p>
              </div>
              <p className="text-sm text-green-600">Je réponds sous 24h.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-sm font-semibold text-text-primary mb-3">
                Parfait pour vous si :
              </p>
              <ul className="space-y-2">
                {[
                  'Votre entreprise na pas de site web',
                  'Votre site actuel est vieillissant',
                  'Vous cherchez un développeur local et réactif',
                  'Vous voulez un site livré rapidement',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-electric flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Colonne droite — formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {/* Toast */}
            {toast && (
              <div
                className={`flex items-center gap-3 p-4 rounded-xl mb-6 text-sm font-medium ${
                  toast === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {toast === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                {toast === 'success'
                  ? 'Message envoyé ! Je vous réponds sous 24h.'
                  : 'Une erreur est survenue. Veuillez réessayer.'}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Jean-Pierre Tremblay"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass('name')}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="jean@votreentreprise.ca"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass('email')}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Entreprise */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Nom de votre entreprise{' '}
                  <span className="text-text-secondary font-normal">(optionnel)</span>
                </label>
                <input
                  type="text"
                  placeholder="Mon Entreprise Inc."
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:border-electric transition-colors"
                />
              </div>

              {/* Type de projet */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Type de projet <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className={`${inputClass('projectType')} appearance-none`}
                >
                  {projectTypes.map((t) => (
                    <option key={t.value} value={t.value} disabled={t.value === ''}>
                      {t.label}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="text-xs text-red-500 mt-1">{errors.projectType}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Décrivez votre projet <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Parlez-moi de votre projet, vos besoins, votre délai..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass('message')} resize-none`}
                />
                <div className="flex justify-between mt-1">
                  {errors.message ? (
                    <p className="text-xs text-red-500">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <p className="text-xs text-text-secondary">{form.message.length} / 20 min</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-electric text-white font-semibold rounded-xl hover:bg-electric-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
