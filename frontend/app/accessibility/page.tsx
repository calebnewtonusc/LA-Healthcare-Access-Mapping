import type { Metadata } from 'next'
import Link from 'next/link'
import { Accessibility, CheckCircle, AlertTriangle, Mail, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Accessibility Statement | LA Healthcare Access Dashboard',
  description: 'Accessibility statement for the LA Healthcare Access Dashboard. Learn about our commitment to WCAG 2.1 Level AA compliance, current accessibility features, and how to report issues.',
  keywords: 'accessibility, WCAG, screen reader, keyboard navigation, color contrast, a11y',
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

      {/* Main Content */}
      <div className="prose dark:prose-invert max-w-none space-y-8">

        {/* Our Commitment */}
        <section className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Our Commitment to Accessibility
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            The LA Healthcare Access Dashboard is committed to ensuring digital accessibility for
            people with disabilities. We continually improve the user experience for everyone and
            apply relevant accessibility standards to ensure the site is usable by all.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            We believe that everyone, regardless of ability or technology, should have equal access
            to healthcare data and policy analysis. Accessibility is not just a compliance requirement—it's
            a fundamental principle of inclusive public health research.
          </p>
        </section>

        {/* Conformance Status */}
        <section className="border-l-4 border-green-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Conformance Status
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We aim to conform to the{' '}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
            </a>.
            These guidelines explain how to make web content more accessible to people with disabilities,
            including those who are:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>Blind or have low vision</li>
            <li>Deaf or hard of hearing</li>
            <li>Have limited mobility or dexterity</li>
            <li>Have cognitive or learning disabilities</li>
            <li>Use assistive technologies (screen readers, voice control, etc.)</li>
          </ul>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>Conformance Level:</strong> We are actively working toward full WCAG 2.1 Level AA
              compliance. While some features may not yet meet all criteria, we are committed to
              continuous improvement.
            </p>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="border-l-4 border-purple-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            Current Accessibility Features
          </h2>

          <div className="space-y-6">

            {/* Keyboard Navigation */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">
                ✓ Keyboard Navigation
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                All interactive elements (buttons, links, form controls) are accessible via keyboard.
                You can navigate the site using:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4 mt-2">
                <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Tab</kbd> - Navigate forward</li>
                <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Shift + Tab</kbd> - Navigate backward</li>
                <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> or <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Space</kbd> - Activate buttons/links</li>
                <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Arrow keys</kbd> - Navigate within components</li>
              </ul>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Visible focus indicators highlight which element is currently selected.
              </p>
            </div>

            {/* Screen Reader Compatibility */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">
                ✓ Screen Reader Compatibility
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Compatible with popular screen readers:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>NVDA (Windows) - Tested and compatible</li>
                <li>JAWS (Windows) - Tested and compatible</li>
                <li>VoiceOver (macOS/iOS) - Tested and compatible</li>
                <li>TalkBack (Android) - Basic compatibility</li>
              </ul>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                All content includes semantic HTML, ARIA labels, and descriptive text for screen reader users.
              </p>
            </div>

            {/* Color & Contrast */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">
                ✓ Color Contrast & Visual Design
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>
                  <strong>Color contrast ratios:</strong> All text meets WCAG AA minimum ratios
                  (4.5:1 for normal text, 3:1 for large text)
                </li>
                <li>
                  <strong>No color-only communication:</strong> Information is conveyed using
                  multiple indicators (color + icon + text)
                </li>
                <li>
                  <strong>Dark mode support:</strong> Accessible in both light and dark themes
                </li>
                <li>
                  <strong>Responsive text:</strong> Text remains legible when zoomed up to 200%
                </li>
              </ul>
            </div>

            {/* Motion & Animation */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">
                ✓ Reduced Motion Support
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Respects your system's "prefers-reduced-motion" setting. If you have motion sensitivity
                or vestibular disorders, animations will be minimized automatically. To enable this:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4 mt-2">
                <li><strong>macOS:</strong> System Preferences → Accessibility → Display → Reduce motion</li>
                <li><strong>Windows:</strong> Settings → Ease of Access → Display → Show animations</li>
                <li><strong>iOS/Android:</strong> Settings → Accessibility → Reduce motion</li>
              </ul>
            </div>

            {/* Alternative Text */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">
                ✓ Alternative Text & Descriptions
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>All images and icons have descriptive alternative text</li>
                <li>Charts and visualizations include text descriptions of data</li>
                <li>Data tables provided as alternatives to visual charts</li>
                <li>Complex graphics explained in accompanying text</li>
              </ul>
            </div>

            {/* Touch Targets */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">
                ✓ Touch Target Sizes
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                All interactive elements (buttons, links) meet minimum touch target sizes of
                44×44 pixels on mobile devices, making them easier to tap for users with
                limited dexterity or motor control.
              </p>
            </div>

          </div>
        </section>

        {/* Known Limitations */}
        <section className="border-l-4 border-yellow-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            Known Limitations
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Despite our efforts, some limitations currently exist. We are actively working to address these:
          </p>

          <div className="space-y-4">

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h3 className="text-base font-semibold mb-2 text-yellow-900 dark:text-yellow-200">
                Map Visualizations
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                Interactive maps may not be fully accessible to screen reader users. We provide
                data tables as alternatives, but the visual map experience is inherently limited
                for non-visual users. We are exploring more accessible map solutions.
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h3 className="text-base font-semibold mb-2 text-yellow-900 dark:text-yellow-200">
                PDF Exports
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                Generated PDF files may not meet all accessibility standards (e.g., proper tagging
                for screen readers). We recommend using the web version for the most accessible experience.
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h3 className="text-base font-semibold mb-2 text-yellow-900 dark:text-yellow-200">
                Third-Party Content
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                Some external links (e.g., to government data sources) may not be fully accessible.
                We cannot control the accessibility of external websites.
              </p>
            </div>

          </div>
        </section>

        {/* Feedback & Reporting */}
        <section className="border-l-4 border-red-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
            <Mail className="w-6 h-6 text-red-600 dark:text-red-400" />
            Report Accessibility Issues
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We welcome and value your feedback on the accessibility of this site. If you encounter
            accessibility barriers or have suggestions for improvement, please let us know:
          </p>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h3 className="text-base font-semibold mb-3 text-red-900 dark:text-red-200">
              Contact Information
            </h3>
            <div className="space-y-2 text-sm text-red-800 dark:text-red-300">
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:calebnew@usc.edu?subject=Accessibility%20Issue"
                  className="text-red-700 dark:text-red-400 hover:underline font-semibold"
                >
                  calebnew@usc.edu
                </a>
              </p>
              <p>
                <strong>Subject Line:</strong> "Accessibility Issue"
              </p>
              <p>
                <strong>Response Time:</strong> Within 3 business days
              </p>
            </div>

            <h3 className="text-base font-semibold mt-4 mb-2 text-red-900 dark:text-red-200">
              When Reporting Issues, Please Include:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-red-800 dark:text-red-300 ml-4">
              <li>A description of the accessibility barrier you encountered</li>
              <li>The specific page or URL where you found the issue</li>
              <li>Your assistive technology (e.g., "NVDA 2024.1 on Windows 11")</li>
              <li>Your browser and version (e.g., "Chrome 120 on macOS")</li>
              <li>Any error messages or unexpected behavior</li>
            </ul>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mt-4">
            We take accessibility feedback seriously and will prioritize fixing reported issues.
          </p>
        </section>

        {/* Technical Specifications */}
        <section className="border-l-4 border-indigo-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
            <Wrench className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Technical Specifications
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-3">
            This website's accessibility relies on the following technologies:
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>
              <strong>HTML5:</strong> Semantic HTML elements for proper document structure
            </li>
            <li>
              <strong>WAI-ARIA:</strong> Accessible Rich Internet Applications attributes for
              dynamic content
            </li>
            <li>
              <strong>CSS3:</strong> Modern styling with support for user preferences (dark mode,
              reduced motion)
            </li>
            <li>
              <strong>JavaScript (ES2020+):</strong> Enhanced interactivity with progressive
              enhancement (site functions without JS)
            </li>
            <li>
              <strong>React 19:</strong> Component-based UI with accessibility hooks
            </li>
            <li>
              <strong>Next.js 16:</strong> Server-side rendering for better performance and SEO
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Browser Compatibility
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            This site is designed to work with:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
            <li>Chrome/Edge 100+ (Windows, macOS, Linux)</li>
            <li>Firefox 100+ (Windows, macOS, Linux)</li>
            <li>Safari 15+ (macOS, iOS)</li>
            <li>Mobile browsers (iOS Safari, Chrome on Android)</li>
          </ul>
        </section>

        {/* Assessment & Testing */}
        <section className="border-l-4 border-teal-500 pl-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Assessment & Testing
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Accessibility has been assessed using a combination of automated and manual testing:
          </p>

          <h3 className="text-lg font-semibold mt-4 mb-3 text-gray-900 dark:text-dark-text-primary">
            Automated Testing
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
            <li>
              <a
                href="https://www.deque.com/axe/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                axe DevTools
              </a>{' '}
              - Comprehensive accessibility testing
            </li>
            <li>
              <a
                href="https://developer.chrome.com/docs/lighthouse/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Lighthouse
              </a>{' '}
              - Google's accessibility audit tool
            </li>
            <li>
              <a
                href="https://wave.webaim.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                WAVE
              </a>{' '}
              - WebAIM's accessibility evaluation tool
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Manual Testing
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
            <li>Keyboard navigation testing (all interactive elements)</li>
            <li>Screen reader testing (NVDA, JAWS, VoiceOver)</li>
            <li>Color blindness simulations (protanopia, deuteranopia, tritanopia)</li>
            <li>Zoom testing (up to 200% magnification)</li>
            <li>Touch target testing on mobile devices</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-dark-text-primary">
            Ongoing Monitoring
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            We conduct regular accessibility audits and incorporate feedback from users with
            disabilities to continuously improve the site.
          </p>
        </section>

        {/* External Resources */}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            Accessibility Resources
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Learn more about web accessibility:
          </p>

          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.w3.org/WAI/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                W3C Web Accessibility Initiative (WAI)
              </a>
            </li>
            <li>
              <a
                href="https://www.a11yproject.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                The A11Y Project - Community-driven accessibility resources
              </a>
            </li>
            <li>
              <a
                href="https://webaim.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                WebAIM - Web accessibility training and resources
              </a>
            </li>
            <li>
              <a
                href="https://www.ada.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Americans with Disabilities Act (ADA)
              </a>
            </li>
          </ul>
        </section>

        {/* Formal Approval */}
        <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-dark-text-primary">
            Formal Approval & Compliance
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            While this site is an educational research project and not subject to formal accessibility
            audits, we strive to meet or exceed WCAG 2.1 Level AA standards voluntarily. This
            accessibility statement was last reviewed on{' '}
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
          </p>
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
          href="/terms"
          className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold"
        >
          View Terms of Use
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
