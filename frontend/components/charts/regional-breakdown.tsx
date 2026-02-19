'use client'

import dynamic from 'next/dynamic'
import { AccessibleChartWrapper } from './accessible-chart-wrapper'
import { ChartSkeleton } from '../ui/skeleton'

const regionalData = [
  { region: 'Central LA', tracts: 412, accessDeserts: 18500, avgDistance: 1.2, facilityDensity: 6.2, score: 72 },
  { region: 'South LA', tracts: 385, accessDeserts: 28400, avgDistance: 2.1, facilityDensity: 3.1, score: 45 },
  { region: 'East LA', tracts: 324, accessDeserts: 15200, avgDistance: 1.5, facilityDensity: 4.8, score: 61 },
  { region: 'West LA', tracts: 298, accessDeserts: 3200, avgDistance: 0.7, facilityDensity: 8.5, score: 85 },
  { region: 'San Fernando Valley', tracts: 521, accessDeserts: 9800, avgDistance: 1.1, facilityDensity: 5.3, score: 68 },
  { region: 'San Gabriel Valley', tracts: 386, accessDeserts: 4100, avgDistance: 0.9, facilityDensity: 5.9, score: 74 },
  { region: 'South Bay', tracts: 172, accessDeserts: 1630, avgDistance: 0.8, facilityDensity: 6.7, score: 79 },
]

const dataTable = {
  headers: ['Region', 'Access Score', 'Census Tracts', 'Access Deserts', 'Avg Distance (km)', 'Facility Density'],
  rows: regionalData.map(d => [
    d.region,
    `${d.score}/100`,
    d.tracts.toLocaleString(),
    d.accessDeserts.toLocaleString(),
    d.avgDistance,
    `${d.facilityDensity}/10K`
  ])
}

const RegionalBreakdownChart = dynamic(
  () => import('./regional-breakdown-chart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
)

export function RegionalBreakdown() {
  return (
    <AccessibleChartWrapper
      title="Regional Access Breakdown"
      description="Bar chart showing healthcare access scores by LA County region. South LA has the lowest score at 45/100 with 28,400 residents in access deserts. West LA has the highest score at 85/100."
      dataTable={dataTable}
      ariaLabel="Bar chart displaying healthcare access scores for 7 regions in LA County. Values range from 45 (South LA, Poor) to 85 (West LA, Excellent). Access scores include: Central LA 72, East LA 61, San Fernando Valley 68, San Gabriel Valley 74, and South Bay 79."
    >
      <RegionalBreakdownChart />
    </AccessibleChartWrapper>
  )
}
