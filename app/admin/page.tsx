'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Pencil, Trash2, Eye, EyeOff, LogOut, X, Upload,
  Loader2, CheckCircle, AlertCircle, LayoutDashboard, FolderOpen,
} from 'lucide-react'
import Image from 'next/image'

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

type FormData = Omit<Project, 'id' | 'createdAt'> & { stackInput: string }

const emptyForm = (): FormData => ({
  title: '',
  slug: '',
  category: 'site-vitrine',
  description: '',
  longDescription: '',
  stack: [],
  stackInput: '',
  image: '',
  url: '',
  featured: false,
  visible: true,
  order: 1,
})

const categories = [
  { value: 'site-vitrine', label: 'Site vitrine' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'systeme-interne', label: 'Système interne' },
  { value: 'application', label: 'Application' },
]

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

type ToastState = { type: 'success' | 'error'; message: string } | null

export default function AdminDashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<'add' | 'edit' | 'delete' | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm())
  const [formLoading, setFormLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadLoading, setUploadLoading] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/projects')
      const data = await res.json() as Project[]
      setProjects(data.sort((a, b) => a.order - b.order))
    } catch {
      showToast('error', 'Erreur lors du chargement des projets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const openAdd = () => {
    setForm(emptyForm())
    setImagePreview('')
    setModal('add')
  }

  const openEdit = (project: Project) => {
    setSelectedProject(project)
    setForm({
      ...project,
      stackInput: project.stack.join(', '),
    })
    setImagePreview(project.image)
    setModal('edit')
  }

  const openDelete = (project: Project) => {
    setSelectedProject(project)
    setModal('delete')
  }

  const closeModal = () => {
    setModal(null)
    setSelectedProject(null)
  }

  const handleImageUpload = async (file: File) => {
    setUploadLoading(true)
    const fd = new FormData()
    fd.append('image', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json() as { url?: string; error?: string }
      if (data.url) {
        setForm((f) => ({ ...f, image: data.url! }))
        setImagePreview(data.url!)
      } else {
        showToast('error', data.error ?? 'Erreur upload')
      }
    } catch {
      showToast('error', 'Erreur lors de l\'upload')
    } finally {
      setUploadLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    const stack = form.stackInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const payload = {
      ...form,
      stack,
      slug: form.slug || slugify(form.title),
    }

    try {
      if (modal === 'add') {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          showToast('success', 'Projet ajouté avec succès')
          closeModal()
          fetchProjects()
        } else {
          showToast('error', 'Erreur lors de l\'ajout')
        }
      } else if (modal === 'edit' && selectedProject) {
        const res = await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: selectedProject.id, createdAt: selectedProject.createdAt }),
        })
        if (res.ok) {
          showToast('success', 'Projet modifié avec succès')
          closeModal()
          fetchProjects()
        } else {
          showToast('error', 'Erreur lors de la modification')
        }
      }
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedProject) return
    setFormLoading(true)
    try {
      const res = await fetch(`/api/projects?id=${selectedProject.id}`, { method: 'DELETE' })
      if (res.ok) {
        showToast('success', 'Projet supprimé')
        closeModal()
        fetchProjects()
      } else {
        showToast('error', 'Erreur lors de la suppression')
      }
    } finally {
      setFormLoading(false)
    }
  }

  const handleToggleVisible = async (project: Project) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project, visible: !project.visible }),
      })
      if (res.ok) fetchProjects()
    } catch {
      showToast('error', 'Erreur')
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-text-primary outline-none focus:border-electric transition-colors'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
            toast.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-electric flex items-center justify-center text-white font-bold text-sm">
              MC
            </div>
            <div>
              <p className="font-semibold text-navy text-sm">Panel Admin</p>
              <p className="text-xs text-text-secondary">Mohamed Camara</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-electric" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy">{projects.length}</p>
              <p className="text-sm text-text-secondary">Projets au total</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy">
                {projects.filter((p) => p.visible).length}
              </p>
              <p className="text-sm text-text-secondary">Projets visibles</p>
            </div>
          </div>
        </div>

        {/* Projects table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-navy">Mes projets</h2>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2 bg-electric text-white text-sm font-semibold rounded-xl hover:bg-electric-hover transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter un projet
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-electric" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-text-secondary text-sm">
              Aucun projet. Cliquez sur &quot;Ajouter un projet&quot; pour commencer.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-gray-100">
                    <th className="text-left px-6 py-3">Projet</th>
                    <th className="text-left px-4 py-3">Catégorie</th>
                    <th className="text-left px-4 py-3">Ordre</th>
                    <th className="text-left px-4 py-3">Statut</th>
                    <th className="text-right px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy to-electric flex-shrink-0 overflow-hidden relative">
                            {project.image && (
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                                onError={() => {}}
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy">{project.title}</p>
                            <p className="text-xs text-text-secondary truncate max-w-xs">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                          {categories.find((c) => c.value === project.category)?.label ?? project.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-text-secondary">{project.order}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                            project.visible
                              ? 'bg-green-50 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {project.visible ? 'Visible' : 'Caché'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleVisible(project)}
                            title={project.visible ? 'Masquer' : 'Afficher'}
                            className="p-2 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {project.visible ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => openEdit(project)}
                            title="Modifier"
                            className="p-2 text-gray-400 hover:text-electric hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDelete(project)}
                            title="Supprimer"
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Modal */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-navy">
                {modal === 'add' ? 'Ajouter un projet' : 'Modifier le projet'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Titre */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Titre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })
                  }
                  className={inputClass}
                  placeholder="Mon super projet"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className={inputClass}
                  placeholder="mon-super-projet"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Catégorie */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Catégorie <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={inputClass}
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ordre */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Ordre d&apos;affichage
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Description courte */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Description courte <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={inputClass}
                  placeholder="Description affichée sur la carte"
                />
              </div>

              {/* Description longue */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Description complète (modale)
                </label>
                <textarea
                  rows={4}
                  value={form.longDescription}
                  onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Description détaillée pour la modale de détails..."
                />
              </div>

              {/* Stack */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Stack technique (séparée par des virgules)
                </label>
                <input
                  type="text"
                  value={form.stackInput}
                  onChange={(e) => setForm({ ...form, stackInput: e.target.value })}
                  className={inputClass}
                  placeholder="Next.js, Tailwind CSS, Vercel"
                />
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  URL du site
                </label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className={inputClass}
                  placeholder="https://monsite.ca"
                />
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Image de couverture
                </label>
                <div className="space-y-3">
                  {imagePreview && (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 max-w-xs">
                      <Image
                        src={imagePreview}
                        alt="Aperçu"
                        fill
                        sizes="300px"
                        className="object-cover"
                        onError={() => setImagePreview('')}
                      />
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadLoading}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60"
                    >
                      {uploadLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      {uploadLoading ? 'Upload...' : 'Uploader une image'}
                    </button>
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) => {
                        setForm({ ...form, image: e.target.value })
                        setImagePreview(e.target.value)
                      }}
                      className={`flex-1 ${inputClass}`}
                      placeholder="/projects/monimage.jpg"
                    />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file)
                    }}
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.visible}
                    onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                    className="w-4 h-4 accent-electric"
                  />
                  <span className="text-sm font-medium text-text-primary">Visible</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 accent-electric"
                  />
                  <span className="text-sm font-medium text-text-primary">Mis en avant</span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-electric text-white font-semibold rounded-xl hover:bg-electric-hover transition-colors disabled:opacity-60"
                >
                  {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {formLoading ? 'Enregistrement...' : modal === 'add' ? 'Ajouter le projet' : 'Enregistrer'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-200 text-text-secondary font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {modal === 'delete' && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-navy">Supprimer le projet</h3>
                <p className="text-sm text-text-secondary">Cette action est irréversible</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary mb-6">
              Êtes-vous sûr de vouloir supprimer{' '}
              <span className="font-semibold text-text-primary">
                &quot;{selectedProject.title}&quot;
              </span>{' '}
              ? Cette action ne peut pas être annulée.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={formLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {formLoading ? 'Suppression...' : 'Supprimer'}
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-3 border border-gray-200 text-text-secondary font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
