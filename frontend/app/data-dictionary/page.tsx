import type { Metadata } from 'next'
import Link from 'next/link'
import { Database, AlertTriangle, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Data Dictionary | LA Healthcare Access Dashboard',
  description: 'Comprehensive documentation of all data fields, sources, ranges, and caveats used in the LA Healthcare Access analysis.',
  keywords: 'data dictionary, field definitions, data sources, census data, healthcare facilities data',
}

const FIELD_DEFINITIONS = [
  {
    name: "geoid",
    type: "String",
    description: "11-digit Census tract identifier (State + County + Tract code)",
    source: "U.S. Census Bureau",
    range: "06037100100 - 06037980231",
    caveat: null,
  },
  {
    name: "total_population",
    type: "Integer",
    description: "Total resident population in census tract",
    source: "2020 Decennial Census",
    range: "0 - 12,847",
    caveat: "Reflects 2020 population; may not represent current demographics",
  },
  {
    name: "distance_to_nearest_facility_km",
    type: "Float",
    description: "Straight-line distance to closest healthcare facility",
    source: "Calculated via Haversine formula",
    range: "0.02 - 14.8 km",
    caveat: "Does NOT account for roads, traffic, or actual travel time",
  },
  {
    name: "access_score",
    type: "Integer (0-100)",
    description: "Composite access score: distance (50%), facilities within 5km (30%), population density (20%)",
    source: "Calculated metric",
    range: "0 (worst) - 100 (best)",
    caveat: "Subjective weighting; alternative weights may yield different results",
  },
  {
    name: "median_income",
    type: "Currency",
    description: "Median household income in census tract",
    source: "ACS 5-Year Estimates (B19013_001E)",
    range: "$12,500 - $250,000+",
    caveat: "Top-coded at $250,000; actual values may be higher",
  },
  {
    name: "poverty_rate",
    type: "Percentage",
    description: "Percentage of population below poverty line",
    source: "ACS 5-Year Estimates",
    range: "0% - 65%",
    caveat: "Based on federal poverty thresholds; may not reflect local cost of living",
  },
  {
    name: "pct_no_vehicle",
    type: "Percentage",
    description: "Percentage of households without vehicle access",
    source: "ACS 5-Year Estimates (B08201)",
    range: "0% - 78%",
    caveat: "Does not account for shared vehicles or public transit access",
  },
  {
    name: "estimated_cost_per_facility",
    type: "Currency",
    description: "Estimated construction cost for new healthcare facility",
    source: "RSMeans Construction Data + Becker's Hospital Review",
    range: "$8.5M - $12.0M",
    caveat: "±30-50% uncertainty; actual costs vary by site, permits, land acquisition",
  },
  {
    name: "roi_10_year",
    type: "Percentage",
    description: "Projected 10-year return on investment",
    source: "Calculated based on prevented ER visits + improved health outcomes",
    range: "200% - 850%",
    caveat: "Highly uncertain; assumes constant preventable visit rate (250/year/facility)",
  },
  {
    name: "affected_population",
    type: "Integer",
    description: "Population impacted by each policy recommendation",
    source: "Sum of total_population from qualifying census tracts",
    range: "80,831 - 3,000,000+",
    caveat: "Overlapping populations may be counted in multiple recommendations",
  },
]

export default function DataDictionaryPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-dark-text-primary">
        Data Dictionary
      </h1>

      {/* Dataset Overview */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">Dataset Overview</h2>
        </div>
        <table className="w-full">
          <tbody className="text-sm">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-3 font-semibold text-gray-900 dark:text-dark-text-primary">Total Records</td>
              <td className="py-3 text-gray-700 dark:text-gray-300">2,498 census tracts</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-3 font-semibold text-gray-900 dark:text-dark-text-primary">Population Coverage</td>
              <td className="py-3 text-gray-700 dark:text-gray-300">9,889,056 residents (100% of LA County)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-3 font-semibold text-gray-900 dark:text-dark-text-primary">Facilities Analyzed</td>
              <td className="py-3 text-gray-700 dark:text-gray-300">4,512 licensed healthcare facilities</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-3 font-semibold text-gray-900 dark:text-dark-text-primary">Data Collection Date</td>
              <td className="py-3 text-gray-700 dark:text-gray-300">April 2020 (Census) + Oct 2024 (Facilities)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-3 font-semibold text-gray-900 dark:text-dark-text-primary">Last Updated</td>
              <td className="py-3 text-gray-700 dark:text-gray-300">{new Date().toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-gray-900 dark:text-dark-text-primary">Data Completeness</td>
              <td className="py-3 text-gray-700 dark:text-gray-300">100% (no missing census tracts)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Field Definitions */}
      <div className="space-y-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">Field Definitions</h2>

        {FIELD_DEFINITIONS.map(field => (
          <div key={field.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-white dark:bg-gray-800">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">{field.name}</h3>
              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full font-mono">
                {field.type}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {field.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded px-3 py-2">
                <span className="font-semibold text-gray-900 dark:text-dark-text-primary">Source:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">{field.source}</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded px-3 py-2">
                <span className="font-semibold text-gray-900 dark:text-dark-text-primary">Range:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">{field.range}</span>
              </div>
            </div>
            {field.caveat && (
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-sm">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-yellow-900 dark:text-yellow-200">Note:</strong>{' '}
                    <span className="text-yellow-800 dark:text-yellow-300">{field.caveat}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Data Sources Detail */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">Primary Data Sources</h2>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">
              U.S. Census Bureau
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              2020 Decennial Census provides total population counts. American Community Survey (ACS) 5-Year Estimates
              (2018-2022) provide socioeconomic indicators including income, poverty, and vehicle access.
            </p>
            <a
              href="https://www.census.gov/data.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
            >
              census.gov/data →
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">
              California DHHS Open Data Portal
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Licensed Healthcare Facility database includes all regulated medical facilities in California,
              updated regularly by the Department of Health and Human Services.
            </p>
            <a
              href="https://data.chhs.ca.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
            >
              data.chhs.ca.gov →
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">
              TIGER/Line Shapefiles
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Geographic boundary files from U.S. Census Bureau providing precise census tract boundaries and centroids
              for spatial analysis.
            </p>
            <a
              href="https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
            >
              census.gov/tiger-line →
            </a>
          </div>
        </div>
      </div>

      {/* Uncertainty & Limitations */}
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary">
            Understanding Uncertainty
          </h2>
        </div>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong className="text-gray-900 dark:text-dark-text-primary">±30-50% Cost Uncertainty:</strong> Construction
            costs, operational expenses, and ROI projections are approximations based on industry averages. Actual costs
            vary significantly by location, site conditions, permitting requirements, and market timing.
          </p>
          <p>
            <strong className="text-gray-900 dark:text-dark-text-primary">Distance Calculations:</strong> Haversine
            formula provides straight-line distances, not actual travel distance or time. Does not account for roads,
            traffic, public transit, or geographic barriers.
          </p>
          <p>
            <strong className="text-gray-900 dark:text-dark-text-primary">Population Estimates:</strong> Based on 2020
            Census data which may not reflect current demographics due to migration, new development, or other population
            changes since 2020.
          </p>
        </div>
      </div>

      {/* Back Links */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/methodology"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          ← View Methodology
        </Link>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
