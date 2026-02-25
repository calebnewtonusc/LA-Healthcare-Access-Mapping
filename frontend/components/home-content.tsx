'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BarChart3, MapPin, Lightbulb, Database, ExternalLink, AlertTriangle, Clock, ArrowRight, Share2, BookOpen, Building2, CheckCircle, X } from 'lucide-react'
import { useRealtimeStats } from '@/lib/hooks/use-realtime-stats'

interface Stats {
  total_facilities?: number
  census_tracts?: number
  total_population?: number
  access_desert_population?: number
  avg_distance_km?: number
  facility_density?: number
  roi?: string
}

// ---- Shared style tokens ----

const cardBase: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
  border: 'none',
}

const cardHover = {
  ...cardBase,
  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
}

// ---- Sub-components ----

function ResearchDisclaimer() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('disclaimer-dismissed') === '1') {
        setDismissed(true)
      }
    } catch { /* sessionStorage may be blocked */ }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try { sessionStorage.setItem('disclaimer-dismissed', '1') } catch { /* ignore */ }
  }

  if (dismissed) return null

  return (
    <div
      style={{
        ...cardBase,
        marginBottom: '32px',
        padding: '16px 20px',
        background: 'rgba(52, 199, 89, 0.06)',
        border: '1px solid rgba(52, 199, 89, 0.22)',
      }}
      role="note"
      aria-label="Educational research disclaimer"
    >
      <div className="flex gap-3">
        <AlertTriangle
          className="h-5 w-5 flex-shrink-0 mt-0.5"
          style={{ color: '#34C759' }}
          aria-hidden="true"
        />
        <div className="flex-1">
          <h3
            style={{
              fontWeight: 700,
              fontSize: '14px',
              color: '#1c1c1e',
              marginBottom: '4px',
              letterSpacing: '-0.1px',
            }}
          >
            Educational Research Project
          </h3>
          <p style={{ fontSize: '13px', color: '#3a3a3c', lineHeight: 1.5, margin: 0 }}>
            This dashboard represents <strong>independent student research</strong> for educational purposes.
            It has not been peer-reviewed or validated by public health experts.
            Data estimates have <strong>&plusmn;30&ndash;50% uncertainty</strong>.{' '}
            <Link
              href="/limitations"
              style={{ color: '#007AFF', textDecoration: 'underline', fontWeight: 600 }}
            >
              See full list of limitations
            </Link>
          </p>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss disclaimer"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#8e8e93',
            padding: '2px',
            borderRadius: '6px',
            lineHeight: 1,
          }}
          className="hover:opacity-60 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-1"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function DashboardTitle() {
  return (
    <div className="mb-12 text-center">
      {/* Section pill label */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 14px',
          background: 'rgba(0, 122, 255, 0.08)',
          border: '1px solid rgba(0, 122, 255, 0.2)',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: 700,
          color: '#007AFF',
          letterSpacing: '0.5px',
          textTransform: 'uppercase' as const,
          marginBottom: '16px',
        }}
      >
        Educational Research Project
      </div>

      <h1
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          color: '#1c1c1e',
          letterSpacing: '-0.5px',
          lineHeight: 1.1,
          marginBottom: '12px',
        }}
      >
        LA Healthcare Access Dashboard
      </h1>

      <p
        style={{
          fontSize: '17px',
          color: '#3a3a3c',
          maxWidth: '560px',
          margin: '0 auto 10px',
          lineHeight: 1.5,
        }}
      >
        GIS Analysis &amp; Visualization Project &mdash; Interactive Educational Demo
      </p>

      <p
        style={{
          fontSize: '15px',
          color: '#8e8e93',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}
      >
        Geospatial analysis exploring healthcare facility access across Los Angeles County&apos;s{' '}
        <span style={{ fontWeight: 700, color: '#007AFF', fontVariantNumeric: 'tabular-nums' }}>
          2,498 census tracts
        </span>
        , serving an estimated{' '}
        <span style={{ fontWeight: 700, color: '#007AFF' }}>9.9 million residents</span>
      </p>
    </div>
  )
}

