'use client'

import { motion } from 'framer-motion'
import { Users, Building2, FileText, MapPin, Clock } from 'lucide-react'
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
  const { stats: realtimeStats } = useRealtimeStats()
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
              className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-2">{metric.label}</p>
                  {metric.value !== undefined ? (
                    <>
                      <p className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
                        <AnimatedNumber value={metric.value} />
                      </p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1 font-medium">
                        Range: {Math.round(metric.value * 0.7).toLocaleString()} - {Math.round(metric.value * 1.3).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        (±30% uncertainty)
                      </p>
                    </>
                  ) : (
                    <p className="text-xl font-semibold text-gray-400 dark:text-dark-text-muted">
                      Data Unavailable
                    </p>
                  )}
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <metric.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Data Freshness Indicator */}
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Data: 2020 Census</span>
        </div>
        <span>•</span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
        <span>•</span>
        <span className="text-yellow-600 dark:text-yellow-400 font-medium">±30% uncertainty</span>
      </div>
    </div>
  )
}
