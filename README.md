# Real-Time Data Streaming Dashboard
Data-integration portfolio project aligned to ANZSCO 261312 (Developer Programmer).

## Recruiter quick view
- Focus: asynchronous programming, real-time UX updates, and third-party API mediation.
- Business scenario: live market/sensor dashboard with streaming updates and chart visualization.
- Stack signal: React + TypeScript, WebSockets, Chart.js, serverless proxy, CI.
- Current maturity: practical real-time scaffold suitable for demo and extension.

## ANZSCO 261312 competency mapping
- **Designing event-driven software behavior**
  - Implemented WebSocket lifecycle management (`onopen`, `onmessage`, `onclose`, `onerror`).
  - Applied bounded in-memory windowing for live data points.
- **Developing interactive application features**
  - Built React dashboard component that transforms streaming payloads into chart-ready datasets.
  - Implemented chart rendering pipeline with reusable data shaping.
- **Integrating external systems and managing constraints**
  - Added serverless proxy with basic request throttling strategy.
  - Normalized upstream API responses for frontend consumption.
- **Quality and operational readiness**
  - Added starter CI checks and modular project structure for iterative growth.
  - Isolated integration logic into dedicated function layer to reduce coupling.

## Evidence map (where reviewers should look)
- Real-time UI logic: `app/src/Dashboard.tsx`
- App entry and rendering: `app/src/main.tsx`
- Rate-limited proxy integration: `functions/proxy.js`
- CI starter checks: `.github/workflows/ci.yml`

## Tech stack
- React + TypeScript
- Chart.js
- WebSockets
- Serverless function proxy
- GitHub Actions

## Implemented scope (current)
- Live WebSocket stream consumption.
- Auto-updating line chart for incoming values.
- Connection-status handling in UI.
- Serverless proxy endpoint with source validation and rate limiting.

## Quick start
1. `cd app && npm install`
2. Hook this scaffold into your preferred runner (Vite/Next/SvelteKit).
3. Deploy `functions/proxy.js` to your serverless provider (Vercel/Netlify/AWS Lambda wrapper).

## 5-minute demo flow for interviews
1. Show incoming stream updates and status changes.
2. Explain chart data shaping and rolling window design.
3. Demonstrate how the proxy enforces basic rate limits.
4. Walk through failure-handling paths (unsupported source/upstream errors).
5. Describe how to adapt this pattern for IoT or operations telemetry.

## Next milestones to strengthen application evidence
- Add historical storage for trend analysis windows.
- Add user-selectable streams and alert thresholds.
- Add integration tests for reconnect logic and chart update behavior.
