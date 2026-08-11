// In-memory token bucket rate limiter per IP. For multi-instance deployment,
// replace with Redis (`@upstash/ratelimit`) or Upstash. This is suitable for
// single-instance dev/PM2 deployments and shows the structure.

type Bucket = { tokens: number; lastRefill: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, capacity = 5, refillPerMs = 60_000 / 5) {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: capacity, lastRefill: now };
  const elapsed = now - bucket.lastRefill;
  const refill = Math.floor(elapsed * refillPerMs);
  bucket.tokens = Math.min(capacity, bucket.tokens + refill);
  bucket.lastRefill = now;

  if (bucket.tokens <= 0) {
    buckets.set(key, bucket);
    return { ok: false, remaining: 0 } as const;
  }
  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return { ok: true, remaining: bucket.tokens } as const;
}
