import { FileText, Database, AlertTriangle, BookOpen, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-slate-600 hover:text-slate-900 text-sm mb-4 inline-block transition-colors">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            About This Project
          </h1>
          <p className="text-slate-600 text-lg">
            Data sources, methodology, and limitations for the LA Healthcare Access Analysis
          </p>
        </div>

        {/* Academic Disclaimer - Glassmorphic */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-slate-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Academic Research Project</h2>
                <p className="text-slate-700 text-sm mb-2">
                  This dashboard is an educational data science project analyzing healthcare access gaps in Los Angeles County.
                  It is <strong>not official policy</strong> and does not represent recommendations from LA County Department of Public Health
                  or any government agency.
                </p>
                <p className="text-slate-700 text-sm">
                  The analysis uses publicly available datasets and statistical modeling. Results should be interpreted as
                  exploratory research, not authoritative policy guidance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources Section - Glassmorphic */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-slate-100 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-slate-600" />
              <h2 className="text-2xl font-bold text-slate-900">Data Sources</h2>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Population Data</h3>
                <p className="text-slate-600">
                  U.S. Census Bureau, 2020 Decennial Census and American Community Survey (ACS) 5-Year Estimates
                </p>
                <a
                  href="https://www.census.gov/data.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-600 hover:underline text-xs inline-flex items-center gap-1 transition-colors"
                >
                  census.gov/data <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">Healthcare Facility Locations</h3>
                <p className="text-slate-600">
                  California Health and Human Services Open Data Portal - Licensed Healthcare Facilities
                </p>
                <a
                  href="https://data.chhs.ca.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-600 hover:underline text-xs inline-flex items-center gap-1 transition-colors"
                >
                  data.chhs.ca.gov <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">Geographic Boundaries</h3>
                <p className="text-slate-600">
                  Census Tracts and LA County boundaries from TIGER/Line Shapefiles
                </p>
                <a
                  href="https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-600 hover:underline text-xs inline-flex items-center gap-1 transition-colors"
                >
                  census.gov/tiger-line <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">Socioeconomic Indicators</h3>
                <p className="text-slate-600">
                  Median income, poverty rates, and demographic data from ACS 5-Year Estimates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Methodology Section - Glassmorphic */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-blue-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-slate-600" />
              <h2 className="text-2xl font-bold text-slate-900">Methodology</h2>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Access Gap Calculation</h3>
                <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/50 rounded-lg p-3 mb-2">
                  <p className="text-slate-600 mb-2">
                    <strong className="text-slate-800">Distance Formula:</strong> Haversine formula calculates great-circle distance between census tract centroid and nearest facility
                  </p>
                  <code className="text-xs text-slate-700 font-mono block bg-slate-100/80 backdrop-blur-sm p-2 rounded border border-slate-200/50">
                    distance = 2 × R × arcsin(√(sin²((lat₂-lat₁)/2) + cos(lat₁)×cos(lat₂)×sin²((lon₂-lon₁)/2)))
                  </code>
                  <p className="text-xs text-slate-500 mt-2">where R = Earth's radius (6,371 km)</p>
                </div>
                <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                  <li><strong>Access Desert Definition:</strong> Census tracts with no facility within 5km radius (based on{' '}
                    <a href="https://www.ruralhealthinfo.org/topics/healthcare-access" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                      HRSA healthcare access standards <ExternalLink className="inline w-3 h-3" />
                    </a>)
                  </li>
                  <li><strong>Population Weighting:</strong> Severity score = distance_km × population, prioritizing high-density underserved areas</li>
                  <li><strong>Data Source:</strong> Census tract centroids from TIGER/Line Shapefiles, facility coordinates from CA DHHS</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">Facility Recommendations</h3>
                <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/50 rounded-lg p-3 mb-2">
                  <p className="text-slate-600 mb-2">
                    <strong className="text-slate-800">Composite Access Score (0-100):</strong>
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1 ml-4">
                    <li>• Distance component (50% weight): (1 - distance/max_distance) × 50</li>
                    <li>• Facilities within 5km (30% weight): (count/max_count) × 30</li>
                    <li>• Population density (20% weight): (density/max_density) × 20</li>
                  </ul>
                </div>
                <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                  <li><strong>Priority Ranking:</strong> Combines distance, population, median income, poverty rate, and vehicle access</li>
                  <li><strong>Top 10 Locations:</strong> Identified using multi-criteria optimization (maximize population served, minimize aggregate distance)</li>
                  <li><strong>Impact Calculation:</strong> Estimated people served = population_density × π × (5 km)² service radius</li>
                  <li><strong>Code Reference:</strong> <code className="text-slate-700 text-xs bg-slate-100/80 px-1 rounded">src/analysis/calculate_access_metrics.py:254-318</code></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">Cost-Benefit Analysis</h3>
                <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/50 rounded-lg p-3 mb-2">
                  <p className="text-slate-600 mb-2">
                    <strong className="text-slate-800">Facility Construction Costs (2026 estimates):</strong>
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1 ml-4">
                    <li>• Construction: $450/sq ft × 15,000 sq ft = <strong>$6.75M</strong></li>
                    <li>• Land acquisition (LA County avg): <strong>$2.0M</strong></li>
                    <li>• Medical equipment: <strong>$1.5M</strong></li>
                    <li>• <strong>Total per facility: $10.25M</strong></li>
                  </ul>
                  <p className="text-slate-600 mt-2 mb-2">
                    <strong className="text-slate-800">Annual Operating Costs:</strong>
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1 ml-4">
                    <li>• Staffing (doctors, nurses, admin): $2.0M/year</li>
                    <li>• Supplies and maintenance: $600K/year</li>
                    <li>• Utilities and overhead: $400K/year</li>
                    <li>• <strong>Total operating: $3.0M/year</strong></li>
                  </ul>
                  <p className="text-slate-600 mt-2 mb-2">
                    <strong className="text-slate-800">Estimated Savings:</strong>
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1 ml-4">
                    <li>• ER diversion: (population/1000) × 250 preventable visits/year × ($2000 - $150) per visit</li>
                    <li>• Chronic disease management: population × 40% with chronic conditions × 20% improvement rate × $1500 savings/year</li>
                  </ul>
                </div>
                <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                  <li><strong>Industry Sources:</strong> Healthcare facility costs based on{' '}
                    <a href="https://www.beckershospitalreview.com/finance/hospital-construction-costs.html" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                      Becker's Hospital Review <ExternalLink className="inline w-3 h-3" />
                    </a>{' '}
                    and RSMeans construction data
                  </li>
                  <li><strong>Benefit Calculations:</strong> Based on{' '}
                    <a href="https://www.ahrq.gov/research/findings/nhqrdr/index.html" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                      AHRQ quality reports <ExternalLink className="inline w-3 h-3" />
                    </a>{' '}
                    and CMS reimbursement data
                  </li>
                  <li><strong>10-year ROI:</strong> (10-year savings - 10-year costs) / 10-year costs × 100%</li>
                  <li><strong>Note:</strong> These are approximations for educational purposes, not detailed financial projections</li>
                  <li><strong>Code Reference:</strong> <code className="text-slate-700 text-xs bg-slate-100/80 px-1 rounded">src/impact/cost_benefit_analysis.py:68-117</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Limitations Section - Glassmorphic */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-slate-600" />
              <h2 className="text-2xl font-bold text-slate-900">Limitations & Caveats</h2>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <strong className="text-slate-900">Data Currency:</strong> Analysis uses 2020 Census data and facility data current as of data collection date.
                Population and facility landscapes may have changed since then.
              </p>
              <p>
                <strong className="text-slate-900">Distance Metrics:</strong> Straight-line distances do not account for actual travel routes, traffic,
                public transportation access, or topographic barriers.
              </p>
              <p>
                <strong className="text-slate-900">Facility Types:</strong> Analysis may not distinguish between different types of healthcare facilities
                (urgent care vs. emergency rooms vs. clinics), which serve different needs.
              </p>
              <p>
                <strong className="text-slate-900">Financial Estimates:</strong> Cost-benefit calculations are approximations based on published averages.
                Actual costs would require detailed site analysis, permits, land acquisition, and operational planning.
              </p>
              <p>
                <strong className="text-slate-900">Policy Recommendations:</strong> Suggestions are exploratory and would require validation by public health
                experts, community input, and regulatory review before implementation.
              </p>
              <p>
                <strong className="text-slate-900">Data Quality:</strong> Relies on accuracy and completeness of source datasets. Errors in geocoding,
                reporting, or data collection may affect results.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Recommendation Calculations - Glassmorphic */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-slate-100 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-slate-600" />
              <h2 className="text-2xl font-bold text-slate-900">Policy Recommendation Calculations</h2>
            </div>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">1. Infrastructure: New Healthcare Facilities</h3>
                <div className="bg-slate-50/80 backdrop-blur-sm rounded-lg p-3 space-y-2 border border-slate-200/50">
                  <p><strong className="text-slate-800">Affected Population:</strong> Sum of total_population from census tracts where nearest_facility_km &gt; 10</p>
                  <code className="text-xs text-slate-700 block bg-slate-100/80 backdrop-blur-sm p-2 rounded border border-slate-200/50 font-mono">SELECT SUM(total_population) FROM tracts WHERE nearest_facility_km &gt; 10</code>

                  <p className="mt-2"><strong className="text-slate-800">Estimated Cost:</strong></p>
                  <ul className="list-disc ml-6 text-xs">
                    <li>Construction: $450/sq ft × 15,000 sq ft = $6.75M (source:{' '}
                      <a href="https://www.beckershospitalreview.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                        Becker's Hospital Review
                      </a>)
                    </li>
                    <li>Land: $2.0M (LA County average commercial medical land)</li>
                    <li>Equipment: $1.5M (medical equipment suppliers average)</li>
                    <li>Total: $10.25M per facility</li>
                  </ul>

                  <p className="mt-2"><strong className="text-slate-800">Expected Impact:</strong></p>
                  <p className="text-xs">40-60% reduction in travel distance for affected populations based on spatial analysis of 5km service radius coverage</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">2. Service Expansion: Mobile Clinics</h3>
                <div className="bg-slate-50/80 backdrop-blur-sm rounded-lg p-3 space-y-2 border border-slate-200/50">
                  <p><strong className="text-slate-800">Affected Population:</strong> Census tracts with (median_income &lt; median) OR (poverty_rate &gt; 15%) OR (pct_no_vehicle &gt; 10%) AND access_score &lt; 50</p>

                  <p className="mt-2"><strong className="text-slate-800">Estimated Cost:</strong></p>
                  <ul className="list-disc ml-6 text-xs">
                    <li>5 equipped medical vans @ $250K each = $1.25M one-time</li>
                    <li>Annual operating: $400K per clinic × 5 = $2.0M/year (staffing, fuel, supplies)</li>
                  </ul>

                  <p className="mt-2"><strong className="text-slate-800">Expected Impact:</strong></p>
                  <p className="text-xs">Immediate access for vulnerable populations without infrastructure. Estimated ER diversion: (population/1000) × 150 preventable visits × ($2000 - $150)</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">3. Transportation: Healthcare Transportation Services</h3>
                <div className="bg-slate-50/80 backdrop-blur-sm rounded-lg p-3 space-y-2 border border-slate-200/50">
                  <p><strong className="text-slate-800">Affected Population:</strong> Census tracts where B08201_002E (households with no vehicle) &gt; 10% of B08201_001E (total households)</p>
                  <code className="text-xs text-slate-700 block bg-slate-100/80 backdrop-blur-sm p-2 rounded border border-slate-200/50 font-mono">WHERE (no_vehicle_households / total_households) &gt; 0.10</code>

                  <p className="mt-2"><strong className="text-slate-800">Estimated Cost:</strong></p>
                  <ul className="list-disc ml-6 text-xs">
                    <li>Setup: $50K (program administration)</li>
                    <li>Annual: eligible_population × 10% usage × 4 trips/year × $25/trip × 75% subsidy</li>
                    <li>Example: 100,000 eligible → 10,000 users × 4 trips × $18.75 = $750K/year</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">4. Service Expansion: Telehealth</h3>
                <div className="bg-slate-50/80 backdrop-blur-sm rounded-lg p-3 space-y-2 border border-slate-200/50">
                  <p><strong className="text-slate-800">Affected Population:</strong> Census tracts where access_score &lt; 40 (composite score from distance, facility density, population)</p>

                  <p className="mt-2"><strong className="text-slate-800">Estimated Cost:</strong></p>
                  <ul className="list-disc ml-6 text-xs">
                    <li>20 telehealth kiosks @ $15K = $300K (equipment, software)</li>
                    <li>Annual platform licensing: $250K/year</li>
                  </ul>

                  <p className="mt-2"><strong className="text-slate-800">Savings Calculation:</strong></p>
                  <p className="text-xs">20% of population uses telehealth × 2 visits/year × $75 patient savings (time, travel) + $25 provider efficiency = annual value</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">5. Equity: Low-Income Area Investment</h3>
                <div className="bg-slate-50/80 backdrop-blur-sm rounded-lg p-3 space-y-2 border border-slate-200/50">
                  <p><strong className="text-slate-800">Affected Population:</strong> Census tracts in bottom 25% of median_income (B19013_001E) AND access_score &lt; 50</p>
                  <code className="text-xs text-slate-700 block bg-slate-100/80 backdrop-blur-sm p-2 rounded border border-slate-200/50 font-mono">WHERE median_income &lt; PERCENTILE(median_income, 0.25) AND access_score &lt; 50</code>

                  <p className="mt-2"><strong className="text-slate-800">Priority Rationale:</strong></p>
                  <p className="text-xs">Health equity focus: populations with both economic disadvantage and poor healthcare access face compounding health disparities (source:{' '}
                    <a href="https://www.cdc.gov/healthequity" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                      CDC Health Equity
                    </a>)
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-4 p-3 bg-slate-50/80 backdrop-blur-sm border border-slate-200/50 rounded">
                <strong className="text-slate-700">Note:</strong> All calculations use real Census API data (2022 ACS 5-Year Estimates) and CA DHHS facility data.
                Python code performing these calculations: <code className="text-slate-700 bg-slate-100/80 px-1 rounded">src/impact/policy_recommendations.py:183-422</code>
              </p>
            </div>
          </div>
        </div>

        {/* Data Freshness - Glassmorphic */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-blue-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-slate-600" />
              <h2 className="text-2xl font-bold text-slate-900">Data Freshness</h2>
            </div>
            <div className="text-sm text-slate-600 space-y-2">
              <p>
                <strong className="text-slate-900">Census Data:</strong> 2020 Decennial Census (April 2020)
              </p>
              <p>
                <strong className="text-slate-900">Facility Data:</strong> Most recent available from CHHS Open Data Portal (date varies by facility)
              </p>
              <p>
                <strong className="text-slate-900">Analysis Date:</strong> Study conducted in 2024-2025 academic year
              </p>
              <p className="text-xs text-slate-500 pt-2">
                Dashboard updates hourly from cached API responses. Data pipeline does not refresh automatically from source datasets.
              </p>
            </div>
          </div>
        </div>

        {/* Contact/Attribution - Glassmorphic */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-slate-900 mb-3">About the Analysis</h2>
            <p className="text-sm text-slate-600 mb-3">
              This project was created as an educational exercise in public health data analysis, geographic information systems (GIS),
              and data visualization. It demonstrates the application of data science techniques to real-world public health questions.
            </p>
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">Technologies used:</strong> Python (Pandas, GeoPandas, Folium), FastAPI, Next.js, TypeScript, Tailwind CSS
            </p>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-8 py-3 rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all font-semibold shadow-lg hover:shadow-xl"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
