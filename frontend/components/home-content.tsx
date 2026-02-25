'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, animate } from 'framer-motion'
import {
  BarChart3,
  MapPin,
  Lightbulb,
  Database,
  ExternalLink,
  ArrowRight,
  X,
  Users,
  DollarSign,
  Map,
  BookOpen,
} from 'lucide-react'
import { useRealtimeStats } from '@/lib/hooks/use-realtime-stats'

// ---- Types ----

interface Stats {
  total_facilities?: number
  census_tracts?: number
  total_population?: number
  access_desert_population?: number
  avg_distance_km?: number
  facility_density?: number
  roi?: string
}

// ---- Animation constants ----

const EASE_APPLE = [0.25, 0.46, 0.45, 0.94] as const

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_APPLE },
  },
}

// ---- Animated counter hook ----

function useCountUp(target: number, duration = 1.6, enabled = true) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!enabled) return
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate(v) {
        setDisplay(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [target, duration, enabled])
  return display
}

// ---- Hero Section ----

function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section
      ref={ref}
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px 64px',
      }}
    >
      {/* Location label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE_APPLE }}
        style={{
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '1px',
          color: '#8e8e93',
          textTransform: 'uppercase',
          marginBottom: '24px',
        }}
      >
        Los Angeles County &middot; 2024
      </motion.div>

      {/* Giant title */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE_APPLE, delay: 0.1 }}
        style={{ marginBottom: '28px' }}
      >
        <h1
          style={{
            fontSize: 'clamp(44px, 7vw, 68px)',
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1.0,
            margin: 0,
          }}
        >
          <span style={{ color: '#34C759', display: 'block' }}>Healthcare Access</span>
          <span style={{ color: '#1c1c1e', display: 'block' }}>in Los Angeles</span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_APPLE, delay: 0.22 }}
        style={{
          fontSize: '17px',
          color: '#3a3a3c',
          lineHeight: 1.6,
          maxWidth: '520px',
          margin: '0 auto 40px',
          fontWeight: 400,
        }}
      >
        Geospatial analysis of 2,498 census tracts covering 9.9M residents. Identifying healthcare
        deserts and $645M investment opportunities.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_APPLE, delay: 0.34 }}
        style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '52px' }}
      >
        <Link
          href="/analysis"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#34C759',
            color: '#ffffff',
            padding: '14px 28px',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '16px',
            textDecoration: 'none',
            letterSpacing: '-0.2px',
            boxShadow: '0 4px 20px rgba(52,199,89,0.38)',
            transition: 'opacity 0.15s ease, transform 0.15s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.opacity = '0.88'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.opacity = '1'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }}
        >
          Explore Analysis
          <ArrowRight style={{ width: '16px', height: '16px' }} />
        </Link>
        <Link
          href="/methodology"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            color: '#1c1c1e',
            padding: '14px 28px',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '16px',
            textDecoration: 'none',
            letterSpacing: '-0.2px',
            border: '1.5px solid rgba(60,60,67,0.22)',
            transition: 'opacity 0.15s ease, transform 0.15s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.opacity = '0.72'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.opacity = '1'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }}
        >
          View Methodology
        </Link>
      </motion.div>

      {/* Key numbers strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE_APPLE, delay: 0.46 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
        }}
      >
        {[
          '2,498 Tracts',
          '9.9M Residents',
          '80,831 Desert Population',
          '$645M Opportunity',
        ].map((pill) => (
          <span
            key={pill}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(60,60,67,0.06)',
              border: '0.5px solid rgba(60,60,67,0.12)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#3a3a3c',
              letterSpacing: '-0.1px',
            }}
          >
            {pill}
          </span>
        ))}
      </motion.div>
    </section>
  )
}

// ---- Animated Stat Number ----

function AnimatedStat({
  value,
  prefix = '',
  suffix = '',
  color,
}: {
  value: number
  prefix?: string
  suffix?: string
  color: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(value, 1.4, inView)

  return (
    <span
      ref={ref}
      style={{
        fontSize: '52px',
        fontWeight: 800,
        letterSpacing: '-2px',
        color,
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
        display: 'block',
      }}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// ---- Key Findings ----

function KeyFindings({ stats }: { stats: Stats | null }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const cards = [
    {
      stat: stats?.census_tracts || 2498,
      prefix: '',
      suffix: '',
      label: 'Census Tracts Analyzed',
      description: 'Complete coverage of Los Angeles County',
      accent: '#007AFF',
      icon: MapPin,
    },
    {
      stat: stats?.access_desert_population || 80831,
      prefix: '',
      suffix: '',
      label: 'Access Desert Residents',
      description: 'Living more than 5km from nearest facility',
      accent: '#FF3B30',
      icon: Users,
    },
    {
      stat: 645,
      prefix: '$',
      suffix: 'M',
      label: 'Investment Opportunity',
      description: 'Estimated ROI from targeted clinic placement',
      accent: '#34C759',
      icon: DollarSign,
    },
  ]

  return (
    <section ref={ref} style={{ marginBottom: '64px' }}>
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE_APPLE }}
        style={{ marginBottom: '32px', textAlign: 'center' }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '1px',
            color: '#8e8e93',
            textTransform: 'uppercase',
          }}
        >
          Key Findings
        </span>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              variants={cardVariants}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '32px 28px',
                border: '0.5px solid rgba(60,60,67,0.1)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                borderTop: `3px solid ${card.accent}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Icon badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: `${card.accent}14`,
                  marginBottom: '20px',
                }}
              >
                <Icon style={{ width: '20px', height: '20px', color: card.accent }} />
              </div>

              {/* Animated number */}
              <AnimatedStat
                value={card.stat}
                prefix={card.prefix}
                suffix={card.suffix}
                color={card.accent}
              />

              {/* Label */}
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#1c1c1e',
                  marginTop: '10px',
                  marginBottom: '6px',
                  letterSpacing: '-0.1px',
                }}
              >
                {card.label}
              </div>
              <div style={{ fontSize: '13px', color: '#8e8e93', lineHeight: 1.5 }}>
                {card.description}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

