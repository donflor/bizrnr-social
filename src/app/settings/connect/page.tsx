'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PlatformGuide {
  name: string
  icon: string
  color: string
  bgColor: string
  prerequisites: string[]
  steps: string[]
  scopes: string[]
  notes?: string
}

const platforms: PlatformGuide[] = [
  {
    name: 'Twitter / X',
    icon: '𝕏',
    color: 'text-white',
    bgColor: 'bg-black',
    prerequisites: [
      'Twitter/X account',
      'Twitter Developer account (developer.twitter.com)',
      'Approved developer access (Essential or higher)',
    ],
    steps: [
      'Go to developer.twitter.com and sign in',
      'Create a new Project and App in the Developer Portal',
      'Navigate to your App Settings → "Keys and tokens"',
      'Generate API Key & Secret, Access Token & Secret',
      'Under "User authentication settings", enable OAuth 2.0',
      'Set the callback URL to your app\'s callback endpoint',
      'Set the website URL and Terms of Service URL',
      'Save your Client ID and Client Secret',
    ],
    scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    notes: 'Free tier allows 1,500 tweets/month. Basic ($100/mo) gives 3,000 tweets/month + search.',
  },
  {
    name: 'LinkedIn',
    icon: 'in',
    color: 'text-white',
    bgColor: 'bg-[#0A66C2]',
    prerequisites: [
      'LinkedIn account',
      'LinkedIn Company Page (for page posting)',
      'LinkedIn Developer account (developer.linkedin.com)',
    ],
    steps: [
      'Go to developer.linkedin.com and sign in',
      'Click "Create App" and fill in your app details',
      'Associate your app with a LinkedIn Company Page',
      'Go to the "Auth" tab to find your Client ID & Client Secret',
      'Add your OAuth 2.0 redirect URL',
      'Go to "Products" tab and request access to "Share on LinkedIn" and "Sign In with LinkedIn using OpenID Connect"',
      'Wait for approval (usually instant for Share on LinkedIn)',
      'Verify your app has the required permissions',
    ],
    scopes: ['openid', 'profile', 'email', 'w_member_social'],
    notes: 'Company page posting requires the "w_organization_social" scope and admin access to the page.',
  },
  {
    name: 'Instagram',
    icon: '📸',
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
    prerequisites: [
      'Instagram Business or Creator account (not personal)',
      'Facebook Page connected to your Instagram account',
      'Meta Developer account (developers.facebook.com)',
    ],
    steps: [
      'Convert your Instagram to a Business/Creator account in Settings',
      'Link your Instagram account to a Facebook Page',
      'Go to developers.facebook.com and create a Meta App',
      'Select "Business" as the app type',
      'Add the "Instagram Graph API" product to your app',
      'Configure OAuth settings with your redirect URI',
      'Generate a long-lived access token via the Graph API Explorer',
      'Submit your app for App Review to get publishing permissions',
    ],
    scopes: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_comments', 'pages_show_list', 'pages_read_engagement'],
    notes: 'Content publishing requires App Review approval from Meta. Personal accounts cannot use the API.',
  },
  {
    name: 'Facebook',
    icon: 'f',
    color: 'text-white',
    bgColor: 'bg-[#1877F2]',
    prerequisites: [
      'Facebook account',
      'Facebook Page (you must be an admin)',
      'Meta Developer account (developers.facebook.com)',
    ],
    steps: [
      'Go to developers.facebook.com and create a Meta App',
      'Choose "Business" as the app type',
      'Add "Facebook Login" and "Pages API" products',
      'Configure OAuth redirect URIs',
      'In Graph API Explorer, select your app and request a Page Access Token',
      'Grant permissions: pages_manage_posts, pages_read_engagement',
      'Exchange short-lived token for a long-lived token (60 days)',
      'For production, submit for App Review',
    ],
    scopes: ['pages_manage_posts', 'pages_read_engagement', 'pages_show_list', 'pages_read_user_content'],
    notes: 'Page tokens can be made permanent (never-expiring) by exchanging through the token debugger flow.',
  },
  {
    name: 'TikTok',
    icon: '♪',
    color: 'text-white',
    bgColor: 'bg-black',
    prerequisites: [
      'TikTok account',
      'TikTok Developer account (developers.tiktok.com)',
      'TikTok for Business account (recommended)',
    ],
    steps: [
      'Go to developers.tiktok.com and register as a developer',
      'Create a new app in the TikTok Developer Portal',
      'Select "Content Posting API" under products',
      'Configure your redirect URI for OAuth',
      'Add required scopes for video publishing',
      'Submit your app for review by TikTok',
      'Once approved, use the Client Key and Client Secret for OAuth',
      'Implement the OAuth 2.0 flow to get user access tokens',
    ],
    scopes: ['video.publish', 'video.upload', 'user.info.basic'],
    notes: 'TikTok app review can take 1-2 weeks. Direct video upload is supported. Photos require separate scope.',
  },
  {
    name: 'YouTube',
    icon: '▶',
    color: 'text-white',
    bgColor: 'bg-[#FF0000]',
    prerequisites: [
      'Google account with a YouTube channel',
      'Google Cloud Console account (console.cloud.google.com)',
      'YouTube channel verified for uploads',
    ],
    steps: [
      'Go to console.cloud.google.com and create a new project',
      'Enable the "YouTube Data API v3" in APIs & Services',
      'Go to "Credentials" and create OAuth 2.0 Client ID',
      'Set application type to "Web application"',
      'Add your authorized redirect URIs',
      'Configure the OAuth consent screen (External or Internal)',
      'Add required scopes for YouTube access',
      'Download the client configuration JSON',
    ],
    scopes: ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly'],
    notes: 'Unverified apps have a 100-user limit. Submit for Google verification for production use. Quota: 10,000 units/day free.',
  },
  {
    name: 'Threads',
    icon: '@',
    color: 'text-white',
    bgColor: 'bg-black',
    prerequisites: [
      'Instagram account (Threads uses Instagram login)',
      'Meta Developer account (developers.facebook.com)',
      'Same Meta App used for Instagram (or new one)',
    ],
    steps: [
      'Go to developers.facebook.com and open your Meta App',
      'Add the "Threads API" product to your app',
      'Configure OAuth settings with redirect URI',
      'In the Threads API settings, add your Instagram account as a tester',
      'Accept the tester invitation from your Instagram account',
      'Use the Threads API endpoints for authentication',
      'Exchange the authorization code for an access token',
      'Test posting via the Threads publishing endpoint',
    ],
    scopes: ['threads_basic', 'threads_content_publish', 'threads_manage_replies', 'threads_read_replies'],
    notes: 'Threads API is relatively new. Uses the same Meta app infrastructure as Instagram. Rate limits apply.',
  },
]

