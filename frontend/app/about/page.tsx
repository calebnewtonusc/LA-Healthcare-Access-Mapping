import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AlertTriangle, Mail, Github, Linkedin, BookOpen, Database, GraduationCap, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | LA Healthcare Access Dashboard',
  description: 'Learn about the author, methodology, and limitations of this independent student research project analyzing healthcare access in Los Angeles County.',
  keywords: 'about, author, Caleb Newton, USC, student research, academic project, healthcare access study',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Critical Disclaimer Banner */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-6 mb-12">
        <div className="flex gap-4">
          <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-3">
              Important: This is an Educational Research Project
            </h2>
            <div className="space-y-2 text-sm text-yellow-800 dark:text-yellow-300">
              <p>
                This dashboard represents <strong>independent student research</strong> conducted for educational purposes.
                It has <strong>not been peer-reviewed</strong> or validated by public health experts, government agencies,
                or healthcare professionals.
              </p>
              <p>
                This analysis is <strong>not affiliated with</strong> the LA County Department of Public Health,
                California Department of Health and Human Services, or any government entity.
              </p>
              <p className="font-semibold">
                Data estimates have ±30-50% uncertainty. Policy decisions should be based on expert consultation
                and validated research, not solely on this dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Author Credentials */}
      <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Image
            src="/caleb-usc.jpg"
            alt="Caleb Newton at USC"
            width={160}
            height={160}
            className="rounded-lg object-cover border-2 border-blue-500 shadow-md"
            style={{ objectPosition: 'center 30%' }}
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
                Caleb Newton
              </h1>
            </div>

            <div className="space-y-3 text-gray-700 dark:text-dark-text-secondary">
              <p className="text-lg">
                <strong>Student Researcher</strong><br />
                University of Southern California
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="mailto:calebnew@usc.edu"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  calebnew@usc.edu
                </a>
                <a
                  href="https://github.com/calebnewtonusc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://linkedin.com/in/caleb-newton-3680041a5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-dark-text-primary">
            About This Project
          </h3>
          <p className="text-gray-700 dark:text-dark-text-secondary mb-3">
            This dashboard was developed as an independent academic research project to explore geospatial analysis
            techniques and public health data visualization. The goal was to create an educational tool demonstrating
            how data science can be applied to healthcare access challenges.
          </p>
          <p className="text-gray-700 dark:text-dark-text-secondary">
            Built with Next.js, Python (FastAPI), and various geospatial libraries, this project serves as a
            portfolio demonstration of full-stack data engineering and visualization skills.
          </p>
        </div>
      </div>

      {/* Project Context */}
      <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Project Context
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-dark-text-primary">
              Timeline
            </h3>
            <p className="text-gray-700 dark:text-dark-text-secondary">
              Conducted between October 2024 and February 2025 as part of independent study in data science
              and public health applications.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-dark-text-primary">
              Purpose
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-dark-text-secondary">
              <li>Educational exercise in geospatial data analysis</li>
              <li>Demonstration of full-stack data engineering capabilities</li>
              <li>Exploration of public health data visualization techniques</li>
              <li>Portfolio project showcasing technical skills</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-dark-text-primary">
              Scope & Limitations
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-dark-text-secondary">
              <li>Demonstration tool, not official policy guidance</li>
              <li>Not peer-reviewed or validated by domain experts</li>
              <li>Cost estimates based on industry averages (±30-50% uncertainty)</li>
              <li>Distance calculations use straight-line distance, not actual travel time</li>
              <li>Does not account for facility capacity, wait times, or quality of care</li>
              <li>Data reflects 2020 Census demographics, may not represent current population</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-dark-text-primary">
              For Policymakers & Researchers
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                If you are a policymaker, public health official, or researcher, please treat this dashboard
                as a <strong>starting point for discussion</strong> rather than a source of validated recommendations.
                Any policy decisions should be based on:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>Peer-reviewed research and validated methodologies</li>
                <li>Consultation with domain experts and community stakeholders</li>
                <li>Comprehensive needs assessments and feasibility studies</li>
                <li>Consideration of factors not captured in this analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sources & Acknowledgments */}
      <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
          <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Data Sources & Acknowledgments
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">
              Primary Data Sources
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-dark-text-secondary">
              <li>
                <strong>U.S. Census Bureau:</strong> 2020 Decennial Census and American Community Survey (ACS) 5-Year Estimates
                for population demographics, household characteristics, and income data
              </li>
              <li>
                <strong>California Department of Health and Human Services (CHHS):</strong> Licensed Healthcare Facility
                database from the Open Data Portal
              </li>
              <li>
                <strong>U.S. Census Bureau TIGER/Line Shapefiles:</strong> Census tract geographic boundaries for spatial analysis
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">
              Methodology References
            </h3>
            <p className="text-sm text-gray-700 dark:text-dark-text-secondary mb-2">
              Distance calculations, access scoring, and cost estimation methodologies were informed by:
            </p>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-dark-text-secondary list-disc list-inside">
              <li>Health Resources and Services Administration (HRSA) HPSA designation criteria</li>
              <li>RSMeans Construction Cost Data</li>
              <li>Becker's Hospital Review industry benchmarks</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">
              No Funding or Conflicts of Interest
            </h3>
            <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
              This project received no external funding and was completed independently. The author has no financial
              interests or affiliations that could influence this analysis.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">
              Open Data Community
            </h3>
            <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
              This project would not be possible without the open data initiatives of government agencies and the
              broader open-source community. Special thanks to all contributors to the datasets and tools used.
            </p>
          </div>
        </div>
      </div>

      {/* Links to Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/methodology"
          className="block p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
        >
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-dark-text-primary">
            View Detailed Methodology →
          </h3>
          <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
            Learn about data processing, analysis techniques, and calculation methodologies
          </p>
        </Link>

        <Link
          href="/data-dictionary"
          className="block p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
        >
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-dark-text-primary">
            Data Dictionary →
          </h3>
          <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
            Comprehensive documentation of all data fields, sources, and caveats
          </p>
        </Link>
      </div>

      {/* License */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This project's content is licensed under{' '}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Creative Commons Attribution 4.0 International (CC BY 4.0)
          </a>
          .
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Source code available on{' '}
          <a
            href="https://github.com/calebnewtonusc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            GitHub
          </a>
          {' '}under MIT License.
        </p>
      </div>
    </div>
  )
}
