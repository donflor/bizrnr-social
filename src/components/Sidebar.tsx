'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Create Post', href: '/create', icon: '✍️' },
  { name: 'Queue', href: '/queue', icon: '📅' },
  { name: 'Published', href: '/published', icon: '✅' },
  { name: 'Inbox', href: '/inbox', icon: '💬' },
  { name: 'Content Library', href: '/library', icon: '📁' },
  { name: 'Campaigns', href: '/campaigns', icon: '🎯' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Accounts', href: '/accounts', icon: '🔗' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <span>📱</span>
          BizRnr Social
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-800 rounded-lg"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gray-900 text-white flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:transform-none
      `}>
        {/* Logo - Hidden on mobile (shown in header) */}
        <div className="hidden lg:block p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">📱</span>
            BizRnr Social
          </h1>
          <p className="text-gray-400 text-sm mt-1">Social Media Hub</p>
        </div>

        {/* Mobile spacer for header */}
        <div className="lg:hidden h-14" />

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
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

        {/* AI Assistant */}
        <div className="p-4 border-t border-gray-800">
          <Link
            href="/create"
            onClick={() => setIsOpen(false)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span>🤖</span>
            Generate with AI
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-2 py-2 safe-area-pb">
        <div className="flex justify-around">
          {[
            { name: 'Home', href: '/', icon: '📊' },
            { name: 'Create', href: '/create', icon: '✍️' },
            { name: 'Queue', href: '/queue', icon: '📅' },
            { name: 'Inbox', href: '/inbox', icon: '💬' },
            { name: 'More', href: '#', icon: '☰', action: () => setIsOpen(true) },
          ].map((item) => {
            const isActive = pathname === item.href
            if (item.action) {
              return (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="flex flex-col items-center gap-1 px-3 py-2 text-gray-500"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs">{item.name}</span>
                </button>
              )
            }
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
