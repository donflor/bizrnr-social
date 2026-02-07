'use client'

import { useState } from 'react'

interface ScheduledPost {
  id: string
  content: string
  scheduled_for: string
  platforms: { icon: string; name: string }[]
  status: 'scheduled' | 'pending' | 'failed'
}

export default function QueuePage() {
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [currentDate, setCurrentDate] = useState(new Date())

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate)

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Content Queue</h1>
          <p className="text-gray-600 text-sm lg:text-base mt-1">Manage your scheduled posts</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
              }`}
            >
              📋 List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'calendar' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
              }`}
            >
              📅 Calendar
            </button>
          </div>
          <a
            href="/create"
            className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center text-sm lg:text-base"
          >
            + New Post
          </a>
        </div>
      </div>

      {view === 'calendar' ? (
        /* Calendar View */
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Calendar Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ←
            </button>
            <h2 className="font-semibold text-gray-900">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before first of month */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square p-1" />
              ))}
              
              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
                return (
                  <div
                    key={day}
                    className={`aspect-square p-1 border rounded-lg ${
                      isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-300'
                    } cursor-pointer transition-colors`}
                  >
                    <div className={`text-xs ${isToday ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
                      {day}
                    </div>
                    {/* Post indicators would go here */}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="p-4 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Published</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span>Draft</span>
            </div>
          </div>
        </div>
      ) : posts.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 lg:p-12 text-center">
          <span className="text-5xl lg:text-6xl">📭</span>
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mt-4">Your queue is empty</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm lg:text-base">
            Schedule your first post to start building your social media presence.
          </p>
          <a
            href="/create"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base"
          >
            Create Your First Post
          </a>
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <p className="text-gray-800 line-clamp-3">{post.content}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <div className="flex gap-1">
                      {post.platforms.map((p, i) => (
                        <span key={i} className="text-lg" title={p.name}>{p.icon}</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      📅 {new Date(post.scheduled_for).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex sm:flex-col gap-2">
                  <button className="flex-1 sm:flex-none px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                    Edit
                  </button>
                  <button className="flex-1 sm:flex-none px-4 py-2 text-sm text-red-600 border border-gray-200 rounded-lg hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bulk Actions */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <span className="text-2xl">📤</span>
            <p className="text-sm font-medium mt-2">Bulk Upload</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <span className="text-2xl">📋</span>
            <p className="text-sm font-medium mt-2">Import CSV</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <span className="text-2xl">🔄</span>
            <p className="text-sm font-medium mt-2">Reschedule All</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
            <span className="text-2xl">📰</span>
            <p className="text-sm font-medium mt-2">RSS Import</p>
          </button>
        </div>
      </div>
    </div>
  )
}
