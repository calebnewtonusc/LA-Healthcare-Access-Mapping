'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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

export function ImpactComparison() {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-orange-50 to-green-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

      <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Projected Impact Analysis</h3>
        <p className="text-sm text-slate-600 mb-6">Current State vs. Post-Implementation Projections</p>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={comparisonData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            layout="horizontal"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="metric"
              angle={-45}
              textAnchor="end"
              height={120}
              stroke="#64748b"
              style={{ fontSize: '11px' }}
            />
            <YAxis
              stroke="#64748b"
              label={{ value: 'Value (normalized)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontWeight: 600 } }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length >= 2) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-4 shadow-lg min-w-[240px]">
                      <p className="font-bold text-slate-900 mb-2">{data.metric}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-red-700">Current:</span>
                          <span className="font-semibold text-red-900">{data.current.toLocaleString()} {data.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">Projected:</span>
                          <span className="font-semibold text-green-900">{data.projected.toLocaleString()} {data.unit}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex justify-between">
                          <span className="text-slate-700">Change:</span>
                          <span className={`font-bold ${data.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
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
                    <span className="text-slate-700">Current State</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-500"></div>
                    <span className="text-slate-700">Projected (Post-Implementation)</span>
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
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <p className="text-xs text-slate-600 mb-1">{item.metric}</p>
              <p className={`text-lg font-bold ${item.improvement.startsWith('-') && item.metric !== 'Facility Density' ? 'text-green-600' : item.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {item.improvement}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            <span className="font-semibold text-green-900">Key Insight:</span> Implementation of all recommendations is projected to reduce the access desert population by <span className="font-bold text-green-700">57%</span>, decrease preventable ER visits by <span className="font-bold text-green-700">50%</span>, and improve facility density by <span className="font-bold text-green-700">60%</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
