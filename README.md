# Real-Time Data Streaming Dashboard
Data integration portfolio sample for ANZSCO 261312 (Developer Programmer).

## Why this project helps your visa/job-hunt profile
- Demonstrates async/event-driven JavaScript patterns.
- Shows live data visualization and external API integration.
- Proves you can design for API rate limits via serverless proxy strategy.

## Tech stack
- React + TypeScript
- Chart.js
- WebSockets
- Serverless function proxy for API mediation
- GitHub Actions

## MVP scope
- Live-updating dashboard cards and chart.
- WebSocket ingestion flow for price/sensor streams.
- Serverless function stub with response-shaping and cache headers.

## Repository structure
- `app/` - UI scaffold and dashboard components.
- `functions/` - serverless API proxy.
- `.github/workflows/ci.yml` - starter checks.

## Quick start
1. `cd app && npm install`
2. Hook this scaffold into your preferred runner (Vite/Next/SvelteKit).
3. Deploy `functions/proxy.js` to your serverless provider (Vercel/Netlify/AWS Lambda wrapper).

## Next upgrades (recommended before interviews)
- Add historical persistence for trend windows.
- Add user-selectable instruments/sensors and alert thresholds.
- Add integration tests for websocket reconnection and chart updates.
