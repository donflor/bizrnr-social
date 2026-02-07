'use client'

import { useState } from 'react'

interface Message {
  id: string
  platform: string
  platformIcon: string
  author: string
  authorHandle: string
  content: string
  type: 'comment' | 'dm' | 'mention'
  postPreview?: string
  timestamp: string
  read: boolean
}

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [filter, setFilter] = useState<'all' | 'comments' | 'dms' | 'mentions'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const filters = [
    { id: 'all', name: 'All', count: 0 },
    { id: 'comments', name: 'Comments', count: 0 },
    { id: 'dms', name: 'DMs', count: 0 },
    { id: 'mentions', name: 'Mentions', count: 0 },
  ]

  return (
    <div className="p-4 lg:p-8 h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Social Inbox</h1>
        <p className="text-gray-600 text-sm lg:text-base mt-1">Manage all your social interactions in one place</p>
      </div>

      {/* Filters - Scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.id
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f.name}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              filter === f.id ? 'bg-blue-500' : 'bg-gray-100'
            }`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {messages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 lg:p-12 text-center">
          <span className="text-5xl lg:text-6xl">💬</span>
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mt-4">Your inbox is empty</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm lg:text-base">
            Comments, DMs, and mentions from your connected accounts will appear here.
          </p>
          <a
            href="/accounts"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base"
          >
            Connect Accounts
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100">
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    !message.read ? 'bg-blue-50' : ''
                  } ${selectedMessage?.id === message.id ? 'bg-gray-100' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{message.platformIcon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 truncate">{message.author}</span>
                        <span className="text-gray-400 text-xs">@{message.authorHandle}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{message.content}</p>
                      <p className="text-gray-400 text-xs mt-2">{message.timestamp}</p>
                    </div>
                    {!message.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hidden lg:block">
            {selectedMessage ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{selectedMessage.platformIcon}</span>
                  <div>
                    <p className="font-semibold">{selectedMessage.author}</p>
                    <p className="text-gray-500 text-sm">@{selectedMessage.authorHandle}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">{selectedMessage.content}</p>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Reply
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    ❤️
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    •••
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features Info */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">🚀 Coming Soon</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '💬', title: 'Reply directly', desc: 'Respond to comments & DMs' },
            { icon: '🏷️', title: 'Tags & labels', desc: 'Organize conversations' },
            { icon: '⚡', title: 'Quick replies', desc: 'Saved response templates' },
            { icon: '📊', title: 'Sentiment', desc: 'AI-powered analysis' },
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-2xl">{feature.icon}</span>
              <div>
                <p className="font-medium text-gray-900 text-sm">{feature.title}</p>
                <p className="text-gray-500 text-xs">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
