import { useEffect, useMemo, useState } from 'react';
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

function humanizeKey(key) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function guessArrayTemplate(array) {
  if (!Array.isArray(array) || !array.length) return '';
  const first = array[0];

  if (typeof first === 'string') return '';
  if (typeof first === 'number') return 0;
  if (typeof first === 'boolean') return false;
  if (first && typeof first === 'object') {
    return JSON.parse(JSON.stringify(first));
  }

  return '';
}

function collectImagePaths(value, basePath = '') {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectImagePaths(item, `${basePath}.${index}`));
  }

  if (!value || typeof value !== 'object') {
    return [];
  }

  return Object.entries(value).flatMap(([key, child]) => {
    const path = basePath ? `${basePath}.${key}` : key;
    const isImageLike = /(image|logo)url$|^image$|^logo$/i.test(key);

    if (isImageLike && typeof child === 'string') {
      return [path];
    }

    return collectImagePaths(child, path);
  });
}

export default function AdminView({ content, saveContent, refresh, loading, loadError, hasEnv }) {
  const ownerEmail = import.meta.env.VITE_OWNER_EMAIL || '';

  const [loginEmail, setLoginEmail] = useState(ownerEmail);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [info, setInfo] = useState('');

  const [draft, setDraft] = useState(content);
  const [activeSection, setActiveSection] = useState(SECTION_KEYS[0]);
  const [saveState, setSaveState] = useState('');

  const imagePaths = useMemo(() => collectImagePaths(draft), [draft]);
  const [uploadPath, setUploadPath] = useState('');
  const [uploadState, setUploadState] = useState('');

  useEffect(() => {
    setDraft(content);
  }, [content]);

  useEffect(() => {
    if (imagePaths.length && !imagePaths.includes(uploadPath)) {
      setUploadPath(imagePaths[0]);
    }
  }, [imagePaths, uploadPath]);

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

  const updateValue = (path, value) => {
    setDraft((prev) => setByPath(prev, path, value));
  };

  const addArrayItem = (path, arrayValue) => {
    const template = guessArrayTemplate(arrayValue);
    updateValue(path, [...arrayValue, template]);
  };

  const removeArrayItem = (path, arrayValue, index) => {
    updateValue(
      path,
      arrayValue.filter((_, itemIndex) => itemIndex !== index)
    );
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

    if (!uploadPath) {
      setUploadState('Choose an image field before uploading.');
      return;
    }

    const nextDraft = setByPath(draft, uploadPath, url);
    setDraft(nextDraft);

    setUploadState(`Uploaded and set ${uploadPath}`);
  };

  const renderField = (key, value, path, depth = 0) => {
    const label = humanizeKey(key);
    const isLongTextField = /(description|desc|bio|message|text|subtitle)/i.test(key);

    if (Array.isArray(value)) {
      return (
        <div className="space-y-3" key={path}>
          <div className="flex items-center justify-between gap-3">
            <label className="font-heading text-xs text-ash uppercase tracking-widest">{label}</label>
            <button
              type="button"
              className="btn-outline text-[11px] py-1.5 px-3"
              onClick={() => addArrayItem(path, value)}
            >
              Add Item
            </button>
          </div>
          {value.map((item, index) => (
            <div key={`${path}.${index}`} className="rounded-sm border border-steel/60 p-3 bg-carbon/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading text-[11px] uppercase tracking-widest text-ash">Item {index + 1}</span>
                <button
                  type="button"
                  className="text-xs text-red-300 hover:text-red-200"
                  onClick={() => removeArrayItem(path, value, index)}
                >
                  Remove
                </button>
              </div>
              {renderField(String(index), item, `${path}.${index}`, depth + 1)}
            </div>
          ))}
        </div>
      );
    }

    if (value && typeof value === 'object') {
      return (
        <div key={path} className="space-y-4">
          {depth > 0 && <h4 className="font-heading text-xs text-ash uppercase tracking-widest">{label}</h4>}
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(value).map(([childKey, childValue]) =>
              renderField(childKey, childValue, `${path}.${childKey}`, depth + 1)
            )}
          </div>
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <label key={path} className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={value}
            onChange={(event) => updateValue(path, event.target.checked)}
          />
          <span className="font-body text-sm text-bone">{label}</span>
        </label>
      );
    }

    if (typeof value === 'number') {
      return (
        <div key={path}>
          <label className="block font-heading text-xs text-ash uppercase tracking-widest mb-2">{label}</label>
          <input
            type="number"
            value={value}
            onChange={(event) => updateValue(path, Number(event.target.value))}
            className="form-input rounded-sm"
          />
        </div>
      );
    }

    return (
      <div key={path}>
        <label className="block font-heading text-xs text-ash uppercase tracking-widest mb-2">{label}</label>
        {isLongTextField ? (
          <textarea
            className="form-input rounded-sm min-h-[110px]"
            value={value ?? ''}
            onChange={(event) => updateValue(path, event.target.value)}
          />
        ) : (
          <input
            className="form-input rounded-sm"
            value={value ?? ''}
            onChange={(event) => updateValue(path, event.target.value)}
          />
        )}
      </div>
    );
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
                Upload to Supabase Storage bucket site-assets and assign image fields without editing code.
              </p>
              <label className="block text-xs uppercase tracking-widest text-ash mb-2" htmlFor="upload-path">
                Image Field
              </label>
              <select
                id="upload-path"
                value={uploadPath}
                onChange={(event) => setUploadPath(event.target.value)}
                className="form-input rounded-sm mb-3"
              >
                {imagePaths.map((path) => (
                  <option key={path} value={path}>{path}</option>
                ))}
              </select>
              <input type="file" accept="image/*" onChange={handleUpload} className="text-sm" />
              {uploadState && <p className="text-sm mt-3 text-teal">{uploadState}</p>}
            </div>

            <div className="glass-card p-6 rounded-sm">
              <label className="block text-xs uppercase tracking-widest text-ash mb-2" htmlFor="section-select">
                Edit Section
              </label>
              <select
                id="section-select"
                className="form-input rounded-sm"
                value={activeSection}
                onChange={(event) => setActiveSection(event.target.value)}
              >
                {SECTION_KEYS.map((section) => (
                  <option key={section} value={section}>{humanizeKey(section)}</option>
                ))}
              </select>
            </div>

            <div className="glass-card p-6 rounded-sm">
              <h3 className="font-display text-2xl capitalize mb-4">{humanizeKey(activeSection)}</h3>
              <div className="space-y-5">
                {Object.entries(draft[activeSection] || {}).map(([key, value]) => (
                  <div key={key} className="border border-steel/40 rounded-sm p-4 bg-carbon/20">
                    {renderField(key, value, `${activeSection}.${key}`)}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="button"
                className="btn-primary text-xs py-3 px-6"
                onClick={handleSave}
                disabled={loading}
              >
                Save All Changes
              </button>
              <button type="button" className="btn-outline text-xs py-3 px-6" onClick={refresh}>
                Reload From Supabase
              </button>
            </div>

            {loadError && <p className="text-yellow-200 text-sm">Load warning: {loadError}</p>}
            {saveState && <p className="text-teal text-sm">{saveState}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
