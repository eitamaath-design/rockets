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
| **P2P Signaling & Lobby Directory** | Trystero (`@trystero-p2p/nostr`) with `RELIABLE_NOSTR_RELAYS` | Eliminates expensive backend signaling servers and user authentication. Uses dedicated high-availability Nostr relays (`nos.lol`, `relay.damus.io`, `relay.snort.social`, `nostr.mom`) ensuring 100% peer discovery overlap across clients. Action channels use universal `createActionChannel` strictly listening to `onMessage` for message packets and normalizing peer IDs from metadata and payload. |
| **Session Discovery & TTL** | Ephemeral Lobby Broadcast with TTL expiration | The elected master broadcasts session metadata every 3s with a 12s TTL. If inactive, the lobby entry expires naturally without server cleanup. Peers joining the directory immediately receive an announcement from the active master. |
| **Shader Performance & Zero-Freeze Combat** | Pre-Allocated Static Lighting Pool & `renderer.compile()` Pre-Warming | Eliminates mid-game WebGL shader recompilations (`#define NUM_POINT_LIGHTS N`) that caused severe browser freezes and frame drops during close-quarters dogfights. Weapons, beacons, and explosions use pre-allocated static lights (`combatFlashLight`, `meteorLight`) and additive emissive materials instead of dynamically creating/destroying lights. |
| **Periodic Fiery Meteors** | 10s Chaotic Sector Hazard (`meteor.js`) | Spawns a roaring flaming meteor ($v \approx 260$ u/s, $m = 150,000$) outside the sector every 10s. Colliding with an asteroid transfers massive kinetic momentum ($\Delta \mathbf{v}_{ast}$) and sends it careening across the field; colliding with a ship causes instant lethal incineration bypassing shields. Features atmospheric flyby sound and fiery particle plumes. |
| **Thruster Trails** | Engine-Propelled Vapor Plumes Decaying over 15s (`trail.js`) | Dynamic 3D particle exhaust plumes stream from ship thrusters strictly when active engine propulsion is engaged (`input.thrust`). Decays over 15 seconds. If drifting with momentum, no trail is emitted. |
| **Ship Aesthetics & Cockpit Overhaul** | Stealth Starfighter Exterior (`remoteShip.js`) + Tactical Avionics Flight Deck (`cockpit.js`) | Complete 3D visual overhaul: chiseled stealth chassis, forward canards, canted twin tailfins, underwing plasma pods, dual ion thruster nozzles with glowing coils. First-person cockpit includes angled carbon instrument dash, dual MFD vector/telemetry displays, gyro attitude bezel, roll-cage A-pillars, and heavy fluted wing autocannons with heat-sink cooling fins. |
| **Watertight Asteroids & Distant Celestial Sphere** | `BufferGeometryUtils.mergeVertices` + Seamless Normals + Background Starfield | Asteroids are indexed, welded manifolds without seams or split faces. Starfield is placed on a distant celestial sphere ($r = 2900-3400$) with small pinprick sizing, eliminating all near-field floating white dust or blocky artifacts. |
| **Inactivity Engagement Beacon** | 30s Combat Inactivity Holographic Light Ripple & Sonar Ping (`beacon.js`) | If more than 30s elapse without combat between players, ships emit expanding 280u holographic ripples and spatial sonar audio pings every 3.5s to draw players together. Resets instantly upon firing cannon, dropping mines, or landing hits. |
| **Asteroid Physics & Momentum** | Pairwise Newtonian Momentum Collision with Mass Scaling ($m \propto r^3$) | Dynamic orbital drift velocities and mass proportional to spherical volume ($r^3$). Asteroid-asteroid collisions resolve penetration depth and elastic/inelastic momentum transfer along collision normals. Ship-asteroid collisions bounce ships away with Newtonian reaction impulses on rocks. |
| **Shields & Health** | Rechargeable Energy Shields (15s Full Recharge) + Hull HP | Ships feature a 100-point energy shield absorbing impact damage from weapons and asteroid collisions. Shields automatically regenerate to 100% over 15 seconds if careful (after a 2.0s post-damage cooldown). Penetrating damage strikes the hull. |
| **Diagnostics & Telemetry** | In-Memory Circular Logger + 5-Second Peer Telemetry Stats | Client-side circular event logger recording WebGL capabilities, input events, and errors. Automatically logs structured 5-second network statistics (packet arrival rates, latency, distance to remote ships, and scene visibility) to clipboard report via `🐞 Logs` button. |
| **Service Worker & Caching** | PWA Service Worker v9 (Network-First HTML, Cache-First Assets) | Guarantees mobile and desktop users immediately receive newly deployed builds on navigation while maintaining offline PWA caching. |
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
