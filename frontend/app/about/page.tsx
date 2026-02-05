import { FileText, Database, AlertTriangle, BookOpen, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="text-neon-cyan hover:text-neon-purple text-sm mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent mb-4">
          About This Project
        </h1>
        <p className="text-text-secondary text-lg">
          Data sources, methodology, and limitations for the LA Healthcare Access Analysis
        </p>
      </div>

      {/* Academic Disclaimer */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8 backdrop-blur">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-yellow-200 mb-2">Academic Research Project</h2>
            <p className="text-yellow-100 text-sm mb-2">
              This dashboard is an educational data science project analyzing healthcare access gaps in Los Angeles County.
              It is <strong>not official policy</strong> and does not represent recommendations from LA County Department of Public Health
              or any government agency.
            </p>
            <p className="text-yellow-100 text-sm">
              The analysis uses publicly available datasets and statistical modeling. Results should be interpreted as
              exploratory research, not authoritative policy guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Data Sources Section */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-6 h-6 text-neon-cyan" />
          <h2 className="text-2xl font-bold text-white">Data Sources</h2>
        </div>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-white mb-1">Population Data</h3>
            <p className="text-text-secondary">
              U.S. Census Bureau, 2020 Decennial Census and American Community Survey (ACS) 5-Year Estimates
            </p>
            <a
              href="https://www.census.gov/data.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan hover:underline text-xs inline-flex items-center gap-1"
            >
              census.gov/data <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <h3 className="font-bold text-white mb-1">Healthcare Facility Locations</h3>
            <p className="text-text-secondary">
              California Health and Human Services Open Data Portal - Licensed Healthcare Facilities
            </p>
            <a
              href="https://data.chhs.ca.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan hover:underline text-xs inline-flex items-center gap-1"
            >
              data.chhs.ca.gov <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <h3 className="font-bold text-white mb-1">Geographic Boundaries</h3>
            <p className="text-text-secondary">
              Census Tracts and LA County boundaries from TIGER/Line Shapefiles
            </p>
            <a
              href="https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan hover:underline text-xs inline-flex items-center gap-1"
            >
              census.gov/tiger-line <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <h3 className="font-bold text-white mb-1">Socioeconomic Indicators</h3>
            <p className="text-text-secondary">
              Median income, poverty rates, and demographic data from ACS 5-Year Estimates
            </p>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-neon-purple" />
          <h2 className="text-2xl font-bold text-white">Methodology</h2>
        </div>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-white mb-2">Access Gap Calculation</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-1 ml-2">
              <li>Distance to nearest facility calculated using Haversine formula (great-circle distance)</li>
              <li>Census tracts with no facility within 5km radius classified as "access deserts"</li>
              <li>Population-weighted analysis prioritizes high-density underserved areas</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">Facility Recommendations</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-1 ml-2">
              <li>Priority ranking based on: distance to care, population density, and socioeconomic factors</li>
              <li>Top 10 locations identified using multi-criteria scoring algorithm</li>
              <li>Locations selected to maximize population impact and reduce average travel distance</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">Cost-Benefit Analysis</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-1 ml-2">
              <li>Construction and operating costs estimated from industry averages and published healthcare facility cost studies</li>
              <li>Benefits calculated from reduced emergency room utilization, improved health outcomes, and economic productivity gains</li>
              <li>10-year time horizon with standard discount rate applied</li>
              <li><strong>Note:</strong> These are rough estimates for illustrative purposes, not detailed financial projections</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Limitations Section */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-neon-pink" />
          <h2 className="text-2xl font-bold text-white">Limitations & Caveats</h2>
        </div>
        <div className="space-y-3 text-sm text-text-secondary">
          <p>
            <strong className="text-white">Data Currency:</strong> Analysis uses 2020 Census data and facility data current as of data collection date.
            Population and facility landscapes may have changed since then.
          </p>
          <p>
            <strong className="text-white">Distance Metrics:</strong> Straight-line distances do not account for actual travel routes, traffic,
            public transportation access, or topographic barriers.
          </p>
          <p>
            <strong className="text-white">Facility Types:</strong> Analysis may not distinguish between different types of healthcare facilities
            (urgent care vs. emergency rooms vs. clinics), which serve different needs.
          </p>
          <p>
            <strong className="text-white">Financial Estimates:</strong> Cost-benefit calculations are approximations based on published averages.
            Actual costs would require detailed site analysis, permits, land acquisition, and operational planning.
          </p>
          <p>
            <strong className="text-white">Policy Recommendations:</strong> Suggestions are exploratory and would require validation by public health
            experts, community input, and regulatory review before implementation.
          </p>
          <p>
            <strong className="text-white">Data Quality:</strong> Relies on accuracy and completeness of source datasets. Errors in geocoding,
            reporting, or data collection may affect results.
          </p>
        </div>
      </div>

      {/* Data Freshness */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-neon-green" />
          <h2 className="text-2xl font-bold text-white">Data Freshness</h2>
        </div>
        <div className="text-sm text-text-secondary space-y-2">
          <p>
            <strong className="text-white">Census Data:</strong> 2020 Decennial Census (April 2020)
          </p>
          <p>
            <strong className="text-white">Facility Data:</strong> Most recent available from CHHS Open Data Portal (date varies by facility)
          </p>
          <p>
            <strong className="text-white">Analysis Date:</strong> Study conducted in 2024-2025 academic year
          </p>
          <p className="text-xs text-text-muted pt-2">
            Dashboard updates hourly from cached API responses. Data pipeline does not refresh automatically from source datasets.
          </p>
        </div>
      </div>

      {/* Contact/Attribution */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-3">About the Analysis</h2>
        <p className="text-sm text-text-secondary mb-3">
          This project was created as an educational exercise in public health data analysis, geographic information systems (GIS),
          and data visualization. It demonstrates the application of data science techniques to real-world public health questions.
        </p>
        <p className="text-sm text-text-secondary">
          <strong className="text-white">Technologies used:</strong> Python (Pandas, GeoPandas, Folium), FastAPI, Next.js, TypeScript, Tailwind CSS
        </p>
      </div>

      {/* Back to Dashboard */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-cyan to-neon-purple text-white px-8 py-3 rounded-xl hover:shadow-neon-cyan transition-all font-semibold"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