// ---- Quick Stats ----

function QuickStats({ stats }: { stats: Stats | null }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const items = [
    {
      rawValue: stats?.total_facilities || 4512,
      display: (stats?.total_facilities || 4512).toLocaleString(),
      label: 'Healthcare Facilities',
      accent: '#007AFF',
    },
    {
      rawValue: stats?.census_tracts || 2498,
      display: (stats?.census_tracts || 2498).toLocaleString(),
      label: 'Census Tracts',
      accent: '#AF52DE',
    },
    {
      rawValue: null,
      display: `${(stats?.avg_distance_km || 0.88).toFixed(2)} km`,
      label: 'Avg Facility Distance',
      accent: '#34C759',
    },
    {
      rawValue: null,
      display: (stats?.facility_density || 4.5).toFixed(1),
      label: 'Facilities per 10K',
      accent: '#FF9500',
    },
  ]

  return (
    <section ref={ref} style={{ marginBottom: '64px' }}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}
        className="md:grid-cols-4"
      >
        {items.map((item) => (
          <motion.div
            key={item.label}
            variants={cardVariants}
            whileHover={{ y: -2, boxShadow: '0 6px 24px rgba(0,0,0,0.10)' }}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '22px 18px',
              border: '0.5px solid rgba(60,60,67,0.1)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
              textAlign: 'center',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 800,
                letterSpacing: '-1px',
                color: item.accent,
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              {item.display}
            </div>
            <div style={{ fontSize: '13px', color: '#8e8e93', fontWeight: 500 }}>
              {item.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ---- Dashboard Nav ----

const navItems = [
  {
    href: '/analysis',
    icon: BarChart3,
    accent: '#007AFF',
    accentBg: 'rgba(0, 122, 255, 0.10)',
    label: 'Data Analysis',
    desc: 'Interactive charts and regional breakdowns',
  },
  {
    href: '/recommendations',
    icon: Lightbulb,
    accent: '#FF9500',
    accentBg: 'rgba(255, 149, 0, 0.10)',
    label: 'Policy Recommendations',
    desc: 'Evidence-based interventions and ROI analysis',
  },
  {
    href: '/methodology',
    icon: BookOpen,
    accent: '#AF52DE',
    accentBg: 'rgba(175, 82, 222, 0.10)',
    label: 'Methodology',
    desc: 'Technical implementation and data sources',
  },
  {
    href: '/data',
    icon: Database,
    accent: '#32ADE6',
    accentBg: 'rgba(50, 173, 230, 0.10)',
    label: 'Data & API',
    desc: 'Complete data dictionary and API documentation',
  },
  {
    href: '/resources',
    icon: ExternalLink,
    accent: '#34C759',
    accentBg: 'rgba(52, 199, 89, 0.10)',
    label: 'External Resources',
    desc: 'Curated tools and official facility locators',
  },
  {
    href: '/analysis#maps',
    icon: Map,
    accent: '#FF3B30',
    accentBg: 'rgba(255, 59, 48, 0.10)',
    label: 'Interactive Maps',
    desc: 'Facility locations and access heatmaps',
  },
]

function DashboardNav() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} style={{ marginBottom: '80px' }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE_APPLE }}
        style={{ marginBottom: '8px' }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '1px',
            color: '#8e8e93',
            textTransform: 'uppercase',
          }}
        >
          Dashboard
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_APPLE, delay: 0.06 }}
        style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 800,
          color: '#1c1c1e',
          letterSpacing: '-1px',
          lineHeight: 1.1,
          marginBottom: '32px',
        }}
      >
        Explore the Dashboard
      </motion.h2>

      {/* 3x2 grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.href}
              variants={cardVariants}
              whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(0,0,0,0.11)' }}
              style={{ transition: 'box-shadow 0.2s ease' }}
            >
              <Link
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '0.5px solid rgba(60,60,67,0.1)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                  textDecoration: 'none',
                  height: '100%',
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    minWidth: '44px',
                    borderRadius: '12px',
                    background: item.accentBg,
                  }}
                >
                  <Icon style={{ width: '20px', height: '20px', color: item.accent }} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '17px',
                      fontWeight: 700,
                      color: '#1c1c1e',
                      letterSpacing: '-0.3px',
                      marginBottom: '4px',
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: '14px', color: '#8e8e93', lineHeight: 1.45 }}>
                    {item.desc}
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight
                  style={{
                    width: '16px',
                    height: '16px',
                    color: item.accent,
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                />
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

// ---- Dismissible Disclaimer Bar ----

function DisclaimerBar() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('disclaimer-dismissed') === '1') {
        setDismissed(true)
      }
    } catch {
      /* sessionStorage may be blocked */
    }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem('disclaimer-dismissed', '1')
    } catch {
      /* ignore */
    }
  }

  if (dismissed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: EASE_APPLE }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: '#ffffff',
        borderTop: '0.5px solid rgba(60,60,67,0.12)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
      }}
      role="note"
      aria-label="Educational research disclaimer"
    >
      <span style={{ fontSize: '12px', color: '#8e8e93', fontWeight: 500 }}>
        Educational research &middot; Data uncertainty &plusmn;30&ndash;50% &middot;{' '}
        <Link
          href="/limitations"
          style={{ color: '#007AFF', textDecoration: 'underline', fontWeight: 600 }}
        >
          See limitations
        </Link>
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss disclaimer"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#8e8e93',
          padding: '4px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        <X style={{ width: '14px', height: '14px' }} aria-hidden="true" />
      </button>
    </motion.div>
  )
}

// ---- Main component ----

export function HomeContent({ stats: ssrStats }: { stats: Stats | null }) {
  const { stats: realtimeStats } = useRealtimeStats()
  const stats = realtimeStats || ssrStats

  return (
    <>
      <div
        className="container mx-auto px-4 max-w-5xl"
        style={{ paddingBottom: '100px' /* room for disclaimer bar */ }}
      >
        <Hero />

        <KeyFindings stats={stats} />

        <QuickStats stats={stats} />

        <DashboardNav />
      </div>

      <DisclaimerBar />
    </>
  )
}
