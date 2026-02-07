import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our social media tables
export interface Platform {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  api_enabled: boolean
}

export interface SocialAccount {
  id: string
  platform_id: string
  account_name: string
  account_handle: string
  is_active: boolean
  platform?: Platform
}

export interface SocialPost {
  id: string
  content: string
  media_urls: string[]
  scheduled_for: string | null
  published_at: string | null
  status: 'draft' | 'scheduled' | 'published' | 'failed' | 'cancelled'
  post_type: 'standard' | 'thread' | 'story' | 'reel' | 'video'
  ai_generated: boolean
  tags: string[]
  campaign_id: string | null
  created_at: string
}

export interface Campaign {
  id: string
  name: string
  description: string
  start_date: string
  end_date: string
  goal: string
  is_active: boolean
}

export interface Analytics {
  impressions: number
  reach: number
  likes: number
  comments: number
  shares: number
  clicks: number
  leads_generated: number
}

export interface DashboardStats {
  total_published: number
  total_scheduled: number
  total_drafts: number
  total_impressions: number
  total_engagement: number
  total_clicks: number
  total_leads: number
  connected_accounts: number
}

export interface ContentIdea {
  id: string
  title: string
  description: string
  content_draft: string
  status: 'idea' | 'approved' | 'in_progress' | 'ready' | 'used' | 'rejected'
  priority: number
  category: string
  target_platforms: string[]
}
