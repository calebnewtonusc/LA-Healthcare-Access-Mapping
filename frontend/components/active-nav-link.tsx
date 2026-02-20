'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ActiveNavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
  'aria-label'?: string
}

/**
 * A navigation link that applies an active style when the current
 * pathname matches the href.
 */
export function ActiveNavLink({
  href,
  children,
  className = '',
  activeClassName = '',
  'aria-label': ariaLabel,
}: ActiveNavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
      className={`${className} ${isActive ? activeClassName : ''}`}
    >
      {children}
    </Link>
  )
}
