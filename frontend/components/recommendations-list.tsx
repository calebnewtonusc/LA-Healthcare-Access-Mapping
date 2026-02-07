'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Bus, Scale, TrendingUp, ChevronDown, Users, DollarSign, Clock, Target } from 'lucide-react'
import { NeonBadge } from './ui/neon-badge'
import { cardHover, iconPulse } from '@/lib/animations'
import { useRealtimeRecommendations } from '@/lib/hooks/use-realtime-recommendations'
import { useTimeSinceUpdate } from '@/lib/stores/realtime-store'
import { useConnectionStatus } from '@/lib/hooks/use-connection-status'
import { LiveUpdateBadge } from './ui/live-update-badge'

interface Recommendation {
  Priority?: string
  Title?: string
  Category?: string
  Affected_Population?: number
  Estimated_Cost?: string
  Timeline?: string
  Expected_Impact?: string
}

interface RecommendationsListProps {
  recommendations: Recommendation[] | null
}

const priorityBorders: Record<string, string> = {
  'Critical': 'border-l-4 border-l-slate-900 dark:border-l-neon-pink',
  'High': 'border-l-4 border-l-slate-700 dark:border-l-neon-purple',
  'Medium': 'border-l-4 border-l-slate-500 dark:border-l-neon-cyan',
  'Low': 'border-l-4 border-l-slate-400 dark:border-l-neon-green',
}

const categoryIcons: Record<string, any> = {
  'Infrastructure': Building2,
  'Transportation': Bus,
  'Equity': Scale,
  'Service Expansion': TrendingUp,
}

export function RecommendationsList({ recommendations: ssrRecommendations }: RecommendationsListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  // Real-time data
  const { recommendations: realtimeRecommendations, isFlashing } = useRealtimeRecommendations()
  const { isConnected } = useConnectionStatus()
  const lastUpdated = useTimeSinceUpdate('recommendations')

  // Merge SSR recommendations with real-time data (real-time takes precedence)
  const recommendations = realtimeRecommendations.length > 0 ? realtimeRecommendations : ssrRecommendations

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neon-cyan/20 dark:to-neon-purple/20 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-md border border-white/50 dark:border-neon-cyan/30 rounded-2xl p-6 shadow-md dark:shadow-neon-cyan/10 transition-colors duration-300">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary mb-4">
            Policy Recommendations
          </h3>
          <p className="text-slate-700 dark:text-dark-text-secondary">Loading recommendations...</p>
        </div>
      </div>
    )
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  // Check if WebSocket is enabled - defaults to false for safety
  const isWebSocketEnabled = process.env.NEXT_PUBLIC_WEBSOCKET_ENABLED === 'true'

  return (
    <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
          Policy Recommendations
        </h3>
        {/* Live Update Badge - only show when WebSocket is enabled and connected */}
        {isWebSocketEnabled && isConnected && (
          <LiveUpdateBadge isLive={isConnected} lastUpdated={lastUpdated} />
        )}
      </div>

      <div className="space-y-3">
          {recommendations.map((rec, index) => {
            const isExpanded = expandedIndex === index
            const CategoryIcon = categoryIcons[rec.Category || ''] || Target
            const priorityVariant = rec.Priority === 'Critical' || rec.Priority === 'High' ? 'high' :
                                   rec.Priority === 'Medium' ? 'medium' : 'low'

            return (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                      <CategoryIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-dark-text-primary flex-1">
                      {rec.Title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      rec.Priority === 'Critical' || rec.Priority === 'High'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : rec.Priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {rec.Priority}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {isExpanded && (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start gap-2">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                          <Target className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">Category</span>
                          <p className="font-semibold text-gray-900 dark:text-dark-text-primary">{rec.Category}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                          <Users className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">Affected Population</span>
                          <p className="font-semibold text-gray-900 dark:text-dark-text-primary">
                            {rec.Affected_Population?.toLocaleString() || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                          <DollarSign className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">Estimated Cost</span>
                          <p className="font-semibold text-gray-900 dark:text-dark-text-primary">{rec.Estimated_Cost}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                          <Clock className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">Timeline</span>
                          <p className="font-semibold text-gray-900 dark:text-dark-text-primary">{rec.Timeline}</p>
                        </div>
                      </div>
                    </div>

                    {rec.Expected_Impact && (
                      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-3">
                        <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold">Expected Impact</span>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{rec.Expected_Impact}</p>
                      </div>
                    )}

                    {/* Calculation Methodology */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <span className="text-xs text-gray-900 dark:text-dark-text-primary font-semibold">
                        How These Numbers Were Calculated
                      </span>
                      <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                        <strong className="text-gray-900 dark:text-dark-text-primary">Affected Population:</strong> Sum of total population from all census tracts identified with {rec.Category === 'Infrastructure' ? 'distance >10km from nearest facility' : rec.Category === 'Transportation' ? '>10% households without vehicle access' : rec.Category === 'Equity' ? 'median income <25th percentile AND access score <50' : 'access score <40'}.
                        <br/><br/>
                        <strong className="text-gray-900 dark:text-dark-text-primary">Cost Estimate:</strong> {
                          rec.Category === 'Infrastructure' ? 'Based on $10.25M per facility (construction: $6.75M, land: $2M, equipment: $1.5M) from industry standards.' :
                          rec.Category === 'Service Expansion' && rec.Title?.includes('Mobile') ? 'Based on $250K per mobile clinic × 5 clinics = $1.25M one-time + $400K/year operating costs.' :
                          rec.Category === 'Transportation' ? 'Based on $25 per subsidized trip × 4 trips/year × 10% eligible population using service.' :
                          rec.Category === 'Service Expansion' && rec.Title?.includes('Telehealth') ? 'Based on $15K per kiosk × 20 kiosks = $300K setup + $250K/year platform costs.' :
                          'Estimated from comparable program costs and operational requirements.'
                        }
                        <br/><br/>
                        <strong className="text-gray-900 dark:text-dark-text-primary">Timeline:</strong> Based on typical implementation phases: Immediate (0-6 months), Short-term (6-18 months), Medium-term (1.5-3 years), Long-term (3+ years).
                        <br/><br/>
                        <a href="/about" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
                          View full methodology & data sources →
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