function UsageGuide() {
  return (
    <div
      style={{
        ...cardBase,
        marginBottom: '40px',
        padding: '28px',
      }}
    >
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#1c1c1e',
          letterSpacing: '-0.3px',
          marginBottom: '20px',
        }}
      >
        How to Use This Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-5">
        <div>
          <h3
            style={{
              fontWeight: 700,
              fontSize: '13px',
              color: '#34C759',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.4px',
            }}
          >
            <CheckCircle className="w-4 h-4" /> Great for
          </h3>
          <ul style={{ fontSize: '13px', color: '#3a3a3c', lineHeight: 1.7, listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Learning GIS analysis techniques',
              'Exploring visualization methods',
              'Understanding spatial access concepts',
              'Educational discussions about healthcare equity',
              'Portfolio demonstration of technical skills',
            ].map((item) => (
              <li key={item} style={{ paddingLeft: '16px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#34C759', fontWeight: 700 }}>+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3
            style={{
              fontWeight: 700,
              fontSize: '13px',
              color: '#FF3B30',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.4px',
            }}
          >
            <X className="w-4 h-4" /> Not suitable for
          </h3>
          <ul style={{ fontSize: '13px', color: '#3a3a3c', lineHeight: 1.7, listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Policy decisions or planning documents',
              'Grant applications or funding requests',
              'Official healthcare access assessments',
              'Real-world investment decisions',
              'Replacing community engagement',
            ].map((item) => (
              <li key={item} style={{ paddingLeft: '16px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#FF3B30', fontWeight: 700 }}>&minus;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          paddingTop: '16px',
          borderTop: '0.5px solid rgba(60,60,67,0.12)',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#8e8e93',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <MapPin className="w-3 h-3" /> For Official Data &amp; Policy Recommendations
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://data.hrsa.gov/tools/shortage-area/hpsa-find"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '13px', color: '#007AFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            className="hover:underline"
          >
            HRSA HPSA Finder <ExternalLink className="w-3 h-3" />
          </a>
          <span style={{ color: 'rgba(60,60,67,0.25)' }}>&bull;</span>
          <a
            href="http://publichealth.lacounty.gov/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '13px', color: '#007AFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            className="hover:underline"
          >
            LA County Department of Public Health <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}

function KeyFindings({ stats }: { stats: Stats | null }) {
  const statCards = [
    {
      label: 'Healthcare Facilities Analyzed',
      value: (stats?.total_facilities || 4512).toLocaleString(),
      sub: 'Across LA County (Oct 2024 data)',
      accent: '#007AFF',
      accentBg: 'rgba(0, 122, 255, 0.07)',
    },
    {
      label: 'Potential Access Gaps',
      value: (stats?.access_desert_population || 80831).toLocaleString(),
      sub: 'Residents living >5km from nearest facility',
      accent: '#FF3B30',
      accentBg: 'rgba(255, 59, 48, 0.07)',
    },
    {
      label: 'Average Distance',
      value: `${(stats?.avg_distance_km || 0.88).toFixed(2)} km`,
      sub: 'Straight-line distance (not travel time)',
      accent: '#34C759',
      accentBg: 'rgba(52, 199, 89, 0.07)',
    },
  ]

  return (
    <div style={{ ...cardBase, marginBottom: '40px', padding: '28px' }}>
      <h2
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: '#1c1c1e',
          letterSpacing: '-0.3px',
          textAlign: 'center',
          marginBottom: '6px',
        }}
      >
        Key Findings
      </h2>
      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#FF9500',
          fontWeight: 600,
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        <AlertTriangle className="w-3.5 h-3.5" /> Illustrative estimates &mdash; &plusmn;30&ndash;50% uncertainty
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              background: card.accentBg,
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              transition: 'transform 0.15s ease',
            }}
            className="hover:-translate-y-0.5"
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: card.accent, marginBottom: '6px', letterSpacing: '0.1px' }}>
              {card.label}
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: card.accent,
                letterSpacing: '-0.5px',
                lineHeight: 1,
                marginBottom: '6px',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {card.value}
            </div>
            <div style={{ fontSize: '11px', color: '#8e8e93' }}>{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/analysis"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#34C759',
            color: '#ffffff',
            padding: '10px 22px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '14px',
            textDecoration: 'none',
            letterSpacing: '-0.1px',
            boxShadow: '0 2px 12px rgba(52,199,89,0.30)',
            transition: 'opacity 0.15s ease',
          }}
          className="hover:opacity-90 active:opacity-80"
        >
          Explore Full Analysis
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

function QuickStats({ stats }: { stats: Stats | null }) {
  const items = [
    { value: (stats?.total_facilities || 4512).toLocaleString(), label: 'Healthcare Facilities', accent: '#007AFF' },
    { value: (stats?.census_tracts || 2498).toLocaleString(), label: 'Census Tracts', accent: '#AF52DE' },
    { value: `${(stats?.avg_distance_km || 0.88).toFixed(2)} km`, label: 'Avg Distance', accent: '#34C759' },
    { value: (stats?.facility_density || 4.5).toFixed(1), label: 'Per 10K Residents', accent: '#FF9500' },
  ]

  return (
    <div
      className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-3"
      aria-label="Quick statistics overview"
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            ...cardBase,
            padding: '16px',
            textAlign: 'center',
            transition: 'transform 0.15s ease',
          }}
          className="hover:-translate-y-0.5"
        >
          <div
            style={{
              fontSize: '26px',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: item.accent,
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
              marginBottom: '6px',
            }}
          >
            {item.value}
          </div>
          <div style={{ fontSize: '11px', color: '#8e8e93', fontWeight: 500 }}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}

