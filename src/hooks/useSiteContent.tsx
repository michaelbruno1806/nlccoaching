import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContentItem {
  id: string;
  content_key: string;
  content_value: string;
  language: string;
}

export function useSiteContent() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const fetchContents = useCallback(async () => {
    const { data, error } = await supabase
      .from('site_content')
      .select('*');
    
    if (!error && data) {
      setContents(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchContents();

    // Set up realtime subscription
    const channel = supabase
      .channel('site-content-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_content'
        },
        () => {
          fetchContents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchContents]);

  // Get content value by key, with fallback to default
  const getContent = useCallback((key: string, defaultValue: string = ''): string => {
    const lang = language === 'fr' ? 'fr' : 'en';
    const item = contents.find(c => c.content_key === key && c.language === lang);
    
    // If not found in current language, try the other language
    if (!item) {
      const fallbackItem = contents.find(c => c.content_key === key);
      return fallbackItem?.content_value || defaultValue;
    }
    
    return item.content_value || defaultValue;
  }, [contents, language]);

  // Get translated content (checks both languages)
  const t = useCallback((frenchDefault: string, englishDefault: string, key?: string): string => {
    if (key) {
      const value = getContent(key);
      if (value) return value;
    }
    return language === 'fr' ? frenchDefault : englishDefault;
  }, [getContent, language]);

  return { contents, loading, getContent, t, refetch: fetchContents };
}
