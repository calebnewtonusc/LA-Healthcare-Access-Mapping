'use client'

import { MapPin, Users, TrendingUp, ExternalLink, Clock } from 'lucide-react'
import { LazyIframe } from './ui/lazy-iframe'
import { useRealtimeFacilities } from '@/lib/hooks/use-realtime-facilities'
import { useTimeSinceUpdate } from '@/lib/stores/realtime-store'
import { useConnectionStatus } from '@/lib/hooks/use-connection-status'
import { LiveUpdateBadge } from './ui/live-update-badge'

interface Facility {
  geoid?: string
  tract_name?: string
  latitude?: number
  longitude?: number
  current_distance_km?: number
  population_served?: number
  median_income?: number
  priority_reason?: string
  estimated_impact?: number
}

interface FacilityMapSectionProps {
  facilities: Facility[] | null
}

export function FacilityMapSection({ facilities: ssrFacilities }: FacilityMapSectionProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  // Real-time data
  const { facilities: realtimeFacilities } = useRealtimeFacilities()
  const { isConnected } = useConnectionStatus()
  const lastUpdated = useTimeSinceUpdate('facilities')

  // Merge SSR facilities with real-time data (real-time takes precedence)
  const facilities = realtimeFacilities.length > 0 ? realtimeFacilities : ssrFacilities

  const getRankBadge = (index: number) => {
    if (index === 0) return { label: '1st', variant: 'high' as const }
    if (index === 1) return { label: '2nd', variant: 'medium' as const }
    if (index === 2) return { label: '3rd', variant: 'low' as const }
    return { label: `${index + 1}th`, variant: 'low' as const }
  }

  // Check if WebSocket is enabled - defaults to false for safety
  const isWebSocketEnabled = process.env.NEXT_PUBLIC_WEBSOCKET_ENABLED === 'true'

  return (
    <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
          Recommended Facility Locations
        </h3>
        {/* Live Update Badge - only show when WebSocket is enabled and connected */}
        {isWebSocketEnabled && isConnected && (
          <LiveUpdateBadge isLive={isConnected} lastUpdated={lastUpdated} />
        )}
      </div>

      {/* Map Embed */}
      <div className="mb-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <LazyIframe
            src={`${API_URL}/api/maps/facility-locations`}
            className="w-full h-96"
            title="Facility Locations Map"
          />
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center flex items-center justify-center gap-2">
          <MapPin className="w-3 h-3" />
          Interactive map showing 10 priority locations for new healthcare facilities
        </p>
      </div>

      {/* Facilities List */}
      {facilities && facilities.length > 0 && (
        <div>
          <h4 className="font-bold text-lg text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            Top Priority Locations
          </h4>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {facilities.slice(0, 5).map((facility, index) => {
              const badge = getRankBadge(index)
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          badge.variant === 'high'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : badge.variant === 'medium'
                            ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-500'
                        }`}>
                          {badge.label}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-dark-text-primary">
                          {facility.tract_name?.split(';')[0] || `Census Tract ${facility.geoid}` || 'Census Tract'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{facility.estimated_impact?.toLocaleString() || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{facility.current_distance_km?.toFixed(1)}km away</span>
                        </div>
                      </div>
                      {facility.priority_reason && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {facility.priority_reason}
                        </div>
                      )}
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 text-center">
            <a
              href={`${API_URL}/api/maps/facility-locations`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium group"
            >
              View all {facilities.length} locations on interactive map
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Data Freshness Indicator */}
          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Data: 2020 Census • Oct 2024 Facility Data</span>
            </div>
            <span>•</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
            <span>•</span>
            <span className="text-yellow-600 dark:text-yellow-400 font-medium">±30% uncertainty</span>
          </div>
        </div>
      )}
    </div>
  )
}
