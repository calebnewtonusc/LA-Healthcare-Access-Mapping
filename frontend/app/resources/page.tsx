import { ExternalLink, MapPin, Database, TrendingUp, FileText, Layers, Search, Building2 } from 'lucide-react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-primary transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-dark-text-primary mb-4">
            External Resources & Official Tools
          </h1>
          <p className="text-slate-700 dark:text-dark-text-secondary text-lg">
            Comprehensive directory of government mapping tools, datasets, and healthcare access resources for Los Angeles County
          </p>
        </div>

        {/* Interactive Official Maps */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-md">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Interactive Official Maps</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* LA County Public Health */}
              <a href="https://apps.gis.lacounty.gov/static/DPH/community-profiles/" target="_blank" rel="noopener noreferrer"
                 className="group/card relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
                <div className="relative bg-white dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-blue-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-dark-text-primary mb-2">LA County Community Health Profiles</h3>
                  <p className="text-sm text-slate-700 dark:text-dark-text-secondary mb-2">Interactive maps showing healthcare indicators across LA County communities</p>
                  <span className="text-xs text-blue-600 font-medium">apps.gis.lacounty.gov</span>
                </div>
              </a>

              {/* LA County Public Health Hub */}
              <a href="https://ph-lacounty.hub.arcgis.com/pages/chp" target="_blank" rel="noopener noreferrer"
                 className="group/card relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
                <div className="relative bg-white dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-purple-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <Database className="w-6 h-6 text-purple-600" />
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-dark-text-primary mb-2">LA County Public Health Data Hub</h3>
                  <p className="text-sm text-slate-700 dark:text-dark-text-secondary mb-2">Centralized portal for LA County Department of Public Health maps and datasets</p>
                  <span className="text-xs text-purple-600 font-medium">ph-lacounty.hub.arcgis.com</span>
                </div>
              </a>

              {/* LA City Health Atlas */}
              <a href="https://planning.lacity.gov/interactive-health-atlas/index/index.html" target="_blank" rel="noopener noreferrer"
                 className="group/card relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
                <div className="relative bg-white dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <Layers className="w-6 h-6 text-green-600" />
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-dark-text-primary mb-2">LA City Interactive Health Atlas</h3>
                  <p className="text-sm text-slate-700 dark:text-dark-text-secondary mb-2">City of LA planning department's comprehensive health mapping tool</p>
                  <span className="text-xs text-green-600 font-medium">planning.lacity.gov</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Federal Shortage Area Tools */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-red-500 to-orange-600 p-3 rounded-xl shadow-md">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Federal Shortage Area Designation Tools</h2>
            </div>

            <p className="text-slate-700 dark:text-dark-text-secondary mb-6 text-sm">
              Official HRSA tools for identifying Health Professional Shortage Areas (HPSA) and Medically Underserved Areas/Populations (MUA/P).
              These designations determine eligibility for federal funding and programs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* HPSA Find */}
              <div className="bg-red-50/80 backdrop-blur-sm rounded-lg p-5 border border-red-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-dark-text-primary mb-1">HRSA HPSA Find Tool</h3>
                    <p className="text-xs text-slate-700 dark:text-dark-text-secondary mb-2">Search for designated health professional shortage areas by address or region</p>
                    <a href="https://data.hrsa.gov/tools/shortage-area/hpsa-find" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-red-600 hover:text-red-800 hover:underline inline-flex items-center gap-1">
                      Launch Tool <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-white dark:bg-dark-bg-secondary/60 rounded text-xs text-slate-600 dark:text-dark-text-secondary">
                  <strong>Covers:</strong> Primary Care, Dental Health, Mental Health shortage areas
                </div>
              </div>

              {/* MUA Find */}
              <div className="bg-orange-50/80 backdrop-blur-sm rounded-lg p-5 border border-orange-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Database className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-dark-text-primary mb-1">HRSA MUA/P Find Tool</h3>
                    <p className="text-xs text-slate-700 dark:text-dark-text-secondary mb-2">Locate medically underserved areas and populations across the United States</p>
                    <a href="https://data.hrsa.gov/tools/shortage-area/mua-find" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-orange-600 hover:text-orange-800 hover:underline inline-flex items-center gap-1">
                      Launch Tool <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-white dark:bg-dark-bg-secondary/60 rounded text-xs text-slate-600 dark:text-dark-text-secondary">
                  <strong>Based on:</strong> Provider ratios, poverty, elderly population, infant mortality
                </div>
              </div>

              {/* Find a Health Center */}
              <div className="bg-purple-50/80 backdrop-blur-sm rounded-lg p-5 border border-purple-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-dark-text-primary mb-1">Find a Health Center (FQHC Locator)</h3>
                    <p className="text-xs text-slate-700 dark:text-dark-text-secondary mb-2">Locate federally qualified health centers providing care regardless of insurance status</p>
                    <a href="https://findahealthcenter.hrsa.gov/" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-purple-600 hover:text-purple-800 hover:underline inline-flex items-center gap-1">
                      Launch Tool <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-white dark:bg-dark-bg-secondary/60 rounded text-xs text-slate-600 dark:text-dark-text-secondary">
                  <strong>FQHCs:</strong> Community-based health centers serving underserved populations
                </div>
              </div>

              {/* LA County MUA/P Map */}
              <div className="bg-blue-50/80 backdrop-blur-sm rounded-lg p-5 border border-blue-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Layers className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-dark-text-primary mb-1">LA County MUA/P Map</h3>
                    <p className="text-xs text-slate-700 dark:text-dark-text-secondary mb-2">Interactive map of officially designated medically underserved areas in LA County</p>
                    <a href="https://data.lacounty.gov/maps/lacounty::medically-underserved-areas-populations/about" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1">
                      View Map <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-white dark:bg-dark-bg-secondary/60 rounded text-xs text-slate-600 dark:text-dark-text-secondary">
                  <strong>LA specific:</strong> MUA/P designations overlaid on county geography
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facility Locators */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-3 rounded-xl shadow-md">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Facility & Service Locators</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50/80 backdrop-blur-sm rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-slate-900 dark:text-dark-text-primary mb-2 text-sm">LA County DHS Facilities</h3>
                <p className="text-xs text-slate-700 dark:text-dark-text-secondary mb-3">Search for LA County Department of Health Services clinics and hospitals</p>
                <a href="https://dhs.lacounty.gov/find-a-clinic-or-hospital/" target="_blank" rel="noopener noreferrer"
                   className="text-xs text-green-600 hover:text-green-800 hover:underline inline-flex items-center gap-1">
                  Find Facilities <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="bg-teal-50/80 backdrop-blur-sm rounded-lg p-4 border border-teal-200">
                <h3 className="font-semibold text-slate-900 dark:text-dark-text-primary mb-2 text-sm">My Health LA Clinics</h3>
                <p className="text-xs text-slate-700 dark:text-dark-text-secondary mb-3">Community clinics participating in LA County's My Health LA program</p>
                <a href="https://locator.lacounty.gov/lac/Search?cat=845&find=My+Health+LA+Community+Clinics" target="_blank" rel="noopener noreferrer"
                   className="text-xs text-teal-600 hover:text-teal-800 hover:underline inline-flex items-center gap-1">
                  Find Clinics <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="bg-blue-50/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-slate-900 dark:text-dark-text-primary mb-2 text-sm">CA FQHC Directory</h3>
                <p className="text-xs text-slate-700 dark:text-dark-text-secondary mb-3">State-maintained list of all federally qualified health centers in California</p>
                <a href="https://funding.hcai.ca.gov/fqhc-site-search/" target="_blank" rel="noopener noreferrer"
                   className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1">
                  Search Directory <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Health Equity Tools */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-3 rounded-xl shadow-md">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Health Equity & Social Determinants</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-50/80 backdrop-blur-sm rounded-lg p-5 border border-amber-200">
                <h3 className="font-bold text-slate-900 dark:text-dark-text-primary mb-2">Healthy Places Index</h3>
                <p className="text-sm text-slate-700 dark:text-dark-text-secondary mb-3">
                  California-specific tool mapping social determinants of health. Combines factors like education, economic opportunity,
                  housing, and healthcare access into composite scores.
                </p>
                <a href="https://www.healthyplacesindex.org/" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Explore HPI Maps <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="bg-yellow-50/80 backdrop-blur-sm rounded-lg p-5 border border-yellow-200">
                <h3 className="font-bold text-slate-900 dark:text-dark-text-primary mb-2">My Neighborhood Data</h3>
                <p className="text-sm text-slate-700 dark:text-dark-text-secondary mb-3">
                  LA-specific neighborhood-level data platform tracking health resources, demographics, and community indicators across the region.
                </p>
                <a href="https://la.myneighborhooddata.org/" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Browse Data <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Downloadable Datasets */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-slate-600 to-slate-800 p-3 rounded-xl shadow-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Downloadable Datasets</h2>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-dark-bg-tertiary/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-dark-text-primary mb-1 text-sm">LA County Healthcare Facilities (CDPH)</h3>
                    <p className="text-xs text-slate-700 dark:text-dark-text-secondary mb-2">Licensed healthcare facilities from California Department of Public Health</p>
                    <a href="https://geohub.lacity.org/items/f86150f7fbd647ea8029a022b78d59fb" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1">
                      Download Dataset <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-dark-bg-tertiary/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-dark-text-primary mb-1 text-sm">CA Medical Service Study Areas</h3>
                    <p className="text-xs text-slate-700 dark:text-dark-text-secondary mb-2">Standardized geographic boundaries for healthcare planning in California</p>
                    <a href="https://data.chhs.ca.gov/dataset/medical-service-study-areas" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1">
                      Download Shapefiles <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-dark-bg-tertiary/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-dark-text-primary mb-1 text-sm">HPSA Designations (California)</h3>
                    <p className="text-xs text-slate-700 dark:text-dark-text-secondary mb-2">Geospatial data for all Health Professional Shortage Areas in CA</p>
                    <a href="https://data.chhs.ca.gov/dataset/health-professional-shortage-areas-in-california" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1">
                      Download Data <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use These Resources */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-4">How to Use These Resources</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-dark-text-primary text-sm">For Policymakers & Planners</h3>
                <ul className="text-xs text-slate-700 dark:text-dark-text-secondary space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">→</span>
                    <span>Use HRSA tools to verify HPSA/MUA eligibility for federal funding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">→</span>
                    <span>Cross-reference our granular analysis with official designations for targeted interventions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">→</span>
                    <span>Combine HPI scores with access metrics to address health equity systematically</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-dark-text-primary text-sm">For Researchers & Analysts</h3>
                <ul className="text-xs text-slate-700 dark:text-dark-text-secondary space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">→</span>
                    <span>Download raw datasets for independent validation and extension</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">→</span>
                    <span>Compare methodologies: HRSA's provider-ratio approach vs. our distance-based metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">→</span>
                    <span>Integrate SDOH data from HPI to enhance equity analysis</span>
                  </li>
                </ul>
              </div>
            </div>
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
