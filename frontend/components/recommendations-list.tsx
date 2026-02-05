'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Bus, Scale, TrendingUp, ChevronDown, Users, DollarSign, Clock, Target } from 'lucide-react'
import { NeonBadge } from './ui/neon-badge'

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
  'Critical': 'border-l-4 border-l-slate-900',
  'High': 'border-l-4 border-l-slate-700',
  'Medium': 'border-l-4 border-l-slate-500',
  'Low': 'border-l-4 border-l-slate-400',
}

const categoryIcons: Record<string, any> = {
  'Infrastructure': Building2,
  'Transportation': Bus,
  'Equity': Scale,
  'Service Expansion': TrendingUp,
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Policy Recommendations
          </h3>
          <p className="text-slate-700">Loading recommendations...</p>
        </div>
      </div>
    )
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
      <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          Policy Recommendations
        </h3>

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
                transition={{ delay: index * 0.1 }}
                className={`${priorityBorders[rec.Priority || 'Medium']} relative group/card`}
                onClick={() => toggleExpand(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-slate-100/80 backdrop-blur-sm p-2 rounded-lg">
                        <CategoryIcon className="w-5 h-5 text-slate-700" />
                      </div>
                      <h4 className="font-bold text-lg text-slate-900 flex-1">
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
                        <ChevronDown className="w-5 h-5 text-slate-600" />
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
                        <div className="pt-3 border-t border-slate-200/60 mt-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-start gap-2">
                              <div className="bg-slate-100/80 backdrop-blur-sm p-2 rounded-lg">
                                <Target className="w-4 h-4 text-slate-700" />
                              </div>
                              <div>
                                <span className="text-xs text-slate-600 font-medium">Category</span>
                                <p className="font-semibold text-slate-900">{rec.Category}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="bg-slate-100/80 backdrop-blur-sm p-2 rounded-lg">
                                <Users className="w-4 h-4 text-slate-700" />
                              </div>
                              <div>
                                <span className="text-xs text-slate-600 font-medium">Affected Population</span>
                                <p className="font-semibold text-slate-900">
                                  {rec.Affected_Population?.toLocaleString() || 'N/A'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="bg-slate-100/80 backdrop-blur-sm p-2 rounded-lg">
                                <DollarSign className="w-4 h-4 text-slate-700" />
                              </div>
                              <div>
                                <span className="text-xs text-slate-600 font-medium">Estimated Cost</span>
                                <p className="font-semibold text-slate-900">{rec.Estimated_Cost}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="bg-slate-100/80 backdrop-blur-sm p-2 rounded-lg">
                                <Clock className="w-4 h-4 text-slate-700" />
                              </div>
                              <div>
                                <span className="text-xs text-slate-600 font-medium">Timeline</span>
                                <p className="font-semibold text-slate-900">{rec.Timeline}</p>
                              </div>
                            </div>
                          </div>

                          {rec.Expected_Impact && (
                            <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/60 rounded-lg p-3 mb-3">
                              <span className="text-xs text-slate-700 font-semibold">Expected Impact</span>
                              <p className="text-sm text-slate-700 mt-1">{rec.Expected_Impact}</p>
                            </div>
                          )}

                          {/* Calculation Methodology */}
                          <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/60 rounded-lg p-3">
                            <span className="text-xs text-slate-900 font-semibold flex items-center gap-1">
                              How These Numbers Were Calculated
                            </span>
                            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                              <strong className="text-slate-900">Affected Population:</strong> Sum of total population from all census tracts identified with {rec.Category === 'Infrastructure' ? 'distance >10km from nearest facility' : rec.Category === 'Transportation' ? '>10% households without vehicle access' : rec.Category === 'Equity' ? 'median income <25th percentile AND access score <50' : 'access score <40'}.
                              <br/><br/>
                              <strong className="text-slate-900">Cost Estimate:</strong> {
                                rec.Category === 'Infrastructure' ? 'Based on $10.25M per facility (construction: $6.75M, land: $2M, equipment: $1.5M) from industry standards.' :
                                rec.Category === 'Service Expansion' && rec.Title?.includes('Mobile') ? 'Based on $250K per mobile clinic × 5 clinics = $1.25M one-time + $400K/year operating costs.' :
                                rec.Category === 'Transportation' ? 'Based on $25 per subsidized trip × 4 trips/year × 10% eligible population using service.' :
                                rec.Category === 'Service Expansion' && rec.Title?.includes('Telehealth') ? 'Based on $15K per kiosk × 20 kiosks = $300K setup + $250K/year platform costs.' :
                                'Estimated from comparable program costs and operational requirements.'
                              }
                              <br/><br/>
                              <strong className="text-slate-900">Timeline:</strong> Based on typical implementation phases: Immediate (0-6 months), Short-term (6-18 months), Medium-term (1.5-3 years), Long-term (3+ years).
                              <br/><br/>
                              <a href="/about" className="text-slate-700 hover:text-blue-600 underline text-xs transition-colors">
                                View full methodology & data sources →
                              </a>
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