const navItems = [
  {
    href: '/analysis',
    icon: BarChart3,
    accent: '#007AFF',
    accentBg: 'rgba(0, 122, 255, 0.08)',
    label: 'Data Analysis',
    desc: 'Interactive charts and regional breakdowns',
  },
  {
    href: '/recommendations',
    icon: Lightbulb,
    accent: '#FF9500',
    accentBg: 'rgba(255, 149, 0, 0.08)',
    label: 'Policy Recommendations',
    desc: 'Evidence-based interventions and ROI analysis',
  },
  {
    href: '/methodology',
    icon: Database,
    accent: '#AF52DE',
    accentBg: 'rgba(175, 82, 222, 0.08)',
    label: 'Methodology',
    desc: 'Technical implementation details',
  },
  {
    href: '/data',
    icon: Database,
    accent: '#32ADE6',
    accentBg: 'rgba(50, 173, 230, 0.08)',
    label: 'Data & API',
    desc: 'Complete data dictionary and API docs',
  },
  {
    href: '/resources',
    icon: ExternalLink,
    accent: '#34C759',
    accentBg: 'rgba(52, 199, 89, 0.08)',
    label: 'External Resources',
    desc: 'Curated tools and facility locators',
  },
  {
    href: '/analysis#maps',
    icon: MapPin,
    accent: '#FF3B30',
    accentBg: 'rgba(255, 59, 48, 0.08)',
    label: 'Interactive Maps',
    desc: 'Facility locations and access heatmaps',
  },
]

