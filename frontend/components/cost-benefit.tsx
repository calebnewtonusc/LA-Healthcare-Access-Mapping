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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Cost-Benefit Analysis</h3>
        <p className="text-gray-500">Loading financial analysis...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Cost-Benefit Analysis</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600 font-medium mb-1">Total Investment</div>
          <div className="text-2xl font-bold text-blue-800">
            ${(data.total_investment / 1_000_000).toFixed(1)}M
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-600 font-medium mb-1">Total Savings</div>
          <div className="text-2xl font-bold text-green-800">
            ${(data.total_savings / 1_000_000_000).toFixed(2)}B
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-600 font-medium mb-1">Net Benefit</div>
          <div className="text-2xl font-bold text-purple-800">
            ${(data.net_benefit / 1_000_000_000).toFixed(2)}B
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-sm text-orange-600 font-medium mb-1">ROI</div>
          <div className="text-2xl font-bold text-orange-800">
            {data.roi_percentage.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Program Breakdown */}
      {data.programs && data.programs.length > 0 && (
        <div>
          <h4 className="font-bold text-lg text-gray-800 mb-3">Program Breakdown</h4>
          <div className="space-y-3">
            {data.programs.map((program, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-800">{program.name}</div>
                  <div className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    {program.benefit_cost_ratio.toFixed(2)}:1 ratio
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Investment:</span>
                    <span className="ml-2 font-medium text-gray-800">
                      ${(program.investment / 1_000_000).toFixed(1)}M
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Savings:</span>
                    <span className="ml-2 font-medium text-green-700">
                      ${(program.savings / 1_000_000_000).toFixed(2)}B
                    </span>
                  </div>
                </div>

                {/* Visual bar */}
                <div className="mt-3 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-full"
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
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-700 leading-relaxed">
          The comprehensive policy package demonstrates strong financial viability with a{' '}
          <strong>{data.roi_percentage.toFixed(1)}% return on investment</strong> over the analysis period.
          For every dollar invested, the community realizes{' '}
          <strong>${(data.total_savings / data.total_investment).toFixed(2)}</strong> in healthcare savings,
          improved health outcomes, and economic benefits.
        </p>
      </div>
    </div>
  )
}
