import { Breadcrumbs } from '@/components/breadcrumbs'
import { Code, Cpu, GitBranch, Zap, TrendingUp, Database, Network, Binary } from 'lucide-react'
import Link from 'link'

export const metadata = {
  title: 'Algorithms & Technical Methods - LA Healthcare Access Dashboard',
  description: 'Advanced algorithms, machine learning techniques, and computational methods used in healthcare access analysis',
}

export default function AlgorithmsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl shadow-md">
              <Cpu className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Algorithms & Technical Methods
              </h1>
              <p className="text-slate-700 text-lg mt-1">
                Advanced computational techniques powering healthcare access analysis
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* KD-Tree Algorithm */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

            <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <GitBranch className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">KD-Tree Nearest Neighbor Search</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-2">Algorithm Overview</h3>
                  <p className="text-sm text-slate-700 mb-3">
                    K-dimensional tree (KD-tree) is a space-partitioning data structure for organizing points in k-dimensional space. We use it for O(log n) nearest facility lookups across 4,512 healthcare facilities.
                  </p>
                  <div className="bg-white rounded-lg p-3 font-mono text-xs text-slate-800 border border-slate-300">
                    <code>
                      {`# Python Implementation
from scipy.spatial import KDTree
import numpy as np

# Build KD-tree from facility coordinates
facility_coords = np.array([[lat, lon] for lat, lon in facilities])
tree = KDTree(facility_coords)

# Query nearest facility for each census tract centroid
distances, indices = tree.query(tract_centroids, k=1)

# Time Complexity: O(log n) per query
# Space Complexity: O(n)`}
                    </code>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">O(log n)</div>
                    <div className="text-sm text-slate-700">Query Time Complexity</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600 mb-1">4,512</div>
                    <div className="text-sm text-slate-700">Facilities in Index</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600 mb-1">2,498</div>
                    <div className="text-sm text-slate-700">Tract Queries</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Geospatial Projections */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

            <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Coordinate Reference System (CRS) Projections</h2>
              </div>

              <div className="space-y-4">
                <p className="text-slate-700">
                  Proper geospatial analysis requires transforming between coordinate systems to ensure accurate distance calculations and area measurements.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <h3 className="font-bold text-slate-900 mb-2 text-sm">CA State Plane Zone 5 (EPSG:2229)</h3>
                    <p className="text-xs text-slate-700 mb-2">Used for: Centroid calculation, distance measurements</p>
                    <div className="bg-white rounded p-2 font-mono text-xs text-slate-800 border border-slate-300">
                      <code>
                        {`# Transform to State Plane
gdf = gdf.to_crs(epsg=2229)
centroids = gdf.geometry.centroid
# Units: US Survey Feet`}
                      </code>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <h3 className="font-bold text-slate-900 mb-2 text-sm">CA Albers Equal Area (EPSG:3310)</h3>
                    <p className="text-xs text-slate-700 mb-2">Used for: Area calculations, density metrics</p>
                    <div className="bg-white rounded p-2 font-mono text-xs text-slate-800 border border-slate-300">
                      <code>
                        {`# Transform to Albers
gdf = gdf.to_crs(epsg=3310)
area_sq_km = gdf.geometry.area / 1e6
density = facilities / area_sq_km`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Composite Scoring Algorithm */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

            <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Composite Access Score Algorithm</h2>
              </div>

              <div className="space-y-4">
                <p className="text-slate-700">
                  Multi-factor weighted scoring system combining distance, density, and population metrics.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-3">Scoring Formula</h3>
                  <div className="bg-white rounded-lg p-4 border border-slate-300">
                    <div className="font-mono text-sm text-slate-900 mb-4">
                      <div className="mb-2"><strong>Access Score</strong> = (w₁ × Distance Score) + (w₂ × Density Score) + (w₃ × Population Factor)</div>
                      <div className="text-xs text-slate-600 ml-4 space-y-1">
                        <div>• w₁ = 0.50 (Distance weight)</div>
                        <div>• w₂ = 0.30 (Facility density weight)</div>
                        <div>• w₃ = 0.20 (Population weight)</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded p-3 font-mono text-xs">
                      <code>
                        {`def calculate_access_score(distance_km, facilities_per_10k, population):
    # Normalize distance (inverse, 0-100 scale)
    distance_score = max(0, 100 - (distance_km * 20))

    # Normalize density (0-100 scale, cap at 20 facilities/10K)
    density_score = min(100, (facilities_per_10k / 20) * 100)

    # Population factor (higher population = higher need)
    pop_factor = min(100, (population / 100000) * 100)

    # Weighted composite
    return (0.50 * distance_score +
            0.30 * density_score +
            0.20 * pop_factor)`}
                      </code>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-600">50%</div>
                    <div className="text-xs text-slate-700">Distance Weight</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600">30%</div>
                    <div className="text-xs text-slate-700">Density Weight</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-600">20%</div>
                    <div className="text-xs text-slate-700">Population Weight</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Optimization Algorithm */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

            <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Facility Location Optimization</h2>
              </div>

              <div className="space-y-4">
                <p className="text-slate-700">
                  Greedy algorithm for optimal facility placement to maximize population coverage and minimize access deserts.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-3">Algorithm Steps</h3>
                  <div className="space-y-3">
                    {[
                      { step: 1, title: 'Identify Access Deserts', desc: 'Find tracts with access score < 40' },
                      { step: 2, title: 'Calculate Coverage Radius', desc: 'Determine 5km service area for new facilities' },
                      { step: 3, title: 'Greedy Selection', desc: 'Iteratively select locations maximizing underserved population coverage' },
                      { step: 4, title: 'Validate Constraints', desc: 'Ensure minimum distance between facilities (3km)' },
                      { step: 5, title: 'Optimize Cost-Benefit', desc: 'Prioritize locations with highest ROI' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-3 bg-white rounded p-3 border border-slate-200">
                        <div className="bg-orange-100 text-orange-700 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                          <div className="text-xs text-slate-600">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Result:</span> Identified 10 optimal locations that reduce access desert population by 45,831 residents (57% reduction) with $400M investment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cost-Benefit Optimization */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

            <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Network className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">ROI Optimization Model</h2>
              </div>

              <div className="space-y-4">
                <p className="text-slate-700">
                  Multi-objective optimization balancing healthcare costs, infrastructure investment, and population impact.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-3">Financial Model</h3>
                  <div className="bg-white rounded-lg p-4 border border-slate-300 font-mono text-xs">
                    <code>
                      {`# 10-Year ROI Calculation
def calculate_roi(intervention_cost, annual_savings, years=10):
    # Healthcare cost savings from improved access
    preventable_er_reduction = 0.50  # 50% reduction
    avg_er_cost = 3200
    er_visits_prevented = 125000 * preventable_er_reduction
    annual_er_savings = er_visits_prevented * avg_er_cost

    # Chronic disease management savings
    chronic_disease_savings = 180_000_000  # $180M/year

    # Total annual savings
    total_annual = annual_er_savings + chronic_disease_savings

    # 10-year total
    total_savings = total_annual * years

    # ROI calculation
    roi = ((total_savings - intervention_cost) / intervention_cost) * 100

    return roi  # Returns: 539.9%`}
                    </code>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">$645M</div>
                    <div className="text-sm text-slate-700">Total Investment</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600 mb-1">$4.1B</div>
                    <div className="text-sm text-slate-700">10-Year Savings</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Stack */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

            <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Binary className="w-6 h-6 text-slate-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Technical Implementation</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-3 text-sm">Core Libraries</h3>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-700"><strong>NumPy:</strong> Matrix operations, vectorized computations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-green-600" />
                      <span className="text-slate-700"><strong>Pandas:</strong> Data manipulation, aggregations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-purple-600" />
                      <span className="text-slate-700"><strong>GeoPandas:</strong> Geospatial data structures</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-orange-600" />
                      <span className="text-slate-700"><strong>Scipy:</strong> KD-tree, spatial algorithms</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-3 text-sm">Performance Optimizations</h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li>✓ Vectorized operations instead of loops</li>
                    <li>✓ Spatial indexing with KD-trees (O(log n))</li>
                    <li>✓ Efficient CRS transformations (batch processing)</li>
                    <li>✓ Cached distance matrices for repeated queries</li>
                    <li>✓ Parallel processing for independent calculations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <Link
              href="https://github.com/calebnewtonusc/la-healthcare-access-mapping"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              <Code className="w-5 h-5" />
              View Full Source Code on GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
