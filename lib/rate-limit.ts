/**
 * Best-effort in-memory limiter. On serverless each instance keeps its own
 * counters, so this blunts bursts and accidental loops rather than guaranteeing
 * a global limit. Use a shared store (or Vercel Firewall rate limiting) if
 * stricter guarantees are needed.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 12;
const hits = new Map<string, number[]>();

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { ok: false, retryAfter: Math.ceil((recent[0] + WINDOW_MS - now) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return { ok: true, retryAfter: 0 };
}
