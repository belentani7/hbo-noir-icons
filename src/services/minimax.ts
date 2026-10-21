/**
 * Browser bridge: never bundle MiniMax secret tokens in public Vite output.
 * Optional backend lives at /api/icon-brief and is disabled unless an owner
 * explicitly configures the server and the public feature flag.
 */
export interface IconBrief {
  name: string;
  symbolDescription: string;
  palette: string[];
}

export const MINIMAX_PROXY_PATH = '/api/icon-brief';
const ENABLED = import.meta.env.VITE_ICON_BRIEF_ENABLED === 'true';

export function isMiniMaxConfigured(): boolean {
  return ENABLED;
}

export async function generateIconBrief(subject: string): Promise<IconBrief | null> {
  if (!ENABLED || typeof subject !== 'string') return null;
  const clean = subject.trim().slice(0, 120);
  if (!clean) return null;
  try {
    const response = await fetch(MINIMAX_PROXY_PATH, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: clean }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    if (!data || typeof data !== 'object') return null;
    const d = data as Record<string, unknown>;
    if (typeof d.name !== 'string' || typeof d.symbolDescription !== 'string' ||
      !Array.isArray(d.palette) || d.palette.some(x => typeof x !== 'string')) return null;
    return {
      name: d.name.slice(0, 90),
      symbolDescription: d.symbolDescription.slice(0, 600),
      palette: d.palette.filter(x => /^#[\da-fA-F]{6}$/.test(x)).slice(0, 6),
    };
  } catch {
    return null;
  }
}
