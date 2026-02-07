'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

const regionalData = [
  { region: 'Central LA', tracts: 412, accessDeserts: 18500, avgDistance: 1.2, facilityDensity: 6.2, score: 72 },
  { region: 'South LA', tracts: 385, accessDeserts: 28400, avgDistance: 2.1, facilityDensity: 3.1, score: 45 },
  { region: 'East LA', tracts: 324, accessDeserts: 15200, avgDistance: 1.5, facilityDensity: 4.8, score: 61 },
  { region: 'West LA', tracts: 298, accessDeserts: 3200, avgDistance: 0.7, facilityDensity: 8.5, score: 85 },
  { region: 'San Fernando Valley', tracts: 521, accessDeserts: 9800, avgDistance: 1.1, facilityDensity: 5.3, score: 68 },
  { region: 'San Gabriel Valley', tracts: 386, accessDeserts: 4100, avgDistance: 0.9, facilityDensity: 5.9, score: 74 },
  { region: 'South Bay', tracts: 172, accessDeserts: 1630, avgDistance: 0.8, facilityDensity: 6.7, score: 79 },
]

const getScoreColor = (score: number) => {
  if (score >= 75) return '#10b981' // green
  if (score >= 60) return '#3b82f6' // blue
  if (score >= 45) return '#f59e0b' // orange
  return '#ef4444' // red
}

export function RegionalBreakdown() {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

      <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Regional Access Breakdown</h3>
        <p className="text-sm text-slate-600 mb-6">Healthcare Access Scores by LA County Region</p>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={regionalData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="region"
              angle={-45}
              textAnchor="end"
              height={100}
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              label={{ value: 'Access Score (0-100)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontWeight: 600 } }}
              stroke="#64748b"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload[0]) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-4 shadow-lg min-w-[220px]">
                      <p className="font-bold text-slate-900 mb-2">{data.region}</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-slate-700">Access Score: <span className="font-semibold">{data.score}/100</span></p>
                        <p className="text-slate-700">Census Tracts: <span className="font-semibold">{data.tracts.toLocaleString()}</span></p>
                        <p className="text-slate-700">Access Deserts: <span className="font-semibold text-red-600">{data.accessDeserts.toLocaleString()}</span></p>
                        <p className="text-slate-700">Avg Distance: <span className="font-semibold">{data.avgDistance} km</span></p>
                        <p className="text-slate-700">Facility Density: <span className="font-semibold">{data.facilityDensity}/10K</span></p>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {regionalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div>
            <p className="font-semibold text-green-900">Excellent (75+)</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-1"></div>
            <p className="font-semibold text-blue-900">Good (60-74)</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 text-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1"></div>
            <p className="font-semibold text-orange-900">Fair (45-59)</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1"></div>
            <p className="font-semibold text-red-900">Poor (<45)</p>
          </div>
        </div>

        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-3">
          <p className="text-xs text-slate-700">
            <span className="font-semibold">South LA</span> shows the lowest access score (45) with 28,400 residents in access deserts, indicating urgent need for intervention.
          </p>
        </div>
      </div>
    </div>
  )
}
