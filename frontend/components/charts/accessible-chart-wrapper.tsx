'use client'

import { useState } from 'react'
import { Table } from 'lucide-react'

interface AccessibleChartWrapperProps {
  title: string
  description: string
  children: React.ReactNode
  dataTable: {
    headers: string[]
    rows: (string | number)[][]
  }
  ariaLabel: string
}

export function AccessibleChartWrapper({
  title,
  description,
  children,
  dataTable,
  ariaLabel,
}: AccessibleChartWrapperProps) {
  const [showTable, setShowTable] = useState(false)

  return (
    <div className="space-y-4">
      {/* Chart Container */}
      <div
        role="img"
        aria-label={ariaLabel}
        className="relative"
      >
        {children}

        {/* Screen reader only description */}
        <div className="sr-only">
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Data presented in tabular format below for screen reader users.</p>
        </div>
      </div>

      {/* View as Table Toggle */}
      <button
        onClick={() => setShowTable(!showTable)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
        aria-expanded={showTable}
        aria-controls="chart-data-table"
      >
        <Table className="w-4 h-4" aria-hidden="true" />
        {showTable ? 'Hide Data Table' : 'View as Data Table'}
      </button>

      {/* Accessible Data Table */}
      {showTable && (
        <div
          id="chart-data-table"
          className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <caption className="sr-only">{title} - Data Table</caption>
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {dataTable.headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {dataTable.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
