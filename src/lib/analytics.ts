/**
 * GA4 Analytics for BizRnr Social
 * Uses GTM-59DSFJNL (connected to GA4 property 515476883)
 */

// Type declarations for gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Custom events for BizRnr Social
export type SocialEvent =
  | 'post_created'
  | 'post_scheduled'
  | 'post_published'
  | 'post_deleted'
  | 'campaign_created'
  | 'campaign_started'
  | 'campaign_paused'
  | 'account_connected'
  | 'account_disconnected'
  | 'ai_content_generated'
  | 'analytics_viewed'
  | 'content_idea_saved'
  | 'queue_reordered'
  | 'bulk_schedule';

interface EventParams {
  // Post events
  post_id?: string;
  post_type?: 'image' | 'video' | 'text' | 'carousel';
  platforms?: string[];
  platform_count?: number;
  scheduled_time?: string;
  
  // Campaign events
  campaign_id?: string;
  campaign_name?: string;
  post_count?: number;
  
  // Account events
  platform?: string;
  account_id?: string;
  
  // AI events
  prompt_length?: number;
  content_length?: number;
  
  // Generic
  value?: number;
  [key: string]: unknown;
}

/**
 * Track a custom event
 */
export function trackEvent(event: SocialEvent, params?: EventParams): void {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('[Analytics] gtag not available');
    return;
  }
  
  window.gtag('event', event, {
    event_category: 'social_media',
    ...params,
  });
  
  console.debug('[Analytics]', event, params);
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
}

/**
 * Set user properties
 */
export function setUserProperties(properties: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('set', 'user_properties', properties);
}

// Convenience functions for common events
export const analytics = {
  postCreated: (postId: string, platforms: string[], postType?: string) =>
    trackEvent('post_created', { 
      post_id: postId, 
      platforms, 
      platform_count: platforms.length,
      post_type: postType as EventParams['post_type'],
    }),
    
  postScheduled: (postId: string, platforms: string[], scheduledTime: string) =>
    trackEvent('post_scheduled', { 
      post_id: postId, 
      platforms, 
      platform_count: platforms.length,
      scheduled_time: scheduledTime,
    }),
    
  postPublished: (postId: string, platforms: string[]) =>
    trackEvent('post_published', { 
      post_id: postId, 
      platforms, 
      platform_count: platforms.length,
    }),
    
  campaignCreated: (campaignId: string, name: string, postCount: number) =>
    trackEvent('campaign_created', { 
      campaign_id: campaignId, 
      campaign_name: name,
      post_count: postCount,
    }),
    
  accountConnected: (platform: string, accountId: string) =>
    trackEvent('account_connected', { platform, account_id: accountId }),
    
  aiContentGenerated: (promptLength: number, contentLength: number) =>
    trackEvent('ai_content_generated', { prompt_length: promptLength, content_length: contentLength }),
    
  analyticsViewed: () =>
    trackEvent('analytics_viewed'),
};

export default analytics;
