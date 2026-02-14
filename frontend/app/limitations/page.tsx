import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Limitations & What\'s Missing - LA Healthcare Access Dashboard',
  description: 'Honest assessment of what this analysis does NOT include and its limitations for decision-making.',
}

export default function LimitationsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            What's Missing from This Analysis
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          An honest assessment of this analysis's limitations and gaps. Understanding what's NOT included is as important as what is.
        </p>
      </div>

      {/* Critical Disclaimer */}
      <div className="mb-8 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-red-900 dark:text-red-200 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" /> Critical Limitation
        </h2>
        <p className="text-red-800 dark:text-red-300 font-medium">
          This analysis measures ONLY straight-line distance to facilities. It does NOT measure actual healthcare access,
          which depends on dozens of factors this project cannot capture.
        </p>
      </div>

      {/* What's Missing Sections */}
      <div className="space-y-8">
        {/* Data & Methodology Gaps */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            1. Data & Methodology Gaps
          </h2>
          <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Outdated Census data:</strong> Using 2020 Census, which is 6 years old in 2026. Population has changed significantly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Straight-line distance only:</strong> No consideration of actual travel time, public transit routes, traffic, or geographic barriers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>All facilities treated equally:</strong> Emergency rooms, urgent care, specialist clinics, and primary care all weighted the same.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>No validation against health outcomes:</strong> Analysis not validated against actual ER visit rates, mortality, or disease prevalence.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Arbitrary access score weights:</strong> The 50%/30%/20% weighting formula is not validated by research or peer review.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>±30-50% uncertainty:</strong> Confidence intervals are so wide they make precise planning impossible.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Healthcare System Factors */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            2. Healthcare System Factors NOT Included
          </h2>
          <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Insurance acceptance:</strong> No data on which facilities accept Medi-Cal, Medicare, or are cash-only.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Wait times & availability:</strong> No information on appointment availability, ER wait times, or provider capacity.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Facility capacity:</strong> Doesn't account for how many patients facilities can actually serve.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Provider specialization:</strong> No tracking of which facilities have cardiologists, OB/GYNs, pediatricians, etc.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Staffing & workforce:</strong> Ignores healthcare worker shortages and recruitment challenges.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Quality of care:</strong> No metrics on patient outcomes, satisfaction, or care quality.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Social & Economic Factors */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            3. Social Determinants of Health NOT Included
          </h2>
          <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Language barriers:</strong> No data on language services, interpreter availability, or multilingual staff.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Cultural competency:</strong> Doesn't measure culturally appropriate care for diverse communities.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Economic barriers:</strong> No consideration of cost, ability to pay, or affordability.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Transportation access:</strong> Ignores car ownership rates, bus routes, and mobility challenges.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Historical trauma & trust:</strong> No account of community mistrust of healthcare systems.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Housing & homelessness:</strong> Doesn't address unhoused populations with no fixed census address.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Community & Context */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            4. Community Voice & Context NOT Included
          </h2>
          <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>No community input:</strong> Analysis done without consulting residents of affected neighborhoods.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Existing grassroots programs:</strong> Ignores community health workers, mobile clinics, and local initiatives already serving these areas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Lived experience:</strong> No qualitative data from people actually navigating these barriers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Local context:</strong> Doesn't account for neighborhood-specific factors like gang territories, safety concerns.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Community Context */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            5. Community Context: Acknowledging What Already Exists
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
            <p className="text-gray-800 dark:text-gray-200 mb-4 font-medium">
              This analysis is a desktop exercise by an outsider. It cannot capture the full picture of community health and the work already happening on the ground.
            </p>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Existing Community Health Infrastructure NOT Shown on This Map:
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span><strong>Federally Qualified Health Centers (FQHCs)</strong> providing comprehensive primary care on a sliding fee scale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span><strong>Community Health Centers (CHCs)</strong> serving uninsured and underinsured populations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span><strong>Community Health Workers (CHWs)</strong> who know their neighborhoods and provide culturally competent care navigation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span><strong>Mobile clinics</strong> bringing healthcare directly to underserved communities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span><strong>Faith-based health ministries</strong> and grassroots mutual aid networks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span><strong>Community-based organizations</strong> with decades of trust and relationships in their neighborhoods</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Why Geographic Distance Doesn't Tell the Whole Story:
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Communities have their own informal healthcare networks and knowledge systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>People often choose providers based on trust, language, and cultural understanding rather than proximity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>A facility shown as "close" may be effectively inaccessible due to factors this map cannot see</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Conversely, communities may have strong connections to providers farther away</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                <p className="italic text-gray-700 dark:text-gray-300">
                  <strong>Important:</strong> Communities know their own needs better than any desktop analysis can show.
                  This map should not be used to make decisions without direct input from the people who live in these neighborhoods.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  LA County Community Health Resources:
                </h3>
                <div className="space-y-2">
                  <a
                    href="https://dhs.lacounty.gov/community-health-centers/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LA County DHS Community Health Centers</span>
                  </a>
                  <a
                    href="http://findahealthcenter.hrsa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>HRSA Health Center Locator - Find FQHCs & CHCs</span>
                  </a>
                  <a
                    href="https://211la.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>211 LA - Community Services Navigator</span>
                  </a>
                  <a
                    href="http://publichealth.lacounty.gov/chs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LA County Center for Health Equity</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Realities */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            6. Implementation Realities NOT Considered
          </h2>
          <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Zoning & permits:</strong> No consideration of regulatory approval processes, which can take years.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Land acquisition costs:</strong> Real estate prices in LA make facility placement extremely expensive.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Political will & funding:</strong> No analysis of political feasibility or funding sources.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Market dynamics:</strong> Ignores why access deserts exist (economic factors, provider unwillingness to serve certain areas).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">×</span>
                <span><strong>Competing priorities:</strong> Healthcare is one of many infrastructure needs competing for limited funding.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* For Better Resources */}
      <div className="mt-12 bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-green-900 dark:text-green-200 mb-4">
          For More Comprehensive Analysis, Use These Official Resources:
        </h2>
        <div className="space-y-3">
          <a
            href="https://data.hrsa.gov/tools/shortage-area/hpsa-find"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-700 dark:text-green-300 hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            <span><strong>HRSA HPSA Finder</strong> - Official federal Health Professional Shortage Area designations</span>
          </a>
          <a
            href="http://publichealth.lacounty.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-700 dark:text-green-300 hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            <span><strong>LA County Department of Public Health</strong> - Official county health data and planning</span>
          </a>
          <a
            href="https://www.chhs.ca.gov/ohii/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-700 dark:text-green-300 hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            <span><strong>CA Health & Human Services Open Data</strong> - Comprehensive state healthcare data</span>
          </a>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-between">
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Home
        </Link>
        <Link
          href="/methodology"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Methodology →
        </Link>
      </div>
    </div>
  )
}
