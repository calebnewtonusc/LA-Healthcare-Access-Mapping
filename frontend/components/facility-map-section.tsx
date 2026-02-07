'use client'

import { motion } from 'framer-motion'
import { MapPin, Users, TrendingUp, ExternalLink } from 'lucide-react'
import { NeonBadge } from './ui/neon-badge'
import { LazyIframe } from './ui/lazy-iframe'

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

export function FacilityMapSection({ facilities }: FacilityMapSectionProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  const getRankBadge = (index: number) => {
    if (index === 0) return { label: '1st', variant: 'high' as const }
    if (index === 1) return { label: '2nd', variant: 'medium' as const }
    if (index === 2) return { label: '3rd', variant: 'low' as const }
    return { label: `${index + 1}th`, variant: 'low' as const }
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neon-cyan/20 dark:to-neon-purple/20 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
      <div className="relative bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-md border border-white/50 dark:border-neon-cyan/30 rounded-2xl p-6 shadow-md dark:shadow-neon-cyan/10 transition-colors duration-300">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary mb-4">
          Recommended Facility Locations
        </h3>

        {/* Map Embed */}
        <div className="mb-6">
          <div className="relative group/map">
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neon-cyan dark:to-neon-purple rounded-xl blur opacity-30 group-hover/map:opacity-50 transition-opacity"></div>
            <div className="relative bg-slate-50/80 dark:bg-dark-bg-tertiary backdrop-blur-sm rounded-xl overflow-hidden border border-white/40 dark:border-neon-cyan/30 shadow-sm">
              <LazyIframe
                src={`${API_URL}/api/maps/facility-locations`}
                className="w-full h-96"
                title="Facility Locations Map"
              />
            </div>
          </div>

          <p className="text-xs text-slate-700 dark:text-dark-text-secondary mt-3 text-center flex items-center justify-center gap-2">
            <MapPin className="w-3 h-3" />
            Interactive map showing 10 priority locations for new healthcare facilities
          </p>
        </div>

        {/* Facilities List */}
        {facilities && facilities.length > 0 && (
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
              <div className="bg-slate-100/80 dark:bg-dark-bg-tertiary backdrop-blur-sm p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-slate-700 dark:text-neon-green" />
              </div>
              Top Priority Locations
            </h4>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {facilities.slice(0, 5).map((facility, index) => {
                const badge = getRankBadge(index)
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group/facility"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-neon-cyan/10 dark:to-neon-purple/10 rounded-lg blur opacity-20 group-hover/facility:opacity-40 transition-opacity"></div>
                    <div className="relative bg-white/60 dark:bg-dark-bg-tertiary/60 backdrop-blur-sm border border-white/40 dark:border-slate-700 rounded-lg p-4 shadow-sm hover:shadow-md dark:hover:shadow-neon-cyan/20 transition-all duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <NeonBadge variant={badge.variant}>
                              {badge.label}
                            </NeonBadge>
                            <span className="font-semibold text-slate-900 dark:text-dark-text-primary">
                              {facility.tract_name?.split(';')[0] || `Census Tract ${facility.geoid}` || 'Census Tract'}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-700 dark:text-dark-text-secondary mb-2">
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
                            <div className="text-xs text-slate-600 dark:text-dark-text-muted">
                              {facility.priority_reason}
                            </div>
                          )}
                        </div>
                        <div className="bg-slate-100/80 dark:bg-dark-bg-secondary backdrop-blur-sm p-2 rounded-lg">
                          <MapPin className="w-5 h-5 text-slate-700 dark:text-neon-cyan" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            <div className="mt-4 text-center">
              <a
                href={`${API_URL}/api/maps/facility-locations`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-700 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-neon-cyan text-sm font-medium transition-colors group"
              >
                View all {facilities.length} locations on interactive map
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
