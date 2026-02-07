'use client'

import { useEffect, useState } from 'react'
import StatsCard from './StatsCard'
import RecentPosts from './RecentPosts'
import UpcomingPosts from './UpcomingPosts'
import PlatformOverview from './PlatformOverview'

interface DashboardStats {
  total_published: number
  total_scheduled: number
  total_drafts: number
  total_impressions: number
  total_engagement: number
  total_clicks: number
  total_leads: number
  connected_accounts: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    total_published: 0,
    total_scheduled: 0,
    total_drafts: 0,
    total_impressions: 0,
    total_engagement: 0,
    total_clicks: 0,
    total_leads: 0,
    connected_accounts: 0,
  })

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 text-sm lg:text-base mt-1">Overview of your social media performance</p>
      </div>

      {/* Stats Grid - 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <StatsCard
          title="Published"
          value={stats.total_published}
          subtitle="Total posts"
          icon="📤"
          color="blue"
        />
        <StatsCard
          title="Scheduled"
          value={stats.total_scheduled}
          subtitle="In queue"
          icon="📅"
          color="purple"
        />
        <StatsCard
          title="Engagement"
          value={stats.total_engagement}
          subtitle="Total"
          icon="❤️"
          color="pink"
        />
        <StatsCard
          title="Leads"
          value={stats.total_leads}
          subtitle="Generated"
          icon="🎯"
          color="green"
        />
      </div>

      {/* Quick Actions - Mobile */}
      <div className="lg:hidden grid grid-cols-2 gap-3 mb-6">
        <a
          href="/create"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-medium"
        >
          <span>✍️</span> Create Post
        </a>
        <a
          href="/queue"
          className="flex items-center justify-center gap-2 bg-gray-800 text-white py-4 rounded-xl font-medium"
        >
          <span>📅</span> View Queue
        </a>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Upcoming Posts */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <UpcomingPosts />
        </div>

        {/* Platform Overview */}
        <div className="order-1 lg:order-2">
          <PlatformOverview />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 lg:mt-8">
        <RecentPosts />
      </div>
    </div>
  )
}
