import { FileText, Database, AlertTriangle, BookOpen, Calendar, ExternalLink, ArrowDown, ArrowRight, Zap, TrendingUp, DollarSign, Users, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-8">
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

            {/* Data Sources Key Metrics */}
            <div className="mt-6 pt-6 border-t border-slate-300">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Data Coverage Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-slate-200 text-center">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-slate-900">9.9M</div>
                  <div className="text-xs text-slate-600">Total Population</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-slate-200 text-center">
                  <MapPin className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-slate-900">4,512</div>
                  <div className="text-xs text-slate-600">Healthcare Facilities</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-slate-200 text-center">
                  <Database className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-slate-900">2,498</div>
                  <div className="text-xs text-slate-600">Census Tracts</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-slate-200 text-center">
                  <Zap className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-600">Data Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Pipeline Visualization */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-slate-600" />
              Data Pipeline Flow
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-slate-900 text-sm">Data Collection</h4>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• Census API</li>
                    <li>• CA DHHS Portal</li>
                    <li>• TIGER/Line Shapefiles</li>
                  </ul>
                  <div className="mt-3 text-xs font-semibold text-blue-700">
                    4,512 facilities<br/>
                    2,498 tracts
                  </div>
                </div>
                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-slate-900 text-sm">Processing</h4>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• Geocoding</li>
                    <li>• CRS projection</li>
                    <li>• Data validation</li>
                  </ul>
                  <div className="mt-3 text-xs font-semibold text-purple-700">
                    100% coverage<br/>
                    0 CRS warnings
                  </div>
                </div>
                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-slate-900 text-sm">Analysis</h4>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• KD-tree search</li>
                    <li>• Access scoring</li>
                    <li>• Gap identification</li>
                  </ul>
                  <div className="mt-3 text-xs font-semibold text-green-700">
                    80K in deserts<br/>
                    0.88 km avg dist
                  </div>
                </div>
                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              {/* Step 4 */}
              <div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                    <h4 className="font-bold text-slate-900 text-sm">Insights</h4>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• Policy recs</li>
                    <li>• Cost-benefit</li>
                    <li>• Visualizations</li>
                  </ul>
                  <div className="mt-3 text-xs font-semibold text-amber-700">
                    5 recommendations<br/>
                    539% ROI
                  </div>
                </div>
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

                {/* Access Desert Visual Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 border border-red-200 text-center">
                    <div className="text-2xl font-bold text-red-700 mb-1">80,831</div>
                    <div className="text-xs text-slate-700">Residents in</div>
                    <div className="text-xs text-slate-700 font-semibold">Access Deserts</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200 text-center">
                    <div className="text-2xl font-bold text-blue-700 mb-1">5 km</div>
                    <div className="text-xs text-slate-700">Maximum</div>
                    <div className="text-xs text-slate-700 font-semibold">Access Distance</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200 text-center">
                    <div className="text-2xl font-bold text-green-700 mb-1">0.88 km</div>
                    <div className="text-xs text-slate-700">Average</div>
                    <div className="text-xs text-slate-700 font-semibold">Distance to Care</div>
                  </div>
                </div>
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

                  {/* Visual Score Breakdown */}
                  <div className="mt-4 space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700 font-medium">Distance (50%)</span>
                        <span className="text-slate-600">50 points max</span>
                      </div>
                      <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{width: '50%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700 font-medium">Facility Density (30%)</span>
                        <span className="text-slate-600">30 points max</span>
                      </div>
                      <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{width: '30%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700 font-medium">Population Density (20%)</span>
                        <span className="text-slate-600">20 points max</span>
                      </div>
                      <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{width: '20%'}}></div>
                      </div>
                    </div>
                  </div>
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
                  <p className="text-slate-600 mb-3">
                    <strong className="text-slate-800">Facility Construction Costs (2026 estimates):</strong>
                  </p>

                  {/* Construction Cost Visual Breakdown */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-blue-200 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">$6.75M</div>
                      <div className="text-xs text-slate-600">Construction</div>
                      <div className="text-xs text-slate-500 mt-1">$450/sq ft × 15k sq ft</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-purple-200 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">$2.0M</div>
                      <div className="text-xs text-slate-600">Land</div>
                      <div className="text-xs text-slate-500 mt-1">LA County avg</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-green-200 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">$1.5M</div>
                      <div className="text-xs text-slate-600">Equipment</div>
                      <div className="text-xs text-slate-500 mt-1">Medical supplies</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-3 mb-4 border border-slate-300">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-900">Total per Facility:</span>
                      <span className="text-2xl font-bold text-slate-900">$10.25M</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mt-4 mb-3">
                    <strong className="text-slate-800">Annual Operating Costs:</strong>
                  </p>

                  {/* Operating Costs Pie Chart Style */}
                  <div className="space-y-2 mb-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700">Staffing</span>
                        <span className="font-semibold text-slate-900">$2.0M/yr (67%)</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600" style={{width: '67%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700">Supplies & Maintenance</span>
                        <span className="font-semibold text-slate-900">$600K/yr (20%)</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600" style={{width: '20%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700">Utilities & Overhead</span>
                        <span className="font-semibold text-slate-900">$400K/yr (13%)</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-green-600" style={{width: '13%'}}></div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 mt-4 mb-2">
                    <strong className="text-slate-800">Estimated Savings:</strong>
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1 ml-4">
                    <li>• ER diversion: (population/1000) × 250 preventable visits/year × ($2000 - $150) per visit</li>
                    <li>• Chronic disease management: population × 40% with chronic conditions × 20% improvement rate × $1500 savings/year</li>
                  </ul>

                  {/* 10-Year ROI Visualization */}
                  <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-600 mb-1">10-Year Return on Investment</div>
                        <div className="text-3xl font-bold text-green-700">539% ROI</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-600">Total Savings</div>
                        <div className="text-xl font-bold text-slate-900">~$4.1B</div>
                        <div className="text-xs text-slate-500">over 10 years</div>
                      </div>
                    </div>
                  </div>
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

        {/* Policy Recommendations Visual Summary */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-slate-600" />
              <h2 className="text-2xl font-bold text-slate-900">Policy Recommendations at a Glance</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Recommendation 1 */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border-2 border-red-300 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-xs font-bold text-red-800 uppercase">Critical Priority</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">New Healthcare Facilities</h3>
                <div className="space-y-1 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-semibold">$102.5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Timeline:</span>
                    <span className="font-semibold">3-5 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Affected:</span>
                    <span className="font-semibold">3M+ people</span>
                  </div>
                </div>
              </div>

              {/* Recommendation 2 */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-300 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-xs font-bold text-orange-800 uppercase">High Priority</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">Mobile Clinics</h3>
                <div className="space-y-1 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-semibold">$1.25M + $2M/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Timeline:</span>
                    <span className="font-semibold">1-2 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Affected:</span>
                    <span className="font-semibold">500K+ people</span>
                  </div>
                </div>
              </div>

              {/* Recommendation 3 */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border-2 border-yellow-300 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-xs font-bold text-yellow-800 uppercase">High Priority</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">Transportation Services</h3>
                <div className="space-y-1 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-semibold">$50K + $750K/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Timeline:</span>
                    <span className="font-semibold">1-2 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Affected:</span>
                    <span className="font-semibold">100K+ people</span>
                  </div>
                </div>
              </div>

              {/* Recommendation 4 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-300 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <span className="text-xs font-bold text-blue-800 uppercase">Medium Priority</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">Telehealth Expansion</h3>
                <div className="space-y-1 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-semibold">$300K + $250K/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Timeline:</span>
                    <span className="font-semibold">1 year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Affected:</span>
                    <span className="font-semibold">200K+ people</span>
                  </div>
                </div>
              </div>

              {/* Recommendation 5 */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-300 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                  <span className="text-xs font-bold text-purple-800 uppercase">High Priority</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">Low-Income Investment</h3>
                <div className="space-y-1 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>Focus:</span>
                    <span className="font-semibold">Bottom 25% income</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Strategy:</span>
                    <span className="font-semibold">Equity-focused</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Affected:</span>
                    <span className="font-semibold">750K+ people</span>
                  </div>
                </div>
              </div>

              {/* Total Impact */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 border-2 border-green-400 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-6 h-6 text-green-700" />
                  <span className="text-xs font-bold text-green-800 uppercase">Total Investment</span>
                </div>
                <div className="text-center mt-2">
                  <div className="text-3xl font-bold text-green-700 mb-1">$645M</div>
                  <div className="text-xs text-slate-700 mb-2">10-year projection</div>
                  <div className="text-sm font-semibold text-green-800">539% ROI</div>
                </div>
              </div>
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

        {/* Validation Against Official Designations */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <h2 className="text-2xl font-bold text-slate-900">How This Compares to Official Designations</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-amber-50/80 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
                <h3 className="font-bold text-slate-900 mb-2">Our Analysis vs. Federal Shortage Area Designations</h3>
                <p className="text-slate-700 mb-3">
                  Federal agencies use <strong>Health Professional Shortage Areas (HPSA)</strong> and <strong>Medically Underserved Areas/Populations (MUA/P)</strong>
                  to identify regions with limited healthcare access. Our analysis complements these with granular census tract-level metrics.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-2 text-xs">Official HPSA/MUA Criteria</h4>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li>• Provider-to-population ratios</li>
                      <li>• Poverty rates and demographics</li>
                      <li>• Travel time to facilities</li>
                      <li>• Updated periodically by HRSA</li>
                    </ul>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-2 text-xs">Our Analysis Adds</h4>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li>• Census tract-level granularity (2,498 tracts)</li>
                      <li>• KD-tree distance calculations (0.88km avg)</li>
                      <li>• Composite access scoring (0-100)</li>
                      <li>• Real-time facility data integration</li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 p-3 bg-white/60 rounded border border-slate-200">
                  <strong className="text-slate-800">Note:</strong> Our "access desert" definition (5km threshold) aligns with HRSA standards for healthcare access.
                  Areas we identify may overlap with but not exactly match official HPSA/MUA designations due to different methodologies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* External Resources & Official Tools */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-slate-100 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">External Resources & Official Tools</h2>
            </div>

            <p className="text-sm text-slate-700 mb-4">
              Explore official government mapping tools and datasets that provide complementary perspectives on healthcare access in LA County.
            </p>

            <div className="space-y-3">
              {/* LA County Official Maps */}
              <div className="bg-blue-50/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-slate-900 mb-2 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  LA County Official Healthcare Maps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <a href="https://apps.gis.lacounty.gov/static/DPH/community-profiles/" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                    Community Health Profiles <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://ph-lacounty.hub.arcgis.com/pages/chp" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                    LA County Public Health Hub <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://dhs.lacounty.gov/find-a-clinic-or-hospital/" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                    Find a Clinic or Hospital <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://planning.lacity.gov/interactive-health-atlas/index/index.html" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                    LA City Interactive Health Atlas <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Federal Shortage Area Tools */}
              <div className="bg-purple-50/80 backdrop-blur-sm rounded-lg p-4 border border-purple-200">
                <h3 className="font-bold text-slate-900 mb-2 text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-600" />
                  Federal Shortage Area Designations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <a href="https://data.hrsa.gov/tools/shortage-area/hpsa-find" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1">
                    HRSA HPSA Find Tool <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://data.hrsa.gov/tools/shortage-area/mua-find" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1">
                    HRSA MUA/P Find Tool <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://data.lacounty.gov/maps/lacounty::medically-underserved-areas-populations/about" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1">
                    LA County MUA/P Map <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://findahealthcenter.hrsa.gov/" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1">
                    Find a Federally Qualified Health Center <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Health Equity Context */}
              <div className="bg-green-50/80 backdrop-blur-sm rounded-lg p-4 border border-green-200">
                <h3 className="font-bold text-slate-900 mb-2 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  Health Equity & Social Determinants
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <a href="https://www.healthyplacesindex.org/" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-green-600 hover:text-green-800 hover:underline flex items-center gap-1">
                    Healthy Places Index (California) <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://la.myneighborhooddata.org/" target="_blank" rel="noopener noreferrer"
                     className="text-xs text-green-600 hover:text-green-800 hover:underline flex items-center gap-1">
                    LA Neighborhood Data for Social Change <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 p-3 bg-slate-50/80 rounded border border-slate-200">
              <strong className="text-slate-800">Why compare sources?</strong> Different methodologies reveal different patterns.
              Official designations determine funding eligibility, while granular analyses like ours identify specific neighborhoods for targeted intervention.
            </p>
          </div>
        </div>

        {/* Code Transparency & Reproducibility */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-slate-600" />
              <h2 className="text-2xl font-bold text-slate-900">Code Transparency & Reproducibility</h2>
            </div>

            <p className="text-sm text-slate-700 mb-4">
              All analysis code, data processing pipelines, and visualizations are publicly available for verification and extension.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3 text-sm">Access the Code</h3>
                <a
                  href="https://github.com/calebnewtonusc/la-healthcare-access-mapping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm transition-colors mb-3"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on GitHub
                </a>
                <ul className="text-xs text-slate-700 space-y-1">
                  <li>✓ Data processing scripts (Python)</li>
                  <li>✓ Analysis algorithms (KD-tree, scoring)</li>
                  <li>✓ Dashboard source code (Next.js)</li>
                  <li>✓ 44 automated tests</li>
                </ul>
              </div>

              <div className="bg-slate-50/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3 text-sm">Key Files</h3>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li>
                    <code className="bg-slate-100 px-2 py-1 rounded text-slate-800">src/analysis/calculate_access_metrics.py</code>
                    <p className="text-slate-600 mt-1">Distance calculations & access scoring</p>
                  </li>
                  <li>
                    <code className="bg-slate-100 px-2 py-1 rounded text-slate-800">src/impact/cost_benefit_analysis.py</code>
                    <p className="text-slate-600 mt-1">ROI projections & financial models</p>
                  </li>
                  <li>
                    <code className="bg-slate-100 px-2 py-1 rounded text-slate-800">src/data_processing/fix_census_merge.py</code>
                    <p className="text-slate-600 mt-1">Census data cleaning & validation</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50/80 rounded-lg border border-blue-200">
              <p className="text-xs text-slate-700">
                <strong className="text-slate-900">Reproducibility Note:</strong> All data sources are publicly accessible.
                Follow the README instructions to reproduce the entire analysis pipeline from raw data to final visualizations.
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
            <p className="text-sm text-slate-600 mb-3">
              <strong className="text-slate-900">Technologies used:</strong> Python (Pandas, GeoPandas, Folium), FastAPI, Next.js, TypeScript, Tailwind CSS
            </p>
            <p className="text-xs text-slate-600 p-3 bg-slate-50/80 rounded border border-slate-200">
              <strong className="text-slate-800">Academic Context:</strong> This analysis complements official healthcare access assessments with
              granular, data-driven insights. It should be used alongside—not instead of—official HPSA/MUA designations and local health department guidance.
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
