'use client'

import { useState, useMemo } from 'react'
import { RecommendationFilters, type FilterState } from './ui/recommendation-filters'
import { ExportMenu } from './ui/export-menu'
import { RecommendationsList } from './recommendations-list'
import { EmptyState } from './ui/error-state'
import { FileQuestion } from 'lucide-react'

interface Recommendation {
  Priority: string
  Title: string
  Region?: string
  Description?: string
  [key: string]: any
}

interface RecommendationsPageContentProps {
  recommendations: Recommendation[] | null
}

export function RecommendationsPageContent({ recommendations }: RecommendationsPageContentProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priority: 'all',
    category: 'all',
    sortBy: 'priority',
    sortDirection: 'desc',
  })

  // Filter and sort recommendations
  const filteredRecommendations = useMemo(() => {
    if (!recommendations || recommendations.length === 0) return []

    let filtered = [...recommendations]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter((rec) => {
        const title = rec.Title?.toLowerCase() || ''
        const description = rec.Description?.toLowerCase() || ''
        const region = rec.Region?.toLowerCase() || ''
        return (
          title.includes(searchLower) ||
          description.includes(searchLower) ||
          region.includes(searchLower)
        )
      })
    }

    // Apply priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter((rec) => rec.Priority === filters.priority)
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter((rec) => {
        const category = rec.Category || rec.Type || ''
        return category.includes(filters.category)
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0

      switch (filters.sortBy) {
        case 'priority': {
          const priorityOrder: { [key: string]: number } = {
            Critical: 4,
            High: 3,
            Medium: 2,
            Low: 1,
          }
          comparison =
            (priorityOrder[a.Priority] || 0) - (priorityOrder[b.Priority] || 0)
          break
        }

        case 'cost': {
          const aCost = parseFloat(
            String(a['Investment Required'] || a.Cost || '0').replace(/[^0-9.-]/g, '')
          )
          const bCost = parseFloat(
            String(b['Investment Required'] || b.Cost || '0').replace(/[^0-9.-]/g, '')
          )
          comparison = aCost - bCost
          break
        }

        case 'impact': {
          const aImpact = parseInt(
            String(a['Affected Population'] || a.Impact || '0').replace(/[^0-9]/g, '')
          )
          const bImpact = parseInt(
            String(b['Affected Population'] || b.Impact || '0').replace(/[^0-9]/g, '')
          )
          comparison = aImpact - bImpact
          break
        }

        case 'roi': {
          const aROI = parseFloat(
            String(a['10-Year ROI'] || a.ROI || '0').replace(/[^0-9.-]/g, '')
          )
          const bROI = parseFloat(
            String(b['10-Year ROI'] || b.ROI || '0').replace(/[^0-9.-]/g, '')
          )
          comparison = aROI - bROI
          break
        }

        default:
          comparison = 0
      }

      // Apply sort direction
      return filters.sortDirection === 'desc' ? -comparison : comparison
    })

    return filtered
  }, [recommendations, filters])

  // Prepare export data
  const exportData = useMemo(() => {
    return filteredRecommendations.map((rec) => ({
      Priority: rec.Priority,
      Title: rec.Title,
      Region: rec.Region || 'N/A',
      'Affected Population': rec['Affected Population'] || 'N/A',
      'Investment Required': rec['Investment Required'] || 'N/A',
      '10-Year ROI': rec['10-Year ROI'] || 'N/A',
      'Implementation Timeframe': rec['Implementation Timeframe'] || 'N/A',
      Description: rec.Description || '',
    }))
  }, [filteredRecommendations])

  if (!recommendations) {
    return (
      <EmptyState
        title="Unable to load recommendations"
        message="There was an error loading the policy recommendations. Please try again later."
        icon={<FileQuestion className="w-16 h-16 text-red-400 mb-4" />}
      />
    )
  }

  return (
    <div>
      {/* Filters and Export */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex-1 w-full">
          <RecommendationFilters
            onFilterChange={setFilters}
            totalResults={recommendations.length}
            filteredResults={filteredRecommendations.length}
          />
        </div>
        <div className="md:ml-4">
          <ExportMenu
            data={exportData}
            title="Policy Recommendations"
            filename="la-healthcare-recommendations"
          />
        </div>
      </div>

      {/* Results */}
      {filteredRecommendations.length > 0 ? (
        <RecommendationsList recommendations={filteredRecommendations} />
      ) : (
        <EmptyState
          title="No recommendations match your filters"
          message="Try adjusting your search terms or filters to see more results."
          icon={<FileQuestion className="w-16 h-16 text-gray-400 mb-4" />}
        />
      )}
    </div>
  )
}
