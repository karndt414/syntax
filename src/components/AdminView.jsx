import { useEffect, useState } from 'react';
import { hasSupabaseEnv, supabase } from '../lib/supabaseClient';

const SECTION_KEYS = [
  'navbar',
  'hero',
  'clients',
  'services',
  'process',
  'model',
  'team',
  'consultation',
  'footer',
];

function setByPath(object, path, value) {
  const parts = path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .map((part) => part.trim())
    .filter(Boolean);

  if (!parts.length) return object;

  const clone = JSON.parse(JSON.stringify(object));
  let cursor = clone;

  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i];
    const nextKey = parts[i + 1];
    const nextIsIndex = /^\d+$/.test(nextKey);

    if (cursor[key] === undefined || cursor[key] === null) {
      cursor[key] = nextIsIndex ? [] : {};
    }
    cursor = cursor[key];
  }

  const finalKey = parts[parts.length - 1];
  cursor[finalKey] = value;
  return clone;
}

export default function AdminView({ content, saveContent, refresh, loading, loadError, hasEnv }) {
  const ownerEmail = import.meta.env.VITE_OWNER_EMAIL || '';

  const [loginEmail, setLoginEmail] = useState(ownerEmail);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [info, setInfo] = useState('');

  const [draft, setDraft] = useState(content);
  const [sectionText, setSectionText] = useState(() =>
    Object.fromEntries(SECTION_KEYS.map((key) => [key, JSON.stringify(content[key], null, 2)]))
  );
  const [jsonError, setJsonError] = useState('');
  const [saveState, setSaveState] = useState('');

  const [uploadPath, setUploadPath] = useState('hero.imageUrl');
  const [uploadState, setUploadState] = useState('');

  useEffect(() => {
    setDraft(content);
    setSectionText(Object.fromEntries(SECTION_KEYS.map((key) => [key, JSON.stringify(content[key], null, 2)])));
  }, [content]);

  useEffect(() => {
    if (!supabase) return undefined;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession || null);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const signedInEmail = session?.user?.email || '';
  const isOwner = Boolean(signedInEmail && ownerEmail && signedInEmail.toLowerCase() === ownerEmail.toLowerCase());

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (!supabase) return;

    setAuthLoading(true);
    setAuthError('');
    setInfo('');

    const { error } = await supabase.auth.signInWithOtp({
      email: loginEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    if (error) {
      setAuthError(error.message || 'Failed to sign in.');
    } else {
      setInfo('Magic link sent. Open your email and use the sign-in link.');
    }

    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  };

  const updateSectionText = (section, rawText) => {
    setSectionText((prev) => ({ ...prev, [section]: rawText }));

    try {
      const parsed = JSON.parse(rawText);
      setDraft((prev) => ({ ...prev, [section]: parsed }));
      setJsonError('');
    } catch {
      setJsonError(`Invalid JSON in section: ${section}`);
    }
  };

  const handleSave = async () => {
    setSaveState('Saving...');
    const result = await saveContent(draft);
    if (!result.ok) {
      setSaveState(`Save failed: ${result.error}`);
      return;
    }

    setSaveState('Saved successfully.');
    await refresh();
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !supabase) return;

    setUploadState('Uploading...');

    const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `cms/${safeName}`;

    const { error: uploadError } = await supabase.storage.from('site-assets').upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

    if (uploadError) {
      setUploadState(`Upload failed: ${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage.from('site-assets').getPublicUrl(filePath);
    const url = data.publicUrl;

    const nextDraft = setByPath(draft, uploadPath, url);
    setDraft(nextDraft);

    const [section] = uploadPath.split('.');
    if (SECTION_KEYS.includes(section)) {
      setSectionText((prev) => ({
        ...prev,
        [section]: JSON.stringify(nextDraft[section], null, 2),
      }));
    }

    setUploadState(`Uploaded and set ${uploadPath}`);
  };

  if (!hasEnv) {
    return (
      <div className="min-h-screen bg-void text-bone p-8">
        <h1 className="font-display text-4xl font-bold mb-4">Admin</h1>
        <p className="text-smoke">Set VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, and VITE_OWNER_EMAIL to enable admin mode.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-bone px-6 py-10 lg:px-10">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold">Site Admin</h1>
            <p className="text-sm text-smoke mt-2">Owner-only content editor backed by Supabase.</p>
          </div>
          {session && (
            <button onClick={handleSignOut} className="btn-outline text-xs py-2 px-4">
              Sign Out
            </button>
          )}
        </div>

        {!session && (
          <form onSubmit={handleSignIn} className="glass-card p-6 rounded-sm mb-6 max-w-xl">
            <h2 className="font-display text-2xl mb-4">Owner Sign In</h2>
            <label className="block text-xs uppercase tracking-widest text-ash mb-2" htmlFor="owner-email">
              Owner Email
            </label>
            <input
              id="owner-email"
              type="email"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              className="form-input rounded-sm mb-4"
              required
            />
            <button disabled={authLoading} className="btn-primary text-xs py-2 px-4" type="submit">
              {authLoading ? 'Sending...' : 'Send Magic Link'}
            </button>
            {authError && <p className="text-red-300 mt-3 text-sm">{authError}</p>}
            {info && <p className="text-teal mt-3 text-sm">{info}</p>}
          </form>
        )}

        {session && !isOwner && (
          <div className="glass-card p-6 rounded-sm mb-6 border border-red-400/40">
            <h2 className="font-display text-2xl text-red-200 mb-2">Access denied</h2>
            <p className="text-smoke text-sm">
              Signed in as {signedInEmail}. Only {ownerEmail || 'the configured owner'} can access this admin view.
            </p>
          </div>
        )}

        {session && isOwner && (
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-sm">
              <h2 className="font-display text-2xl mb-4">Image Upload</h2>
              <p className="text-sm text-smoke mb-3">
                Upload to Supabase Storage bucket site-assets and auto-fill an image URL path in your content JSON.
              </p>
              <label className="block text-xs uppercase tracking-widest text-ash mb-2" htmlFor="upload-path">
                Content Path (example: hero.imageUrl, services.items.0.image)
              </label>
              <input
                id="upload-path"
                value={uploadPath}
                onChange={(event) => setUploadPath(event.target.value)}
                className="form-input rounded-sm mb-3"
              />
              <input type="file" accept="image/*" onChange={handleUpload} className="text-sm" />
              {uploadState && <p className="text-sm mt-3 text-teal">{uploadState}</p>}
            </div>

            {SECTION_KEYS.map((section) => (
              <div key={section} className="glass-card p-6 rounded-sm">
                <h3 className="font-display text-2xl capitalize mb-4">{section}</h3>
                <textarea
                  className="form-input rounded-sm min-h-[220px] font-mono text-xs"
                  value={sectionText[section] || ''}
                  onChange={(event) => updateSectionText(section, event.target.value)}
                />
              </div>
            ))}

            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="button"
                className="btn-primary text-xs py-3 px-6"
                onClick={handleSave}
                disabled={Boolean(jsonError) || loading}
              >
                Save All Changes
              </button>
              <button type="button" className="btn-outline text-xs py-3 px-6" onClick={refresh}>
                Reload From Supabase
              </button>
            </div>

            {loadError && <p className="text-yellow-200 text-sm">Load warning: {loadError}</p>}
            {jsonError && <p className="text-red-300 text-sm">{jsonError}</p>}
            {saveState && <p className="text-teal text-sm">{saveState}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
