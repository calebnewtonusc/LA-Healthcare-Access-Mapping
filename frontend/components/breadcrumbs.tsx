'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
  const pathname = usePathname()

  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs = [
    { name: 'Dashboard', href: '/', icon: Home }
  ]

  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    breadcrumbs.push({ name, href })
  })

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          const Icon = crumb.icon

          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
              {isLast ? (
                <span className="text-slate-900 font-medium flex items-center gap-1.5">
                  {Icon && <Icon className="w-4 h-4" />}
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {crumb.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
