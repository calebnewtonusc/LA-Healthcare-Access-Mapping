import type { Metadata } from 'next'
import { HomeContent } from '@/components/home-content'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const metadata: Metadata = {
  title: 'LA Healthcare Access Dashboard: GIS Analysis & Educational Demo',
  description: 'Educational geospatial analysis exploring healthcare facility access across 2,498 LA County census tracts serving 9.9 million residents. Interactive visualization demonstrating GIS techniques.',
  openGraph: {
    title: 'LA Healthcare Access Dashboard: GIS Analysis & Educational Demo',
    description: 'Educational geospatial analysis exploring healthcare access patterns across Los Angeles County.',
    url: 'https://la-healthcare-access-mapping.vercel.app',
    type: 'website',
  },
  alternates: {
    canonical: 'https://la-healthcare-access-mapping.vercel.app',
  },
}

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

export default async function HomePage() {
  const stats = await getStats()

  return <HomeContent stats={stats} />
}
