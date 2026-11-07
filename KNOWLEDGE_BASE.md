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
| **P2P Signaling** | Trystero (`@trystero-p2p/nostr` + BitTorrent fallback) | Eliminates expensive backend signaling servers and user authentication. Provides instant, zero-cost matchmaking over open decentralized relays. |
| **Session Discovery & TTL** | Ephemeral Lobby Broadcast with TTL expiration | The elected master broadcasts session metadata every 4s with a 10s TTL. If inactive, the lobby entry expires naturally without server cleanup. |
| **Master Election Protocol** | Deterministic Sorted Peer UUID Leader Election | Ensures exactly one master peer is responsible for lobby TTL refreshes. When the master leaves, remaining peers instantly re-elect the next peer without any delay or collision. |
| **Rendering Engine** | Three.js (WebGL) | Zero external engine bloat, superior performance on desktop and mobile, full control over custom shaders, procedural starfields, and cockpit geometry. |
| **Cockpit & Controls** | First-person 3D Cockpit + Dual Input (Desktop Flight & Touch D-Pad) | Immersive space combat feel with full responsiveness across desktop, laptop, mobile, and tablet screens. |
| **Flight Dynamics** | Realistic Inertia + Regulated Deceleration | Forward thrust accelerates to `maxSpeed`. Braking decelerates to complete stop in exactly 2.0s as specified. Local pitch, yaw, roll, and lateral strafe thrusters. |
| **Weapons Balance** | Rapid-fire Front Cannon (TTK 2.0s) + Proximity/Timed Rear Mines (3.0s fuse) | High-stakes dogfighting: holding cannon fire drains energy and recharges after 1.0s pause; rear mines drop with a forward impulse to thwart chasers. |
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
- **Production Build:**
  ```bash
  npm run build
  ```
- **Preview Production Build:**
  ```bash
  npm run preview
  ```
- **Deploy to GitHub Pages:**
  ```bash
  git push origin main
  # Deployed automatically via GitHub Actions or manual gh-pages branch deploy
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
| `index.html` | Application shell, viewport configuration, and DOM HUD containers |
| `src/main.js` | Main application bootstrap and router (Lobby vs Match state) |
| `src/styles/main.css` | Futuristic sci-fi HUD theme, responsive touch layout, animations |
| `src/net/network.js` | Trystero WebRTC mesh manager, deterministic master election, heartbeat TTL |
| `src/net/lobby.js` | Serverless public room directory with TTL expiration and ping discovery |
| `src/game/engine.js` | Three.js scene setup, render loop, post-processing, and resize handlers |
| `src/game/space.js` | Procedural starfield, nebula skybox, seeded asteroid generation |
| `src/game/ship.js` | Local player ship controller, physics, inertia, braking, strafing |
| `src/game/cockpit.js` | 3D first-person cockpit frame, targeting reticle, radar display |
| `src/game/remoteShip.js`| 3D peer ship model, thruster exhaust trails, interpolation/dead reckoning |
| `src/game/weapons.js` | Cannon projectiles (TTK 2s, recharge) and Rear Mines (2 charges, 3s fuse) |
| `src/game/hud.js` | On-screen responsive HUD: health, ammo, mine charges, D-pad, scoreboard |
| `src/utils/math.js` | Seeded PRNG, vector math, interpolation, and collision detection helpers |
| `vite.config.js` | Vite build configuration with correct base path for GitHub Pages |
