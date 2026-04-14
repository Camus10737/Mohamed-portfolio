export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (href: string) => {
    if (typeof window === 'undefined') return
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: '#0f172a' }} className="text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-electric flex items-center justify-center text-white font-bold text-sm">
              MC
            </div>
            <div>
              <p className="font-bold text-white">Mohamed Camara</p>
              <p className="text-xs text-white/50">Développeur web freelance · Québec City</p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              ['#a-propos', 'À propos'],
              ['#services', 'Services'],
              ['#projets', 'Projets'],
              ['#parcours', 'Parcours'],
              ['#contact', 'Contact'],
            ].map(([href, label]) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-white/30 text-center">
            © {year} Mohamed Camara
          </p>
        </div>
      </div>
    </footer>
  )
}
