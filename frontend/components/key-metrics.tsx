'use client'

import { motion } from 'framer-motion'
import { Users, Building2, FileText, MapPin } from 'lucide-react'
import { AnimatedNumber } from './ui/animated-number'
import { useRealtimeStats } from '@/lib/hooks/use-realtime-stats'
import { useTimeSinceUpdate } from '@/lib/stores/realtime-store'
import { useConnectionStatus } from '@/lib/hooks/use-connection-status'
import { LiveUpdateBadge } from './ui/live-update-badge'

interface KeyMetricsProps {
  stats: {
    population_affected?: number
    population_served_by_facilities?: number
    num_recommendations?: number
    num_facilities?: number
    roi?: string
    net_benefit?: string
  } | null
}

export function KeyMetrics({ stats: ssrStats }: KeyMetricsProps) {
  // Real-time data
  const { stats: realtimeStats, isFlashing } = useRealtimeStats()
  const { isConnected } = useConnectionStatus()
  const lastUpdated = useTimeSinceUpdate('stats')

  // Merge SSR stats with real-time stats (real-time takes precedence)
  const stats = realtimeStats || ssrStats
  // Check if WebSocket is enabled - defaults to false for safety
  const isWebSocketEnabled = process.env.NEXT_PUBLIC_WEBSOCKET_ENABLED === 'true'

  const metrics = [
    {
      label: 'Population Affected',
      value: stats?.population_affected,
      icon: Users,
      delay: 0
    },
    {
      label: 'Population Served',
      value: stats?.population_served_by_facilities,
      icon: Building2,
      delay: 0.1
    },
    {
      label: 'Policy Recommendations',
      value: stats?.num_recommendations,
      icon: FileText,
      delay: 0.2
    },
    {
      label: 'Recommended Facilities',
      value: stats?.num_facilities,
      icon: MapPin,
      delay: 0.3
    },
  ]

  return (
    <div className="relative">
      {/* Live Update Badge - only show when WebSocket is enabled and connected */}
      {isWebSocketEnabled && isConnected && (
        <div className="absolute -top-3 right-0 z-10">
          <LiveUpdateBadge isLive={isConnected} lastUpdated={lastUpdated} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: metric.delay }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-neon-cyan/20 dark:to-neon-purple/20 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-md border border-white/50 dark:border-neon-cyan/30 rounded-xl p-6 shadow-md dark:shadow-neon-cyan/10 transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-dark-text-secondary mb-2 font-medium">{metric.label}</p>
                    {metric.value !== undefined ? (
                      <p className="text-4xl font-bold text-slate-900 dark:text-dark-text-primary">
                        <AnimatedNumber value={metric.value} />
                      </p>
                    ) : (
                      <p className="text-2xl font-semibold text-slate-400 dark:text-dark-text-muted">
                        Data Unavailable
                      </p>
                    )}
                  </div>
                  <div className="bg-slate-100/80 dark:bg-dark-bg-tertiary backdrop-blur-sm p-3 rounded-full">
                    <metric.icon className="w-8 h-8 text-slate-700 dark:text-neon-cyan" />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
