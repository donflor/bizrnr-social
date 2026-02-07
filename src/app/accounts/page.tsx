'use client'

const platforms = [
  { id: 'twitter', name: 'Twitter/X', icon: '𝕏', color: '#000000', description: 'Share updates and engage with your audience' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2', description: 'Professional networking and B2B content' },
  { id: 'instagram', name: 'Instagram', icon: '📸', color: '#E4405F', description: 'Visual content and stories' },
  { id: 'facebook', name: 'Facebook', icon: '📘', color: '#1877F2', description: 'Page management and ads' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000', description: 'Short-form video content' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', color: '#FF0000', description: 'Long-form video and Shorts' },
  { id: 'threads', name: 'Threads', icon: '🧵', color: '#000000', description: 'Text-based conversations' },
]

export default function AccountsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Connected Accounts</h1>
        <p className="text-gray-600 mt-1">Manage your social media connections</p>
      </div>

      {/* Connection Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="font-semibold text-blue-900">Platform Integration Coming Soon</h3>
            <p className="text-blue-800 mt-1">
              We're setting up direct API connections to each platform. Once ready, you'll be able to:
            </p>
            <ul className="mt-3 space-y-1 text-sm text-blue-700">
              <li>• Connect accounts with one click</li>
              <li>• Post directly from this dashboard</li>
              <li>• Track analytics in real-time</li>
              <li>• Manage all platforms in one place</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Platform List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: platform.color + '10' }}
                >
                  {platform.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                  <p className="text-sm text-gray-500">{platform.description}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                Not Connected
              </span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                0 posts • 0 followers
              </div>
              <button
                className="px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-not-allowed"
                disabled
              >
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Posting Notice */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-semibold text-yellow-900">Manual Posting Available</h3>
            <p className="text-yellow-800 mt-1">
              While we set up API connections, you can use this dashboard to:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-yellow-700">
              <li>• Draft and schedule content</li>
              <li>• Generate AI-powered posts</li>
              <li>• Manage your content calendar</li>
              <li>• Copy posts to share manually</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
