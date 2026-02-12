import { Breadcrumbs } from '@/components/breadcrumbs'
import { RecommendationsPageContent } from '@/components/recommendations-page-content'
import { PriorityMatrixLazy as PriorityMatrix, ImplementationTimelineLazy as ImplementationTimeline } from '@/components/charts/lazy-charts'
import { Lightbulb, DollarSign, TrendingUp, Percent, Clock, Target, BarChart3 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getStats() {
  try {
    const res = await fetch(`${API_URL}/api/stats`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    return null
  }
}

async function getRecommendations() {
  try {
    const res = await fetch(`${API_URL}/api/recommendations`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.recommendations
  } catch (error) {
    return null
  }
}

export const metadata = {
  title: 'Hypothetical Scenarios & Analysis | LA Healthcare Access Dashboard',
  description: 'Educational exploration of hypothetical healthcare improvement scenarios for LA County. Illustrative cost estimates and implementation examples for discussion purposes only. Not validated policy recommendations.',
  keywords: 'healthcare scenarios, LA County health analysis, hypothetical interventions, educational examples, health equity discussion, healthcare access visualization, student research project, GIS analysis examples',
  openGraph: {
    title: 'Hypothetical Healthcare Scenarios for Los Angeles County',
    description: 'Educational exploration of hypothetical improvement scenarios. Illustrative examples for discussion - not validated policy recommendations.',
    type: 'website',
    url: 'https://la-healthcare-access-mapping.vercel.app/recommendations',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hypothetical scenarios and cost estimates for LA County healthcare access',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LA County Healthcare Hypothetical Scenarios',
    description: 'Educational exploration of hypothetical improvement scenarios | Illustrative examples only',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://la-healthcare-access-mapping.vercel.app/recommendations',
  },
}

export default async function RecommendationsPage() {
  const [stats, recommendations] = await Promise.all([
    getStats(),
    getRecommendations()
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-primary transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs />

        {/* CRITICAL DISCLAIMER */}
        <div className="mb-8 bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-900 dark:text-red-200 mb-3 flex items-center gap-2">
            ⚠️ Important: These are Hypothetical Scenarios Only
          </h2>
          <div className="space-y-2 text-sm text-red-800 dark:text-red-300">
            <p>
              <strong>The cost estimates, ROI projections, and recommendations below are illustrative examples for educational discussion.</strong> They are NOT validated policy recommendations and should NOT be used for actual planning or funding decisions.
            </p>
            <p>
              <strong>All financial figures have ±50% uncertainty</strong> and are based on simplified assumptions that don't account for real-world complexity, site-specific costs, regulatory requirements, or implementation barriers.
            </p>
            <p className="pt-2">
              For actual healthcare planning, consult with public health experts, community stakeholders, and official agencies like{' '}
              <a href="https://data.hrsa.gov/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">HRSA</a> and{' '}
              <a href="http://publichealth.lacounty.gov/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">LA County DPH</a>.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-md">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-dark-text-primary">
                Hypothetical Scenarios
              </h1>
              <p className="text-slate-700 dark:text-dark-text-secondary text-lg mt-1">
                Illustrative examples of potential interventions • For educational discussion only
              </p>
            </div>
          </div>
        </div>

        {/* Financial Overview Banner */}
        <section className="mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

            <div className="relative bg-white dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-blue-600 p-3 rounded-xl shadow-md">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Hypothetical Cost Estimates</h2>
              </div>

              <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-4 font-semibold">
                ⚠️ Illustrative figures only • ±50% uncertainty • Not validated by experts
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative group/card">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
                  <div className="relative bg-white dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-blue-200 rounded-xl p-6 text-center shadow-sm">
                    <div className="flex justify-center mb-3">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {stats?.total_investment || '$645M'}
                    </div>
                    <div className="text-sm text-slate-700 dark:text-dark-text-secondary font-medium">
                      Hypothetical Investment
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-500 mt-2 font-semibold">
                      Illustrative estimate only
                    </div>
                  </div>
                </div>

                <div className="relative group/card">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
                  <div className="relative bg-white dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-green-200 rounded-xl p-6 text-center shadow-sm">
                    <div className="flex justify-center mb-3">
                      <div className="bg-green-100 p-3 rounded-full">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {stats?.net_benefit || '$4.1B'}
                    </div>
                    <div className="text-sm text-slate-700 dark:text-dark-text-secondary font-medium">
                      Hypothetical Savings
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-500 mt-2 font-semibold">
                      Not validated
                    </div>
                  </div>
                </div>

                <div className="relative group/card">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
                  <div className="relative bg-white dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-purple-200 rounded-xl p-6 text-center shadow-sm">
                    <div className="flex justify-center mb-3">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Percent className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {stats?.roi || '539%'}
                    </div>
                    <div className="text-sm text-slate-700 dark:text-dark-text-secondary font-medium">
                      Hypothetical ROI
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-500 mt-2 font-semibold">
                      ±50% uncertainty
                    </div>
                    <div className="text-xs text-slate-600 dark:text-dark-text-secondary mt-1">
                      10-year ROI
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI Visual Breakdown */}
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Investment vs. Savings Comparison
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-700 dark:text-dark-text-secondary font-medium">Investment Required</span>
                      <span className="font-bold text-blue-600">$645M</span>
                    </div>
                    <div className="h-8 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-3" style={{width: '15%'}}>
                        <span className="text-xs text-white font-semibold">15%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-700 dark:text-dark-text-secondary font-medium">Estimated Savings</span>
                      <span className="font-bold text-green-600">$4.1B</span>
                    </div>
                    <div className="h-8 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end pr-3" style={{width: '100%'}}>
                        <span className="text-xs text-white font-semibold">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-dark-text-secondary mt-4 text-center">
                  For every $1 invested, an estimated <strong className="text-green-700">$6.39 in healthcare savings</strong> is expected over 10 years
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Recommendations */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-green-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Detailed Recommendations</h2>
          </div>
          <RecommendationsPageContent recommendations={recommendations} />
        </section>

        {/* Priority Matrix */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Priority Matrix</h2>
          </div>
          <PriorityMatrix />
        </section>

        {/* Implementation Timeline */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-orange-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Implementation Roadmap</h2>
          </div>
          <ImplementationTimeline />
        </section>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary mb-3">Explore the Technical Details</h3>
          <p className="text-slate-700 dark:text-dark-text-secondary mb-6 max-w-2xl mx-auto">
            Learn about the algorithms and methodologies used to generate these recommendations.
          </p>
          <a
            href="/methodology"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-md hover:shadow-lg"
          >
            View Methodology
          </a>
        </div>
      </div>
    </div>
  )
}
