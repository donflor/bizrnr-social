'use client'

import { useState } from 'react'

const platforms = [
  { id: 'twitter', name: 'Twitter/X', icon: '𝕏' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
  { id: 'instagram', name: 'Instagram', icon: '📸' },
  { id: 'facebook', name: 'Facebook', icon: '📘' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵' },
]

export default function CreatePost() {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const generateWithAI = async () => {
    setIsGenerating(true)
    // TODO: Call AI generation API
    setTimeout(() => {
      setContent("🚀 Ready to automate your business? BizRnr's AI-powered platform handles lead generation, scheduling, and follow-ups while you focus on closing deals.\n\n✅ Voice AI that books appointments\n✅ Smart email sequences\n✅ 24/7 lead capture\n\nStart your free trial today! 👇\n#BusinessAutomation #AI #SalesAutomation")
      setIsGenerating(false)
    }, 1500)
  }

  const charLimits: Record<string, number> = {
    twitter: 280,
    linkedin: 3000,
    instagram: 2200,
    facebook: 63206,
    tiktok: 2200,
  }

  const getMinCharLimit = () => {
    if (selectedPlatforms.length === 0) return 280
    return Math.min(...selectedPlatforms.map((p) => charLimits[p]))
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Post</h1>
        <p className="text-gray-600 mt-1">Compose and schedule your social media content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <button
                onClick={generateWithAI}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <span>🤖</span>
                {isGenerating ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? Share something valuable with your audience..."
              className="w-full h-48 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <span className={`text-sm ${content.length > getMinCharLimit() ? 'text-red-500' : 'text-gray-400'}`}>
                {content.length} / {getMinCharLimit()} characters
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  📷
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  🔗
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  #️⃣
                </button>
              </div>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">Select Platforms</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{platform.icon}</span>
                  <span className="font-medium">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">Schedule</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Date</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Time</label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-3">
              💡 Best time to post: Tue/Wed 10 AM - 12 PM
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
              {content ? (
                <p className="text-gray-800 whitespace-pre-wrap text-sm">{content}</p>
              ) : (
                <p className="text-gray-400 text-sm">Your post preview will appear here...</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-3">
            <button
              disabled={!content || selectedPlatforms.length === 0}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {scheduledDate ? '📅 Schedule Post' : '📤 Post Now'}
            </button>
            <button className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
              💾 Save as Draft
            </button>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100 p-6">
            <h3 className="font-medium text-purple-900 mb-3">💡 Pro Tips</h3>
            <ul className="space-y-2 text-sm text-purple-800">
              <li>• Include a clear call-to-action</li>
              <li>• Use 3-5 relevant hashtags</li>
              <li>• Add engaging visuals</li>
              <li>• Ask questions to boost engagement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
