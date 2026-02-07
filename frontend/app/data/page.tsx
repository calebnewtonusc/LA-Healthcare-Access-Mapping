import { Breadcrumbs } from '@/components/breadcrumbs'
import { Server, Zap, Database, Code2, ExternalLink, CheckCircle, Clock } from 'lucide-react'

export const metadata = {
  title: 'API Documentation - LA Healthcare Access Dashboard',
  description: 'Live REST API endpoints for healthcare access data, facility locations, recommendations, and analytics',
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://la-healthcare-access-mapping-production.up.railway.app'

const endpoints = [
  {
    method: 'GET',
    path: '/api/stats',
    description: 'Dashboard statistics and key metrics',
    response: {
      total_facilities: '4512',
      census_tracts: '2498',
      population_served: '9900000',
      avg_distance_km: '0.88',
      facility_density: '4.5',
      access_desert_population: '80831',
      total_investment: '$645.3M',
      net_benefit: '$4.1B',
      roi: '539.9%',
    },
    liveData: true,
  },
  {
    method: 'GET',
    path: '/api/recommendations',
    description: 'Policy recommendations with priority, cost, and impact data',
    response: [
      {
        id: 1,
        title: 'Establish New Community Health Centers in Access Deserts',
        priority: 'Critical',
        category: 'Infrastructure Development',
        description: 'Build 10 new FQHCs...',
        target_population: '500000',
        estimated_cost: '$400M',
        timeline: '3-5 years',
      },
    ],
    liveData: true,
  },
  {
    method: 'GET',
    path: '/api/facilities',
    description: 'Optimal facility locations for new health centers',
    response: [
      {
        tract_id: 'TRACT123',
        recommended_name: 'South LA Community Health Center',
        latitude: 33.9731,
        longitude: -118.2479,
        priority_score: 95,
        estimated_population_served: '75000',
      },
    ],
    liveData: true,
  },
  {
    method: 'GET',
    path: '/api/cost-benefit',
    description: 'Financial analysis and ROI projections',
    response: {
      total_investment: 645300000,
      annual_savings: 410000000,
      ten_year_savings: 4100000000,
      roi_percentage: 539.9,
      payback_period_years: 1.6,
      npv_10_year: 3454700000,
    },
    liveData: true,
  },
  {
    method: 'GET',
    path: '/api/maps/facility-locations',
    description: 'Interactive Folium map of healthcare facilities',
    response: 'HTML (Folium map)',
    liveData: true,
  },
  {
    method: 'GET',
    path: '/api/maps/access-desert',
    description: 'Access desert heatmap visualization',
    response: 'HTML (Folium choropleth map)',
    liveData: true,
  },
  {
    method: 'GET',
    path: '/health',
    description: 'API health check endpoint',
    response: {
      status: 'healthy',
      timestamp: '2026-02-07T01:33:20Z',
    },
    liveData: true,
  },
]

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-primary transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-md">
              <Server className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-dark-text-primary">
                Live API Documentation
              </h1>
              <p className="text-slate-700 dark:text-dark-text-secondary text-lg mt-1">
                REST API endpoints serving real-time healthcare access data
              </p>
            </div>
          </div>
        </div>

        {/* API Status */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

          <div className="relative bg-white dark:bg-dark-bg-secondary/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-cyan/30 rounded-2xl p-6 shadow-lg dark:shadow-neon-cyan/20 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-dark-text-primary">API Status: Live</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-dark-text-secondary">
                  Base URL: <code className="bg-slate-100 dark:bg-dark-bg-secondary px-2 py-1 rounded text-xs font-mono">{API_BASE_URL}</code>
                </p>
              </div>
              <a
                href={`${API_BASE_URL}/health`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors font-semibold text-sm"
              >
                <Zap className="w-4 h-4" />
                Test Health Check
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-dark-bg-tertiary border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-xs text-slate-700 dark:text-dark-text-secondary">Uptime</div>
              </div>
              <div className="bg-slate-50 dark:bg-dark-bg-tertiary border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">&lt;100ms</div>
                <div className="text-xs text-slate-700 dark:text-dark-text-secondary">Avg Response</div>
              </div>
              <div className="bg-slate-50 dark:bg-dark-bg-tertiary border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">7</div>
                <div className="text-xs text-slate-700 dark:text-dark-text-secondary">Endpoints</div>
              </div>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="space-y-6">
          {endpoints.map((endpoint, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>

              <div className="relative bg-white dark:bg-dark-bg-secondary/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-cyan/30 rounded-2xl p-6 shadow-lg dark:shadow-neon-cyan/20 transition-colors duration-300">
                {/* Endpoint Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-mono text-sm font-bold">
                        {endpoint.method}
                      </span>
                      <code className="text-slate-900 dark:text-dark-text-primary font-mono text-sm">{endpoint.path}</code>
                      {endpoint.liveData && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Live Data
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 dark:text-dark-text-secondary text-sm">{endpoint.description}</p>
                  </div>
                  <a
                    href={`${API_BASE_URL}${endpoint.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold shrink-0"
                  >
                    Try It
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Full URL */}
                <div className="mb-4 bg-slate-50 dark:bg-dark-bg-tertiary border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <p className="text-xs text-slate-600 dark:text-dark-text-secondary mb-1 font-semibold">Full URL:</p>
                  <code className="text-xs font-mono text-slate-900 dark:text-dark-text-primary break-all">
                    {API_BASE_URL}{endpoint.path}
                  </code>
                </div>

                {/* Response Example */}
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <p className="text-xs text-slate-400 mb-2 font-semibold">Example Response:</p>
                  <pre className="text-xs text-green-400 font-mono">
                    {JSON.stringify(endpoint.response, null, 2)}
                  </pre>
                </div>

                {/* cURL Example */}
                <div className="mt-3 bg-slate-50 dark:bg-dark-bg-tertiary border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <p className="text-xs text-slate-600 dark:text-dark-text-secondary mb-1 font-semibold">cURL Command:</p>
                  <code className="text-xs font-mono text-slate-800 dark:text-dark-text-primary block">
                    curl {API_BASE_URL}{endpoint.path}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Details */}
        <div className="mt-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

          <div className="relative bg-white dark:bg-dark-bg-secondary/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-cyan/30 rounded-2xl p-6 shadow-lg dark:shadow-neon-cyan/20 transition-colors duration-300">
            <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-4">Technical Specifications</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-dark-text-primary mb-3 text-sm">API Framework</h4>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-dark-text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span><strong>FastAPI</strong> - High-performance Python framework</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span><strong>Uvicorn</strong> - ASGI server</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span><strong>Pydantic</strong> - Data validation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-dark-text-primary mb-3 text-sm">Response Features</h4>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-dark-text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>JSON format (application/json)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>CORS enabled</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Gzip compression</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Server-side caching (1 hour TTL)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-dark-text-primary text-sm mb-1">Data Freshness</p>
                  <p className="text-xs text-slate-700 dark:text-dark-text-secondary">
                    All endpoints serve pre-computed analysis results from the latest data pipeline run. Maps and analytics are regenerated monthly via GitHub Actions automation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Example */}
        <div className="mt-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

          <div className="relative bg-white dark:bg-dark-bg-secondary/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-cyan/30 rounded-2xl p-6 shadow-lg dark:shadow-neon-cyan/20 transition-colors duration-300">
            <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-4">Integration Example</h3>

            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-green-400 font-mono">
{`// JavaScript/TypeScript Example
const API_BASE = '${API_BASE_URL}';

async function getHealthcareStats() {
  const response = await fetch(\`\${API_BASE}/api/stats\`);
  const data = await response.json();

  console.log('Total Facilities:', data.total_facilities);
  console.log('ROI:', data.roi);

  return data;
}

// Python Example
import requests

response = requests.get('${API_BASE_URL}/api/stats')
stats = response.json()

print(f"Access Desert Population: {stats['access_desert_population']}")
print(f"Net Benefit: {stats['net_benefit']}")`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
