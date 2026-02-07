'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'team', name: 'Team', icon: '👥' },
    { id: 'integrations', name: 'Integrations', icon: '🔗' },
    { id: 'billing', name: 'Billing', icon: '💳' },
  ]

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 text-sm lg:text-base mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs - Horizontal scroll on mobile */}
        <div className="lg:w-48">
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white lg:bg-transparent border border-gray-200 lg:border-0 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Timezone */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Timezone & Scheduling</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>America/New_York (EST)</option>
                      <option>America/Los_Angeles (PST)</option>
                      <option>Europe/London (GMT)</option>
                      <option>Asia/Tokyo (JST)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Week Starts On</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Sunday</option>
                      <option>Monday</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Default Settings */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Default Post Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Auto-add hashtags</p>
                      <p className="text-sm text-gray-500">Suggest hashtags based on content</p>
                    </div>
                    <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Link shortening</p>
                      <p className="text-sm text-gray-500">Automatically shorten URLs</p>
                    </div>
                    <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">UTM tracking</p>
                      <p className="text-sm text-gray-500">Add UTM parameters to links</p>
                    </div>
                    <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* AI Settings */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-4">AI Content Generation</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand Voice</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Professional</option>
                      <option>Casual & Friendly</option>
                      <option>Bold & Edgy</option>
                      <option>Educational</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emoji Usage</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Moderate</option>
                      <option>None</option>
                      <option>Heavy</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { title: 'Post published', desc: 'When a scheduled post goes live' },
                  { title: 'Post failed', desc: 'When a post fails to publish' },
                  { title: 'New engagement', desc: 'Comments, likes, and shares' },
                  { title: 'New leads', desc: 'When leads are generated' },
                  { title: 'Weekly report', desc: 'Performance summary every week' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Team Members</h3>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                  + Invite
                </button>
              </div>
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl">👥</span>
                <p className="mt-3">No team members yet</p>
                <p className="text-sm">Invite your team to collaborate on content</p>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-4">
              {[
                { name: 'Slack', desc: 'Get notifications in Slack', icon: '💬', connected: false },
                { name: 'Zapier', desc: 'Connect with 5000+ apps', icon: '⚡', connected: false },
                { name: 'Google Analytics', desc: 'Track post performance', icon: '📊', connected: false },
                { name: 'Canva', desc: 'Design graphics directly', icon: '🎨', connected: false },
                { name: 'RSS Feeds', desc: 'Auto-post from blogs', icon: '📰', connected: false },
              ].map((integration, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{integration.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{integration.name}</p>
                      <p className="text-sm text-gray-500">{integration.desc}</p>
                    </div>
                  </div>
                  <button className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    integration.connected
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {integration.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Current Plan</h3>
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                <p className="text-sm opacity-80">You're on the</p>
                <p className="text-2xl font-bold mt-1">Free Plan</p>
                <p className="text-sm opacity-80 mt-2">Upgrade to unlock more features</p>
                <button className="mt-4 px-6 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100">
                  Upgrade Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
