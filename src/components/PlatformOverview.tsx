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
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Connected Platforms</h2>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{platform.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{platform.name}</p>
                  {platform.connected ? (
                    <p className="text-sm text-gray-500">{platform.followers.toLocaleString()} followers</p>
                  ) : (
                    <p className="text-sm text-gray-400">Not connected</p>
                  )}
                </div>
              </div>
              {platform.connected ? (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Connected
                </span>
              ) : (
                <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">
            <strong>Coming Soon:</strong> Connect your accounts to start scheduling posts automatically.
          </p>
        </div>
      </div>
    </div>
  )
}
