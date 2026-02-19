'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import { shimmer } from '@/lib/animations'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'card' | 'metric' | 'chart'
}

function Skeleton({ className = '', variant = 'text' }: SkeletonProps) {
  const baseClasses = 'rounded-lg bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse'

  const variantClasses = {
    text: 'h-4 w-full',
    card: 'h-48 w-full',
    metric: 'h-32 w-full',
    chart: 'h-96 w-full'
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        initial="initial"
        animate="animate"
        variants={shimmer}
        style={{
          backgroundSize: '1000px 100%',
          backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
        }}
      />
    </LazyMotion>
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

