'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { AccessibleChartWrapper } from './accessible-chart-wrapper'

const regionalData = [
  { region: 'Central LA', tracts: 412, accessDeserts: 18500, avgDistance: 1.2, facilityDensity: 6.2, score: 72 },
  { region: 'South LA', tracts: 385, accessDeserts: 28400, avgDistance: 2.1, facilityDensity: 3.1, score: 45 },
  { region: 'East LA', tracts: 324, accessDeserts: 15200, avgDistance: 1.5, facilityDensity: 4.8, score: 61 },
  { region: 'West LA', tracts: 298, accessDeserts: 3200, avgDistance: 0.7, facilityDensity: 8.5, score: 85 },
  { region: 'San Fernando Valley', tracts: 521, accessDeserts: 9800, avgDistance: 1.1, facilityDensity: 5.3, score: 68 },
  { region: 'San Gabriel Valley', tracts: 386, accessDeserts: 4100, avgDistance: 0.9, facilityDensity: 5.9, score: 74 },
  { region: 'South Bay', tracts: 172, accessDeserts: 1630, avgDistance: 0.8, facilityDensity: 6.7, score: 79 },
]

const getScorePattern = (score: number) => {
  if (score >= 75) return 'url(#pattern-excellent)' // solid + dots
  if (score >= 60) return 'url(#pattern-good)' // diagonal lines
  if (score >= 45) return 'url(#pattern-fair)' // horizontal lines
  return 'url(#pattern-poor)' // crosshatch
}

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

export function RegionalBreakdown() {
  const chartContent = (
    <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">Regional Access Breakdown</h3>
        <p className="text-sm text-slate-600 dark:text-dark-text-secondary mb-6">Healthcare Access Scores by LA County Region</p>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={regionalData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            {/* SVG Pattern Definitions for Colorblind Accessibility */}
            <defs>
              {/* Excellent: Dots pattern */}
              <pattern id="pattern-excellent" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#10b981" />
                <circle cx="4" cy="4" r="1.5" fill="#ffffff" opacity="0.6" />
              </pattern>
              {/* Good: Diagonal lines */}
              <pattern id="pattern-good" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#3b82f6" />
                <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
              </pattern>
              {/* Fair: Horizontal lines */}
              <pattern id="pattern-fair" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#f59e0b" />
                <line x1="0" y1="2" x2="8" y2="2" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
                <line x1="0" y1="6" x2="8" y2="6" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
              </pattern>
              {/* Poor: Crosshatch */}
              <pattern id="pattern-poor" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#ef4444" />
                <path d="M0,0 l8,8 M0,8 l8,-8" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
              </pattern>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
            <XAxis
              dataKey="region"
              angle={-45}
              textAnchor="end"
              height={100}
              stroke="#64748b"
              className="dark:stroke-slate-400"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              label={{ value: 'Access Score (0-100)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontWeight: 600 } }}
              stroke="#64748b"
              className="dark:stroke-slate-400"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload[0]) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-white/95 dark:bg-dark-bg-secondary/95 backdrop-blur-sm border border-slate-200 dark:border-neon-cyan/30 rounded-lg p-4 shadow-lg min-w-[220px]">
                      <p className="font-bold text-slate-900 dark:text-dark-text-primary mb-2">{data.region}</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-slate-700 dark:text-dark-text-secondary">Access Score: <span className="font-semibold">{data.score}/100</span></p>
                        <p className="text-slate-700 dark:text-dark-text-secondary">Census Tracts: <span className="font-semibold">{data.tracts.toLocaleString()}</span></p>
                        <p className="text-slate-700 dark:text-dark-text-secondary">Access Deserts: <span className="font-semibold text-red-600 dark:text-neon-pink">{data.accessDeserts.toLocaleString()}</span></p>
                        <p className="text-slate-700 dark:text-dark-text-secondary">Avg Distance: <span className="font-semibold">{data.avgDistance} km</span></p>
                        <p className="text-slate-700 dark:text-dark-text-secondary">Facility Density: <span className="font-semibold">{data.facilityDensity}/10K</span></p>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {regionalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getScorePattern(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Accessibility Note */}
        <p className="mt-4 text-xs text-gray-600 dark:text-gray-400 text-center">
          ♿ Bars use distinct patterns (dots, diagonal lines, horizontal lines, crosshatch) for colorblind accessibility
        </p>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-green-50 dark:bg-neon-green/10 border border-green-200 dark:border-neon-green/30 rounded-lg p-2 text-center transition-colors duration-300">
            <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div>
            <p className="font-semibold text-green-900 dark:text-neon-green">Excellent (75+)</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Dots</p>
          </div>
          <div className="bg-blue-50 dark:bg-neon-cyan/10 border border-blue-200 dark:border-neon-cyan/30 rounded-lg p-2 text-center transition-colors duration-300">
            <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-1"></div>
            <p className="font-semibold text-blue-900 dark:text-neon-cyan">Good (60-74)</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Diagonal</p>
          </div>
          <div className="bg-orange-50 dark:bg-neon-purple/10 border border-orange-200 dark:border-neon-purple/30 rounded-lg p-2 text-center transition-colors duration-300">
            <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1"></div>
            <p className="font-semibold text-orange-900 dark:text-neon-purple">Fair (45-59)</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Horizontal</p>
          </div>
          <div className="bg-red-50 dark:bg-neon-pink/10 border border-red-200 dark:border-neon-pink/30 rounded-lg p-2 text-center transition-colors duration-300">
            <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1"></div>
            <p className="font-semibold text-red-900 dark:text-neon-pink">Poor (&lt;45)</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Crosshatch</p>
          </div>
        </div>

        <div className="mt-4 bg-gray-50 dark:bg-dark-bg-tertiary border border-gray-200 dark:border-gray-700 rounded p-3">
          <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
            <span className="font-semibold text-gray-900 dark:text-dark-text-primary">South LA</span> shows the lowest access score (45) with 28,400 residents in access deserts, indicating urgent need for intervention.
          </p>
        </div>
      </div>
  )

  return (
    <AccessibleChartWrapper
      title="Regional Access Breakdown"
      description="Bar chart showing healthcare access scores by LA County region. South LA has the lowest score at 45/100 with 28,400 residents in access deserts. West LA has the highest score at 85/100."
      dataTable={dataTable}
      ariaLabel="Bar chart displaying healthcare access scores for 7 regions in LA County. Values range from 45 (South LA, Poor) to 85 (West LA, Excellent). Access scores include: Central LA 72, East LA 61, San Fernando Valley 68, San Gabriel Valley 74, and South Bay 79."
    >
      {chartContent}
    </AccessibleChartWrapper>
  )
}
