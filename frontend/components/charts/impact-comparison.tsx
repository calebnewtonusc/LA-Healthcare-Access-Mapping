'use client'

import dynamic from 'next/dynamic'
import { AccessibleChartWrapper } from './accessible-chart-wrapper'
import { ChartSkeleton } from '../ui/skeleton'

const comparisonData = [
  {
    metric: 'Access Desert Population',
    current: 80831,
    projected: 35000,
    currentNormalized: 100,
    projectedNormalized: 43,
    unit: 'residents',
    improvement: '-57%',
  },
  {
    metric: 'Avg Distance to Facility',
    current: 880,
    projected: 450,
    currentNormalized: 100,
    projectedNormalized: 51,
    unit: 'meters',
    improvement: '-49%',
  },
  {
    metric: 'Facility Density',
    current: 4.5,
    projected: 7.2,
    currentNormalized: 100,
    projectedNormalized: 160,
    unit: 'per 10K',
    improvement: '+60%',
  },
  {
    metric: 'ER Visits (Preventable)',
    current: 125000,
    projected: 62500,
    currentNormalized: 100,
    projectedNormalized: 50,
    unit: 'annual',
    improvement: '-50%',
  },
  {
    metric: 'Healthcare Cost Per Capita',
    current: 3200,
    projected: 2400,
    currentNormalized: 100,
    projectedNormalized: 75,
    unit: '$/year',
    improvement: '-25%',
  },
]

const dataTable = {
  headers: ['Metric', 'Current', 'Hypothetical (±50%)', 'Change'],
  rows: comparisonData.map(d => [
    d.metric,
    `${d.current.toLocaleString()} ${d.unit}`,
    `~${d.projected.toLocaleString()}* ${d.unit}`,
    `~${d.improvement}*`
  ])
}

const ImpactComparisonChart = dynamic(
  () => import('./impact-comparison-chart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
)

export function ImpactComparison() {
  return (
    <AccessibleChartWrapper
      title="Hypothetical Impact Analysis (Unvalidated Estimates ±50%)"
      description="Comparison bar chart showing current state versus hypothetical post-implementation projections across 5 key healthcare metrics. WARNING: These are unvalidated estimates with ±50% uncertainty, not evidence-based predictions. Access desert population might decrease ~57%, preventable ER visits might drop ~50%, and facility density might increase ~60%."
      dataTable={dataTable}
      ariaLabel="Grouped bar chart comparing current healthcare metrics with hypothetical projected improvements. CAUTION: Unvalidated estimates. Five metrics shown: Access Desert Population (80,831 current to ~35,000 hypothetical, ~-57%), Average Distance to Facility (880m to ~450m, ~-49%), Facility Density (4.5 to ~7.2 per 10K, ~+60%), Preventable ER Visits (125,000 to ~62,500 annual, ~-50%), and Healthcare Cost Per Capita ($3,200 to ~$2,400 per year, ~-25%). All projections carry ±50% or greater uncertainty."
    >
      <ImpactComparisonChart />
    </AccessibleChartWrapper>
  )
}
