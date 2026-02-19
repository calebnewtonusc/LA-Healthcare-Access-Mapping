'use client'

import { useReducer } from 'react'
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react'

export interface FilterState {
  search: string
  priority: string
  category: string
  sortBy: 'priority' | 'cost' | 'impact' | 'roi'
  sortDirection: 'asc' | 'desc'
  showFilters: boolean
}

type FilterAction =
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_PRIORITY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_SORT'; payload: { sortBy: FilterState['sortBy']; sortDirection: FilterState['sortDirection'] } }
  | { type: 'TOGGLE_FILTERS' }
  | { type: 'CLEAR_ALL' }

const initialState: FilterState = {
  search: '',
  priority: 'all',
  category: 'all',
  sortBy: 'priority',
  sortDirection: 'desc',
  showFilters: false,
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
    case 'SET_PRIORITY':
      return { ...state, priority: action.payload }
    case 'SET_CATEGORY':
      return { ...state, category: action.payload }
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortDirection: action.payload.sortDirection }
    case 'TOGGLE_FILTERS':
      return { ...state, showFilters: !state.showFilters }
    case 'CLEAR_ALL':
      return { ...initialState, showFilters: state.showFilters }
    default:
      return state
  }
}

// External FilterState excludes showFilters (internal UI state only)
export type ExternalFilterState = Omit<FilterState, 'showFilters'>

interface RecommendationFiltersProps {
  onFilterChange: (filters: ExternalFilterState) => void
  totalResults: number
  filteredResults: number
}

export function RecommendationFilters({
  onFilterChange,
  totalResults,
  filteredResults,
}: RecommendationFiltersProps) {
  const [state, dispatch] = useReducer(filterReducer, initialState)

  const { search, priority, category, sortBy, sortDirection, showFilters } = state

  const notify = (nextState: FilterState) => {
    const { showFilters: _, ...external } = nextState
    onFilterChange(external)
  }

  const handleSearchChange = (value: string) => {
    const next = filterReducer(state, { type: 'SET_SEARCH', payload: value })
    dispatch({ type: 'SET_SEARCH', payload: value })
    notify(next)
  }

  const handlePriorityChange = (value: string) => {
    const next = filterReducer(state, { type: 'SET_PRIORITY', payload: value })
    dispatch({ type: 'SET_PRIORITY', payload: value })
    notify(next)
  }

  const handleCategoryChange = (value: string) => {
    const next = filterReducer(state, { type: 'SET_CATEGORY', payload: value })
    dispatch({ type: 'SET_CATEGORY', payload: value })
    notify(next)
  }

  const handleSortChange = (newSortBy: FilterState['sortBy']) => {
    const newDirection: 'asc' | 'desc' = sortBy === newSortBy && sortDirection === 'desc' ? 'asc' : 'desc'
    const payload = { sortBy: newSortBy, sortDirection: newDirection }
    const next = filterReducer(state, { type: 'SET_SORT', payload })
    dispatch({ type: 'SET_SORT', payload })
    notify(next)
  }

  const handleReverseOrder = () => {
    const newDirection: 'asc' | 'desc' = sortDirection === 'desc' ? 'asc' : 'desc'
    const payload = { sortBy, sortDirection: newDirection }
    const next = filterReducer(state, { type: 'SET_SORT', payload })
    dispatch({ type: 'SET_SORT', payload })
    notify(next)
  }

  const clearAllFilters = () => {
    const next = filterReducer(state, { type: 'CLEAR_ALL' })
    dispatch({ type: 'CLEAR_ALL' })
    notify(next)
  }

  const hasActiveFilters = search !== '' || priority !== 'all' || category !== 'all'

  return (
    <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Search Bar - Always Visible */}
      <div className="p-4">
        <div className="relative">
          <label htmlFor="search-recommendations" className="sr-only">
            Search recommendations by title, description, or region
          </label>
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            aria-hidden="true"
          />
          <input
            id="search-recommendations"
            type="search"
            placeholder="Search recommendations by title, region, or keywords..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-dark-text-primary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-describedby="search-help"
          />
          {search && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
        <p id="search-help" className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Showing {filteredResults} of {totalResults} recommendations
        </p>
      </div>

      {/* Filter Toggle Button */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_FILTERS' })}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          aria-expanded={showFilters}
          aria-controls="filter-panel"
        >
          <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          {hasActiveFilters && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
              Active
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Collapsible Filter Panel */}
      {showFilters && (
        <div
          id="filter-panel"
          className="px-4 pb-4 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4"
          role="region"
          aria-label="Filter and sort options"
        >
          {/* Priority & Category Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Priority Filter */}
            <div>
              <label
                htmlFor="filter-priority"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Filter by Priority
              </label>
              <select
                id="filter-priority"
                value={priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label
                htmlFor="filter-category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Filter by Category
              </label>
              <select
                id="filter-category"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Transportation">Transportation</option>
                <option value="Service Expansion">Service Expansion</option>
                <option value="Equity">Equity & Access</option>
                <option value="Technology">Technology</option>
                <option value="Policy">Policy & Funding</option>
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </p>
            <div role="group" aria-label="Sort options" className="flex flex-wrap gap-2">
              {(['priority', 'cost', 'impact', 'roi'] as const).map((field) => (
                <button
                  key={field}
                  onClick={() => handleSortChange(field)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    sortBy === field
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  aria-pressed={sortBy === field}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortBy === field && (
                    <ArrowUpDown className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {sortDirection === 'desc' ? 'Highest to lowest' : 'Lowest to highest'}
              {' • '}
              <button
                onClick={handleReverseOrder}
                className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Reverse order
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
