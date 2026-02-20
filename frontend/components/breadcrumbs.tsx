'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
  const pathname = usePathname()

  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs: Array<{ name: string; href: string; icon?: typeof Home }> = [
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
      <ol className="flex items-center gap-1.5 text-sm flex-wrap">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          const Icon = crumb.icon

          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-dark-text-muted shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span
                  className="text-slate-900 dark:text-dark-text-primary font-semibold flex items-center gap-1.5"
                  aria-current="page"
                >
                  {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-slate-500 dark:text-dark-text-secondary hover:text-slate-900 dark:hover:text-dark-text-primary transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
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
