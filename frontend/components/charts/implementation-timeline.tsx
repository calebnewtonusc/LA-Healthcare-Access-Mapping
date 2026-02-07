'use client'

import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

const phases = [
  {
    phase: 'Phase 1: Immediate Response',
    duration: '0-12 months',
    status: 'ready',
    items: [
      { name: 'Deploy 15 Mobile Health Units', cost: '$50M', impact: '75K residents' },
      { name: 'Launch Telehealth Platform', cost: '$25M', impact: '200K residents' },
      { name: 'Community Health Worker Training', cost: '$10M', impact: '50K residents' },
    ],
    totalCost: '$85M',
    totalImpact: '325K residents',
  },
  {
    phase: 'Phase 2: Infrastructure Development',
    duration: '12-36 months',
    status: 'planning',
    items: [
      { name: 'Build 6 Community Health Centers', cost: '$240M', impact: '500K residents' },
      { name: 'Establish Transit Healthcare Routes', cost: '$80M', impact: '300K residents' },
      { name: 'Expand Telehealth Services', cost: '$20M', impact: '400K residents' },
    ],
    totalCost: '$340M',
    totalImpact: '1.2M residents',
  },
  {
    phase: 'Phase 3: Long-term Expansion',
    duration: '36-60 months',
    status: 'future',
    items: [
      { name: 'Build 4 Additional Health Centers', cost: '$160M', impact: '400K residents' },
      { name: 'Complete Transit Network', cost: '$40M', impact: '200K residents' },
      { name: 'Community Health Worker Expansion', cost: '$20M', impact: '100K residents' },
    ],
    totalCost: '$220M',
    totalImpact: '700K residents',
  },
]

const statusConfig = {
  ready: { icon: CheckCircle, color: 'green', label: 'Ready to Start' },
  planning: { icon: Clock, color: 'blue', label: 'In Planning' },
  future: { icon: AlertCircle, color: 'slate', label: 'Future Phase' },
}

export function ImplementationTimeline() {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

      <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Implementation Timeline</h3>
        <p className="text-sm text-slate-600 mb-6">Phased 5-Year Deployment Strategy</p>

        <div className="space-y-6">
          {phases.map((phase, idx) => {
            const StatusIcon = statusConfig[phase.status as keyof typeof statusConfig].icon
            const statusColor = statusConfig[phase.status as keyof typeof statusConfig].color

            return (
              <div key={idx} className="relative">
                {/* Timeline connector */}
                {idx < phases.length - 1 && (
                  <div className="absolute left-5 top-14 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 to-transparent"></div>
                )}

                <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  {/* Phase Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`bg-${statusColor}-100 p-2 rounded-full shrink-0`}>
                      <StatusIcon className={`w-6 h-6 text-${statusColor}-600`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg">{phase.phase}</h4>
                      <p className="text-sm text-slate-600">{phase.duration}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 bg-${statusColor}-100 text-${statusColor}-700 text-xs font-semibold rounded`}>
                        {statusConfig[phase.status as keyof typeof statusConfig].label}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Total Cost</p>
                      <p className="text-xl font-bold text-slate-900">{phase.totalCost}</p>
                    </div>
                  </div>

                  {/* Phase Items */}
                  <div className="space-y-2 mb-4 ml-14">
                    {phase.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{item.name}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-blue-600 font-semibold">{item.cost}</span>
                          <span className="text-green-600 font-semibold">{item.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Phase Summary */}
                  <div className="ml-14 bg-gradient-to-r from-blue-50 to-green-50 border border-slate-200 rounded-lg p-3">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">Total Impact:</span> {phase.totalImpact} will benefit from Phase {idx + 1} interventions
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline Summary */}
        <div className="mt-6 grid grid-cols-3 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">$645M</p>
            <p className="text-xs text-slate-700 mt-1">Total Investment</p>
          </div>
          <div className="text-center border-l border-r border-slate-300">
            <p className="text-2xl font-bold text-green-600">2.2M+</p>
            <p className="text-xs text-slate-700 mt-1">Residents Impacted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">60 Months</p>
            <p className="text-xs text-slate-700 mt-1">Full Deployment</p>
          </div>
        </div>
      </div>
    </div>
  )
}
