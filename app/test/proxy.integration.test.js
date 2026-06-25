import assert from "node:assert/strict";
import test from "node:test";
import { createProxyHandler } from "../../functions/proxy.js";

function createResponseStub() {
  return {
    statusCode: 200,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.payload = body;
      return this;
    }
  };
}

test("proxy handler returns transformed coindesk payload", async () => {
  const handler = createProxyHandler({
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({
        bpi: {
          USD: { rate_float: 68000.25 }
        }
      })
    })
  });

  const req = {
    query: { source: "coindesk" },
    headers: {},
    socket: { remoteAddress: "127.0.0.1" }
  };
  const res = createResponseStub();

  await handler(req, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.payload.source, "coindesk");
  assert.equal(res.payload.value, 68000.25);
});

test("proxy handler rejects unsupported data source", async () => {
  const handler = createProxyHandler();
  const req = {
    query: { source: "weather" },
    headers: {},
    socket: { remoteAddress: "127.0.0.1" }
  };
  const res = createResponseStub();

  await handler(req, res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.payload.error, "unsupported source");
});
