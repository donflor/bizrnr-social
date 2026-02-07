'use client'

import { useState } from 'react'

interface PublishedPost {
  id: string
  content: string
  published_at: string
  platforms: { icon: string; name: string; postUrl?: string }[]
  metrics: {
    impressions: number
    likes: number
    comments: number
    shares: number
    clicks: number
  }
}

export default function PublishedPage() {
  const [posts, setPosts] = useState<PublishedPost[]>([])
  const [sortBy, setSortBy] = useState<'date' | 'engagement'>('date')
  const [filterPlatform, setFilterPlatform] = useState<string>('all')

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: '📱' },
    { id: 'twitter', name: 'Twitter/X', icon: '𝕏' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'facebook', name: 'Facebook', icon: '📘' },
  ]

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Published Posts</h1>
        <p className="text-gray-600 text-sm lg:text-base mt-1">Track the performance of your published content</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Platform Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setFilterPlatform(p.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterPlatform === p.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{p.icon}</span>
              <span className="hidden sm:inline">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'engagement')}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Most Recent</option>
          <option value="engagement">Top Performing</option>
        </select>
      </div>

      {posts.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 lg:p-12 text-center">
          <span className="text-5xl lg:text-6xl">✅</span>
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mt-4">No published posts yet</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm lg:text-base">
            Once you start publishing, your posts and their performance metrics will appear here.
          </p>
          <a
            href="/create"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base"
          >
            Create Your First Post
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Content */}
                <div className="flex-1">
                  <p className="text-gray-800 line-clamp-3">{post.content}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <div className="flex gap-1">
                      {post.platforms.map((p, i) => (
                        <a
                          key={i}
                          href={p.postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg hover:opacity-70"
                          title={`View on ${p.name}`}
                        >
                          {p.icon}
                        </a>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-5 gap-2 lg:gap-4 bg-gray-50 rounded-lg p-3 lg:p-4">
                  <div className="text-center">
                    <p className="text-lg font-bold">{post.metrics.impressions}</p>
                    <p className="text-xs text-gray-500">👁️</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{post.metrics.likes}</p>
                    <p className="text-xs text-gray-500">❤️</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{post.metrics.comments}</p>
                    <p className="text-xs text-gray-500">💬</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{post.metrics.shares}</p>
                    <p className="text-xs text-gray-500">🔄</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{post.metrics.clicks}</p>
                    <p className="text-xs text-gray-500">🔗</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                  📋 Copy
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                  🔄 Repost
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                  📊 Analytics
                </button>
                <button className="px-3 py-1.5 text-sm text-red-600 border border-gray-200 rounded-lg hover:bg-red-50">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Export Options */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Export & Reports</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <span className="text-2xl">📊</span>
            <p className="text-sm font-medium mt-2">Export CSV</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <span className="text-2xl">📄</span>
            <p className="text-sm font-medium mt-2">PDF Report</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <span className="text-2xl">📈</span>
            <p className="text-sm font-medium mt-2">Analytics</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <span className="text-2xl">📅</span>
            <p className="text-sm font-medium mt-2">Date Range</p>
          </button>
        </div>
      </div>
    </div>
  )
}
