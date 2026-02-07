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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your social media performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Posts"
          value={stats.total_published}
          subtitle="Published"
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
          subtitle="Likes, comments, shares"
          icon="❤️"
          color="pink"
        />
        <StatsCard
          title="Leads Generated"
          value={stats.total_leads}
          subtitle="From social"
          icon="🎯"
          color="green"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Impressions"
          value={stats.total_impressions.toLocaleString()}
          subtitle="Total reach"
          icon="👁️"
          color="indigo"
          size="small"
        />
        <StatsCard
          title="Clicks"
          value={stats.total_clicks}
          subtitle="Link clicks"
          icon="🔗"
          color="cyan"
          size="small"
        />
        <StatsCard
          title="Connected"
          value={stats.connected_accounts}
          subtitle="Accounts"
          icon="🔌"
          color="orange"
          size="small"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Posts */}
        <div className="lg:col-span-2">
          <UpcomingPosts />
        </div>

        {/* Platform Overview */}
        <div>
          <PlatformOverview />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <RecentPosts />
      </div>
    </div>
  )
}
