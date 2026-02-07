'use client'

import dynamic from 'next/dynamic'
import { ChartSkeleton } from '../ui/skeleton'

// Lazy load chart components for better performance
export const RegionalBreakdownLazy = dynamic(
  () => import('./regional-breakdown').then(mod => ({ default: mod.RegionalBreakdown })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
)

export const ImpactComparisonLazy = dynamic(
  () => import('./impact-comparison').then(mod => ({ default: mod.ImpactComparison })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
)

export const PriorityMatrixLazy = dynamic(
  () => import('./priority-matrix').then(mod => ({ default: mod.PriorityMatrix })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
)
