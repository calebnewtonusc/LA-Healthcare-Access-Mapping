'use client'

import { motion } from 'framer-motion'
import { shimmer } from '@/lib/animations'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'card' | 'metric' | 'chart'
}

export function Skeleton({ className = '', variant = 'text' }: SkeletonProps) {
  const baseClasses = 'rounded-lg bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse'

  const variantClasses = {
    text: 'h-4 w-full',
    card: 'h-48 w-full',
    metric: 'h-32 w-full',
    chart: 'h-96 w-full'
  }

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      initial="initial"
      animate="animate"
      variants={shimmer}
      style={{
        backgroundSize: '1000px 100%',
        backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
      }}
    />
  )
}

export function MetricCardSkeleton() {
  return (
    <div className="bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-md border border-white/50 dark:border-slate-700/30 rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton variant="text" className="w-24 mb-3" />
          <Skeleton variant="text" className="h-10 w-32" />
        </div>
        <Skeleton className="w-14 h-14 rounded-full" />
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-white/80 dark:bg-dark-bg-tertiary/70 backdrop-blur-md border border-white/60 dark:border-neon-cyan/30 rounded-2xl p-6 shadow-lg">
      <Skeleton variant="text" className="w-48 h-6 mb-2" />
      <Skeleton variant="text" className="w-64 mb-6" />
      <Skeleton variant="chart" />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6" role="status" aria-label="Loading card">
      <Skeleton variant="text" className="w-1/3 mb-4" />
      <Skeleton variant="text" className="w-full mb-2" />
      <Skeleton variant="text" className="w-5/6" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3" role="status" aria-label="Loading table">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="text" className="w-full" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="text" className="w-full" />
          ))}
        </div>
      ))}
      <span className="sr-only">Loading table data...</span>
    </div>
  )
}

export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-3" role="status" aria-label="Loading list">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <Skeleton variant="text" className="w-2/3 mb-2" />
          <Skeleton variant="text" className="w-full mb-2" />
          <Skeleton variant="text" className="w-4/5" />
        </div>
      ))}
      <span className="sr-only">Loading list items...</span>
    </div>
  )
}