export default function ConnectPage() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/settings" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
          ← Back to Settings
        </Link>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Connect Platforms</h1>
        <p className="text-gray-500 mt-2">
          Follow the guides below to connect your social media accounts. Each platform requires API credentials set up through their developer portal.
        </p>
      </div>

      <div className="space-y-4">
        {platforms.map((platform) => {
          const isExpanded = expanded === platform.name
          return (
            <div key={platform.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <button
                onClick={() => setExpanded(isExpanded ? null : platform.name)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${platform.bgColor} rounded-xl flex items-center justify-center text-xl font-bold ${platform.color}`}>
                    {platform.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                    <p className="text-sm text-gray-500">{platform.prerequisites.length} prerequisites · {platform.steps.length} steps</p>
                  </div>
                </div>
                <span className="text-gray-400 text-2xl">{isExpanded ? '−' : '+'}</span>
              </button>

              {isExpanded && (
                <div className="px-5 pb-6 border-t border-gray-100">
                  {/* Prerequisites */}
                  <div className="mt-5">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Prerequisites</h4>
                    <ul className="space-y-2">
                      {platform.prerequisites.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-yellow-500 mt-0.5">⚠️</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Steps */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Setup Steps</h4>
                    <ol className="space-y-3">
                      {platform.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Scopes */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Required Scopes / Permissions</h4>
                    <div className="flex flex-wrap gap-2">
                      {platform.scopes.map((scope) => (
                        <code key={scope} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-200">
                          {scope}
                        </code>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {platform.notes && (
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">💡 Note:</span> {platform.notes}
                      </p>
                    </div>
                  )}

                  {/* Connect Button */}
                  <div className="mt-6">
                    <button
                      className={`${platform.bgColor} ${platform.color} px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity`}
                    >
                      Connect {platform.name}
                    </button>
                    <p className="text-xs text-gray-400 mt-2">OAuth flow coming soon — placeholder button</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
