'use client'

import dynamic from 'next/dynamic'
import { AccessibleChartWrapper } from './accessible-chart-wrapper'
import { ChartSkeleton } from '../ui/skeleton'

interface Recommendation {
  id: string
  title: string
  priority: string
  urgency: number
  impact: number
  cost: string
}

const recommendations: Recommendation[] = [
  { id: '1', title: 'New Community Health Centers', priority: 'Critical', urgency: 95, impact: 95, cost: '$400M' },
  { id: '2', title: 'Mobile Health Units', priority: 'High', urgency: 90, impact: 75, cost: '$50M' },
  { id: '3', title: 'Public Transit Healthcare Routes', priority: 'High', urgency: 80, impact: 70, cost: '$120M' },
  { id: '4', title: 'Telehealth Expansion', priority: 'High', urgency: 85, impact: 65, cost: '$45M' },
  { id: '5', title: 'Community Health Worker Program', priority: 'Medium', urgency: 60, impact: 60, cost: '$30M' },
]

const dataTable = {
  headers: ['Recommendation', 'Priority', 'Urgency Score', 'Impact Score', 'Cost'],
  rows: recommendations.map(r => [
    r.title,
    r.priority,
    `${r.urgency}/100`,
    `${r.impact}/100`,
    r.cost
  ])
}

const PriorityMatrixChart = dynamic(
  () => import('./priority-matrix-chart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
)

export function PriorityMatrix() {
  return (
    <AccessibleChartWrapper
      title="Recommendation Priority Matrix"
      description="Scatter plot matrix showing 5 recommendations plotted by urgency (0-100) and impact (0-100). New Community Health Centers rated Critical priority at 95 urgency and 95 impact. Mobile Health Units and other initiatives shown at varying urgency/impact levels."
      dataTable={dataTable}
      ariaLabel="Priority matrix scatter chart with 5 recommendations. Critical priority (red): New Community Health Centers at 95% urgency, 95% impact, $400M cost. High priority (orange): Mobile Health Units (90% urgency, 75% impact, $50M), Public Transit Healthcare Routes (80% urgency, 70% impact, $120M), Telehealth Expansion (85% urgency, 65% impact, $45M). Medium priority (blue): Community Health Worker Program (60% urgency, 60% impact, $30M)."
    >
      <PriorityMatrixChart />
    </AccessibleChartWrapper>
  )
}
