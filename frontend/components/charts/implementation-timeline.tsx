'use client'

import { CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { AccessibleChartWrapper } from './accessible-chart-wrapper'

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

const dataTable = {
  headers: ['Phase', 'Duration', 'Status', 'Total Cost', 'Total Impact', 'Key Initiatives'],
  rows: phases.map(p => [
    p.phase,
    p.duration,
    statusConfig[p.status as keyof typeof statusConfig].label,
    p.totalCost,
    p.totalImpact,
    p.items.map(i => i.name).join('; ')
  ])
}

export function ImplementationTimeline() {
  const chartContent = (
    <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">Implementation Timeline</h3>
        <p className="text-sm text-slate-600 dark:text-dark-text-secondary mb-6">Phased 5-Year Deployment Strategy</p>

        <div className="space-y-6">
          {phases.map((phase, idx) => {
            const StatusIcon = statusConfig[phase.status as keyof typeof statusConfig].icon
            const statusColor = statusConfig[phase.status as keyof typeof statusConfig].color

            return (
              <div key={idx} className="relative">
                {/* Timeline connector */}
                {idx < phases.length - 1 && (
                  <div className="absolute left-5 top-14 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 dark:from-slate-600 to-transparent"></div>
                )}

                <div className="bg-white dark:bg-dark-bg-tertiary border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  {/* Phase Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`bg-${statusColor}-100 p-2 rounded-full shrink-0`}>
                      <StatusIcon className={`w-6 h-6 text-${statusColor}-600`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-dark-text-primary text-lg">{phase.phase}</h4>
                      <p className="text-sm text-slate-600 dark:text-dark-text-secondary">{phase.duration}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 bg-${statusColor}-100 text-${statusColor}-700 text-xs font-semibold rounded`}>
                        {statusConfig[phase.status as keyof typeof statusConfig].label}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600 dark:text-dark-text-secondary">Total Cost</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-dark-text-primary">{phase.totalCost}</p>
                    </div>
                  </div>

                  {/* Phase Items */}
                  <div className="space-y-2 mb-3 ml-14">
                    {phase.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-dark-bg-secondary rounded">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-dark-text-primary">{item.name}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-dark-text-secondary">
                          <span>{item.cost}</span>
                          <span>{item.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Phase Summary */}
                  <div className="ml-14 bg-gray-50 dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded p-2">
                    <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                      <span className="font-semibold text-gray-900 dark:text-dark-text-primary">Total Impact:</span> {phase.totalImpact} will benefit from Phase {idx + 1} interventions
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline Summary */}
        <div className="mt-4 grid grid-cols-3 gap-3 bg-gray-50 dark:bg-dark-bg-tertiary border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-dark-text-primary">$645M</p>
            <p className="text-xs text-gray-600 dark:text-dark-text-muted mt-1">Total Investment</p>
          </div>
          <div className="text-center border-l border-r border-gray-300 dark:border-gray-600">
            <p className="text-xl font-bold text-gray-900 dark:text-dark-text-primary">2.2M+</p>
            <p className="text-xs text-gray-600 dark:text-dark-text-muted mt-1">Residents Impacted</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-dark-text-primary">60 Months</p>
            <p className="text-xs text-gray-600 dark:text-dark-text-muted mt-1">Full Deployment</p>
          </div>
        </div>
      </div>
  )

  return (
    <AccessibleChartWrapper
      title="Implementation Timeline"
      description="Three-phase deployment strategy over 60 months with $645M total investment impacting 2.2M+ residents. Phase 1 (0-12 months): $85M for mobile units and telehealth. Phase 2 (12-36 months): $340M for community health centers. Phase 3 (36-60 months): $220M for expansion."
      dataTable={dataTable}
      ariaLabel="Implementation timeline showing phased rollout. Phase 1 (0-12 months, Ready to Start): Deploy 15 Mobile Health Units ($50M), Launch Telehealth Platform ($25M), Community Health Worker Training ($10M), totaling $85M to impact 325K residents. Phase 2 (12-36 months, In Planning): Build 6 Community Health Centers ($240M), Establish Transit Healthcare Routes ($80M), Expand Telehealth Services ($20M), totaling $340M to impact 1.2M residents. Phase 3 (36-60 months, Future Phase): Build 4 Additional Health Centers ($160M), Complete Transit Network ($40M), Community Health Worker Expansion ($20M), totaling $220M to impact 700K residents. Overall: $645M investment over 60 months impacting 2.2M+ residents."
    >
      {chartContent}
    </AccessibleChartWrapper>
  )
}
