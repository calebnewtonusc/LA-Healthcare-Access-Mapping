import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, AlertTriangle, Scale, ShieldAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Use | LA Healthcare Access Dashboard',
  description: 'Terms of use for the LA Healthcare Access Dashboard. Learn about acceptable use, intellectual property rights, disclaimers, and limitations of liability.',
  keywords: 'terms of use, terms of service, acceptable use, intellectual property, disclaimers, liability',
}

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
          Terms of Use
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <div className="flex gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-bold text-yellow-900 dark:text-yellow-200 mb-2">
              Educational Research Project
            </h2>
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              This dashboard represents <strong>independent student research</strong> for educational purposes.
              It has not been peer-reviewed or validated by public health experts. By using this site,
              you acknowledge that the data, analysis, and recommendations are provided for educational
              and informational purposes only and should not be used as the sole basis for policy or
              healthcare decisions without proper validation by qualified experts.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose dark:prose-invert max-w-none space-y-8">

        {/* Acceptance of Terms */}
        <section className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Acceptance of Terms
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            By accessing and using the LA Healthcare Access Dashboard ("the Site"), you accept and
            agree to be bound by these Terms of Use. If you do not agree to these terms, please do
            not use this site.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            These terms apply to all visitors, users, and others who access or use the Site.
          </p>
        </section>

        {/* Acceptable Use */}
        <section className="border-l-4 border-green-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
            <Scale className="w-6 h-6 text-green-600 dark:text-green-400" />
            Acceptable Use Policy
          </h2>

          <h3 className="text-lg font-semibold mt-4 mb-3 text-gray-900 dark:text-dark-text-primary">
            Permitted Uses
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            You may use this site for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>
              <strong>Educational purposes:</strong> Learning about healthcare access analysis,
              geospatial data visualization, and public health research methods
            </li>
            <li>
              <strong>Research purposes:</strong> Conducting academic research, writing papers,
              or comparing methodologies (with proper attribution)
            </li>
            <li>
              <strong>Personal exploration:</strong> Exploring healthcare access patterns in Los
              Angeles County for personal interest
            </li>
            <li>
              <strong>Policy discussion:</strong> Informing discussions about healthcare access
              (with appropriate disclaimers about data limitations)
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Prohibited Uses
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            You may NOT use this site for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>
              <strong>Commercial use without permission:</strong> Selling or reselling the data,
              analysis, or visualizations without explicit written consent
            </li>
            <li>
              <strong>Misrepresentation:</strong> Presenting this data as peer-reviewed, validated,
              or official government recommendations
            </li>
            <li>
              <strong>Healthcare decisions:</strong> Using this data as the sole basis for medical,
              clinical, or patient care decisions
            </li>
            <li>
              <strong>Malicious activities:</strong> Attempting to hack, disrupt, or overload the
              site's servers or infrastructure
            </li>
            <li>
              <strong>Automated scraping:</strong> Using bots or automated tools to excessively
              scrape or download data without permission (reasonable API use is acceptable)
            </li>
            <li>
              <strong>False attribution:</strong> Claiming authorship or removing attribution to
              the original author
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Proper Citation
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            If you use data, analysis, or visualizations from this site in your work, please cite properly:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-300 overflow-x-auto">
            <p>Newton, C. (2024). LA Healthcare Access Mapping Dashboard.</p>
            <p>University of Southern California. https://la-healthcare-access-mapping.vercel.app</p>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="border-l-4 border-purple-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Intellectual Property Rights
          </h2>

          <h3 className="text-lg font-semibold mt-4 mb-3 text-gray-900 dark:text-dark-text-primary">
            Content License
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Unless otherwise noted, the content on this site (text, visualizations, analysis,
            recommendations) is licensed under{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Creative Commons Attribution 4.0 International (CC BY 4.0)
            </a>.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            This means you are free to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li><strong>Share:</strong> Copy and redistribute the material in any medium or format</li>
            <li><strong>Adapt:</strong> Remix, transform, and build upon the material</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            Under the following terms:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>
              <strong>Attribution:</strong> You must give appropriate credit, provide a link to the
              license, and indicate if changes were made
            </li>
            <li>
              <strong>No additional restrictions:</strong> You may not apply legal terms or
              technological measures that legally restrict others from doing anything the license permits
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Source Code License
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            The source code for this dashboard is open source and available on{' '}
            <a
              href="https://github.com/calebnewtonusc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>{' '}
            under the MIT License.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Third-Party Data Sources
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            The underlying data (Census data, healthcare facility locations) comes from public domain
            government sources and is not subject to copyright. However, please cite the original
            data sources appropriately:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-2">
            <li>U.S. Census Bureau (2020 Decennial Census, ACS 5-Year Estimates)</li>
            <li>California Department of Health and Human Services (Licensed Facilities)</li>
            <li>U.S. Census Bureau TIGER/Line Shapefiles (Geographic Boundaries)</li>
          </ul>
        </section>

        {/* Disclaimer of Warranties */}
        <section className="border-l-4 border-red-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400" />
            Disclaimer of Warranties
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-800 dark:text-red-300 font-semibold uppercase mb-2">
              IMPORTANT: READ CAREFULLY
            </p>
            <p className="text-sm text-red-700 dark:text-red-300">
              This site and all content, data, and analysis are provided <strong>"AS IS"</strong> and{' '}
              <strong>"AS AVAILABLE"</strong> without any warranties of any kind, either express or implied.
            </p>
          </div>

          <h3 className="text-lg font-semibold mt-4 mb-3 text-gray-900 dark:text-dark-text-primary">
            No Warranty of Accuracy
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            We make no representations or warranties about:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-2">
            <li>The accuracy, completeness, or reliability of any data or analysis</li>
            <li>The suitability of the data for any particular purpose</li>
            <li>The correctness of any calculations, cost estimates, or ROI projections</li>
            <li>The validity of policy recommendations</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            Data estimates have <strong>±30-50% uncertainty</strong> and should be verified by qualified
            experts before use in policy or decision-making.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Not Professional Advice
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            This site does NOT provide professional advice and should NOT be used as a substitute for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-2">
            <li>Medical or clinical advice from qualified healthcare professionals</li>
            <li>Public health expertise from epidemiologists or health policy experts</li>
            <li>Legal advice from attorneys</li>
            <li>Financial advice from certified financial planners</li>
            <li>Professional consulting from urban planners or policy analysts</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            No Peer Review
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            This analysis has <strong>NOT been peer-reviewed</strong> or validated by domain experts
            in public health, epidemiology, or healthcare policy. It represents independent student
            research and should be treated as preliminary and exploratory.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            No Guarantee of Availability
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            We make no warranty that:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-2">
            <li>The site will be available at all times or without interruption</li>
            <li>The site will be free from errors, bugs, or security vulnerabilities</li>
            <li>Data will be kept up-to-date or reflect current conditions</li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section className="border-l-4 border-orange-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Limitation of Liability
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-4">
            <p className="text-sm text-orange-800 dark:text-orange-300 font-semibold uppercase mb-2">
              USE AT YOUR OWN RISK
            </p>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              To the fullest extent permitted by law, the author(s) and contributors shall NOT be
              liable for any damages arising from the use of this site.
            </p>
          </div>

          <h3 className="text-lg font-semibold mt-4 mb-3 text-gray-900 dark:text-dark-text-primary">
            No Liability for Decisions
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            We are NOT liable for any decisions, actions, or policies made based on the data,
            analysis, or recommendations provided on this site. This includes but is not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-2">
            <li>Healthcare policy decisions</li>
            <li>Resource allocation decisions</li>
            <li>Facility construction or location decisions</li>
            <li>Budget or financial decisions</li>
            <li>Any negative outcomes resulting from reliance on this data</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Types of Damages Excluded
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            We shall not be liable for any:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-2">
            <li>Direct, indirect, incidental, special, or consequential damages</li>
            <li>Loss of profits, revenue, data, or business opportunities</li>
            <li>Damages arising from errors, inaccuracies, or omissions in the data</li>
            <li>Damages from site downtime, service interruptions, or data loss</li>
            <li>Damages from third-party actions or security breaches</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Maximum Liability
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            In no event shall our total liability exceed $0.00 (zero dollars). This site is provided
            free of charge for educational purposes.
          </p>
        </section>

        {/* Indemnification */}
        <section className="border-l-4 border-indigo-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Indemnification
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            You agree to indemnify, defend, and hold harmless the author(s), contributors, and
            University of Southern California from any claims, liabilities, damages, losses, or
            expenses (including reasonable attorneys' fees) arising from:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-2">
            <li>Your use of the site</li>
            <li>Your violation of these Terms of Use</li>
            <li>Your violation of any rights of another person or entity</li>
            <li>Your misuse or misrepresentation of the data or analysis</li>
          </ul>
        </section>

        {/* Modifications */}
        <section className="border-l-4 border-pink-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Modifications to Terms
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to modify these Terms of Use at any time. Changes will be effective
            immediately upon posting to this page. The "Last Updated" date at the top will reflect
            any changes.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            Your continued use of the site after changes are posted constitutes acceptance of the
            modified terms.
          </p>
        </section>

        {/* Governing Law */}
        <section className="border-l-4 border-teal-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Governing Law
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            These Terms of Use shall be governed by and construed in accordance with the laws of
            the State of California, United States, without regard to its conflict of law provisions.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            Any disputes arising from these terms or your use of the site shall be resolved in
            the courts of Los Angeles County, California.
          </p>
        </section>

        {/* Severability */}
        <section className="border-l-4 border-gray-400 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Severability
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            If any provision of these Terms of Use is found to be invalid or unenforceable, the
            remaining provisions shall continue in full force and effect.
          </p>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Questions About These Terms
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have questions about these Terms of Use, please contact:
          </p>

          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:calebnew@usc.edu?subject=Terms%20of%20Use%20Inquiry"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                calebnew@usc.edu
              </a>
            </p>
            <p>
              <strong>Subject Line:</strong> "Terms of Use Inquiry"
            </p>
          </div>
        </section>

      </div>

      {/* Navigation Links */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-4">
        <Link
          href="/privacy"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          View Privacy Policy
        </Link>
        <Link
          href="/accessibility"
          className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold"
        >
          Accessibility Statement
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
