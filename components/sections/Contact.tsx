'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useLang } from '@/lib/i18n/context'

interface FormData {
  name: string
  email: string
  company: string
  projectType: string
  message: string
}

type ToastType = 'success' | 'error' | null

export default function Contact() {
  const { t } = useLang()
  const f = t.contact.form

  const [form, setForm] = useState<FormData>({
    name: '', email: '', company: '', projectType: '', message: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<ToastType>(null)

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!form.name.trim()) newErrors.name = f.required
    if (!form.email.trim()) {
      newErrors.email = f.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = f.email_invalid
    }
    if (!form.projectType) newErrors.projectType = f.type_required
    if (!form.message.trim()) {
      newErrors.message = f.required
    } else if (form.message.trim().length < 20) {
      newErrors.message = f.msg_min
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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

  const inputBase =
    'w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all border'
  const inputNormal = `${inputBase} border-white/10 focus:border-gold/50 bg-white/[0.04]`
  const inputError = `${inputBase} border-red-500/50 focus:border-red-500 bg-red-500/[0.05]`

  const inputClass = (field: keyof FormData) =>
    errors[field] ? inputError : inputNormal

  return (
    <section id="contact" style={{ background: '#07080d' }} className="py-24">
      <div className="section-divider mb-0" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
            {t.contact.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight whitespace-pre-line">
            {t.contact.title}
          </h2>
          <p className="text-white/45 text-base">{t.contact.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {/* Email */}
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(245,158,11,0.1)' }}
              >
                <Mail className="w-5 h-5" style={{ color: '#f59e0b' }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
                  {t.contact.email_label}
                </p>
                <a
                  href="mailto:contact@mohamedcamara.ca"
                  className="text-white/70 hover:text-gold transition-colors text-sm"
                >
                  contact@mohamedcamara.ca
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(245,158,11,0.1)' }}
              >
                <MapPin className="w-5 h-5" style={{ color: '#f59e0b' }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
                  {t.contact.location_label}
                </p>
                <p className="text-white/70 text-sm">Québec City, QC, Canada</p>
              </div>
            </div>

            {/* Availability */}
            <div
              className="p-5 rounded-2xl border"
              style={{ background: 'rgba(52,211,153,0.06)', borderColor: 'rgba(52,211,153,0.2)' }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <p className="text-sm font-bold text-emerald-400">{t.contact.available}</p>
              </div>
              <p className="text-sm text-emerald-400/60">{t.contact.available_sub}</p>
            </div>

            {/* Checklist */}
            <div
              className="p-6 rounded-2xl border"
              style={{ background: '#161b27', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <p className="text-sm font-bold text-white mb-4">{t.contact.perfect_for}</p>
              <ul className="space-y-2.5">
                {t.contact.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#f59e0b' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {/* Toast */}
            {toast && (
              <div
                className={`flex items-center gap-3 p-4 rounded-xl mb-6 text-sm font-medium border ${
                  toast === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/25 text-red-400'
                }`}
              >
                {toast === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                {toast === 'success' ? f.success : f.error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">
                  {f.name} <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  placeholder={f.name_ph}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">
                  {f.email} <span className="text-gold">*</span>
                </label>
                <input
                  type="email"
                  placeholder={f.email_ph}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">
                  {f.company}{' '}
                  <span className="text-white/30 font-normal">{f.company_opt}</span>
                </label>
                <input
                  type="text"
                  placeholder={f.company_ph}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className={inputNormal}
                />
              </div>

              {/* Project type */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">
                  {f.type} <span className="text-gold">*</span>
                </label>
                <select
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className={`${inputClass('projectType')} appearance-none`}
                  style={{ background: errors.projectType ? undefined : '#161b27' }}
                >
                  {f.type_opts.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.value === ''}
                      style={{ background: '#161b27', color: '#f1f5f9' }}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="text-xs text-red-400 mt-1">{errors.projectType}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">
                  {f.message} <span className="text-gold">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder={f.message_ph}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass('message')} resize-none`}
                />
                <div className="flex justify-between mt-1">
                  {errors.message ? (
                    <p className="text-xs text-red-400">{errors.message}</p>
                  ) : <span />}
                  <p className="text-xs text-white/25">{form.message.length} / 20 min</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 text-[#07080d] font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                style={{ background: '#f59e0b' }}
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? f.submitting : f.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
