const DEFAULT_WINDOW_MS = 5000;
const DEFAULT_MAX_REQUESTS = 10;

export function createRateLimiter({
  windowMs = DEFAULT_WINDOW_MS,
  maxRequests = DEFAULT_MAX_REQUESTS
} = {}) {
  const requestLog = new Map();

  return {
    isRateLimited(ip, now = Date.now()) {
      const windowStart = now - windowMs;
      const history = (requestLog.get(ip) || []).filter((timestamp) => timestamp > windowStart);

      if (history.length >= maxRequests) {
        requestLog.set(ip, history);
        return true;
      }

      history.push(now);
      requestLog.set(ip, history);
      return false;
    }
  };
}

export function createProxyHandler({
  rateLimiter = createRateLimiter(),
  fetchImpl = fetch
} = {}) {
  return async function handler(req, res) {
    const source = String(req.query?.source || "coindesk");
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";

    if (rateLimiter.isRateLimited(ip)) {
      return res.status(429).json({ error: "rate limit exceeded" });
    }

    if (source !== "coindesk") {
      return res.status(400).json({ error: "unsupported source" });
    }

    const upstream = await fetchImpl("https://api.coindesk.com/v1/bpi/currentprice.json");
    if (!upstream.ok) {
      return res.status(502).json({ error: "upstream request failed" });
    }

    const payload = await upstream.json();
    const usd = Number(payload?.bpi?.USD?.rate_float || 0);

    return res.status(200).json({
      source: "coindesk",
      value: usd,
      fetchedAt: new Date().toISOString()
    });
  };
}

const handler = createProxyHandler();
export default handler;
