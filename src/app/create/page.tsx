'use client'

import { useState } from 'react'

const platforms = [
  { id: 'twitter', name: 'Twitter/X', icon: '𝕏', limit: 280 },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', limit: 3000 },
  { id: 'instagram', name: 'Instagram', icon: '📸', limit: 2200 },
  { id: 'facebook', name: 'Facebook', icon: '📘', limit: 63206 },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', limit: 2200 },
  { id: 'threads', name: 'Threads', icon: '🧵', limit: 500 },
]

const contentTypes = [
  { id: 'post', name: 'Post', icon: '📝' },
  { id: 'thread', name: 'Thread', icon: '🧵' },
  { id: 'story', name: 'Story', icon: '📖' },
  { id: 'reel', name: 'Reel/Video', icon: '🎬' },
]

export default function CreatePost() {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [contentType, setContentType] = useState('post')
  const [firstComment, setFirstComment] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [hashtags, setHashtags] = useState<string[]>([])
  const [linkUrl, setLinkUrl] = useState('')

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const generateWithAI = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setContent("🚀 Ready to automate your business? BizRnr's AI-powered platform handles lead generation, scheduling, and follow-ups while you focus on closing deals.\n\n✅ Voice AI that books appointments\n✅ Smart email sequences\n✅ 24/7 lead capture\n\nStart your free trial today! 👇")
      setHashtags(['BusinessAutomation', 'AI', 'SalesAutomation', 'SmallBusiness', 'Productivity'])
      setIsGenerating(false)
    }, 1500)
  }

  const getMinCharLimit = () => {
    if (selectedPlatforms.length === 0) return 280
    return Math.min(...selectedPlatforms.map((p) => platforms.find(pl => pl.id === p)?.limit || 280))
  }

  const suggestedTimes = [
    { label: 'Best Time', value: '10:00', day: 'Tomorrow' },
    { label: 'Peak Hours', value: '14:00', day: 'Tomorrow' },
    { label: 'Evening', value: '19:00', day: 'Tomorrow' },
  ]

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Create Post</h1>
        <p className="text-gray-600 text-sm lg:text-base mt-1">Compose and schedule your content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Content Type - Mobile scrollable */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Content Type</label>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 whitespace-nowrap transition-all ${
                    contentType === type.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span>{type.icon}</span>
                  <span className="text-sm font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <label className="text-sm font-medium text-gray-700">Content</label>
              <button
                onClick={generateWithAI}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 w-full sm:w-auto"
              >
                <span>🤖</span>
                {isGenerating ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? Share something valuable with your audience..."
              className="w-full h-40 lg:h-48 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-3">
              <span className={`text-sm ${content.length > getMinCharLimit() ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                {content.length} / {getMinCharLimit()} characters
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg" title="Add Image">
                  📷
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg" title="Add Video">
                  🎥
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg" title="Add Link">
                  🔗
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg" title="Add GIF">
                  GIF
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg" title="Emoji">
                  😊
                </button>
              </div>
            </div>
          </div>

          {/* Hashtags */}
          {hashtags.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Suggested Hashtags</label>
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => setContent(prev => prev + ` #${tag}`)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full hover:bg-blue-100 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Platform Selection */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Platforms</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`flex items-center gap-2 lg:gap-3 p-3 lg:p-4 rounded-lg border-2 transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl lg:text-2xl">{platform.icon}</span>
                  <span className="text-sm lg:text-base font-medium truncate">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">Schedule</label>
            
            {/* Quick Schedule Options */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
                Post Now
              </button>
              {suggestedTimes.map((time, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    setScheduledDate(tomorrow.toISOString().split('T')[0])
                    setScheduledTime(time.value)
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200"
                >
                  {time.label} ({time.value})
                </button>
              ))}
            </div>

            {/* Custom Schedule */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Date</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Time</label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-4 lg:p-6 flex items-center justify-between text-left"
            >
              <span className="text-sm font-medium text-gray-700">Advanced Options</span>
              <span className="text-gray-400">{showAdvanced ? '▲' : '▼'}</span>
            </button>
            
            {showAdvanced && (
              <div className="px-4 lg:px-6 pb-4 lg:pb-6 space-y-4 border-t border-gray-100 pt-4">
                {/* First Comment (Instagram) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Comment (Instagram)
                  </label>
                  <textarea
                    value={firstComment}
                    onChange={(e) => setFirstComment(e.target.value)}
                    placeholder="Add hashtags or extra context as a first comment..."
                    className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  />
                </div>

                {/* Link URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link URL (with tracking)
                  </label>
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://bizrnr.com/..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Campaign */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option value="">No campaign</option>
                    <option value="launch">Product Launch</option>
                    <option value="awareness">Brand Awareness</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Fixed on desktop, stacked on mobile */}
        <div className="space-y-4 lg:space-y-6">
          {/* Preview */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[150px] lg:min-h-[200px]">
              {content ? (
                <p className="text-gray-800 whitespace-pre-wrap text-sm">{content}</p>
              ) : (
                <p className="text-gray-400 text-sm">Your post preview will appear here...</p>
              )}
            </div>
          </div>

          {/* Actions - Sticky on mobile */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6 space-y-3 lg:sticky lg:top-4">
            <button
              disabled={!content || selectedPlatforms.length === 0}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
            >
              {scheduledDate ? '📅 Schedule Post' : '📤 Post Now'}
            </button>
            <button className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm lg:text-base">
              💾 Save as Draft
            </button>
            <button className="w-full py-3 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm lg:text-base">
              📋 Add to Queue
            </button>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100 p-4 lg:p-6">
            <h3 className="font-medium text-purple-900 mb-2 text-sm lg:text-base">💡 Pro Tips</h3>
            <ul className="space-y-1.5 text-xs lg:text-sm text-purple-800">
              <li>• Include a clear call-to-action</li>
              <li>• Use 3-5 relevant hashtags</li>
              <li>• Add engaging visuals</li>
              <li>• Ask questions to boost engagement</li>
              <li>• Best times: Tue-Thu 10am-12pm</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
