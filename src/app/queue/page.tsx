'use client'

import { useState } from 'react'

export default function QueuePage() {
  const [posts, setPosts] = useState<any[]>([])
  const [view, setView] = useState<'list' | 'calendar'>('list')

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Queue</h1>
          <p className="text-gray-600 mt-1">Manage your scheduled posts</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'calendar' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📅 Calendar
            </button>
          </div>
          <a
            href="/create"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Post
          </a>
        </div>
      </div>

      {/* Empty State */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <span className="text-6xl">📭</span>
          <h2 className="text-xl font-semibold text-gray-900 mt-4">Your queue is empty</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Schedule your first post to start building your social media presence.
          </p>
          <a
            href="/create"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Post
          </a>
        </div>
      ) : view === 'list' ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          {/* List view content */}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          {/* Calendar view content */}
          <p className="text-gray-500 text-center py-12">Calendar view coming soon...</p>
        </div>
      )}
    </div>
  )
}
