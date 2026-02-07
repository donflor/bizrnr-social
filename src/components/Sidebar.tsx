'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Create Post', href: '/create', icon: '✍️' },
  { name: 'Queue', href: '/queue', icon: '📅' },
  { name: 'Published', href: '/published', icon: '✅' },
  { name: 'Campaigns', href: '/campaigns', icon: '🎯' },
  { name: 'Content Ideas', href: '/ideas', icon: '💡' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Accounts', href: '/accounts', icon: '🔗' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">📱</span>
          BizRnr Social
        </h1>
        <p className="text-gray-400 text-sm mt-1">Social Media Hub</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-gray-400">Scheduled</p>
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-gray-400">Published</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="p-4 border-t border-gray-800">
        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <span>🤖</span>
          Generate with AI
        </button>
      </div>
    </div>
  )
}
