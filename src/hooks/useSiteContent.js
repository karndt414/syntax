import { useCallback, useEffect, useMemo, useState } from 'react';
import { hasSupabaseEnv, supabase } from '../lib/supabaseClient';
import { SITE_CONTENT_KEY, deepMerge, siteDefaults } from '../lib/siteDefaults';

export function useSiteContent() {
  const [content, setContent] = useState(siteDefaults);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    if (!hasSupabaseEnv || !supabase) {
      setContent(siteDefaults);
      setLoading(false);
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    const { data, error: loadError } = await supabase
      .from('site_content')
      .select('data')
      .eq('key', SITE_CONTENT_KEY)
      .maybeSingle();

    if (loadError) {
      setError(loadError.message || 'Failed to load site content.');
      setContent(siteDefaults);
      setLoading(false);
      return;
    }

    setContent(deepMerge(siteDefaults, data?.data || {}));
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveContent = useCallback(async (nextContent) => {
    if (!hasSupabaseEnv || !supabase) {
      return { ok: false, error: 'Missing Supabase env vars.' };
    }

    const payload = deepMerge(siteDefaults, nextContent);
    const { error: saveError } = await supabase.from('site_content').upsert(
      {
        key: SITE_CONTENT_KEY,
        data: payload,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    );

    if (saveError) {
      return { ok: false, error: saveError.message || 'Failed to save content.' };
    }

    setContent(payload);
    return { ok: true };
  }, []);

  return useMemo(
    () => ({
      content,
      loading,
      error,
      refresh,
      saveContent,
      hasSupabaseEnv,
    }),
    [content, loading, error, refresh, saveContent]
  );
}
