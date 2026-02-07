'use client'

import { useState } from 'react'
import { Download, Printer, FileText, Check, Link2 } from 'lucide-react'

interface ExportMenuProps {
  data: any[]
  title: string
  filename?: string
}

export function ExportMenu({ data, title, filename = 'export' }: ExportMenuProps) {
  const [copied, setCopied] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  // Convert data to CSV format
  const convertToCSV = (items: any[]): string => {
    if (items.length === 0) return ''

    // Get headers from first item
    const headers = Object.keys(items[0])
    const csvHeaders = headers.join(',')

    // Convert each item to CSV row
    const csvRows = items.map((item) => {
      return headers
        .map((header) => {
          const value = item[header]
          // Handle values with commas, quotes, or newlines
          if (
            typeof value === 'string' &&
            (value.includes(',') || value.includes('"') || value.includes('\n'))
          ) {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value ?? ''
        })
        .join(',')
    })

    return [csvHeaders, ...csvRows].join('\n')
  }

  // Export as CSV
  const exportCSV = () => {
    try {
      const csv = convertToCSV(data)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setShowMenu(false)
    } catch (error) {
      console.error('Failed to export CSV:', error)
      alert('Failed to export CSV. Please try again.')
    }
  }

  // Export as JSON
  const exportJSON = () => {
    try {
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setShowMenu(false)
    } catch (error) {
      console.error('Failed to export JSON:', error)
      alert('Failed to export JSON. Please try again.')
    }
  }

  // Print / Save as PDF
  const handlePrint = () => {
    // Add print date attribute to body for print stylesheet
    document.body.setAttribute('data-print-date', new Date().toLocaleString())
    window.print()
    setShowMenu(false)
  }

  // Copy link to clipboard
  const shareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setShowMenu(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
      // Fallback for older browsers
      const input = document.createElement('input')
      input.value = window.location.href
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setShowMenu(false)
      }, 2000)
    }
  }

  return (
    <div className="relative inline-block no-print">
      {/* Export Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors font-medium text-sm"
        aria-expanded={showMenu}
        aria-haspopup="true"
        aria-label="Export data menu"
      >
        <Download className="w-4 h-4" aria-hidden="true" />
        Export
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
            aria-hidden="true"
          />

          {/* Menu */}
          <div
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-2 space-y-1">
              {/* Export CSV */}
              <button
                onClick={exportCSV}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                role="menuitem"
              >
                <FileText className="w-4 h-4 text-green-600 dark:text-green-400" aria-hidden="true" />
                <div>
                  <div className="font-medium">Export as CSV</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Spreadsheet format
                  </div>
                </div>
              </button>

              {/* Export JSON */}
              <button
                onClick={exportJSON}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                role="menuitem"
              >
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <div className="font-medium">Export as JSON</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Structured data
                  </div>
                </div>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-1" role="separator" />

              {/* Print / PDF */}
              <button
                onClick={handlePrint}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                role="menuitem"
              >
                <Printer className="w-4 h-4 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                <div>
                  <div className="font-medium">Print / Save as PDF</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Use browser print dialog
                  </div>
                </div>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-1" role="separator" />

              {/* Share Link */}
              <button
                onClick={shareLink}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                role="menuitem"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" aria-hidden="true" />
                    <div>
                      <div className="font-medium text-green-600 dark:text-green-400">
                        Link Copied!
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Ready to share
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4 text-orange-600 dark:text-orange-400" aria-hidden="true" />
                    <div>
                      <div className="font-medium">Copy Link</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Share this page
                      </div>
                    </div>
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
              {data.length} {data.length === 1 ? 'item' : 'items'} • {title}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
