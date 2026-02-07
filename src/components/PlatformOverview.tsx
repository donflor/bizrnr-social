'use client'

const platforms = [
  { name: 'Twitter/X', icon: '𝕏', color: '#000000', connected: false, followers: 0 },
  { name: 'LinkedIn', icon: '💼', color: '#0A66C2', connected: false, followers: 0 },
  { name: 'Instagram', icon: '📸', color: '#E4405F', connected: false, followers: 0 },
  { name: 'Facebook', icon: '📘', color: '#1877F2', connected: false, followers: 0 },
  { name: 'TikTok', icon: '🎵', color: '#000000', connected: false, followers: 0 },
]

export default function PlatformOverview() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-4 lg:p-6 border-b border-gray-100">
        <h2 className="text-base lg:text-lg font-semibold text-gray-900">Connected Platforms</h2>
      </div>

      <div className="p-3 lg:p-4">
        <div className="space-y-2 lg:space-y-3">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center justify-between p-2 lg:p-3 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="flex items-center gap-2 lg:gap-3">
                <span className="text-xl lg:text-2xl">{platform.icon}</span>
                <div>
                  <p className="font-medium text-gray-900 text-sm lg:text-base">{platform.name}</p>
                  {platform.connected ? (
                    <p className="text-xs lg:text-sm text-gray-500">{platform.followers.toLocaleString()} followers</p>
                  ) : (
                    <p className="text-xs lg:text-sm text-gray-400">Not connected</p>
                  )}
                </div>
              </div>
              {platform.connected ? (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  ✓
                </span>
              ) : (
                <a
                  href="/accounts"
                  className="px-2 lg:px-3 py-1 lg:py-1.5 bg-blue-600 text-white text-xs lg:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Connect
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 lg:mt-4 p-3 lg:p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs lg:text-sm text-blue-800">
            <strong>Coming Soon:</strong> Connect your accounts to start scheduling posts.
          </p>
        </div>
      </div>
    </div>
  )
}