function DashboardNav() {
  return (
    <div>
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#1c1c1e',
          letterSpacing: '-0.3px',
          marginBottom: '16px',
        }}
      >
        Explore the Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group block transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                ...cardBase,
                padding: '18px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.10)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 6px rgba(0,0,0,0.07)'
              }}
              aria-label={`Navigate to ${item.label}`}
            >
              <div className="flex items-start gap-3">
                <div
                  style={{
                    background: item.accentBg,
                    borderRadius: '10px',
                    padding: '8px',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                  }}
                  className="group-hover:scale-110"
                >
                  <Icon style={{ width: '16px', height: '16px', color: item.accent }} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#1c1c1e',
                      letterSpacing: '-0.1px',
                      marginBottom: '3px',
                    }}
                    className="group-hover:opacity-80 transition-opacity"
                  >
                    {item.label}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#8e8e93', lineHeight: 1.4, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function NextSteps() {
  const cards = [
    {
      icon: BarChart3,
      accent: '#007AFF',
      accentBg: 'rgba(0, 122, 255, 0.08)',
      title: 'Explore the Analysis',
      desc: 'Dive into interactive visualizations, regional breakdowns, and discover which areas face the greatest access challenges.',
      actions: (
        <Link
          href="/analysis"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#007AFF',
            color: '#fff',
            padding: '9px 18px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '13px',
            textDecoration: 'none',
            boxShadow: '0 2px 10px rgba(0,122,255,0.25)',
          }}
          className="hover:opacity-90 transition-opacity"
        >
          View Analysis <ArrowRight className="w-4 h-4" />
        </Link>
      ),
    },
    {
      icon: BookOpen,
      accent: '#AF52DE',
      accentBg: 'rgba(175, 82, 222, 0.08)',
      title: 'Learn GIS Techniques',
      desc: 'Understand the methodology behind spatial access analysis, including data sources, calculations, and limitations.',
      actions: (
        <Link
          href="/methodology"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#AF52DE',
            color: '#fff',
            padding: '9px 18px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '13px',
            textDecoration: 'none',
            boxShadow: '0 2px 10px rgba(175,82,222,0.25)',
          }}
          className="hover:opacity-90 transition-opacity"
        >
          View Methodology <ArrowRight className="w-4 h-4" />
        </Link>
      ),
    },
    {
      icon: Share2,
      accent: '#34C759',
      accentBg: 'rgba(52, 199, 89, 0.08)',
      title: 'Share with Educators',
      desc: 'Perfect for GIS courses, public health education, or data visualization workshops. All code and data sources are documented.',
      actions: (
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:?subject=LA Healthcare Access Dashboard&body=Check out this educational GIS analysis project: [URL]"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#34C759',
              color: '#fff',
              padding: '9px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(52,199,89,0.25)',
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Share via Email <Share2 className="w-4 h-4" />
          </a>
          <Link
            href="/data"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(52, 199, 89, 0.1)',
              color: '#1c7a38',
              padding: '9px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
            }}
            className="hover:opacity-80 transition-opacity"
          >
            View API Docs
          </Link>
        </div>
      ),
    },
    {
      icon: Building2,
      accent: '#FF9500',
      accentBg: 'rgba(255, 149, 0, 0.08)',
      title: 'Official Resources',
      desc: 'For real-world healthcare decisions, consult validated data from HRSA, LA County DPH, and other official agencies.',
      actions: (
        <div className="flex flex-wrap gap-3">
          <a
            href="https://data.hrsa.gov/tools/shortage-area/hpsa-find"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FF9500',
              color: '#fff',
              padding: '9px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(255,149,0,0.25)',
            }}
            className="hover:opacity-90 transition-opacity"
          >
            HRSA HPSA Finder <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="http://publichealth.lacounty.gov/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 149, 0, 0.10)',
              color: '#8a4f00',
              padding: '9px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
            }}
            className="hover:opacity-80 transition-opacity"
          >
            LA County DPH <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      ),
    },
  ]

  return (
    <div style={{ marginTop: '64px' }}>
      <div className="text-center mb-8">
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#1c1c1e',
            letterSpacing: '-0.5px',
            marginBottom: '10px',
          }}
        >
          What&apos;s Next?
        </h2>
        <p style={{ fontSize: '15px', color: '#8e8e93', maxWidth: '480px', margin: '0 auto' }}>
          You&apos;ve explored the data. Here&apos;s how you can dive deeper or share this work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              style={{
                ...cardBase,
                padding: '24px',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              className="hover:-translate-y-0.5 hover:shadow-md"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.10)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 6px rgba(0,0,0,0.07)'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  style={{
                    background: card.accentBg,
                    borderRadius: '10px',
                    padding: '10px',
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ width: '20px', height: '20px', color: card.accent }} />
                </div>
                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#1c1c1e',
                    letterSpacing: '-0.2px',
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: '#3a3a3c', lineHeight: 1.55, marginBottom: '16px' }}>
                {card.desc}
              </p>
              {card.actions}
            </div>
          )
        })}
      </div>

      {/* CTA block */}
      <div
        style={{
          ...cardBase,
          padding: '40px 32px',
          textAlign: 'center',
          background: 'rgba(52, 199, 89, 0.04)',
          border: '1px dashed rgba(52, 199, 89, 0.30)',
        }}
      >
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#1c1c1e',
            letterSpacing: '-0.3px',
            marginBottom: '8px',
          }}
        >
          Ready to Explore?
        </h3>
        <p style={{ fontSize: '14px', color: '#8e8e93', marginBottom: '24px' }}>
          Start with the interactive analysis or jump straight to the methodology.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/analysis"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#34C759',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              letterSpacing: '-0.2px',
              boxShadow: '0 2px 14px rgba(52,199,89,0.30)',
            }}
            className="hover:opacity-90 transition-opacity"
          >
            <BarChart3 className="w-4 h-4" />
            Start Exploring
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/recommendations"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              color: '#1c1c1e',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              letterSpacing: '-0.2px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
              border: '0.5px solid rgba(60,60,67,0.15)',
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <Lightbulb className="w-4 h-4" />
            View Recommendations
          </Link>
        </div>
      </div>
    </div>
  )
}

// ---- Main component ----

export function HomeContent({ stats: ssrStats }: { stats: Stats | null }) {
  const { stats: realtimeStats } = useRealtimeStats()
  const stats = realtimeStats || ssrStats

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <ResearchDisclaimer />
      <DashboardTitle />
      <UsageGuide />
      <KeyFindings stats={stats} />
      <QuickStats stats={stats} />

      {/* Data timestamp */}
      <div
        className="mb-10 flex items-center justify-center gap-2 flex-wrap"
        style={{ fontSize: '11px', color: '#8e8e93' }}
      >
        <Clock className="w-3 h-3" />
        <span>Data: 2020 Census &bull; Oct 2024 Facility Data</span>
        <span style={{ color: 'rgba(60,60,67,0.25)' }}>&bull;</span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
        <span style={{ color: 'rgba(60,60,67,0.25)' }}>&bull;</span>
        <span style={{ color: '#FF9500', fontWeight: 600 }}>&plusmn;30% uncertainty</span>
      </div>

      <DashboardNav />
      <NextSteps />
    </div>
  )
}
