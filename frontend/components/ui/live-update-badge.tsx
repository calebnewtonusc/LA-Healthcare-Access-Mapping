'use client'

/**
 * Live Update Badge
 *
 * Displays a "Live" badge with pulsing animation to indicate
 * that a component is receiving real-time updates.
 */

import { motion } from 'framer-motion'
import { Radio } from 'lucide-react'

interface LiveUpdateBadgeProps {
  isLive?: boolean
  lastUpdated?: string
  className?: string
}

export function LiveUpdateBadge({
  isLive = true,
  lastUpdated,
  className = '',
}: LiveUpdateBadgeProps) {
  if (!isLive) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon-green/10 dark:bg-neon-green/20 border border-neon-green/30 dark:border-neon-green/40 ${className}`}
    >
      {/* Pulsing radio icon */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.6, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Radio className="w-3 h-3 text-neon-green dark:text-neon-green" />
      </motion.div>

      {/* Label */}
      <span className="text-xs font-semibold text-neon-green dark:text-neon-green uppercase tracking-wide">
        Live
      </span>

      {/* Last updated timestamp */}
      {lastUpdated && (
        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
          · {lastUpdated}
        </span>
      )}
    </motion.div>
  )
}
