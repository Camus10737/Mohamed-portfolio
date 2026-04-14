interface BadgeProps {
  children: React.ReactNode
  variant?: 'category' | 'skill' | 'filter' | 'filter-active'
  className?: string
}

const categoryColors: Record<string, string> = {
  'site-vitrine': 'bg-blue-100 text-blue-700',
  'e-commerce': 'bg-purple-100 text-purple-700',
  'systeme-interne': 'bg-orange-100 text-orange-700',
  application: 'bg-green-100 text-green-700',
}

export function CategoryBadge({ category }: { category: string }) {
  const label: Record<string, string> = {
    'site-vitrine': 'Site vitrine',
    'e-commerce': 'E-commerce',
    'systeme-interne': 'Système interne',
    application: 'Application',
  }
  const color = categoryColors[category] ?? 'bg-gray-100 text-gray-700'
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${color}`}
    >
      {label[category] ?? category}
    </span>
  )
}

export default function Badge({ children, variant = 'skill', className = '' }: BadgeProps) {
  const variants = {
    skill: 'bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full',
    category: 'bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full',
    filter:
      'px-4 py-2 text-sm font-medium rounded-full border border-gray-200 text-gray-600 hover:border-electric hover:text-electric transition-colors cursor-pointer',
    'filter-active':
      'px-4 py-2 text-sm font-medium rounded-full bg-electric text-white cursor-pointer',
  }

  return (
    <span className={`inline-block ${variants[variant]} ${className}`}>{children}</span>
  )
}
