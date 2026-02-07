'use client'

import { useState } from 'react'

interface Post {
  id: string
  content: string
  published_at: string
  platforms: string[]
  engagement: {
    likes: number
    comments: number
    shares: number
  }
}

export default function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([])

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-4 lg:p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-base lg:text-lg font-semibold text-gray-900">Recent Activity</h2>
          <a href="/published" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All →
          </a>
        </div>
      </div>

      <div className="p-4 lg:p-6">
        {posts.length === 0 ? (
          <div className="text-center py-6 lg:py-8">
            <span className="text-3xl lg:text-4xl">📭</span>
            <p className="text-gray-500 mt-3 text-sm lg:text-base">No published posts yet</p>
            <p className="text-xs lg:text-sm text-gray-400 mt-1">Your published posts will appear here</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-800 text-sm line-clamp-2">{post.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-1">
                      {post.platforms.map((p, i) => (
                        <span key={i} className="text-lg">{p}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>❤️ {post.engagement.likes}</span>
                      <span>💬 {post.engagement.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">Content</th>
                    <th className="pb-3 font-medium">Platform</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Engagement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="py-4">
                        <p className="text-gray-800 line-clamp-1 max-w-md">{post.content}</p>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-1">
                          {post.platforms.map((p, i) => (
                            <span key={i} className="text-lg">{p}</span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-500">
                        {new Date(post.published_at).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>❤️ {post.engagement.likes}</span>
                          <span>💬 {post.engagement.comments}</span>
                          <span>🔄 {post.engagement.shares}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
