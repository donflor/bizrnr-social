'use client'

import { useState } from 'react'

interface MediaItem {
  id: string
  type: 'image' | 'video' | 'gif'
  url: string
  thumbnail: string
  name: string
  size: string
  uploadedAt: string
  usedCount: number
}

export default function LibraryPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<'all' | 'images' | 'videos' | 'gifs'>('all')
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Content Library</h1>
          <p className="text-gray-600 text-sm lg:text-base mt-1">Manage your media assets</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <span>📤</span> Upload
        </button>
      </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 w-full sm:w-auto">
          {[
            { id: 'all', name: 'All', icon: '📁' },
            { id: 'images', name: 'Images', icon: '🖼️' },
            { id: 'videos', name: 'Videos', icon: '🎥' },
            { id: 'gifs', name: 'GIFs', icon: '✨' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as typeof filter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{f.icon}</span>
              {f.name}
            </button>
          ))}
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('grid')}
            className={`px-3 py-1.5 rounded-md text-sm ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}
          >
            ▦
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-3 py-1.5 rounded-md text-sm ${view === 'list' ? 'bg-white shadow-sm' : ''}`}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false) }}
        className={`border-2 border-dashed rounded-xl p-8 lg:p-12 text-center transition-colors mb-6 ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <span className="text-4xl lg:text-5xl">📁</span>
        <p className="text-gray-600 mt-4 text-sm lg:text-base">Drag and drop files here, or</p>
        <button className="mt-3 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base">
          Browse Files
        </button>
        <p className="text-gray-400 text-xs lg:text-sm mt-3">Supports: JPG, PNG, GIF, MP4, MOV (Max 50MB)</p>
      </div>

      {/* Empty State or Grid */}
      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 lg:p-12 text-center">
          <span className="text-5xl lg:text-6xl">🖼️</span>
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mt-4">No media yet</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm lg:text-base">
            Upload images, videos, and GIFs to use in your posts.
          </p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200"
            >
              <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                  👁️
                </button>
                <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                  📋
                </button>
                <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                  🗑️
                </button>
              </div>
              {item.type === 'video' && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  🎥 Video
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* List view */}
        </div>
      )}

      {/* Storage Info */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-gray-900">Storage Used</h3>
            <p className="text-gray-500 text-sm mt-1">0 MB of 5 GB used</p>
          </div>
          <div className="w-full sm:w-64">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stock Photos Integration */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              📷 Stock Photos
            </h3>
            <p className="text-gray-600 text-sm mt-1">Search millions of free photos from Unsplash</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm">
            Search Photos
          </button>
        </div>
      </div>
    </div>
  )
}
