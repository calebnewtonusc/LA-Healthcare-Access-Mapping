'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AccessibleChartWrapper } from './accessible-chart-wrapper'

const comparisonData = [
  {
    metric: 'Access Desert Population',
    current: 80831,
    projected: 35000,
    unit: 'residents',
    improvement: '-57%',
  },
  {
    metric: 'Avg Distance to Facility',
    current: 880,
    projected: 450,
    unit: 'meters',
    improvement: '-49%',
  },
  {
    metric: 'Facility Density',
    current: 4.5,
    projected: 7.2,
    unit: 'per 10K',
    improvement: '+60%',
  },
  {
    metric: 'ER Visits (Preventable)',
    current: 125000,
    projected: 62500,
    unit: 'annual',
    improvement: '-50%',
  },
  {
    metric: 'Healthcare Cost Per Capita',
    current: 3200,
    projected: 2400,
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

export function ImpactComparison() {
  const chartContent = (
    <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">Hypothetical Impact Analysis</h3>
        <p className="text-sm text-slate-600 dark:text-dark-text-secondary mb-2">Current State vs. Post-Implementation Projections</p>

        {/* Hypothetical Disclaimer */}
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>⚠️ HYPOTHETICAL PROJECTIONS</strong> - These estimates are <strong>unvalidated scenarios</strong>, not evidence-based predictions.
            Actual outcomes could vary by <strong>±50% or more</strong>. Real-world implementation would require rigorous impact evaluation,
            pilot testing, and community input before any claims could be validated.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={comparisonData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            layout="horizontal"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
            <XAxis
              dataKey="metric"
              angle={-45}
              textAnchor="end"
              height={120}
              stroke="#64748b"
              className="dark:stroke-slate-400"
              style={{ fontSize: '11px' }}
            />
            <YAxis
              stroke="#64748b"
              className="dark:stroke-slate-400"
              label={{ value: 'Value (normalized)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontWeight: 600 } }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length >= 2) {
                  const item = payload[0]
                  if (!item) return null
                  const data = item.payload
                  return (
                    <div className="bg-white/95 dark:bg-dark-bg-secondary/95 backdrop-blur-sm border border-slate-200 dark:border-neon-cyan/30 rounded-lg p-4 shadow-lg min-w-[240px]">
                      <p className="font-bold text-slate-900 dark:text-dark-text-primary mb-2">{data.metric}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-red-700 dark:text-neon-pink">Current:</span>
                          <span className="font-semibold text-red-900 dark:text-neon-pink">{data.current.toLocaleString()} {data.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700 dark:text-neon-green">Projected:</span>
                          <span className="font-semibold text-green-900 dark:text-neon-green">{data.projected.toLocaleString()} {data.unit}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                          <span className="text-slate-700 dark:text-dark-text-secondary">Change:</span>
                          <span className={`font-bold ${data.improvement.startsWith('+') ? 'text-green-600 dark:text-neon-green' : 'text-red-600 dark:text-neon-pink'}`}>
                            {data.improvement}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '10px' }}
              content={() => (
                <div className="flex justify-center gap-6 text-sm mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-500"></div>
                    <span className="text-slate-700 dark:text-dark-text-secondary">Current State</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-500"></div>
                    <span className="text-slate-700 dark:text-dark-text-secondary">Hypothetical Projection* (±50%)</span>
                  </div>
                </div>
              )}
            />
            <Bar dataKey="current" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="projected" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {comparisonData.map((item, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-dark-bg-secondary border border-slate-200 dark:border-slate-700 rounded-lg p-3 transition-colors duration-300">
              <p className="text-xs text-slate-600 dark:text-dark-text-muted mb-1">{item.metric}</p>
              <p className={`text-lg font-bold ${item.improvement.startsWith('-') && item.metric !== 'Facility Density' ? 'text-green-600 dark:text-neon-green' : item.improvement.startsWith('+') ? 'text-green-600 dark:text-neon-green' : 'text-red-600 dark:text-neon-pink'}`}>
                {item.improvement}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-gray-50 dark:bg-dark-bg-tertiary border border-gray-200 dark:border-gray-700 rounded p-3">
          <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
            <span className="font-semibold text-gray-900 dark:text-dark-text-primary">Hypothetical Scenario:</span> In this <strong>unvalidated estimate</strong>, implementation might reduce access desert population by <span className="font-semibold">~57%*</span>, decrease preventable ER visits by <span className="font-semibold">~50%*</span>, and improve facility density by <span className="font-semibold">~60%*</span> (<strong>±50% uncertainty</strong>).
          </p>
        </div>
      </div>
  )

  return (
    <AccessibleChartWrapper
      title="Hypothetical Impact Analysis (Unvalidated Estimates ±50%)"
      description="Comparison bar chart showing current state versus hypothetical post-implementation projections across 5 key healthcare metrics. WARNING: These are unvalidated estimates with ±50% uncertainty, not evidence-based predictions. Access desert population might decrease ~57%, preventable ER visits might drop ~50%, and facility density might increase ~60%."
      dataTable={dataTable}
      ariaLabel="Grouped bar chart comparing current healthcare metrics with hypothetical projected improvements. CAUTION: Unvalidated estimates. Five metrics shown: Access Desert Population (80,831 current to ~35,000 hypothetical, ~-57%), Average Distance to Facility (880m to ~450m, ~-49%), Facility Density (4.5 to ~7.2 per 10K, ~+60%), Preventable ER Visits (125,000 to ~62,500 annual, ~-50%), and Healthcare Cost Per Capita ($3,200 to ~$2,400 per year, ~-25%). All projections carry ±50% or greater uncertainty."
    >
      {chartContent}
    </AccessibleChartWrapper>
  )
}
