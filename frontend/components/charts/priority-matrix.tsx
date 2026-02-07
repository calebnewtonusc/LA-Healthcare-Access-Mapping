'use client'

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'
import { AccessibleChartWrapper } from './accessible-chart-wrapper'

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

const PRIORITY_COLORS = {
  Critical: '#ef4444',
  High: '#f59e0b',
  Medium: '#3b82f6',
}

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

export function PriorityMatrix() {
  const chartContent = (
    <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">Recommendation Priority Matrix</h3>
        <p className="text-sm text-slate-600 dark:text-dark-text-secondary mb-6">Urgency vs. Impact Assessment</p>

        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
            <XAxis
              type="number"
              dataKey="urgency"
              name="Urgency"
              domain={[0, 100]}
              label={{ value: 'Urgency Score', position: 'insideBottom', offset: -10, style: { fill: '#64748b', fontWeight: 600 } }}
              stroke="#64748b"
              className="dark:stroke-slate-400"
            />
            <YAxis
              type="number"
              dataKey="impact"
              name="Impact"
              domain={[0, 100]}
              label={{ value: 'Impact Score', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontWeight: 600 } }}
              stroke="#64748b"
              className="dark:stroke-slate-400"
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload[0]) {
                  const data = payload[0].payload as Recommendation
                  return (
                    <div className="bg-white/95 dark:bg-dark-bg-secondary/95 backdrop-blur-sm border border-slate-200 dark:border-neon-cyan/30 rounded-lg p-3 shadow-lg">
                      <p className="font-bold text-slate-900 dark:text-dark-text-primary mb-1">{data.title}</p>
                      <p className="text-sm text-slate-600 dark:text-dark-text-secondary">Priority: <span className="font-semibold" style={{ color: PRIORITY_COLORS[data.priority as keyof typeof PRIORITY_COLORS] }}>{data.priority}</span></p>
                      <p className="text-sm text-slate-600 dark:text-dark-text-secondary">Urgency: <span className="font-semibold">{data.urgency}/100</span></p>
                      <p className="text-sm text-slate-600 dark:text-dark-text-secondary">Impact: <span className="font-semibold">{data.impact}/100</span></p>
                      <p className="text-sm text-slate-600 dark:text-dark-text-secondary">Cost: <span className="font-semibold">{data.cost}</span></p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              content={() => (
                <div className="flex justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PRIORITY_COLORS.Critical }}></div>
                    <span className="text-slate-700 dark:text-dark-text-secondary">Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PRIORITY_COLORS.High }}></div>
                    <span className="text-slate-700 dark:text-dark-text-secondary">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PRIORITY_COLORS.Medium }}></div>
                    <span className="text-slate-700 dark:text-dark-text-secondary">Medium</span>
                  </div>
                </div>
              )}
            />
            <Scatter name="Recommendations" data={recommendations}>
              {recommendations.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PRIORITY_COLORS[entry.priority as keyof typeof PRIORITY_COLORS]}
                  r={12}
                />
              ))}
            </Scatter>
            {/* Quadrant lines */}
            <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#cbd5e1" strokeWidth={1} strokeDasharray="5 5" />
            <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#cbd5e1" strokeWidth={1} strokeDasharray="5 5" />
          </ScatterChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 dark:bg-dark-bg-tertiary border border-gray-200 dark:border-gray-700 rounded p-2">
            <p className="font-semibold text-gray-900 dark:text-dark-text-primary">High Urgency + High Impact</p>
            <p className="text-gray-600 dark:text-dark-text-secondary">Immediate action required</p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg-tertiary border border-gray-200 dark:border-gray-700 rounded p-2">
            <p className="font-semibold text-gray-900 dark:text-dark-text-primary">High Urgency + Low Impact</p>
            <p className="text-gray-600 dark:text-dark-text-secondary">Quick wins, address soon</p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg-tertiary border border-gray-200 dark:border-gray-700 rounded p-2">
            <p className="font-semibold text-gray-900 dark:text-dark-text-primary">Low Urgency + High Impact</p>
            <p className="text-gray-600 dark:text-dark-text-secondary">Strategic planning needed</p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg-tertiary border border-gray-200 dark:border-gray-700 rounded p-2">
            <p className="font-semibold text-gray-900 dark:text-dark-text-primary">Low Urgency + Low Impact</p>
            <p className="text-gray-600 dark:text-dark-text-secondary">Monitor and review</p>
          </div>
        </div>
      </div>
  )

  return (
    <AccessibleChartWrapper
      title="Recommendation Priority Matrix"
      description="Scatter plot matrix showing 5 recommendations plotted by urgency (0-100) and impact (0-100). New Community Health Centers rated Critical priority at 95 urgency and 95 impact. Mobile Health Units and other initiatives shown at varying urgency/impact levels."
      dataTable={dataTable}
      ariaLabel="Priority matrix scatter chart with 5 recommendations. Critical priority (red): New Community Health Centers at 95% urgency, 95% impact, $400M cost. High priority (orange): Mobile Health Units (90% urgency, 75% impact, $50M), Public Transit Healthcare Routes (80% urgency, 70% impact, $120M), Telehealth Expansion (85% urgency, 65% impact, $45M). Medium priority (blue): Community Health Worker Program (60% urgency, 60% impact, $30M)."
    >
      {chartContent}
    </AccessibleChartWrapper>
  )
}
