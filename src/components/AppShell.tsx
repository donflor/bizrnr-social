'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

const publicRoutes = ['/login', '/signup']

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPublic = publicRoutes.includes(pathname)

  if (isPublic) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 lg:ml-0 pt-14 pb-20 lg:pt-0 lg:pb-0 overflow-auto">
        {children}
      </main>
    </div>
  )
}
