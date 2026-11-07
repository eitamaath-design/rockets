# Rockets: Master Project Knowledge Base

This document serves as the permanent master reference for the **Rockets** multiplayer space shooter infrastructure, architecture, configuration, and operational runbooks. It maintains all architectural decisions, resource IDs, security/environment variables, operational procedures, and file locations across sessions.

---

## 1. Executive Summary & Architecture Overview

- **Project Goal:** A responsive, web-based, real-time 3D multiplayer space shooter running entirely peer-to-peer using WebRTC with zero registration, zero central server cost, and decentralized master failover with keep-alive TTL heartbeats.
- **Core Technology Stack:**
  - **Frontend / Rendering:** Three.js (WebGL 3D graphics, procedural meshes, particle systems, cockpit interior).
  - **Networking / P2P Mesh:** `@trystero-p2p/nostr` and `@trystero-p2p/torrent` (serverless WebRTC signaling using open decentralized Nostr relays and public BitTorrent trackers).
  - **Build Tooling:** Vite (fast ESM bundler, production minification, asset pipeline).
  - **Hosting:** GitHub Pages via GitHub Actions / automated deployment.
- **Deployment & Hosting Model:** Static site hosted on GitHub Pages (`https://eitamaath-design.github.io/rockets/`).

```
                    +-------------------------------------+
                    |   Decentralized Public Relays       |
                    | (Nostr Relays / BitTorrent Trackers)|
                    +-------------------+-----------------+
                                        ^
                          WebRTC SDP    |    Signaling &
                         Exchange Only  |    Lobby Heartbeats
                                        v
  +------------------+         P2P DataChannels         +------------------+
  |  Player 1 Client | <==============================> |  Player 2 Client |
  | (Elected Master) |                                  |  (Mesh Peer)     |
  | - 60 FPS Physics | <------------------------------+ | - 60 FPS Physics |
  | - TTL Heartbeat  |                                | | - Dead Reckoning |
  +------------------+                                | +------------------+
          ^                                           |          ^
          |             P2P DataChannels              |          |
          +===========================================+==========+
                                      |
                                      v
                             +------------------+
                             |  Player N Client |
                             |  (Mesh Peer)     |
                             | - Interpolation  |
                             +------------------+
```

---

## 2. Key Decisions & Rationale

| Decision Area | Choice Made | Rationale & Trade-offs |
| :--- | :--- | :--- |
| **P2P Signaling** | Trystero (`@trystero-p2p/nostr` + BitTorrent fallback) with `createActionChannel` | Eliminates expensive backend signaling servers and user authentication. Uses universal action channel adapter supporting modern Trystero v0.26 action objects (`{ send, onReceive }`) and peer lifecycle property setters (`onPeerJoin`, `onPeerLeave`). |
| **Session Discovery & TTL** | Ephemeral Lobby Broadcast with TTL expiration | The elected master broadcasts session metadata every 4s with a 10s TTL. If inactive, the lobby entry expires naturally without server cleanup. |
| **Master Election Protocol** | Deterministic Sorted Peer UUID Leader Election | Ensures exactly one master peer is responsible for lobby TTL refreshes. When the master leaves, remaining peers instantly re-elect the next peer without any delay or collision. |
| **Rendering Engine** | Three.js (WebGL) | Zero external engine bloat, superior performance on desktop and mobile, full control over custom shaders, procedural starfields, and cockpit geometry. |
| **Cockpit & Controls** | Panoramic Fighter Canopy + Touch Drag D-Pad with Auto-Banking | Clean unobstructed forward view with peripheral pillars and wing cannon mounts (removed clunky center wedge). Touch flight stick in lower-left: dragging right turns right, dragging left turns left with automatic bank rolling into turns. |
| **Asteroid Field** | Massive Titan (75-140) & Large (42-75) Cratered Asteroids | 120 procedural space rocks with craggy crater indentations, multi-axis oblong stretch, and rich rock materials (chondrite, iron rust, basalt, granite) providing ample tactical cover for ships to hide behind. |
| **Diagnostics & Telemetry** | In-Memory Circular Logger + HUD Modal Export | Client-side circular event logger (`logger.js`) recording WebGL capabilities, render loop performance, input events, and errors. Accessible via `🐞 Logs` button in top HUD with 1-click clipboard export. |
| **Service Worker & Caching** | PWA Service Worker v4 (Network-First HTML, Cache-First Assets) | Guarantees mobile users immediately receive newly deployed builds on navigation while maintaining offline PWA caching. |
| **Flight Dynamics** | Realistic Inertia + Regulated Deceleration | Forward thrust accelerates to `maxSpeed`. Braking decelerates to complete stop in exactly 2.0s as specified. Local pitch, yaw, roll, and lateral strafe thrusters. |
| **Weapons Balance** | Rapid-fire Front Cannon (TTK 2.0s) + Proximity/Timed Rear Mines (3.0s fuse) | High-stakes dogfighting: holding cannon fire drains energy over 4.0s (10 shots/sec) and recharges after 1.0s pause; 2.0s TTK on hit. Prominent dual-layer glowing cyan/white plasma bolts with dynamic lighting. Rear mines drop with a forward impulse to thwart chasers. |
| **High-Ping Netcode** | Client-Side Prediction + Dead Reckoning & Interpolation | Local ship movement has zero input lag; remote peer movements are smoothed with velocity extrapolation and Hermite/spherical interpolation to mask latency. |

