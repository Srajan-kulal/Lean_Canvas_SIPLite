# 🎯 Lean Canvas — SIP Lite

A focused Lean Canvas tool built for the Student Innovation Programme (SIP Lite) by Inunity.

## Features
- **Classic Lean Canvas** (Ash Maurya) — all 9 blocks
- **Free-form** — no pre-population, students fill everything from scratch
- **Context hints** — paste outputs from earlier SIP Lite tools (Problem Statement, HMW, Primary Stakeholder) as reference panels
- **Completion tracking** — per-block indicators, submission readiness counter
- **Guided hints** — collapsible guiding questions on each block
- **Zoom control** — 60–100% canvas zoom
- **Full-screen mode** — for team working sessions
- **Submit flow** — with confirmation modal, unfair advantage acknowledgement
- **Session only** — no data stored server-side, no account required

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Stack
- React + Vite
- Zustand (state management)
- Tailwind CSS

## Canvas Layout
```
┌─────────────┬──────────────┬──────────────────┬──────────────┬─────────────┐
│             │   Solution   │                  │   Channels   │             │
│   Problem   │──────────────│       UVP        │──────────────│  Customer   │
│ + Existing  │ Key Metrics  │                  │  Unfair Adv  │  Segments   │
│ Alternatives│              │                  │              │ + Early Ad. │
├─────────────┴──────────────┴──────┬───────────┴──────────────┴─────────────┤
│         Cost Structure            │           Revenue Streams               │
└───────────────────────────────────┴─────────────────────────────────────────┘
```

## Roadmap
- [ ] PDF export (A3 landscape)
- [ ] Mentor review panel
- [ ] Real-time collaboration (WebSocket)
- [ ] Integration with SIP Lite platform API

## Built by
Inunity Pvt Ltd · SIP Lite Programme
