'use client'

import Link from 'next/link'
import Image from 'next/image'

const footerNavLinks = [
  { href: '/about', label: 'About' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/limitations', label: 'Limitations' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/accessibility', label: 'Accessibility' },
]

export function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      style={{
        marginTop: '80px',
        paddingTop: '56px',
        paddingBottom: '56px',
        background: '#ffffff',
        borderTop: '0.5px solid rgba(60, 60, 67, 0.12)',
      }}
    >
      <div
        className="container mx-auto px-4"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}
      >
        {/* Built-by pill */}
        <Link
          href="/about"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 24px',
            background: '#ffffff',
            border: '0.5px solid rgba(60, 60, 67, 0.18)',
            borderRadius: '999px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.12)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)'
          }}
        >
          <Image
            src="/caleb-usc.jpg"
            alt="Caleb Newton"
            width={40}
            height={40}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              border: '2px solid #34C759',
            }}
            loading="lazy"
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span
              style={{
                fontSize: '11px',
                color: '#8e8e93',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                fontWeight: 600,
              }}
            >
              Built by
            </span>
            <span
              style={{
                fontSize: '15px',
                color: '#1c1c1e',
                fontWeight: 700,
                letterSpacing: '-0.2px',
              }}
            >
              Caleb Newton
            </span>
            <span style={{ fontSize: '12px', color: '#007AFF', fontWeight: 500 }}>
              University of Southern California
            </span>
          </div>
        </Link>

        {/* Footer nav links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px 20px',
          }}
        >
          {footerNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '13px',
                color: '#3a3a3c',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = '#007AFF'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = '#3a3a3c'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CC BY 4.0 badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              background: 'rgba(52, 199, 89, 0.10)',
              border: '0.5px solid rgba(52, 199, 89, 0.30)',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#1c7a38',
              textDecoration: 'none',
              letterSpacing: '0.1px',
            }}
          >
            CC BY 4.0
          </a>
          <span style={{ fontSize: '12px', color: '#8e8e93' }}>
            &copy; {new Date().getFullYear()} Caleb Newton
          </span>
        </div>
      </div>
    </footer>
  )
}