---

## 3. Environment, Infrastructure & Credentials

> [!NOTE]
> Rockets is fully serverless. No paid backend, API keys, or private database credentials are required.

### Services & Infrastructure Inventory
- **GitHub Repository:** `https://github.com/eitamaath-design/rockets`
- **GitHub Pages URL (Live):** `https://eitamaath-design.github.io/rockets/`
- **Deployment Status:** Active & Built (`gh-pages` branch + GitHub Actions)
- **Signaling Infrastructure:**
  - Public Nostr Relays: `wss://relay.damus.io`, `wss://nos.lol`, `wss://relay.snort.social`, `wss://nostr.mom`
  - Public STUN Servers: `stun:stun.l.google.com:19302`, `stun:stun1.l.google.com:19302`

---

## 4. Operations & Maintenance Runbook

### Prerequisites & Setup
1. Node.js (>= 18.0.0)
2. npm (>= 9.0.0)
3. Git & GitHub CLI (`gh`) authenticated with repository write access

### Common Run / Start / Stop Commands
- **Development Server:**
  ```bash
  npm run dev
  ```
- **Run Unit & Integration Tests (Vitest):**
  ```bash
  npm run test:unit
  ```
- **Run Headless Browser E2E Tests (Playwright):**
  ```bash
  npm run test:e2e
  ```
- **Run Full Test Suite:**
  ```bash
  npm run test
  ```
- **Production Build:**
  ```bash
  npm run build
  ```
- **Deploy to GitHub Pages:**
  ```bash
  npm run deploy
  ```

---

## 5. Financial & Safety Guardrails

- **Hosting & Infrastructure Cost:** $0.00 / month (100% Free Tier on GitHub Pages + decentralized WebRTC).
- **Network Safety:**
  - WebRTC DataChannels are end-to-end encrypted (DTLS/SCTP).
  - All room state synchronization is sanitized and clamped to prevent client state poisoning or physics NaN crashes.

---

## 6. Workspace Files & Entry Points

| File / Directory | Purpose |
| :--- | :--- |
| `index.html` | Application shell, PWA manifest links, viewport-fit=cover, ServiceWorker registration |
| `public/manifest.json` | PWA web app manifest (display: fullscreen, orientation: landscape) |
| `public/sw.js` | Service worker for offline caching and PWA installation |
| `public/icon.svg` | Vector PWA app icon |
| `src/main.js` | Main application bootstrap, PWA install prompt handler, and lobby router |
| `src/styles/main.css` | Futuristic sci-fi HUD theme, responsive touch layout, safe-area insets |
| `src/net/network.js` | Trystero WebRTC mesh manager, deterministic master election, heartbeat TTL |
| `src/net/lobby.js` | Serverless public room directory with TTL expiration and ping discovery |
| `src/game/engine.js` | Three.js scene setup, render loop, post-processing, and resize handlers |
| `src/game/space.js` | Procedural starfield, nebula skybox, seeded asteroid generation |
| `src/game/ship.js` | Local player ship controller, physics, inertia, braking, strafing |
| `src/game/cockpit.js` | 3D first-person cockpit frame, targeting reticle, radar display |
| `src/game/remoteShip.js`| 3D peer ship model, thruster exhaust trails, interpolation/dead reckoning |
| `src/game/weapons.js` | Cannon projectiles (TTK 2s, recharge) and Rear Mines (2 charges, 3s fuse) |
| `src/game/hud.js` | Responsive HUD: fullscreen toggle, floating gauge pills, D-pad & action clusters |
| `src/utils/math.js` | Seeded PRNG, vector math, interpolation, and collision detection helpers |
| `tests/unit/math.test.js` | Unit tests for Mulberry32 determinism, vectors, and clamping |
| `tests/unit/flight.test.js` | Flight physics tests (maxSpeed, exact 2.0s halt braking, strafing) |
| `tests/unit/weapons.test.js` | Weapon tests (2.0s TTK, 1s cooldown recharge, rear mine 3s fuse & impulse) |
| `tests/unit/netcode.test.js` | Unit tests for master election, failover, TTL pruning, and dead reckoning |
| `tests/integration/combat.test.js` | Combat integration test (hits, lethal blows, kills, mine detonations) |
| `tests/e2e/browser.test.js` | Playwright headless browser E2E tests (Lobby, 3D Canvas, Touch Controls, PWA) |
| `vitest.config.js` | Vitest configuration for unit & integration test runner |
| `playwright.config.js` | Playwright configuration for headless Chromium & Mobile landscape E2E |
| `vite.config.js` | Vite build configuration with correct base path for GitHub Pages |
