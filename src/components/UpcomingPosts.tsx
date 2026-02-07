'use client'

import { useState } from 'react'

interface ScheduledPost {
  id: string
  content: string
  scheduled_for: string
  platforms: string[]
  status: string
}

export default function UpcomingPosts() {
  const [posts, setPosts] = useState<ScheduledPost[]>([])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Posts</h2>
          <a href="/queue" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All →
          </a>
        </div>
      </div>

      <div className="p-6">
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-4xl">📅</span>
            <p className="text-gray-500 mt-3">No scheduled posts</p>
            <a
              href="/create"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Post
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
              >
                <p className="text-gray-800 line-clamp-2">{post.content}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    {post.platforms.map((platform, i) => (
                      <span key={i} className="text-lg">{platform}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(post.scheduled_for)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
