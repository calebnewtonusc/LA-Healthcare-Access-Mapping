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

const priorityGlow: Record<string, string> = {
  'Critical': 'bg-gradient-to-r from-red-500 to-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
  'High': 'bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.5)]',
  'Medium': 'bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-[0_0_10px_rgba(234,179,8,0.5)]',
  'Low': 'bg-gradient-to-r from-green-500 to-green-600 shadow-[0_0_10px_rgba(34,197,94,0.5)]',
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
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-glass p-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent mb-4">
          Policy Recommendations
        </h3>
        <p className="text-text-secondary">Loading recommendations...</p>
      </div>
    )
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-glass p-6">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent mb-6">
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
              className="relative group"
            >
              {/* Priority indicator bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${priorityGlow[rec.Priority || 'Medium']}`} />

              {/* Glass card */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg pl-5 pr-4 py-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                   onClick={() => toggleExpand(index)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-gradient-to-br from-neon-cyan to-neon-purple p-2 rounded-lg">
                      <CategoryIcon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-white flex-1">
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
                      <ChevronDown className="w-5 h-5 text-text-secondary" />
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
                      <div className="pt-3 border-t border-white/10 mt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-start gap-2">
                            <div className="bg-neon-cyan/10 p-2 rounded-lg">
                              <Target className="w-4 h-4 text-neon-cyan" />
                            </div>
                            <div>
                              <span className="text-xs text-text-muted">Category</span>
                              <p className="font-semibold text-white">{rec.Category}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="bg-neon-purple/10 p-2 rounded-lg">
                              <Users className="w-4 h-4 text-neon-purple" />
                            </div>
                            <div>
                              <span className="text-xs text-text-muted">Affected Population</span>
                              <p className="font-semibold text-white">
                                {rec.Affected_Population?.toLocaleString() || 'N/A'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="bg-neon-pink/10 p-2 rounded-lg">
                              <DollarSign className="w-4 h-4 text-neon-pink" />
                            </div>
                            <div>
                              <span className="text-xs text-text-muted">Estimated Cost</span>
                              <p className="font-semibold text-white">{rec.Estimated_Cost}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="bg-neon-green/10 p-2 rounded-lg">
                              <Clock className="w-4 h-4 text-neon-green" />
                            </div>
                            <div>
                              <span className="text-xs text-text-muted">Timeline</span>
                              <p className="font-semibold text-white">{rec.Timeline}</p>
                            </div>
                          </div>
                        </div>

                        {rec.Expected_Impact && (
                          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                            <span className="text-xs text-text-muted font-semibold">Expected Impact</span>
                            <p className="text-sm text-text-secondary mt-1">{rec.Expected_Impact}</p>
                          </div>
                        )}
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
  )
}
