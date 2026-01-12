const STORAGE_KEY = 'LEXIPRO_GEMINI_API_KEY';

/**
 * Returns the Gemini API key from localStorage (preferred for GitHub Pages)
 * or from a local dev env var (Vite will inline VITE_* variables for local builds).
 */
export function getGeminiApiKey(): string | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && stored.trim()) return stored.trim();
  } catch {
    // ignore (e.g., SSR or blocked storage)
  }

  // Optional: allow local development via .env.local
  // NOTE: Do not rely on this for GitHub Pages (public).
  const envKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY as string | undefined;
  if (envKey && envKey.trim()) return envKey.trim();

  return null;
}

export function setGeminiApiKey(key: string): void {
  const clean = key.trim();
  if (!clean) return;
  window.localStorage.setItem(STORAGE_KEY, clean);
}

export function clearGeminiApiKey(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}
