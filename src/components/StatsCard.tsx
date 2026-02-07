'use client'

interface StatsCardProps {
  title: string
  value: number | string
  subtitle: string
  icon: string
  color: 'blue' | 'purple' | 'pink' | 'green' | 'indigo' | 'cyan' | 'orange'
  size?: 'normal' | 'small'
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
  pink: 'bg-pink-50 text-pink-600 border-pink-100',
  green: 'bg-green-50 text-green-600 border-green-100',
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  orange: 'bg-orange-50 text-orange-600 border-orange-100',
}

const iconBgClasses = {
  blue: 'bg-blue-100',
  purple: 'bg-purple-100',
  pink: 'bg-pink-100',
  green: 'bg-green-100',
  indigo: 'bg-indigo-100',
  cyan: 'bg-cyan-100',
  orange: 'bg-orange-100',
}

export default function StatsCard({ title, value, subtitle, icon, color }: StatsCardProps) {
  return (
    <div className={`bg-white rounded-xl border ${colorClasses[color]} p-4 lg:p-6 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs lg:text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="text-xl lg:text-3xl font-bold mt-1">{value}</p>
          <p className="text-xs lg:text-sm text-gray-400 mt-0.5 lg:mt-1 truncate">{subtitle}</p>
        </div>
        <div className={`${iconBgClasses[color]} p-2 lg:p-3 rounded-lg flex-shrink-0 ml-2`}>
          <span className="text-lg lg:text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  )
}
