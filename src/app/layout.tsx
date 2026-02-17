import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/GoogleTagManager'
import AppShell from '@/components/AppShell'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BizRnR Social - Social Media Marketing Hub',
  description: 'AI-powered social media management for BizRnR',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BizRnR Social',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#111827',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager />
      </head>
      <body className={inter.className}>
        <GoogleTagManagerNoScript />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
