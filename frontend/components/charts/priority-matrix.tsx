'use client'

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'

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

export function PriorityMatrix() {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

      <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Recommendation Priority Matrix</h3>
        <p className="text-sm text-slate-600 mb-6">Urgency vs. Impact Assessment</p>

        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              type="number"
              dataKey="urgency"
              name="Urgency"
              domain={[0, 100]}
              label={{ value: 'Urgency Score', position: 'insideBottom', offset: -10, style: { fill: '#64748b', fontWeight: 600 } }}
              stroke="#64748b"
            />
            <YAxis
              type="number"
              dataKey="impact"
              name="Impact"
              domain={[0, 100]}
              label={{ value: 'Impact Score', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontWeight: 600 } }}
              stroke="#64748b"
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload[0]) {
                  const data = payload[0].payload as Recommendation
                  return (
                    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-3 shadow-lg">
                      <p className="font-bold text-slate-900 mb-1">{data.title}</p>
                      <p className="text-sm text-slate-600">Priority: <span className="font-semibold" style={{ color: PRIORITY_COLORS[data.priority as keyof typeof PRIORITY_COLORS] }}>{data.priority}</span></p>
                      <p className="text-sm text-slate-600">Urgency: <span className="font-semibold">{data.urgency}/100</span></p>
                      <p className="text-sm text-slate-600">Impact: <span className="font-semibold">{data.impact}/100</span></p>
                      <p className="text-sm text-slate-600">Cost: <span className="font-semibold">{data.cost}</span></p>
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
                    <span className="text-slate-700">Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PRIORITY_COLORS.High }}></div>
                    <span className="text-slate-700">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PRIORITY_COLORS.Medium }}></div>
                    <span className="text-slate-700">Medium</span>
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

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="bg-red-50 border border-red-200 rounded-lg p-2">
            <p className="font-semibold text-red-900">High Urgency + High Impact</p>
            <p className="text-red-700">Immediate action required</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
            <p className="font-semibold text-orange-900">High Urgency + Low Impact</p>
            <p className="text-orange-700">Quick wins, address soon</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
            <p className="font-semibold text-blue-900">Low Urgency + High Impact</p>
            <p className="text-blue-700">Strategic planning needed</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2">
            <p className="font-semibold text-slate-900">Low Urgency + Low Impact</p>
            <p className="text-slate-700">Monitor and review</p>
          </div>
        </div>
      </div>
    </div>
  )
}
