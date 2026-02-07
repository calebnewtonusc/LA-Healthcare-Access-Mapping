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
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neon-cyan/20 dark:to-neon-purple/20 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
      <div className="relative bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-md border border-white/50 dark:border-neon-cyan/30 rounded-2xl p-6 shadow-md dark:shadow-neon-cyan/10 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">
            Policy Recommendations
          </h3>
          {/* Live Update Badge - only show when WebSocket is enabled and connected */}
          {isWebSocketEnabled && isConnected && (
            <LiveUpdateBadge isLive={isConnected} lastUpdated={lastUpdated} />
          )}
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const isExpanded = expandedIndex === index
            const CategoryIcon = categoryIcons[rec.Category || ''] || Target
            const priorityVariant = rec.Priority === 'Critical' || rec.Priority === 'High' ? 'high' :
                                   rec.Priority === 'Medium' ? 'medium' : 'low'

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                className={`${priorityBorders[rec.Priority || 'Medium']} relative group/card`}
                onClick={() => toggleExpand(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-neon-cyan/5 dark:to-neon-purple/5 rounded-lg blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
                <motion.div
                  variants={cardHover}
                  className="relative bg-white/60 dark:bg-dark-bg-tertiary/60 backdrop-blur-sm border border-white/40 dark:border-slate-700 rounded-lg p-4 shadow-sm hover:shadow-md dark:hover:shadow-neon-cyan/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <motion.div
                        className="bg-slate-100/80 dark:bg-dark-bg-secondary backdrop-blur-sm p-2 rounded-lg"
                        whileHover="hover"
                        initial="rest"
                        variants={iconPulse}
                      >
                        <CategoryIcon className="w-5 h-5 text-slate-700 dark:text-neon-cyan" />
                      </motion.div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-dark-text-primary flex-1">
                        {rec.Title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <NeonBadge variant={priorityVariant}>
                        {rec.Priority}
                      </NeonBadge>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary" />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700 mt-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-start gap-2">
                              <div className="bg-slate-100/80 dark:bg-dark-bg-secondary backdrop-blur-sm p-2 rounded-lg">
                                <Target className="w-4 h-4 text-slate-700 dark:text-neon-cyan" />
                              </div>
                              <div>
                                <span className="text-xs text-slate-600 dark:text-dark-text-muted font-medium">Category</span>
                                <p className="font-semibold text-slate-900 dark:text-dark-text-primary">{rec.Category}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="bg-slate-100/80 dark:bg-dark-bg-secondary backdrop-blur-sm p-2 rounded-lg">
                                <Users className="w-4 h-4 text-slate-700 dark:text-neon-purple" />
                              </div>
                              <div>
                                <span className="text-xs text-slate-600 dark:text-dark-text-muted font-medium">Affected Population</span>
                                <p className="font-semibold text-slate-900 dark:text-dark-text-primary">
                                  {rec.Affected_Population?.toLocaleString() || 'N/A'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="bg-slate-100/80 dark:bg-dark-bg-secondary backdrop-blur-sm p-2 rounded-lg">
                                <DollarSign className="w-4 h-4 text-slate-700 dark:text-neon-green" />
                              </div>
                              <div>
                                <span className="text-xs text-slate-600 dark:text-dark-text-muted font-medium">Estimated Cost</span>
                                <p className="font-semibold text-slate-900 dark:text-dark-text-primary">{rec.Estimated_Cost}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="bg-slate-100/80 dark:bg-dark-bg-secondary backdrop-blur-sm p-2 rounded-lg">
                                <Clock className="w-4 h-4 text-slate-700 dark:text-neon-pink" />
                              </div>
                              <div>
                                <span className="text-xs text-slate-600 dark:text-dark-text-muted font-medium">Timeline</span>
                                <p className="font-semibold text-slate-900 dark:text-dark-text-primary">{rec.Timeline}</p>
                              </div>
                            </div>
                          </div>

                          {rec.Expected_Impact && (
                            <div className="bg-slate-50/80 dark:bg-dark-bg-secondary backdrop-blur-sm border border-slate-200/60 dark:border-slate-700 rounded-lg p-3 mb-3 transition-colors duration-300">
                              <span className="text-xs text-slate-700 dark:text-dark-text-secondary font-semibold">Expected Impact</span>
                              <p className="text-sm text-slate-700 dark:text-dark-text-secondary mt-1">{rec.Expected_Impact}</p>
                            </div>
                          )}

                          {/* Calculation Methodology */}
                          <div className="bg-slate-50/80 dark:bg-dark-bg-secondary backdrop-blur-sm border border-slate-200/60 dark:border-slate-700 rounded-lg p-3 transition-colors duration-300">
                            <span className="text-xs text-slate-900 dark:text-dark-text-primary font-semibold flex items-center gap-1">
                              How These Numbers Were Calculated
                            </span>
                            <p className="text-xs text-slate-700 dark:text-dark-text-secondary mt-2 leading-relaxed">
                              <strong className="text-slate-900 dark:text-dark-text-primary">Affected Population:</strong> Sum of total population from all census tracts identified with {rec.Category === 'Infrastructure' ? 'distance >10km from nearest facility' : rec.Category === 'Transportation' ? '>10% households without vehicle access' : rec.Category === 'Equity' ? 'median income <25th percentile AND access score <50' : 'access score <40'}.
                              <br/><br/>
                              <strong className="text-slate-900 dark:text-dark-text-primary">Cost Estimate:</strong> {
                                rec.Category === 'Infrastructure' ? 'Based on $10.25M per facility (construction: $6.75M, land: $2M, equipment: $1.5M) from industry standards.' :
                                rec.Category === 'Service Expansion' && rec.Title?.includes('Mobile') ? 'Based on $250K per mobile clinic × 5 clinics = $1.25M one-time + $400K/year operating costs.' :
                                rec.Category === 'Transportation' ? 'Based on $25 per subsidized trip × 4 trips/year × 10% eligible population using service.' :
                                rec.Category === 'Service Expansion' && rec.Title?.includes('Telehealth') ? 'Based on $15K per kiosk × 20 kiosks = $300K setup + $250K/year platform costs.' :
                                'Estimated from comparable program costs and operational requirements.'
                              }
                              <br/><br/>
                              <strong className="text-slate-900 dark:text-dark-text-primary">Timeline:</strong> Based on typical implementation phases: Immediate (0-6 months), Short-term (6-18 months), Medium-term (1.5-3 years), Long-term (3+ years).
                              <br/><br/>
                              <a href="/about" className="text-slate-700 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-neon-cyan underline text-xs transition-colors">
                                View full methodology & data sources →
                              </a>
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

