'use client'

interface CostBenefitData {
  total_investment: number
  total_savings: number
  net_benefit: number
  roi_percentage: number
  programs: {
    name: string
    investment: number
    savings: number
    benefit_cost_ratio: number
  }[]
}

interface CostBenefitProps {
  data: CostBenefitData | null
}

export function CostBenefitSummary({ data }: CostBenefitProps) {
  if (!data) {
    return (
      <div className="bg-white dark:bg-dark-bg-secondary/70 backdrop-blur-md rounded-lg shadow-md dark:shadow-neon-cyan/10 border dark:border-neon-cyan/30 p-6 transition-colors duration-300">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-dark-text-primary mb-4">Cost-Benefit Analysis</h3>
        <p className="text-gray-500 dark:text-dark-text-muted">Loading financial analysis...</p>
      </div>
    )
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-neon-green/10 dark:via-neon-cyan/10 dark:to-neon-purple/10 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
      <div className="relative bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-cyan/30 rounded-2xl p-6 shadow-lg dark:shadow-neon-cyan/20 transition-colors duration-300">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-dark-text-primary mb-4">Cost-Benefit Analysis</h3>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-neon-cyan/10 p-4 rounded-lg border border-blue-200 dark:border-neon-cyan/30 transition-colors duration-300">
            <div className="text-sm text-blue-600 dark:text-neon-cyan font-medium mb-1">Total Investment</div>
            <div className="text-2xl font-bold text-blue-800 dark:text-neon-cyan">
              ${(data.total_investment / 1_000_000).toFixed(1)}M
            </div>
          </div>

          <div className="bg-green-50 dark:bg-neon-green/10 p-4 rounded-lg border border-green-200 dark:border-neon-green/30 transition-colors duration-300">
            <div className="text-sm text-green-600 dark:text-neon-green font-medium mb-1">Total Savings</div>
            <div className="text-2xl font-bold text-green-800 dark:text-neon-green">
              ${(data.total_savings / 1_000_000_000).toFixed(2)}B
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-neon-purple/10 p-4 rounded-lg border border-purple-200 dark:border-neon-purple/30 transition-colors duration-300">
            <div className="text-sm text-purple-600 dark:text-neon-purple font-medium mb-1">Net Benefit</div>
            <div className="text-2xl font-bold text-purple-800 dark:text-neon-purple">
              ${(data.net_benefit / 1_000_000_000).toFixed(2)}B
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-400/10 p-4 rounded-lg border border-orange-200 dark:border-orange-400/30 transition-colors duration-300">
            <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">ROI</div>
            <div className="text-2xl font-bold text-orange-800 dark:text-orange-400">
              {data.roi_percentage.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Program Breakdown */}
        {data.programs && data.programs.length > 0 && (
          <div>
            <h4 className="font-bold text-lg text-gray-800 dark:text-dark-text-primary mb-3">Program Breakdown</h4>
            <div className="space-y-3">
              {data.programs.map((program, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 bg-white/50 dark:bg-dark-bg-tertiary/50 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-800 dark:text-dark-text-primary">{program.name}</div>
                    <div className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 dark:bg-neon-cyan/20 text-blue-800 dark:text-neon-cyan border dark:border-neon-cyan/30">
                      {program.benefit_cost_ratio.toFixed(2)}:1 ratio
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-dark-text-secondary">Investment:</span>
                      <span className="ml-2 font-medium text-gray-800 dark:text-dark-text-primary">
                        ${(program.investment / 1_000_000).toFixed(1)}M
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-dark-text-secondary">Savings:</span>
                      <span className="ml-2 font-medium text-green-700 dark:text-neon-green">
                        ${(program.savings / 1_000_000_000).toFixed(2)}B
                      </span>
                    </div>
                  </div>

                  {/* Visual bar */}
                  <div className="mt-3 bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-green-500 dark:bg-neon-green h-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (program.benefit_cost_ratio / 20) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary Text */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <p className="text-sm text-gray-700 dark:text-dark-text-secondary leading-relaxed">
            The comprehensive policy package demonstrates strong financial viability with a{' '}
            <strong className="dark:text-neon-green">{data.roi_percentage.toFixed(1)}% return on investment</strong> over the analysis period.
            For every dollar invested, the community realizes{' '}
            <strong className="dark:text-neon-cyan">${(data.total_savings / data.total_investment).toFixed(2)}</strong> in healthcare savings,
            improved health outcomes, and economic benefits.
          </p>
        </div>
      </div>
    </div>
  )
}
