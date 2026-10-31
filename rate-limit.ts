/**
 * In-memory fixed-window rate limiter, per key (IP).
 * Fine for a single dev server. On serverless each instance has its own memory,
 * so swap for a shared store (e.g. Upstash Redis) before relying on it in production.
 */
type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  entry.count += 1;
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
  }
  return { allowed: entry.count <= limit, remaining: Math.max(0, limit - entry.count) };
}
