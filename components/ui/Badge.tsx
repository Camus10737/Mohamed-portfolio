const categoryColors: Record<string, { bg: string; color: string }> = {
  'site-vitrine':   { bg: 'rgba(96,165,250,0.12)',   color: '#60a5fa' },
  'e-commerce':     { bg: 'rgba(167,139,250,0.12)',  color: '#a78bfa' },
  'systeme-interne':{ bg: 'rgba(251,146,60,0.12)',   color: '#fb923c' },
  application:      { bg: 'rgba(52,211,153,0.12)',   color: '#34d399' },
}

const categoryLabel: Record<string, string> = {
  'site-vitrine':    'Site vitrine',
  'e-commerce':      'E-commerce',
  'systeme-interne': 'Système interne',
  application:       'Application',
}

export function CategoryBadge({ category }: { category: string }) {
  const colors = categoryColors[category] ?? { bg: 'rgba(255,255,255,0.08)', color: '#94a3b8' }
  return (
    <span
      className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full"
      style={{ background: colors.bg, color: colors.color }}
    >
      {categoryLabel[category] ?? category}
    </span>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'category' | 'skill' | 'filter' | 'filter-active'
  className?: string
}

export default function Badge({ children, variant = 'skill', className = '' }: BadgeProps) {
  const variants: Record<string, string> = {
    skill:
      'px-3 py-1.5 text-xs font-medium rounded-full text-white/60 border border-white/10 bg-white/[0.04]',
    category:
      'px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400',
    filter:
      'px-4 py-2 text-sm font-medium rounded-full border border-white/10 text-white/50 hover:border-white/25 hover:text-white/80 transition-colors cursor-pointer',
    'filter-active':
      'px-4 py-2 text-sm font-bold rounded-full border border-gold cursor-pointer text-[#07080d]',
  }

  return (
    <span
      className={`inline-block ${variants[variant]} ${className}`}
      style={variant === 'filter-active' ? { background: '#f59e0b' } : undefined}
    >
      {children}
    </span>
  )
}
