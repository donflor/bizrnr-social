-- BizRnr Social Media Marketing Schema
-- Run this on BizRnr Prod Supabase

-- Social Media Platforms
CREATE TABLE IF NOT EXISTS social_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  color TEXT,
  api_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default platforms
INSERT INTO social_platforms (name, slug, icon, color) VALUES
  ('Twitter/X', 'twitter', '𝕏', '#000000'),
  ('LinkedIn', 'linkedin', '💼', '#0A66C2'),
  ('Instagram', 'instagram', '📸', '#E4405F'),
  ('Facebook', 'facebook', '📘', '#1877F2'),
  ('TikTok', 'tiktok', '🎵', '#000000'),
  ('YouTube', 'youtube', '▶️', '#FF0000'),
  ('Threads', 'threads', '🧵', '#000000')
ON CONFLICT (slug) DO NOTHING;

-- Social Media Accounts (connected accounts per platform)
CREATE TABLE IF NOT EXISTS social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id UUID REFERENCES social_platforms(id) ON DELETE CASCADE,
  account_name TEXT NOT NULL,
  account_handle TEXT,
  account_id TEXT, -- Platform-specific account ID
  access_token TEXT, -- Encrypted in production
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scheduled Posts
CREATE TABLE IF NOT EXISTS social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  scheduled_for TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed', 'cancelled')),
  post_type TEXT DEFAULT 'standard' CHECK (post_type IN ('standard', 'thread', 'story', 'reel', 'video')),
  
  -- AI Generation metadata
  ai_generated BOOLEAN DEFAULT false,
  ai_prompt TEXT,
  
  -- Engagement goals
  target_audience TEXT,
  campaign_id UUID,
  
  -- Metadata
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Post-Platform assignments (which platforms to post to)
CREATE TABLE IF NOT EXISTS social_post_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  account_id UUID REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform_post_id TEXT, -- ID returned by platform after posting
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'posted', 'failed')),
  error_message TEXT,
  posted_at TIMESTAMPTZ,
  
  UNIQUE(post_id, account_id)
);

-- Campaigns (group posts together)
CREATE TABLE IF NOT EXISTS social_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  goal TEXT, -- e.g., 'brand_awareness', 'lead_generation', 'engagement'
  target_metrics JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add campaign reference to posts
ALTER TABLE social_posts 
ADD CONSTRAINT fk_campaign 
FOREIGN KEY (campaign_id) REFERENCES social_campaigns(id) ON DELETE SET NULL;

-- Analytics / Engagement Metrics
CREATE TABLE IF NOT EXISTS social_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_platform_id UUID REFERENCES social_post_platforms(id) ON DELETE CASCADE,
  
  -- Engagement metrics
  impressions INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  
  -- Video metrics
  video_views INTEGER DEFAULT 0,
  watch_time_seconds INTEGER DEFAULT 0,
  
  -- Lead tracking
  profile_visits INTEGER DEFAULT 0,
  website_clicks INTEGER DEFAULT 0,
  leads_generated INTEGER DEFAULT 0,
  
  -- Follower change
  follower_change INTEGER DEFAULT 0,
  
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Content Ideas / Queue
CREATE TABLE IF NOT EXISTS social_content_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content_draft TEXT,
  status TEXT DEFAULT 'idea' CHECK (status IN ('idea', 'approved', 'in_progress', 'ready', 'used', 'rejected')),
  priority INTEGER DEFAULT 0,
  category TEXT,
  target_platforms TEXT[] DEFAULT '{}',
  source TEXT, -- 'ai_generated', 'manual', 'trending'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hashtag Performance Tracking
CREATE TABLE IF NOT EXISTS social_hashtags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hashtag TEXT NOT NULL UNIQUE,
  platform_slug TEXT,
  times_used INTEGER DEFAULT 0,
  avg_engagement DECIMAL(10,2) DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  is_recommended BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'
);

-- Best Posting Times (learned over time)
CREATE TABLE IF NOT EXISTS social_posting_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id UUID REFERENCES social_platforms(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday
  hour INTEGER CHECK (hour >= 0 AND hour <= 23),
  engagement_score DECIMAL(10,2) DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(platform_id, day_of_week, hour)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_status ON social_posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_scheduled ON social_posts(scheduled_for) WHERE status = 'scheduled';
CREATE INDEX IF NOT EXISTS idx_analytics_post ON social_analytics(post_platform_id);
CREATE INDEX IF NOT EXISTS idx_accounts_platform ON social_accounts(platform_id);

-- Enable RLS (Row Level Security)
ALTER TABLE social_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_post_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_content_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posting_schedule ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - tighten in production)
CREATE POLICY "Allow all" ON social_platforms FOR ALL USING (true);
CREATE POLICY "Allow all" ON social_accounts FOR ALL USING (true);
CREATE POLICY "Allow all" ON social_posts FOR ALL USING (true);
CREATE POLICY "Allow all" ON social_post_platforms FOR ALL USING (true);
CREATE POLICY "Allow all" ON social_campaigns FOR ALL USING (true);
CREATE POLICY "Allow all" ON social_analytics FOR ALL USING (true);
CREATE POLICY "Allow all" ON social_content_ideas FOR ALL USING (true);
CREATE POLICY "Allow all" ON social_hashtags FOR ALL USING (true);
CREATE POLICY "Allow all" ON social_posting_schedule FOR ALL USING (true);

-- Summary view for dashboard
CREATE OR REPLACE VIEW social_dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM social_posts WHERE status = 'published') as total_published,
  (SELECT COUNT(*) FROM social_posts WHERE status = 'scheduled') as total_scheduled,
  (SELECT COUNT(*) FROM social_posts WHERE status = 'draft') as total_drafts,
  (SELECT COALESCE(SUM(impressions), 0) FROM social_analytics) as total_impressions,
  (SELECT COALESCE(SUM(likes + comments + shares), 0) FROM social_analytics) as total_engagement,
  (SELECT COALESCE(SUM(clicks), 0) FROM social_analytics) as total_clicks,
  (SELECT COALESCE(SUM(leads_generated), 0) FROM social_analytics) as total_leads,
  (SELECT COUNT(*) FROM social_accounts WHERE is_active = true) as connected_accounts;
