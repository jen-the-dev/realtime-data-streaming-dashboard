import assert from "node:assert/strict";
import test from "node:test";
import { createRateLimiter } from "../../functions/proxy.js";

test("rate limiter allows requests up to threshold", () => {
  const limiter = createRateLimiter({ windowMs: 1000, maxRequests: 2 });
  const now = 1700000000000;

  assert.equal(limiter.isRateLimited("ip-1", now), false);
  assert.equal(limiter.isRateLimited("ip-1", now + 100), false);
  assert.equal(limiter.isRateLimited("ip-1", now + 200), true);
});

test("rate limiter resets after window interval", () => {
  const limiter = createRateLimiter({ windowMs: 1000, maxRequests: 1 });
  const now = 1700000000000;

  assert.equal(limiter.isRateLimited("ip-2", now), false);
  assert.equal(limiter.isRateLimited("ip-2", now + 500), true);
  assert.equal(limiter.isRateLimited("ip-2", now + 1501), false);
});
