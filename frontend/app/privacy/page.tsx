import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Eye, Lock, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | LA Healthcare Access Dashboard',
  description: 'Privacy policy for the LA Healthcare Access Dashboard. Learn about what data we collect, how we use it, and your rights.',
  keywords: 'privacy policy, data collection, user privacy, analytics, GDPR',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Quick Summary */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Privacy at a Glance
        </h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
            <span>We collect <strong>minimal analytics data</strong> to improve user experience</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
            <span>We <strong>do NOT collect</strong> personal health information</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
            <span>We <strong>do NOT sell</strong> or share data with third parties</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
            <span>No user accounts or registration required</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
            <span>You can opt out of analytics via "Do Not Track"</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="prose dark:prose-invert max-w-none space-y-8">

        {/* Information We Collect */}
        <section className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
            <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Information We Collect
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The LA Healthcare Access Dashboard collects minimal information for analytical purposes only.
            We prioritize your privacy and only collect what is necessary to improve the user experience.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Analytics Data
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            We use privacy-focused analytics (such as Plausible Analytics or similar tools) to understand
            how users interact with the site. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>Page views and navigation patterns</li>
            <li>Referral sources (how you found our site)</li>
            <li>General geographic location (city or region level only, not precise location)</li>
            <li>Device type and browser information</li>
            <li>Time spent on pages</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            What We Do NOT Collect
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>
              <strong>No Personal Health Information:</strong> We do NOT collect, store, or process any
              personal health information or medical data.
            </li>
            <li>
              <strong>No User Accounts:</strong> This site does not require registration, login, or
              account creation.
            </li>
            <li>
              <strong>No Personally Identifiable Information (PII):</strong> We do not collect names,
              email addresses, phone numbers, or other PII unless you voluntarily provide it (e.g.,
              when contacting us).
            </li>
            <li>
              <strong>No Tracking Across Websites:</strong> We do not track your activity on other websites.
            </li>
            <li>
              <strong>No IP Address Storage:</strong> IP addresses are not stored or logged beyond
              temporary server access logs (automatically deleted within 7 days).
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Cookies
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            We use minimal session cookies for functionality purposes only (e.g., remembering your
            dark mode preference). These cookies do not track you across websites and are stored
            locally in your browser. You can disable cookies in your browser settings, though some
            features may not work properly.
          </p>
        </section>

        {/* How We Use Information */}
        <section className="border-l-4 border-green-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
            <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
            How We Use Information
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Data collected is used exclusively to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>Understand which features and visualizations are most useful to users</li>
            <li>Identify technical issues, bugs, and performance problems</li>
            <li>Improve user experience and site functionality</li>
            <li>Understand general usage patterns and demographics (e.g., which regions access the site)</li>
          </ul>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
            <p className="text-sm text-green-800 dark:text-green-300 font-semibold">
              We do NOT sell, share, rent, or disclose data to third parties except as required by law.
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section className="border-l-4 border-purple-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Your Privacy Rights
          </h2>

          <h3 className="text-lg font-semibold mt-4 mb-3 text-gray-900 dark:text-dark-text-primary">
            Opt-Out of Analytics
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            You can opt out of analytics tracking by:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-2">
            <li>Enabling "Do Not Track" (DNT) in your browser settings</li>
            <li>Using browser extensions that block analytics (e.g., uBlock Origin, Privacy Badger)</li>
            <li>Disabling JavaScript in your browser (though this will limit site functionality)</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Request Data Deletion
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Since we collect minimal analytics data and do not store personally identifiable information,
            there is typically no personal data to delete. However, if you have concerns or wish to
            request deletion of any stored analytics data, contact us at:{' '}
            <a
              href="mailto:calebnew@usc.edu?subject=Privacy%20Data%20Deletion%20Request"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              calebnew@usc.edu
            </a>
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Contact for Privacy Concerns
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            For any privacy-related questions or concerns, please email:{' '}
            <a
              href="mailto:calebnew@usc.edu?subject=Privacy%20Policy%20Inquiry"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              calebnew@usc.edu
            </a>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            We will respond to privacy inquiries within <strong>3 business days</strong>.
          </p>
        </section>

        {/* Security */}
        <section className="border-l-4 border-red-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
            <Lock className="w-6 h-6 text-red-600 dark:text-red-400" />
            Security Measures
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We implement industry-standard security measures to protect your data:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>
              <strong>HTTPS Encryption:</strong> All data transmitted between your browser and our
              servers is encrypted using TLS/SSL.
            </li>
            <li>
              <strong>No Sensitive Data Storage:</strong> We do not store sensitive personal information,
              health data, or payment information.
            </li>
            <li>
              <strong>Regular Security Audits:</strong> We periodically review our codebase and
              infrastructure for security vulnerabilities.
            </li>
            <li>
              <strong>Secure Hosting:</strong> This site is hosted on Vercel, a trusted platform
              with enterprise-grade security.
            </li>
          </ul>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-400 rounded-lg p-4 mt-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <strong>Important:</strong> While we take security seriously, no internet transmission
              is 100% secure. Use this site at your own discretion.
            </p>
          </div>
        </section>

        {/* Third-Party Services */}
        <section className="border-l-4 border-gray-400 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Third-Party Services
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This site may use the following third-party services:
          </p>

          <h3 className="text-lg font-semibold mt-4 mb-3 text-gray-900 dark:text-dark-text-primary">
            Analytics
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            We may use privacy-focused analytics tools like Plausible Analytics (
            <a
              href="https://plausible.io/data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              privacy policy
            </a>
            ), which do not use cookies or collect personal data.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Hosting
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            This site is hosted on Vercel (
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              privacy policy
            </a>
            ), which may collect server logs as part of normal operations.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            External Links
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            This site contains links to external websites (e.g., Census Bureau, California DHHS).
            We are not responsible for the privacy practices of these external sites. Please review
            their privacy policies separately.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="border-l-4 border-orange-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Children's Privacy
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            This site is intended for general audiences and does not knowingly collect information
            from children under 13. If you believe we have inadvertently collected data from a child,
            please contact us immediately at{' '}
            <a
              href="mailto:calebnew@usc.edu"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              calebnew@usc.edu
            </a>.
          </p>
        </section>

        {/* Changes to Policy */}
        <section className="border-l-4 border-indigo-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Changes to This Privacy Policy
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            We may update this privacy policy periodically to reflect changes in our practices or
            legal requirements. The "Last Updated" date at the top of this page will reflect any changes.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Material changes will be prominently announced on the dashboard homepage. Continued use
            of the site after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Contact Us
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            For privacy-related questions, concerns, or requests, please contact:
          </p>

          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:calebnew@usc.edu?subject=Privacy%20Policy%20Inquiry"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                calebnew@usc.edu
              </a>
            </p>
            <p>
              <strong>Subject Line:</strong> "Privacy Policy Inquiry"
            </p>
            <p>
              <strong>Response Time:</strong> Within 3 business days
            </p>
          </div>
        </section>

      </div>

      {/* Navigation Links */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-4">
        <Link
          href="/terms"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          View Terms of Use
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
