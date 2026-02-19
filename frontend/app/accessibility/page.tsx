import type { Metadata } from 'next'
import Link from 'next/link'
import { Accessibility, CheckCircle, AlertTriangle, Mail, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Accessibility Statement | LA Healthcare Access Dashboard',
  description: 'Accessibility statement for the LA Healthcare Access Dashboard. Learn about our commitment to WCAG 2.1 Level AA compliance, current accessibility features, and how to report issues.',
  keywords: 'accessibility, WCAG, screen reader, keyboard navigation, color contrast, a11y',
}

function ConformanceSection() {
  return (
    <section className="border-l-4 border-green-500 pl-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">Conformance Status</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        We aim to conform to the{' '}
        <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
          Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
        </a>.
        These guidelines explain how to make web content more accessible to people with disabilities, including those who are blind or have low vision, deaf or hard of hearing, have limited mobility, or use assistive technologies.
      </p>
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
        <p className="text-sm text-green-800 dark:text-green-300">
          <strong>Conformance Level:</strong> We are actively working toward full WCAG 2.1 Level AA compliance. While some features may not yet meet all criteria, we are committed to continuous improvement.
        </p>
      </div>
    </section>
  )
}

function AccessibilityFeaturesSection() {
  return (
    <section className="border-l-4 border-purple-500 pl-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
        <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        Current Accessibility Features
      </h2>
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">Keyboard Navigation</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">All interactive elements are accessible via keyboard using Tab, Shift+Tab, Enter/Space, and Arrow keys. Visible focus indicators highlight the currently selected element.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">Screen Reader Compatibility</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Compatible with NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS), and TalkBack (Android). All content includes semantic HTML, ARIA labels, and descriptive text.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">Color Contrast & Visual Design</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
            <li>Color contrast ratios meet WCAG AA minimums (4.5:1 for normal text, 3:1 for large text)</li>
            <li>Information conveyed using multiple indicators (color + icon + text)</li>
            <li>Dark mode support in both light and dark themes</li>
            <li>Text remains legible when zoomed up to 200%</li>
          </ul>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">Reduced Motion Support</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">Respects your system&apos;s &quot;prefers-reduced-motion&quot; setting. If you have motion sensitivity or vestibular disorders, animations will be minimized automatically.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">Alternative Text & Descriptions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
            <li>All images and icons have descriptive alternative text</li>
            <li>Charts and visualizations include text descriptions of data</li>
            <li>Data tables provided as alternatives to visual charts</li>
          </ul>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">Touch Target Sizes</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">All interactive elements meet minimum touch target sizes of 44×44 pixels on mobile devices.</p>
        </div>
      </div>
    </section>
  )
}

function KnownLimitationsSection() {
  return (
    <section className="border-l-4 border-yellow-500 pl-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        Known Limitations
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">Despite our efforts, some limitations currently exist. We are actively working to address these:</p>
      <div className="space-y-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h3 className="text-base font-semibold mb-2 text-yellow-900 dark:text-yellow-200">Map Visualizations</h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-300">Interactive maps may not be fully accessible to screen reader users. We provide data tables as alternatives, but the visual map experience is inherently limited for non-visual users.</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h3 className="text-base font-semibold mb-2 text-yellow-900 dark:text-yellow-200">Third-Party Content</h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-300">Some external links may not be fully accessible. We cannot control the accessibility of external websites.</p>
        </div>
      </div>
    </section>
  )
}

function ReportingAndTechSection() {
  return (
    <>
      <section className="border-l-4 border-red-500 pl-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
          <Mail className="w-6 h-6 text-red-600 dark:text-red-400" />
          Report Accessibility Issues
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We welcome your feedback on the accessibility of this site. If you encounter accessibility barriers or have suggestions for improvement, please let us know:
        </p>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <h3 className="text-base font-semibold mb-3 text-red-900 dark:text-red-200">Contact Information</h3>
          <div className="space-y-2 text-sm text-red-800 dark:text-red-300">
            <p><strong>Email:</strong>{' '}
              <a href="mailto:calebnew@usc.edu?subject=Accessibility%20Issue" className="text-red-700 dark:text-red-400 hover:underline font-semibold">
                calebnew@usc.edu
              </a>
            </p>
            <p><strong>Subject Line:</strong> &quot;Accessibility Issue&quot;</p>
            <p><strong>Response Time:</strong> Within 3 business days</p>
          </div>
          <h3 className="text-base font-semibold mt-4 mb-2 text-red-900 dark:text-red-200">When Reporting Issues, Please Include:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-red-800 dark:text-red-300 ml-4">
            <li>A description of the accessibility barrier you encountered</li>
            <li>The specific page or URL where you found the issue</li>
            <li>Your assistive technology (e.g., &quot;NVDA 2024.1 on Windows 11&quot;)</li>
            <li>Your browser and version (e.g., &quot;Chrome 120 on macOS&quot;)</li>
          </ul>
        </div>
      </section>

      <section className="border-l-4 border-indigo-500 pl-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
          <Wrench className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          Technical Specifications
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-3">This website&apos;s accessibility relies on the following technologies:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
          <li><strong>HTML5:</strong> Semantic HTML elements for proper document structure</li>
          <li><strong>WAI-ARIA:</strong> Accessible Rich Internet Applications attributes for dynamic content</li>
          <li><strong>CSS3:</strong> Modern styling with support for user preferences (dark mode, reduced motion)</li>
          <li><strong>React 19:</strong> Component-based UI with accessibility hooks</li>
          <li><strong>Next.js 16:</strong> Server-side rendering for better performance and SEO</li>
        </ul>
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">Browser Compatibility</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
          <li>Chrome/Edge 100+ (Windows, macOS, Linux)</li>
          <li>Firefox 100+ (Windows, macOS, Linux)</li>
          <li>Safari 15+ (macOS, iOS)</li>
          <li>Mobile browsers (iOS Safari, Chrome on Android)</li>
        </ul>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-dark-text-primary">Formal Approval & Compliance</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          While this site is an educational research project and not subject to formal accessibility audits, we strive to meet or exceed WCAG 2.1 Level AA standards voluntarily. This accessibility statement was last reviewed on{' '}
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
        </p>
      </section>
    </>
  )
}

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-3">
          <Accessibility className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          Accessibility Statement
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        <section className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">Our Commitment to Accessibility</h2>
          <p className="text-gray-700 dark:text-gray-300">
            The LA Healthcare Access Dashboard is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards to ensure the site is usable by all.
          </p>
        </section>

        <ConformanceSection />
        <AccessibilityFeaturesSection />
        <KnownLimitationsSection />
        <ReportingAndTechSection />
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-4">
        <Link href="/privacy" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          View Privacy Policy
        </Link>
        <Link href="/terms" className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold">
          View Terms of Use
        </Link>
        <Link href="/" className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold">
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
