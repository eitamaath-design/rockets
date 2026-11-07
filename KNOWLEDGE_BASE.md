# Rockets: Master Project Knowledge Base

This document serves as the permanent master reference for the **Rockets** multiplayer space shooter infrastructure, architecture, configuration, and operational runbooks. It maintains all architectural decisions, resource IDs, security/environment variables, operational procedures, and file locations across sessions.

---

## 1. Executive Summary & Architecture Overview

- **Project Goal:** A responsive, web-based, real-time 3D multiplayer space shooter running entirely peer-to-peer using WebRTC with zero registration, zero central server cost, decentralized master failover with keep-alive TTL heartbeats, and a fast-paced 10-minute **Battle Royale** format.
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
| **Battle Royale Mode & Cosmic Black Hole** | 10-Minute Encroaching Singularity & Shrinking Safe Zone (`blackhole.js`) | Matches last max 10 minutes ($600$s). An encroaching Black Hole with an event horizon sphere ($r=65$), gravitational lensing ring, dual swirling accretion disks, and inward particle vortex gradually shrinks the safe zone from $R=1100$ down to $R=120$. Exerts continuous gravitational acceleration pulling ships, asteroids, and meteors towards it. Any entity crossing the event horizon is instantly devoured. The last pilot alive wins the match with a Victory Royale celebration banner. |
| **Dual Forward Arsenals (Laser + Cannon)** | Forward High-Energy Laser + Forward Kinetic Cannon (`weapons.js`) | Replaces rear mine with forward kinetic cannon; adds high-energy laser as primary. Both fire forward. **Laser** ($2.4\times$ shield damage, $0.35\times$ hull damage) strips shields with long recharge cooldown. **Kinetic Cannon** ($2.2\times$ hull damage, $0.35\times$ shield damage) rapid-fires to shred unshielded hulls and carve asteroids. |
| **Asteroid Chunk Carving (Destructible Asteroids)** | Dynamic Crater Deformability + Rock Debris Ejection (`space.js`) | Kinetic cannon shots carve craters and chunks directly out of asteroid meshes along the penetration vector, ejecting bursts of rock debris particles and allowing pilots to drill tunnels through asteroids. |
| **Broken Shields & Tactical Power-Ups** | Broken Shield Lockout + 10s Random Power-Ups (`powerups.js`, `ship.js`) | Shields recharge over 15s if intact; however, if fully depleted to 0 HP, `isShieldBroken` triggers and shields **never recharge** unless repaired. Power-ups spawn every 10s within the safe zone, lasting 60s: **Shield Replenish** (100% restore), **Cloaking Device** (60s invisible to enemies until firing), and **Hologram Decoy Clone** (replaces primary weapon to launch a 15s forward phantom ship). |
| **Evasive Boost** | 300% Stronger Boost with 2.0s Cooldown (`ship.js`) | Double-tapping thrust triggers an instant forward dodge impulse (+180 u/s) to evade incoming fire with blue plasma flash, sound effect, and HUD status badge. Cooldown reduced to 2.0s (usable every 2s). |
| **Panoramic Cockpit Frame** | Ultra-Slim Low-Profile Canopy & Recessed Autocannons (`cockpit.js`) | Lowered instrument dash ($y = -0.58$), widened A-pillars ($x = \pm 0.92$), and pushed heavy fluted autocannons to lateral wing mounts ($x = \pm 0.72$), dramatically expanding the unobstructed galactic view. |
| **P2P Signaling & Lobby Directory** | Trystero (`@trystero-p2p/nostr`) with `RELIABLE_NOSTR_RELAYS` | Eliminates expensive backend signaling servers and user authentication. Uses dedicated high-availability Nostr relays (`nos.lol`, `relay.damus.io`, `relay.snort.social`, `nostr.mom`) ensuring 100% peer discovery overlap across clients. Action channels use universal `createActionChannel` strictly listening to `onMessage` for message packets and normalizing peer IDs from metadata and payload. |
| **Periodic Fiery Meteors** | Asteroid-Sized Chaotic Sector Hazard with Fire Envelopes (`meteor.js`) | Spawns an asteroid-sized raging flaming meteor ($r = 56$ u, $m = 1,200,000$, $v \approx 260$ u/s) every 10s. Enveloped in dual turbulent flame mantles and trailing a 250-particle billowing plume. Collisions impart cataclysmic momentum to asteroids and incinerate ships completely. |
| **3D Positional Spatial Audio** | Web Audio API HRTF Spatial Panning with Real-Time Listener Tracking (`audio.js`) | Explosions, laser chirps, cannon fire, meteor flybys, and engagement beacons utilize 3D spatial `PannerNode`s (HRTF model, inverse distance attenuation). The audio listener continuously tracks camera position and orientation in world space. |
| **Shader Performance & Zero-Freeze Combat** | Pre-Allocated Static Lighting Pool & `renderer.compile()` Pre-Warming | Eliminates mid-game WebGL shader recompilations (`#define NUM_POINT_LIGHTS N`) that caused severe browser freezes and frame drops during close-quarters dogfights. Weapons, beacons, and explosions use pre-allocated static lights (`combatFlashLight`, `meteorLight`) and additive emissive materials instead of dynamically creating/destroying lights. |
| **Thruster Trails** | Engine-Propelled Vapor Plumes Decaying over 15s (`trail.js`) | Dynamic 3D particle exhaust plumes stream from ship thrusters strictly when active engine propulsion is engaged (`input.thrust`). Decays over 15 seconds. If drifting with momentum, no trail is emitted. |
| **Watertight Asteroids & Distant Celestial Sphere** | `BufferGeometryUtils.mergeVertices` + Seamless Normals + Background Starfield | Asteroids are indexed, welded manifolds without seams or split faces. Starfield is placed on a distant celestial sphere ($r = 2900-3400$) with small pinprick sizing, eliminating all near-field floating white dust or blocky artifacts. |
| **Inactivity Engagement Beacon** | 30s Combat Inactivity Holographic Light Ripple & Sonar Ping (`beacon.js`) | If more than 30s elapse without combat between players, ships emit expanding 280u holographic ripples and spatial sonar audio pings every 3.5s to draw players together. Resets instantly upon firing weapons or landing hits. |
| **Asteroid Physics & Momentum** | Pairwise Newtonian Momentum Collision with Mass Scaling ($m \propto r^3$) | Dynamic orbital drift velocities and mass proportional to spherical volume ($r^3$). Asteroid-asteroid collisions resolve penetration depth and elastic/inelastic momentum transfer along collision normals. Ship-asteroid collisions bounce ships away with Newtonian reaction impulses on rocks. |
| **Diagnostics & Telemetry** | In-Memory Circular Logger + 5-Second Peer Telemetry Stats | Client-side circular event logger recording WebGL capabilities, input events, and errors. Automatically logs structured 5-second network statistics (packet arrival rates, latency, distance to remote ships, and scene visibility) to clipboard report via `🐞 Logs` button. |
| **Service Worker & Caching** | PWA Service Worker v11 (Network-First HTML, Cache-First Assets) | Guarantees mobile and desktop users immediately receive newly deployed builds on navigation while maintaining offline PWA caching. |
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
- **Compile Production Bundle:**
  ```bash
  npm run build
  ```
