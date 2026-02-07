'use client'

import { useState } from 'react'

interface Campaign {
  id: string
  name: string
  description: string
  goal: string
  startDate: string
  endDate: string
  status: 'active' | 'scheduled' | 'completed' | 'paused'
  posts: number
  engagement: number
  leads: number
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [showCreate, setShowCreate] = useState(false)

  const goals = [
    { id: 'awareness', name: 'Brand Awareness', icon: '👁️' },
    { id: 'engagement', name: 'Engagement', icon: '❤️' },
    { id: 'traffic', name: 'Website Traffic', icon: '🔗' },
    { id: 'leads', name: 'Lead Generation', icon: '🎯' },
    { id: 'sales', name: 'Sales/Conversions', icon: '💰' },
  ]

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600 text-sm lg:text-base mt-1">Organize and track your marketing campaigns</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <span>+</span> New Campaign
        </button>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6">
        {[
          { label: 'Active', value: 0, color: 'green' },
          { label: 'Scheduled', value: 0, color: 'blue' },
          { label: 'Total Posts', value: 0, color: 'purple' },
          { label: 'Total Leads', value: 0, color: 'orange' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-2xl lg:text-3xl font-bold">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {campaigns.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 lg:p-12 text-center">
          <span className="text-5xl lg:text-6xl">🎯</span>
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mt-4">No campaigns yet</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm lg:text-base">
            Create campaigns to organize your posts and track performance toward specific goals.
          </p>
          <button
            onClick={() => setShowCreate(true)}
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base"
          >
            Create Your First Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6 hover:border-blue-200 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                  campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                  campaign.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {campaign.status}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{campaign.description}</p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-lg font-bold">{campaign.posts}</p>
                  <p className="text-xs text-gray-500">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{campaign.engagement}</p>
                  <p className="text-xs text-gray-500">Engagement</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{campaign.leads}</p>
                  <p className="text-xs text-gray-500">Leads</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Campaign Ideas */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">💡 Campaign Ideas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Product Launch', desc: 'Build anticipation for new features', icon: '🚀' },
            { name: 'Weekly Tips', desc: 'Share valuable insights every week', icon: '📚' },
            { name: 'Customer Stories', desc: 'Showcase success stories', icon: '⭐' },
            { name: 'Behind the Scenes', desc: 'Show your team and process', icon: '🎬' },
            { name: 'Industry News', desc: 'Comment on trends and news', icon: '📰' },
            { name: 'Seasonal Promo', desc: 'Holiday and event-based content', icon: '🎉' },
          ].map((idea, i) => (
            <button
              key={i}
              onClick={() => setShowCreate(true)}
              className="p-4 bg-white rounded-lg border border-gray-200 text-left hover:border-blue-300 transition-colors"
            >
              <span className="text-2xl">{idea.icon}</span>
              <p className="font-medium text-gray-900 mt-2">{idea.name}</p>
              <p className="text-gray-500 text-sm mt-1">{idea.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 lg:p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create Campaign</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="p-4 lg:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g., Q1 Product Launch"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Describe the campaign goals..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
                <div className="grid grid-cols-2 gap-2">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-blue-300 text-left"
                    >
                      <span>{goal.icon}</span>
                      <span className="text-sm">{goal.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="p-4 lg:p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
