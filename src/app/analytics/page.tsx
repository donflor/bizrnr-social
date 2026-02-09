'use client'

import { useState, useEffect } from 'react'
import analytics from '@/lib/analytics'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  
  // Track analytics page view
  useEffect(() => {
    analytics.analyticsViewed()
  }, [])

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your social media performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="all">All time</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Reach', value: '0', change: '+0%', icon: '👁️' },
          { label: 'Engagement Rate', value: '0%', change: '+0%', icon: '❤️' },
          { label: 'Link Clicks', value: '0', change: '+0%', icon: '🔗' },
          { label: 'Leads Generated', value: '0', change: '+0%', icon: '🎯' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Engagement Over Time */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Over Time</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-400">Chart will appear when you have data</p>
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Breakdown</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-400">Connect platforms to see breakdown</p>
          </div>
        </div>
      </div>

      {/* Top Posts */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Posts</h3>
        <div className="text-center py-12">
          <span className="text-4xl">📊</span>
          <p className="text-gray-500 mt-3">No posts to analyze yet</p>
          <p className="text-sm text-gray-400 mt-1">Start posting to see your top performers</p>
        </div>
      </div>

      {/* Lead Attribution */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🎯</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Lead Attribution</h3>
            <p className="text-gray-600 mt-1">
              Track which posts and platforms generate the most leads for BizRnr.
              Connect your CRM to see attribution data.
            </p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
              Set Up Tracking
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