- **Deploy to Live Production (GitHub Pages):**
  ```bash
  npm run deploy
  ```

---

## 5. File & Directory Inventory

| File / Directory | Purpose |
| :--- | :--- |
| `src/main.js` | App entrypoint, lobby routing, URL param handling (`?room=`), and engine bootstrap. |
| `src/game/engine.js` | Core game loop, 60 FPS physics, scene orchestration, subsystem management, Battle Royale match loop. |
| `src/game/blackhole.js` | Battle Royale Black Hole, safe zone ring contraction, gravitational pull, event horizon destruction. |
| `src/game/powerups.js` | Tactical space power-ups (Shield Replenish, Invisibility Cloak, Hologram Decoy Clone). |
| `src/game/space.js` | Asteroid field generation, pairwise momentum collisions, dynamic asteroid carving, rock debris, lighting. |
| `src/game/ship.js` | 6DOF player flight physics, 2s 300% boost, broken shields, cloaking, decoy power-up tracking. |
| `src/game/cockpit.js` | Low-profile panoramic cockpit interior, vector displays, damage flash, boost recoil. |
| `src/game/weapons.js` | Dual forward arsenals (Primary Laser vs shields, Secondary Cannon vs hull + asteroid carving, Decoy clones). |
| `src/game/remoteShip.js` | Opponent 3D starfighter mesh, dead reckoning interpolation, invisibility cloak hiding. |
| `src/game/trail.js` | Engine-propelled 15s decaying particle plumes. |
| `src/game/beacon.js` | 30s inactivity holographic ripple and sonar ping. |
| `src/game/meteor.js` | 10s chaotic flaming asteroid-sized meteor hazard. |
| `src/game/audio.js` | Web Audio procedural synthesis (HRTF 3D positional panners, laser, cannon, boost, engine, chimes). |
| `src/game/hud.js` | Responsive HUD, touch controls, match clock, safe zone gauge, alive counter, victory banner. |
| `src/net/network.js` | WebRTC peer-to-peer data channels, master election, state, laser, cannon, decoy, hit, kill packets. |
| `src/net/lobby.js` | Decentralized lobby discovery, room creation, TTL keep-alive heartbeats. |
| `src/styles/main.css` | Cyberpunk flight HUD styling, touch controls, victory banner, responsive layout. |
| `public/sw.js` | PWA Service Worker v11 with network-first HTML caching. |
| `KNOWLEDGE_BASE.md` | Master project knowledge base. |
